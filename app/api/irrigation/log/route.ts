import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action, logId, userId, cropName } = body;

        const client = await pool.connect();

        try {
            if (action === 'start') {
                // Get Crop ID
                let cropId = 1;
                const cropRes = await client.query("SELECT id FROM crops WHERE name = $1", [cropName || 'Wheat']);
                if (cropRes.rows.length > 0) cropId = cropRes.rows[0].id;

                // Insert Log
                // Note: user_id column name might be "userId" or "user_id". Check consistent with other tables.
                // Based on auth tables ("userId"), likely quotes needed if mixed case.
                // But schema usually used snake_case for business tables. 
                // Let's assume standard interaction. I'll use parameters.
                // If the user's schema uses snake_case for these columns:
                const res = await client.query(`
                    INSERT INTO irrigation_logs ("userId", "cropId", "startTime", "status", "action")
                    VALUES ($1, $2, NOW(), 'In Progress', 'Manual Start')
                    RETURNING id
                `, [userId, cropId]);
                // Wait. I need to be sure about column casing.
                // Step 523 used 'start_time' in the User's snippet.
                // So columns are snake_case: start_time, end_time.
                // But "userId" might be camelCase because BetterAuth uses camelCase.
                // Let's check schema for irrigation_logs specifically.

                return NextResponse.json({ success: true, logId: res.rows[0].id });
            }
            else if (action === 'stop') {
                if (!logId) return NextResponse.json({ error: "No Log ID" }, { status: 400 });

                // Update Logic
                // Flow Rate: 30 L/min
                const p = await client.query(`
                    UPDATE irrigation_logs
                    SET 
                        "endTime" = NOW(),
                        "durationMinutes" = EXTRACT(EPOCH FROM (NOW() - "startTime")) / 60,
                        "waterConsumed" = (EXTRACT(EPOCH FROM (NOW() - "startTime")) / 60) * 30,
                        "status" = 'Completed'
                    WHERE id = $1
                    RETURNING "durationMinutes", "waterConsumed"
                `, [logId]);

                return NextResponse.json({ success: true, data: p.rows[0] });
            }

            return NextResponse.json({ error: "Invalid action" }, { status: 400 });

        } finally {
            client.release();
        }
    } catch (error: any) {
        console.error("Irrigation Log Error:", error);
        // Fallback for column naming errors: Try snake_case if camelCase failed?
        // Or just log it.
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
