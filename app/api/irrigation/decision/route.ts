
import { NextResponse } from 'next/server';
import { getPool } from '@/backend/lib/db';
import { getWeather } from '@/backend/actions/getWeather';
import {
    determineIrrigationAction,
    estimateSoilMoisture,
    WeatherData,
    CropStage
} from '@/lib/irrigation';

const pool = getPool();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, cropType, location, plantingDate, lastIrrigatedDate, soilType } = body;

        if (!userId || !location || !cropType) {
            return NextResponse.json({ error: "Missing required fields (userId, location, cropType)" }, { status: 400 });
        }

        // 1. Fetch Crop & Stage Data from DB
        const client = await pool.connect();
        let cropsData, stagesData;
        try {
            // Get Crop Info
            const cropRes = await client.query('SELECT * FROM crops WHERE LOWER(name) = LOWER($1)', [cropType]);
            if (cropRes.rows.length === 0) {
                // Fallback if crop not found (MVP safety)
                cropsData = { name: cropType, baseMoistureThreshold: 50 };
            } else {
                cropsData = cropRes.rows[0];
            }

            // Get Stages
            if (cropsData.id) {
                const stagesRes = await client.query('SELECT * FROM crop_growth_stages WHERE "cropId" = $1', [cropsData.id]);
                stagesData = stagesRes.rows;
            } else {
                stagesData = [];
            }
        } finally {
            client.release();
        }

        // 2. Fetch Weather Data (Real-time input)
        const weatherRes = await getWeather(location);
        if (!weatherRes || weatherRes.error) {
            return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 502 });
        }

        const current = weatherRes.current;
        const firstForecast = weatherRes.forecast?.list?.[0];
        const rainChance = firstForecast?.pop ? firstForecast.pop * 100 : 0;

        const weatherData: WeatherData = {
            temp: current.main.temp,
            humidity: current.main.humidity,
            rainForecast: rainChance,
            forecastDescription: current.weather[0].description
        };

        // 3. Process Inputs for Algorithm
        // Calculate Days After Planting
        let pDate = plantingDate ? new Date(plantingDate) : new Date();

        // If planting date not provided, try to find it in DB for the active crop
        if (!plantingDate && userId) {
            const plantingRes = await pool.query(
                `SELECT cp."plantingDate" 
                  FROM crop_planting cp
                  JOIN crops c ON cp."cropId" = c.id
                  WHERE cp."userId" = $1 AND LOWER(c.name) = LOWER($2) AND cp.status = 'active'
                  ORDER BY cp."plantingDate" DESC LIMIT 1`,
                [userId, cropType]
            );
            if (plantingRes.rows.length > 0) {
                pDate = new Date(plantingRes.rows[0].plantingDate);
            }
        }

        const today = new Date();
        const daysAfterPlanting = Math.floor((today.getTime() - pDate.getTime()) / (1000 * 60 * 60 * 24));
        const safeDaysAfterPlanting = Math.max(0, daysAfterPlanting);

        // Estimate Soil Moisture (Sensor Input or Software Estimation)
        // If provided in body (future sensor), use it. Else estimate.
        let currentSoilMoisture = body.soilMoisture;
        if (currentSoilMoisture === undefined) {
            const lastDate = lastIrrigatedDate ? new Date(lastIrrigatedDate) : new Date(Date.now() - 3 * 86400000); // Default 3 days ago
            const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            currentSoilMoisture = estimateSoilMoisture(
                Math.max(1, diffDays),
                weatherData.temp,
                weatherData.humidity,
                cropType
            );
        }

        // 4. Run Growth Stage Algorithm
        const decision = determineIrrigationAction(
            currentSoilMoisture,
            weatherData,
            cropsData.baseMoistureThreshold,
            safeDaysAfterPlanting,
            stagesData
        );

        // 5. Store in Database
        // We use a new client for the insert to be safe
        const insertClient = await pool.connect();
        try {
            await insertClient.query(
                `INSERT INTO irrigation_logs 
                ("userId", "date", "temperature", "humidity", "rainForecast", 
                 "soilMoistureLevel", "daysSinceLastIrrigation", "action", "durationMinutes", "reason", 
                 "waterSavedGallons", "growth_stage", "dynamic_threshold", "soil_moisture")
                VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                [
                    userId,
                    weatherData.temp,
                    weatherData.humidity,
                    weatherData.forecastDescription,
                    decision.soilMoistureLevel, // 'Low'/'High' derived
                    0, // daysSince (Simulated for log)
                    decision.action,
                    decision.durationMinutes,
                    decision.reason,
                    decision.waterSavedGallons,
                    decision.growthStage,
                    decision.dynamicThreshold,
                    currentSoilMoisture
                ]
            );
        } catch (err) {
            console.error("Log Insert Error:", err);
            // Continue even if log fails
        } finally {
            insertClient.release();
        }

        // 6. Return Result
        return NextResponse.json({
            success: true,
            algorithm: "Crop Growth Stage-Based Dynamic Irrigation",
            inputs: {
                crop: cropType,
                stage: decision.growthStage,
                daysAfterPlanting: safeDaysAfterPlanting,
                baseThreshold: cropsData.baseMoistureThreshold,
                dynamicThreshold: decision.dynamicThreshold,
                currentMoisture: currentSoilMoisture,
            },
            decision: {
                ...decision,
                weatherPreview: `${Math.round(weatherData.temp)}°C, ${weatherData.forecastDescription}`
            }
        });

    } catch (error: any) {
        console.error("Irrigation Logic Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
