import { NextResponse } from 'next/server';
import { getPool } from '@/backend/lib/db';

const pool = getPool();

export async function GET(req: Request) {
    try {
        const client = await pool.connect();
        try {
            // Fetch logs. Handle both "Manual" logs (startTime/endTime) and "Decision" logs (date/action)
            // But for History Page, we want to show list.
            // Let's select standard fields and try to map them.
            // Columns: id, date, action, status, startTime, durationMinutes...

            const res = await client.query(`
                SELECT 
                    id, 
                    COALESCE("startTime", "createdAt") as display_time,
                    date,
                    status, 
                    "durationMinutes", 
                    "waterConsumed", 
                    action,
                    reason
                FROM irrigation_logs 
                ORDER BY "createdAt" DESC 
                LIMIT 50
            `);

            return NextResponse.json({ history: res.rows });
        } finally {
            client.release();
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
