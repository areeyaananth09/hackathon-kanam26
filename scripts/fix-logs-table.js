const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

async function createTableOnly() {
    console.log('Creating irrigation_logs table only...');
    const client = new Client(dbConfig);

    const sql = `
    CREATE TABLE IF NOT EXISTS irrigation_logs (
        id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        "temperature" DECIMAL,
        "humidity" DECIMAL,
        "rainForecast" TEXT,
        "soilMoistureLevel" TEXT,
        "daysSinceLastIrrigation" INTEGER,
        "action" TEXT NOT NULL,
        "durationMinutes" INTEGER,
        "reason" TEXT,
        "waterSavedGallons" DECIMAL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );
    `;

    try {
        await client.connect();
        await client.query(sql);
        console.log('Success: Table created or already exists.');
    } catch (err) {
        console.error('Failed:', err);
    } finally {
        await client.end();
    }
}

createTableOnly();
