'use server';

export async function getWeather(location: string) {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
        throw new Error("Weather API key not configured");
    }

    // Default to Punjab if no location provided
    const query = location || "Punjab,IN";

    try {
        // Current Weather
        const currentRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
        );

        if (!currentRes.ok) {
            throw new Error("Failed to fetch current weather");
        }

        const currentData = await currentRes.json();

        // 5 Day Forecast
        const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric`
        );

        if (!forecastRes.ok) {
            throw new Error("Failed to fetch forecast");
        }

        const forecastData = await forecastRes.json();

        return {
            current: currentData,
            forecast: forecastData
        };

    } catch (error: any) {
        console.error("Weather API Error:", error);
        return { error: error.message || "Unknown error" };
    }
}
