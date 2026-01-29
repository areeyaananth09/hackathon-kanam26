
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function GET() {
    try {
        const client = await pool.connect();
        try {
            // 7. Crops Master Table
            await client.query(`
                CREATE TABLE IF NOT EXISTS crops (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL UNIQUE,
                    "baseMoistureThreshold" INTEGER NOT NULL
                );
            `);

            // 8. Crop Growth Stages
            await client.query(`
                CREATE TABLE IF NOT EXISTS crop_growth_stages (
                    id SERIAL PRIMARY KEY,
                    "cropId" INTEGER NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
                    "stageName" TEXT NOT NULL,
                    "startDay" INTEGER NOT NULL,
                    "endDay" INTEGER NOT NULL,
                    "stageFactor" INTEGER NOT NULL
                );
            `);

            // 9. Farm Zones
            await client.query(`
                CREATE TABLE IF NOT EXISTS farm_zones (
                    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
                    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
                    "zoneName" TEXT NOT NULL,
                    "soilType" TEXT,
                    location TEXT
                );
            `);

            // 10. Crop Planting
            await client.query(`
                CREATE TABLE IF NOT EXISTS crop_planting (
                    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
                    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
                    "zoneId" TEXT REFERENCES farm_zones(id) ON DELETE SET NULL,
                    "cropId" INTEGER REFERENCES crops(id),
                    "plantingDate" DATE NOT NULL,
                    "status" TEXT DEFAULT 'active'
                );
            `);

            // 11. Sensor Data
            await client.query(`
                CREATE TABLE IF NOT EXISTS sensor_data (
                    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
                    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
                    "zoneId" TEXT REFERENCES farm_zones(id),
                    "soilMoisture" INTEGER,
                    "temperature" DECIMAL,
                    "humidity" DECIMAL,
                    "recordedAt" TIMESTAMP DEFAULT NOW()
                );
            `);

            // 12. Crop Growth Tracking (Analytics)
            await client.query(`
                CREATE TABLE IF NOT EXISTS crop_growth_tracking (
                    id SERIAL PRIMARY KEY,
                    crop_name VARCHAR(50),
                    growth_date DATE,
                    days_after_planting INT,
                    growth_value FLOAT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(crop_name, growth_date)
                );
            `);

            // Seed Data
            await client.query(`
                INSERT INTO crops (name, "baseMoistureThreshold") VALUES 
                ('Rice', 60), 
                ('Wheat', 40), 
                ('Corn', 50),
                ('Vegetables', 55),
                ('Sugarcane', 65),
                ('Cotton', 35)
                ON CONFLICT (name) DO NOTHING;
            `);

            // Seed Stages (Wheat)
            const wheatRes = await client.query("SELECT id FROM crops WHERE name = 'Wheat'");
            if (wheatRes.rows.length > 0) {
                const wheatId = wheatRes.rows[0].id;
                await client.query(`
                    INSERT INTO crop_growth_stages ("cropId", "stageName", "startDay", "endDay", "stageFactor") 
                    VALUES 
                    ($1, 'Vegetative', 0, 30, 10),
                    ($1, 'Reproductive', 31, 60, 20),
                    ($1, 'Ripening', 61, 90, -10)
                    ON CONFLICT DO NOTHING; -- Primitive conflict check, usually requires unique constraint
                `, [wheatId]);
            }
            // Seed Stages (Rice)
            const riceRes = await client.query("SELECT id FROM crops WHERE name = 'Rice'");
            if (riceRes.rows.length > 0) {
                const riceId = riceRes.rows[0].id;
                await client.query(`
                     INSERT INTO crop_growth_stages ("cropId", "stageName", "startDay", "endDay", "stageFactor") 
                     VALUES 
                     ($1, 'Seedling', 0, 20, 15),
                     ($1, 'Vegetative', 21, 50, 20),
                     ($1, 'Reproductive', 51, 80, 25),
                     ($1, 'Ripening', 81, 110, -5)
                     ON CONFLICT DO NOTHING;
                 `, [riceId]);
            }

            // GDD Updates
            try {
                // Add GDD columns to crops
                await client.query('ALTER TABLE crops ADD COLUMN IF NOT EXISTS "base_temperature" FLOAT');
                await client.query('ALTER TABLE crops ADD COLUMN IF NOT EXISTS "total_gdd" FLOAT');

                // Update Seed Data with GDD params
                await client.query(`UPDATE crops SET "base_temperature" = 10, "total_gdd" = 2000 WHERE name = 'Rice'`);
                await client.query(`UPDATE crops SET "base_temperature" = 5, "total_gdd" = 1800 WHERE name = 'Wheat'`);

                // Create crop_growth_log table
                await client.query(`
                    CREATE TABLE IF NOT EXISTS crop_growth_log (
                        id SERIAL PRIMARY KEY,
                        "field_id" INTEGER, -- Optional linkage
                        "crop_id" INTEGER REFERENCES crops(id),
                        date DATE,
                        "daily_gdd" FLOAT,
                        "accumulated_gdd" FLOAT,
                        "growth_percentage" FLOAT,
                        "growth_stage" VARCHAR(50),
                        UNIQUE("crop_id", date)
                    );
                `);
            } catch (e) {
                console.log("Error updates GDD schema", e);
            }

            try {
                // Manually add columns if they don't exist
                await client.query('ALTER TABLE irrigation_logs ADD COLUMN IF NOT EXISTS "growth_stage" TEXT');
                await client.query('ALTER TABLE irrigation_logs ADD COLUMN IF NOT EXISTS "dynamic_threshold" INTEGER');
                await client.query('ALTER TABLE irrigation_logs ADD COLUMN IF NOT EXISTS "soil_moisture" INTEGER');

                // Manual Irrigation Support
                await client.query('ALTER TABLE irrigation_logs ADD COLUMN IF NOT EXISTS "startTime" TIMESTAMP');
                await client.query('ALTER TABLE irrigation_logs ADD COLUMN IF NOT EXISTS "endTime" TIMESTAMP');
                await client.query('ALTER TABLE irrigation_logs ADD COLUMN IF NOT EXISTS "waterConsumed" DECIMAL');
                await client.query('ALTER TABLE irrigation_logs ADD COLUMN IF NOT EXISTS "status" TEXT');
                await client.query('ALTER TABLE irrigation_logs ADD COLUMN IF NOT EXISTS "cropId" INTEGER REFERENCES crops(id)');
            } catch (e) {
                console.log("Error adding columns", e);
            }

            return NextResponse.json({ success: true, message: "Database tables and seed data setup complete." });
        } finally {
            client.release();
        }
    } catch (error: any) {
        console.error("Setup Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
