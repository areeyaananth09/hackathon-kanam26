'use server';

import { getPool } from '@/backend/lib/db';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth'; // Ensure this path is correct for server-side auth

const pool = getPool();

export async function getFarmDetails(userId: string) {
    if (!userId) return null;

    const client = await pool.connect();
    try {
        // Get the most recent farm details for the user
        const res = await client.query(
            `SELECT "cropType", "farmLocation", "lastIrrigated" 
             FROM farm_details 
             WHERE "userId" = $1 
             ORDER BY "createdAt" DESC 
             LIMIT 1`,
            [userId]
        );

        if (res.rows.length > 0) {
            return res.rows[0];
        }
        return null;
    } catch (err) {
        console.error("Error fetching farm details:", err);
        return null;
    } finally {
        client.release();
    }
}
