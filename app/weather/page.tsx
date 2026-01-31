'use client';

import Link from 'next/link';
import { ArrowLeft, CloudRain, Sun, Cloud, Droplets, Wind, MapPin, Search, Volume2 } from 'lucide-react';

import { useEffect, useState } from 'react';
import { getWeather } from '@/backend/actions/getWeather';

import { authClient } from '@/lib/auth-client';
import { getFarmDetails } from '@/backend/actions/getFarmDetails';
import { useLanguage } from '../context/LanguageContext';

export default function WeatherPage() {
    const { t, speak } = useLanguage();
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
        return <div className="min-h-screen bg-[var(--background)] flex items-center justify-center font-bold text-xl">{t('loading_weather')}</div>;
    }

    if (error || !weatherData) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6 text-center">
                <p className="text-red-600 font-black text-2xl mb-4">{t('unable_to_load_weather')}</p>
                <p className="text-[var(--foreground)] border-4 border-black p-6 rounded-xl font-bold mb-6">{error || t('check_api_config')}</p>
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <Link href="/dashboard" className="w-full py-4 bg-[var(--secondary)] border-4 border-black text-black font-black uppercase text-center rounded-xl">{t('return_dashboard')}</Link>
                    <button onClick={() => { setError(null); setLoading(false); }} className="w-full py-4 bg-blue-600 border-4 border-black text-white font-black uppercase text-center rounded-xl">{t('try_again')}</button>
                </div>
            </div>
        );
    }

    const current = weatherData.current;

    // Process forecast data to get one entry per day
    const dailyForecast = weatherData.forecast.list.filter((reading: any) => reading.dt_txt.includes("12:00:00")).slice(0, 5);

    const forecast = dailyForecast.map((day: any) => ({
        day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }), // Updated to short for mobile
        tempHigh: Math.round(day.main.temp_max),
        tempLow: Math.round(day.main.temp_min),
        isRain: day.weather[0].main === 'Rain',
        status: day.weather[0].main
    }));

    return (
        <div className="min-h-screen bg-[var(--background)] pb-24 text-[var(--foreground)]">

            {/* Header - High Contrast */}
            <div className="bg-[var(--card-bg)] border-b-2 border-[var(--card-border)] p-4 sticky top-0 z-20 flex items-center gap-4">
                <Link href="/dashboard" className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-xl font-black uppercase tracking-wide">{t('weather_title')}</h1>
                </div>
                <button onClick={() => speak(`${t('weather_title')} for ${city}`)} className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                    <Volume2 className="w-6 h-6" />
                </button>
            </div>


            <main className="max-w-md mx-auto p-4 space-y-6">

                {/* Search - Big Inputs */}
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={city}
                            className="w-full h-14 pl-12 pr-4 text-lg font-bold border-4 border-black rounded-xl bg-white focus:outline-none focus:ring-0"
                        />
                    </div>
                    <button type="submit" className="h-14 w-14 bg-black text-white rounded-xl flex items-center justify-center border-4 border-black active:scale-95">
                        <Search className="w-6 h-6" />
                    </button>
                </form>

                {/* Big Weather Card */}
                <div className="bg-blue-500 border-4 border-black rounded-xl p-8 text-white text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center justify-center mb-4">
                        {current.weather[0].main === 'Rain' ?
                            <CloudRain className="w-24 h-24 stroke-[1.5]" /> :
                            <Sun className="w-24 h-24 stroke-[1.5]" />
                        }
                    </div>
                    <h2 className="text-8xl font-black mb-2">{Math.round(current.main.temp)}°</h2>
                    <p className="text-2xl font-bold uppercase tracking-widest mb-6">{current.weather[0].description}</p>

                    <div className="bg-black/20 rounded-xl p-4 flex justify-around">
                        <div className="flex flex-col items-center">
                            <Wind className="w-6 h-6 mb-1 opacity-80" />
                            <span className="font-bold text-lg">{Math.round(current.wind.speed * 3.6)}</span>
                            <span className="text-xs font-bold uppercase opacity-70">{t('wind_speed')}</span>
                        </div>
                        <div className="w-px bg-white/30"></div>
                        <div className="flex flex-col items-center">
                            <Droplets className="w-6 h-6 mb-1 opacity-80" />
                            <span className="font-bold text-lg">{current.main.humidity}%</span>
                            <span className="text-xs font-bold uppercase opacity-70">{t('humidity')}</span>
                        </div>
                    </div>
                </div>

                {/* 5-Day Forecast List - High Visibility */}
                <div>
                    <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                        {t('forecast_5_day')}
                        <Volume2 onClick={() => speak(t('forecast_5_day'))} className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                    </h3>

                    <div className="space-y-3">
                        {forecast.map((day: any, index: number) => (
                            <div key={index} className="bg-white border-4 border-black rounded-xl p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-xl font-black w-12">{day.day}</span>
                                <div className="flex items-center gap-4">
                                    {day.isRain ? <CloudRain className="w-8 h-8 text-blue-600" /> : <Sun className="w-8 h-8 text-orange-500" />}
                                    <div className="flex flex-col items-center w-16">
                                        <span className="text-lg font-black">{day.tempHigh}°</span>
                                        <span className="text-xs font-bold text-gray-400">{day.tempLow}°</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
