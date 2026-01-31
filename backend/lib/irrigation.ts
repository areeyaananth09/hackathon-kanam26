
export interface WeatherData {
    temp: number; // Celsius
    humidity: number; // Percentage
    rainForecast: number; // mm or probability %
    forecastDescription: string;
}

export interface IrrigationDecision {
    action: 'Irrigate' | 'Skip';
    durationMinutes: number;
    reason: string;
    soilMoistureLevel: 'Low' | 'Medium' | 'High';
    waterSavedGallons: number;
    dynamicThreshold: number; // New field for visualization
    growthStage: string; // New field
}

export interface CropStage {
    stageName: string;
    startDay: number;
    endDay: number;
    stageFactor: number;
}

/**
 * determineGrowthStage
 * Based on days since planting, find the current stage from the DB list.
 */
export function determineGrowthStage(daysAfterPlanting: number, stages: CropStage[]): CropStage | null {
    return stages.find(stage => daysAfterPlanting >= stage.startDay && daysAfterPlanting <= stage.endDay) || null;
}

/**
 * Estimate soil moisture (Hardware-free fallback)
 */
export function estimateSoilMoisture(
    daysSinceLastIrrigation: number,
    temp: number,
    humidity: number,
    cropType: string
): number {
    // Return a percentage (0-100) instead of Low/Medium/High
    // Simple decay model: Start at 80% (Field Capacity)
    // Loss per day = (Temp/10) + (100-Humidity)/20

    // Base loss
    const dailyLoss = (temp / 8) + ((100 - humidity) / 25);

    // Crop multiplier (simplified)
    const cropFactors: Record<string, number> = {
        'rice': 1.2, 'wheat': 0.9, 'corn': 1.1, 'sugarcane': 1.3
    };
    const factor = cropFactors[cropType.toLowerCase()] || 1.0;

    const totalLoss = dailyLoss * factor * daysSinceLastIrrigation;

    // Start from assumed ~85% after last irrigation
    let estimated = 85 - totalLoss;
    return Math.max(10, Math.min(100, Math.round(estimated)));
}

/**
 * Core Algorithm: Crop Growth Stage–Based Dynamic Irrigation
 */
export function determineIrrigationAction(
    currentSoilMoisture: number, // % 0-100
    weather: WeatherData,
    baseThreshold: number,
    daysAfterPlanting: number,
    stages: CropStage[]
): IrrigationDecision {

    const baseDuration = 45; // Standard minutes

    // 1. Determine Growth Stage
    const currentStage = determineGrowthStage(daysAfterPlanting, stages);
    const stageFactor = currentStage ? currentStage.stageFactor : 0;
    const stageName = currentStage ? currentStage.stageName : "Generic Growth";

    // 2. Calculate Dynamic Threshold
    // Dynamic_Threshold = Base_Threshold + Stage_Factor
    const dynamicThreshold = baseThreshold + stageFactor;

    // 3. Compare & Decide
    // Rule: Skip if Rain is heavy
    if (weather.forecastDescription.toLowerCase().includes('heavy rain') || weather.rainForecast > 70) {
        return {
            action: 'Skip',
            durationMinutes: 0,
            reason: `Heavy rain forecast (${weather.rainForecast}%). Saving water.`,
            soilMoistureLevel: currentSoilMoisture > dynamicThreshold ? 'High' : 'Low',
            waterSavedGallons: baseDuration * 10,
            dynamicThreshold,
            growthStage: stageName
        };
    }

    // Rule: Main Threshold Check
    if (currentSoilMoisture < dynamicThreshold) {
        // Needs Water
        // Adjust duration based on how dry it is
        const deficit = dynamicThreshold - currentSoilMoisture;
        const duration = Math.round(baseDuration + (deficit * 1.5)); // Add time for larger deficit

        return {
            action: 'Irrigate',
            durationMinutes: duration,
            reason: `Moisture (${currentSoilMoisture}%) is below dynamic threshold (${dynamicThreshold}%) for ${stageName} stage.`,
            soilMoistureLevel: 'Low',
            waterSavedGallons: 0, // Using water
            dynamicThreshold,
            growthStage: stageName
        };
    } else {
        // Sufficient Water
        return {
            action: 'Skip',
            durationMinutes: 0,
            reason: `Moisture (${currentSoilMoisture}%) is sufficient (Threshold: ${dynamicThreshold}%).`,
            soilMoistureLevel: 'High',
            waterSavedGallons: baseDuration * 10,
            dynamicThreshold,
            growthStage: stageName
        };
    }
}
