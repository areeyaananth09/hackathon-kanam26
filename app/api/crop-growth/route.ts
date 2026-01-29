import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Helper to generate mock temperature based on latitude and day of year
function getMockWeather(lat: number, date: Date) {
    // Simple seasonality model
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (86400000));

    // Base temp typical for latitude (rough approximation)
    // Equator (0) -> 28C, Poles (90) -> -10C
    const avgYearly = 28 - (Math.abs(lat) * 0.4);

    // Northern hemisphere peak in July (day 180), Southern in Jan
    const seasonOffset = lat >= 0 ? 0 : 180;
    const amplitude = 10 + (Math.abs(lat) * 0.1);

    const dayTemp = avgYearly + amplitude * -Math.cos((2 * Math.PI * (dayOfYear + seasonOffset)) / 365);

    // Random daily variation
    const tMax = dayTemp + 5 + (Math.random() * 4 - 2);
    const tMin = dayTemp - 5 + (Math.random() * 4 - 2);

    // Simple Rain Probability (0 to 1)
    // Higher random chance in "Monsoon" months? Let's just randomise for MVP
    const rainMm = Math.random() > 0.8 ? Math.random() * 20 : 0; // 20% chance of rain

    return { tMax, tMin, rainMm };
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { crop, sowing_date, location, lat, lon } = body; // accept lat/lon if available

        if (!crop || !sowing_date) {
            return NextResponse.json({ error: "Missing required fields (crop, sowing_date)" }, { status: 400 });
        }

        const client = await pool.connect();

        try {
            // 1. Fetch Crop Parameters
            const cropRes = await client.query(
                'SELECT * FROM crops WHERE LOWER(name) = LOWER($1)',
                [crop]
            );

            if (cropRes.rows.length === 0) {
                return NextResponse.json({ error: `Crop '${crop}' not found in database.` }, { status: 404 });
            }

            const cropData = cropRes.rows[0];
            // Use DB values or defaults if null (fallback)
            const baseTemp = cropData.base_temperature || 10;
            const totalRequiredGDD = cropData.total_gdd || 2000;
            const cropId = cropData.id;

            // 2. Loop and Calculate GDD
            const plantingDate = new Date(sowing_date);
            const today = new Date();
            const resultData = [];

            let accumulatedGDD = 0;
            let currentGrowthPercentage = 0;

            // Use provided lat or default to a region (e.g. Punjab ~30)
            const latitude = lat ? parseFloat(lat) : 30.0;

            let totalTraditionalWater = 0;
            let totalSmartWater = 0;
            let lastIrrigatedTraditional = -999;
            let lastIrrigatedSmart = -999;
            let soilMoistureSmart = 50; // starting %

            for (let d = new Date(plantingDate); d <= today; d.setDate(d.getDate() + 1)) {
                const dayIndex = Math.floor((d.getTime() - plantingDate.getTime()) / 86400000);

                // Get Weather (Mock for history)
                const { tMax, tMin, rainMm } = getMockWeather(latitude, d);

                // GDD Formula: ((Tmax + Tmin) / 2) - Base
                const avgTemp = (tMax + tMin) / 2;
                let dailyGDD = avgTemp - baseTemp;
                if (dailyGDD < 0) dailyGDD = 0; // GDD cannot be negative

                accumulatedGDD += dailyGDD;

                // Calculate Growth %
                let pct = (accumulatedGDD / totalRequiredGDD) * 100;
                if (pct > 100) pct = 100;

                // Identify Stage
                let stage = 'Germination';
                if (pct > 20) stage = 'Vegetative';
                if (pct > 50) stage = 'Flowering';
                if (pct > 75) stage = 'Maturity';

                // --- Water Simulation ---
                // Evaporation (simplified)
                const et = (avgTemp / 5); // roughly 5-6mm/day at 30C

                // 1. Traditional: Fixed Schedule (e.g., every 5 days) + always irrigates fully (50mm) unless heavy rain SAME day
                if (dayIndex - lastIrrigatedTraditional >= 5) {
                    if (rainMm < 10) {
                        totalTraditionalWater += 50; // flood irrigation
                        lastIrrigatedTraditional = dayIndex;
                    }
                }

                // 2. Smart: Maintain moisture between 40% and 80%
                soilMoistureSmart -= (et * 2); // simplistic drop
                soilMoistureSmart += (rainMm * 2); // rain adds

                // Irrigation Decision
                if (soilMoistureSmart < 40) {
                    const defect = 80 - soilMoistureSmart;
                    // Smart only fills to required
                    const waterNeeded = defect / 2; // rough mm equivalent
                    totalSmartWater += waterNeeded;
                    soilMoistureSmart = 80;
                    lastIrrigatedSmart = dayIndex;
                }
                // Cap
                if (soilMoistureSmart > 100) soilMoistureSmart = 100;


                const dateStr = d.toISOString().split('T')[0];

                // push to dataset
                resultData.push({
                    day: dayIndex + 1,
                    date: dateStr,
                    growthPercentage: parseFloat(pct.toFixed(2)),
                    growthStage: stage
                });

                // Store in DB (log)
                // Use upsert
                await client.query(
                    `INSERT INTO crop_growth_log 
                    ("crop_id", "date", "daily_gdd", "accumulated_gdd", "growth_percentage", "growth_stage")
                    VALUES ($1, $2, $3, $4, $5, $6)
                    ON CONFLICT ("crop_id", "date") 
                    DO UPDATE SET "accumulated_gdd" = $4, "growth_percentage" = $5, "growth_stage" = $6`,
                    [cropId, dateStr, dailyGDD, accumulatedGDD, pct, stage]
                );

                currentGrowthPercentage = pct;
            }

            const waterSaved = Math.max(0, totalTraditionalWater - totalSmartWater);
            const savedPercentage = totalTraditionalWater > 0
                ? ((waterSaved / totalTraditionalWater) * 100)
                : 0;

            return NextResponse.json({
                success: true,
                crop: cropData.name,
                current_growth: parseFloat(currentGrowthPercentage.toFixed(2)),
                water_stats: {
                    traditional_usage: Math.round(totalTraditionalWater),
                    smart_usage: Math.round(totalSmartWater),
                    saved_gallons: Math.round(waterSaved * 264), // Convert mm/hectare-ish unit to gallons (mock scale)
                    saved_percentage: Math.round(savedPercentage)
                },
                data: resultData
            });

        } finally {
            client.release();
        }

    } catch (error: any) {
        console.error("Crop API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
