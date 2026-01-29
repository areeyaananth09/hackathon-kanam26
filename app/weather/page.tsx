'use client';

import Link from 'next/link';
import { ArrowLeft, CloudRain, Sun, Cloud, CloudSun, Droplets, Wind, MapPin, Search } from 'lucide-react';

import { useEffect, useState } from 'react';
import { getWeather } from '@/app/actions/getWeather';

import { authClient } from '@/lib/auth-client';
import { getFarmDetails } from '@/app/actions/getFarmDetails';
import { useLanguage } from '../context/LanguageContext';

export default function WeatherPage() {
    const { t } = useLanguage();
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [city, setCity] = useState("Punjab, India");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                // Get user session to find ID
                const session = await authClient.getSession();
                let locationQuery = "Punjab,IN"; // Default

                if (session.data?.user?.id) {
                    const farm = await getFarmDetails(session.data.user.id);
                    if (farm?.farmLocation) {
                        locationQuery = farm.farmLocation;
                        setCity(farm.farmLocation);
                    }
                }

                const data = await getWeather(locationQuery);

                if (data && !data.error) {
                    setWeatherData(data);
                } else {
                    setError(data?.error || "Failed to fetch data");
                    if (data?.error?.includes("401") || !data) {
                        setError("API Key invalid or not yet active. Please wait 30-60m.");
                    }
                }
            } catch (err) {
                console.error("Weather page error:", err);
                setError("Something went wrong loading functionality.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const data = await getWeather(searchQuery);
            if (data && !data.error) {
                setWeatherData(data);
                const locationName = `${data.current.name}, ${data.current.sys.country}`;
                setCity(locationName);
                setSearchQuery("");
            } else {
                setError(data?.error || t('unable_to_load_weather'));
            }
        } catch (err) {
            setError(t('unable_to_load_weather'));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center">{t('loading_weather')}</div>;
    }

    if (error || !weatherData) {
        return (
            <div className="min-h-screen bg-[#F0F9FF] flex flex-col items-center justify-center p-4 text-center">
                <p className="text-red-500 font-bold mb-2">{t('unable_to_load_weather')}</p>
                <p className="text-gray-600 bg-white p-4 rounded-xl shadow-sm border border-gray-200">{error || t('check_api_config')}</p>
                <div className="flex gap-4 mt-6">
                    <Link href="/dashboard" className="text-green-600 hover:underline">{t('return_dashboard')}</Link>
                    <button onClick={() => { setError(null); setLoading(false); }} className="text-blue-600 hover:underline">{t('try_again')}</button>
                </div>
            </div>
        );
    }

    const current = weatherData.current;

    // Process forecast data to get one entry per day (simple approach)
    // OpenWeatherMap 5 day forecast is every 3 hours
    const dailyForecast = weatherData.forecast.list.filter((reading: any) => reading.dt_txt.includes("12:00:00")).slice(0, 5);

    const forecast = dailyForecast.map((day: any) => ({
        day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
        date: new Date(day.dt * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        tempHigh: Math.round(day.main.temp_max),
        tempLow: Math.round(day.main.temp_min),
        rain: `${Math.round(day.pop * 100)}%`,
        icon: day.weather[0].main === 'Rain' ? <CloudRain className="w-8 h-8 text-blue-500" /> : <Sun className="w-8 h-8 text-orange-500" />, // Simplified
        status: day.weather[0].main
    }));

    return (
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed bottom-0 left-0 w-full h-1/3 bg-[#E0F2FE] -z-10 rounded-t-[50%]" />
            <div className="fixed bottom-0 right-0 w-2/3 h-1/4 bg-[#D1FAE5] -z-10 rounded-t-[60%]" />

            <div className="w-full max-w-lg">
                {/* Navigation */}
                <div className="mb-6 flex items-center justify-between">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        {t('back_dashboard')}
                    </Link>
                    <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border focus-within:ring-2 focus-within:ring-blue-400 transition-all">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={city} // Shows current city as placeholder
                            className="bg-transparent outline-none text-sm text-gray-700 w-28 placeholder:text-gray-500"
                        />
                        <button type="submit" className="text-gray-400 hover:text-blue-500 transition-colors">
                            <Search className="w-3.5 h-3.5" />
                        </button>
                    </form>
                </div>

                <div className="space-y-6">

                    {/* Current Weather Hero Card */}
                    <div className="bg-gradient-to-br from-[#0EA5E9] to-[#3B82F6] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-5xl font-bold mb-1">{Math.round(current.main.temp)}°</h1>
                                    <p className="text-blue-100 text-lg capitalize">{current.weather[0].description}</p>
                                    <p className="text-blue-200 text-sm mt-4">H:{Math.round(current.main.temp_max)}° L:{Math.round(current.main.temp_min)}°</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    {current.weather[0].main === 'Rain' ?
                                        <CloudRain className="w-20 h-20 text-white animate-bounce-slow" /> :
                                        <Sun className="w-20 h-20 text-yellow-300 animate-pulse-slow" />
                                    }
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
                                <div className="flex flex-col items-center">
                                    <Wind className="w-5 h-5 text-blue-200 mb-1" />
                                    <span className="font-bold">{Math.round(current.wind.speed * 3.6)} km/h</span>
                                    <span className="text-xs text-blue-200">{t('wind_speed')}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Droplets className="w-5 h-5 text-blue-200 mb-1" />
                                    <span className="font-bold">{current.main.humidity}%</span>
                                    <span className="text-xs text-blue-200">{t('humidity')}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <CloudRain className="w-5 h-5 text-blue-200 mb-1" />
                                    <span className="font-bold">--</span>
                                    <span className="text-xs text-blue-200">{t('precipitation')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Forecast List */}
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-6">
                        <h2 className="text-gray-800 font-bold mb-6 flex items-center gap-2">
                            <CloudSun className="w-5 h-5 text-orange-500" />
                            {t('forecast_5_day')}
                        </h2>

                        <div className="space-y-6">
                            {forecast.map((day: any, index: number) => (
                                <div key={index} className="flex items-center justify-between group">
                                    <div className="w-24">
                                        <p className="font-bold text-gray-800">{day.day}</p>
                                        <p className="text-xs text-gray-400">{day.date}</p>
                                    </div>

                                    <div className="flex items-center gap-3 flex-1 justify-center">
                                        {day.icon}
                                        <span className="text-xs text-gray-500 font-medium w-16 text-center">{day.status}</span>
                                    </div>

                                    <div className="flex items-center gap-4 w-28 justify-end">
                                        <div className="text-right">
                                            <span className="font-bold text-gray-800">{day.tempHigh}°</span>
                                            <span className="text-gray-400 mx-1">/</span>
                                            <span className="text-gray-500">{day.tempLow}°</span>
                                        </div>
                                        <div className="flex items-center text-xs font-semibold text-blue-500 w-10 justify-end">
                                            <Droplets className="w-3 h-3 mr-0.5" />
                                            {day.rain}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Irrigation Insight */}
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3 items-start">
                        <div className="bg-orange-100 p-2 rounded-full mt-0.5">
                            <Sun className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">{t('planning_tip')}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mt-1">
                                {t('planning_tip_desc')}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
