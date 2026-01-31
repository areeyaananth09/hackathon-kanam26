-- Application Schema for Smart Irrigation App

-- Enable UUID extension if using UUIDs (recommended for Better Auth)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Aligned with Better Auth requirements + Application fields)
CREATE TABLE "user" (
    id TEXT PRIMARY KEY, -- Better Auth uses string IDs (often UUIDs)
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
    image TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    -- Custom fields for the application
    role TEXT DEFAULT 'farmer', -- 'farmer', 'expert', etc.
    "onboardingCompleted" BOOLEAN DEFAULT FALSE
);

-- 2. Session Table (Better Auth)
CREATE TABLE session (
    id TEXT PRIMARY KEY,
    "expiresAt" TIMESTAMP NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

-- 3. Account Table (Better Auth - for Google/Social Logins)
CREATE TABLE account (
    id TEXT PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP,
    "refreshTokenExpiresAt" TIMESTAMP,
    "scope" TEXT,
    "password" TEXT, -- Hashed password
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 4. Verification Table (Better Auth - for Email Verification/OTP)
CREATE TABLE verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- 5. Farm Details / Crop Information
CREATE TABLE farm_details (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    
    -- Crop specific details
    "cropType" TEXT NOT NULL, -- e.g., 'Wheat', 'Rice', 'Corn'
    "farmLocation" TEXT,      -- Location string or coordinates
    "sowingDate" DATE,
    "lastIrrigated" DATE,
    "soilType" TEXT,
    
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_user_email ON "user"(email);
CREATE INDEX idx_session_token ON session("token");
CREATE INDEX idx_account_provider ON account("providerId", "accountId");
CREATE INDEX idx_farm_userId ON farm_details("userId");

-- 6. Irrigation Logs (For Decision History & Analytics)
-- 6. Irrigation Logs (For Decision History & Analytics)
CREATE TABLE irrigation_logs (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    
    -- Date of the log
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- Snapshot of Weather Conditions used for decision
    "temperature" DECIMAL,
    "humidity" DECIMAL,
    "rainForecast" TEXT, -- e.g., '10%', 'Light Rain'
    
    -- Estimated Metrics
    "soilMoistureLevel" TEXT, -- 'Low', 'Medium', 'High'
    "daysSinceLastIrrigation" INTEGER,
    
    -- The Decision
    "action" TEXT NOT NULL, -- 'Irrigate', 'Skip'
    "durationMinutes" INTEGER, -- 0 if skipped
    "reason" TEXT,

    -- Analytics
    "waterSavedGallons" DECIMAL DEFAULT 0, -- Estimated savings vs fixed schedule
    "growth_stage" TEXT,
    "dynamic_threshold" INTEGER,
    "soil_moisture" INTEGER,
    
    -- Manual / Real-time Logs
    "cropId" INTEGER REFERENCES crops(id),
    "startTime" TIMESTAMP,
    "endTime" TIMESTAMP,
    "waterConsumed" DECIMAL DEFAULT 0,
    "status" TEXT, -- 'In Progress', 'Completed'
    
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX idx_logs_userId ON irrigation_logs("userId");
CREATE INDEX idx_logs_date ON irrigation_logs("date");

-- =======================================================
-- NEW TABLES FOR ADAPTIVE IRRIGATION SYSTEM
-- =======================================================

-- 7. Crops Master Table
CREATE TABLE crops (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'Rice', 'Wheat', etc.
    "baseMoistureThreshold" INTEGER NOT NULL -- Baseline percentage
);

-- 8. Crop Growth Stages
CREATE TABLE crop_growth_stages (
    id SERIAL PRIMARY KEY,
    "cropId" INTEGER NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    "stageName" TEXT NOT NULL, -- 'Vegetative', 'Flowering', 'Fruiting'
    "startDay" INTEGER NOT NULL, -- Days after planting
    "endDay" INTEGER NOT NULL,
    "stageFactor" INTEGER NOT NULL -- Adjustment to threshold (e.g., +5, -5)
);

-- 9. Farm Zones (Replacing generic farm_details over time, or linking to it)
-- Retaining farm_details for MVP compatibility, this allows multiple zones per user
CREATE TABLE farm_zones (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "zoneName" TEXT NOT NULL,
    "soilType" TEXT, -- 'Clay', 'Sandy', 'Loam'
    location TEXT -- Description or coords
);

-- 10. Crop Planting (Active Crops)
CREATE TABLE crop_planting (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "zoneId" TEXT REFERENCES farm_zones(id) ON DELETE SET NULL,
    "cropId" INTEGER REFERENCES crops(id),
    "plantingDate" DATE NOT NULL,
    "status" TEXT DEFAULT 'active' -- 'active', 'harvested'
);

-- 11. Sensor Data (Real-time or Simulation)
CREATE TABLE sensor_data (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE, -- User level ownership
    "zoneId" TEXT REFERENCES farm_zones(id),
    "soilMoisture" INTEGER, -- Percentage
    "temperature" DECIMAL,
    "humidity" DECIMAL,
    "recordedAt" TIMESTAMP DEFAULT NOW()
);



-- 12. Crop Growth Log (Scientific GDD-based Analytics)
CREATE TABLE crop_growth_log (
    id SERIAL PRIMARY KEY,
    "field_id" INTEGER, 
    "crop_id" INTEGER REFERENCES crops(id),
    date DATE,
    "daily_gdd" FLOAT,
    "accumulated_gdd" FLOAT,
    "growth_percentage" FLOAT,
    "growth_stage" VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("crop_id", date)
);

-- Seed Data for Crops (Basic Defaults)
INSERT INTO crops (name, "baseMoistureThreshold", "base_temperature", "total_gdd") VALUES 
('Rice', 60, 10, 2000), 
('Wheat', 40, 5, 1800), 
('Corn', 50, 8, 1600) 
ON CONFLICT (name) DO UPDATE 
SET "base_temperature" = EXCLUDED."base_temperature", 
    "total_gdd" = EXCLUDED."total_gdd";

-- Seed Data for Growth Stages (Example for Wheat)
-- Vegetative (Day 0-30): High water need (+10%)
-- Reproductive (Day 31-60): Critical need (+20%)
-- Ripening (Day 61-90): Low need (-10%)
INSERT INTO crop_growth_stages ("cropId", "stageName", "startDay", "endDay", "stageFactor") 
SELECT id, 'Vegetative', 0, 30, 10 FROM crops WHERE name = 'Wheat'
UNION ALL
SELECT id, 'Reproductive', 31, 60, 20 FROM crops WHERE name = 'Wheat'
UNION ALL
SELECT id, 'Ripening', 61, 90, -10 FROM crops WHERE name = 'Wheat'
ON CONFLICT DO NOTHING;