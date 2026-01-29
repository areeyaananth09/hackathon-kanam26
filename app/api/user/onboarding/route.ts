import { auth } from "@/lib/auth"; // import from server auth
import { Pool } from "pg";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { cropType, location, lastIrrigated } = body;

        // Basic validation
        if (!cropType || !location) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            await client.query(
                `INSERT INTO farm_details ("userId", "cropType", "farmLocation", "lastIrrigated") 
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT DO NOTHING`, // Or update if you prefer
                [session.user.id, cropType, location, lastIrrigated || null]
            );

            // Also update the user's onboarding status
            await client.query(
                `UPDATE "user" SET "onboardingCompleted" = TRUE WHERE id = $1`,
                [session.user.id]
            );

            // Insert into active crops (Crop Planting)
            // 1. Get Crop ID
            const cropRes = await client.query('SELECT id FROM crops WHERE LOWER(name) = LOWER($1)', [cropType]);
            if (cropRes.rows.length > 0) {
                const cropId = cropRes.rows[0].id;
                const { plantingDate } = body;
                // Default to today if not provided, or use lastIrrigated as fallback proxy (not ideal but better than null)
                const pDate = plantingDate || lastIrrigated || new Date().toISOString();

                await client.query(
                    `INSERT INTO crop_planting ("userId", "cropId", "plantingDate", "status")
                     VALUES ($1, $2, $3, 'active')`,
                    [session.user.id, cropId, pDate]
                );
            }

        } finally {
            client.release();
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Onboarding error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
