import { Pool, PoolClient } from 'pg';

// Create a singleton database pool to be shared across all API routes
// This prevents creating multiple pools and exhausting database connections

// Use global to persist pool across hot reloads in development
declare global {
    var __db_pool: Pool | undefined;
}

let pool: Pool | null = null;

export function getPool(): Pool {
    // In development, use global to persist across hot reloads
    if (process.env.NODE_ENV !== 'production') {
        if (!global.__db_pool) {
            global.__db_pool = createPool();
        }
        return global.__db_pool;
    }

    // In production, use module-level singleton
    if (!pool) {
        pool = createPool();
    }
    return pool;
}

function createPool(): Pool {
    const newPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 20, // Maximum number of clients in the pool
        min: 2, // Minimum number of clients to keep alive
        idleTimeoutMillis: 60000, // Close idle clients after 60 seconds
        connectionTimeoutMillis: 30000, // 30 seconds for Neon cold starts
        ssl: {
            rejectUnauthorized: false // Required for Neon
        },
        // Additional settings for better Neon compatibility
        keepAlive: true,
        keepAliveInitialDelayMillis: 10000,
        // Allow more time for queries
        query_timeout: 30000,
        statement_timeout: 30000,
    });

    // Handle pool errors
    newPool.on('error', (err) => {
        console.error('Unexpected error on idle database client', err);
        // Don't crash the process on pool errors
    });

    newPool.on('connect', () => {
        console.log('✅ New database client connected');
    });

    console.log('🔧 Database pool created with Neon-optimized settings');
    console.log(`   Max connections: 20, Min connections: 2`);
    console.log(`   Connection timeout: 30s, Idle timeout: 60s`);

    return newPool;
}

// Helper function to get a client with retry logic
export async function getClient(retries = 3): Promise<PoolClient> {
    const pool = getPool();

    for (let i = 0; i < retries; i++) {
        try {
            console.log(`🔄 Attempting to connect (attempt ${i + 1}/${retries})...`);
            const client = await pool.connect();
            console.log('✅ Successfully connected to database');
            return client;
        } catch (err: any) {
            console.error(`❌ Connection attempt ${i + 1} failed:`, err.message);

            if (i === retries - 1) {
                throw new Error(`Failed to connect after ${retries} attempts: ${err.message}`);
            }

            // Wait before retrying (exponential backoff)
            const waitTime = Math.min(1000 * Math.pow(2, i), 5000);
            console.log(`⏳ Waiting ${waitTime}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }

    throw new Error('Failed to connect to database');
}

// Export a function to close the pool (useful for cleanup)
export async function closePool(): Promise<void> {
    const poolToClose = process.env.NODE_ENV !== 'production' ? global.__db_pool : pool;

    if (poolToClose) {
        await poolToClose.end();
        if (process.env.NODE_ENV !== 'production') {
            global.__db_pool = undefined;
        } else {
            pool = null;
        }
        console.log('Database pool closed');
    }
}
