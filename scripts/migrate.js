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

async function runMigration() {
    console.log('Starting migration...');
    const client = new Client(dbConfig);

    try {
        await client.connect();

        const sqlPath = path.join(__dirname, '../application_schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Executing schema...');
        await client.query(sql);
        console.log('Migration successful!');

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.end();
    }
}

runMigration();
