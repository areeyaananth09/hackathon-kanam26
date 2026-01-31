'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Thermometer, Sprout, Calculator, ArrowRight, MapPin, Loader2, Volume2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getWeather } from '@/backend/actions/getWeather';
import { getFarmDetails } from '@/backend/actions/getFarmDetails';
import { authClient } from '@/lib/auth-client';
import { useLanguage } from '../context/LanguageContext';

export default function WaterCalculatorPage() {
    const { t, speak } = useLanguage();
    const router = useRouter();

    // Inputs
    const [crop, setCrop] = useState('Tomato');
    const [soil, setSoil] = useState('Loamy');
    const [count, setCount] = useState(50);

    // Environmental Data (Auto-Fetched)
    const [temp, setTemp] = useState<number | null>(null);
    const [location, setLocation] = useState(t('detecting_location'));
    const [isLoadingWeather, setIsLoadingWeather] = useState(true);

    // Results
    const [waterPerPlant, setWaterPerPlant] = useState(0);
    const [totalWater, setTotalWater] = useState(0);
    const [durationMins, setDurationMins] = useState(0);

    const FLOW_RATE_LPM = 5; // 5 L/min

    // Data Models
    const BWR: Record<string, number> = {
        'Tomato': 1.5, 'Brinjal': 1.5, 'Chili': 1.5,
        'Banana': 8.0, 'Papaya': 8.0,
        'Flower Plants': 1.0,
        'Millet': 0.7, 'Wheat': 0.7
    };

    const SFA: Record<string, number> = {
        'Clay': 0.8,
        'Loamy': 1.0,
        'Sandy': 1.2
    };

    // Auto-fetch Environment
    useEffect(() => {
        async function fetchEnvironment() {
            try {
                setIsLoadingWeather(true);
                const session = await authClient.getSession();
                let locQuery = "Punjab,IN"; // Fallback

                if (session.data?.user?.id) {
                    const farm = await getFarmDetails(session.data.user.id);
                    if (farm?.farmLocation) {
                        locQuery = farm.farmLocation;
                    }
                }
                setLocation(locQuery);

                const weather = await getWeather(locQuery);
                if (weather && weather.current && weather.current.main) {
                    setTemp(Math.round(weather.current.main.temp));
                } else {
                    setTemp(30); // Fallback temp
                }
            } catch (e) {
                console.error("Env Fetch Error", e);
                setTemp(30);
            } finally {
                setIsLoadingWeather(false);
            }
        }
        fetchEnvironment();
    }, []);

    // Auto-Calculate whenever inputs change
    useEffect(() => {
        if (temp !== null) calculate();
    }, [crop, soil, temp, count]);

    const calculate = () => {
        const currentTemp = temp || 30;

        // 1. Base Water Requirement
        const base = BWR[crop] || 1.0;

        // 2. Soil Factor
        const soilFactor = SFA[soil] || 1.0;

        // 3. Temperature Factor
        let tempFactor = 1.0;
        if (currentTemp < 25) tempFactor = 0.8;
        else if (currentTemp >= 25 && currentTemp <= 32) tempFactor = 1.0;
        else if (currentTemp > 32 && currentTemp <= 38) tempFactor = 1.2;
        else if (currentTemp > 38) tempFactor = 1.4;

        // Final Calculation
        const perPlant = base * soilFactor * tempFactor;
        const total = perPlant * count;

        setWaterPerPlant(parseFloat(perPlant.toFixed(2)));
        setTotalWater(parseFloat(total.toFixed(0)));

        const duration = Math.ceil(total / FLOW_RATE_LPM);
        setDurationMins(duration);
    };

    const handleApply = () => {
        // Pass 'auto=true' to enforce AI mode
        router.push(`/irrigation?duration=${durationMins}&water=${totalWater}&crop=${crop}&auto=true`);
    };

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24">
            {/* Header - High Contrast */}
            <div className="bg-[var(--card-bg)] border-b-2 border-[var(--card-border)] p-4 sticky top-0 z-20 flex items-center gap-4">
                <Link href="/dashboard" className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-xl font-black uppercase tracking-wide">{t('ai_water_calculator')}</h1>
                </div>
                <button onClick={() => speak(t('ai_water_calculator'))} className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                    <Volume2 className="w-6 h-6" />
                </button>
            </div>

            <main className="p-4 space-y-6 max-w-md mx-auto">

                {/* Environment Card - High Contrast */}
                <section className="bg-blue-50 border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-black uppercase flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-blue-700" />
                            {t('detected_environment')}
                        </h2>
                    </div>

                    <div className="flex items-center justify-between text-xl font-bold">
                        <div>
                            <p className="text-sm font-bold opacity-60 uppercase mb-1">{t('location_caps')}</p>
                            <p className="text-blue-900 leading-tight">{location}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold opacity-60 uppercase mb-1">{t('temperature_caps')}</p>
                            {isLoadingWeather ? (
                                <Loader2 className="w-6 h-6 animate-spin text-blue-700 ml-auto" />
                            ) : (
                                <p className="text-blue-900 flex items-center justify-end gap-1">
                                    <Thermometer className="w-6 h-6" />
                                    {temp}°C
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Inputs Card - Large Interactions */}
                <section className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-black flex items-center gap-2 uppercase">
                            <Sprout className="w-8 h-8 text-green-700" />
                            {t('crop_details')}
                        </h2>
                        <button onClick={() => speak(t('crop_details'))} className="p-2 border-2 border-black rounded-full hover:bg-gray-100">
                            <Volume2 className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Crop Type - Huge Select */}
                        <div>
                            <label className="block text-lg font-bold mb-2">{t('crop_type')}</label>
                            <div className="relative">
                                <select
                                    value={crop}
                                    onChange={(e) => setCrop(e.target.value)}
                                    className="w-full h-16 pl-4 pr-10 bg-gray-50 border-4 border-black rounded-xl text-xl font-bold appearance-none focus:ring-0 focus:border-green-600"
                                >
                                    {Object.keys(BWR).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                                    <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Soil Type */}
                        <div>
                            <label className="block text-lg font-bold mb-2">{t('soil_type')}</label>
                            <div className="relative">
                                <select
                                    value={soil}
                                    onChange={(e) => setSoil(e.target.value)}
                                    className="w-full h-16 pl-4 pr-10 bg-gray-50 border-4 border-black rounded-xl text-xl font-bold appearance-none focus:ring-0 focus:border-amber-600"
                                >
                                    <option value="Clay">{t('soil_clay')}</option>
                                    <option value="Loamy">{t('soil_loamy')}</option>
                                    <option value="Sandy">{t('soil_sandy')}</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                                    <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Count - Huge Input */}
                        <div>
                            <label className="block text-lg font-bold mb-2">{t('number_plants')}</label>
                            <input
                                type="number"
                                value={count}
                                onChange={(e) => setCount(Number(e.target.value))}
                                className="w-full h-16 px-4 bg-gray-50 border-4 border-black rounded-xl text-2xl font-bold focus:outline-none focus:border-blue-600"
                            />
                        </div>
                    </div>
                </section>

                {/* Results Card */}
                {temp !== null && (
                    <section className="bg-green-600 border-4 border-black rounded-xl p-6 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-black uppercase flex items-center gap-2">
                                <Calculator className="w-8 h-8" />
                                {t('ai_calculated_req')}
                            </h2>
                            <button onClick={() => speak(t('ai_calculated_req') + ' ' + totalWater + ' ' + t('liters_total'))} className="p-2 border-2 border-white rounded-full hover:bg-green-500">
                                <Volume2 className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="border-b-4 border-white/30 pb-4 mb-4">
                            <div className="flex items-end gap-2">
                                <span className="text-6xl font-black">{totalWater}</span>
                                <span className="text-2xl font-bold mb-2 opacity-90">{t('liters_total')}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-black/20 rounded-lg p-3">
                                <span className="block text-sm font-bold opacity-80 uppercase">{t('per_plant')}</span>
                                <span className="text-2xl font-bold">{waterPerPlant} L</span>
                            </div>
                            <div className="bg-black/20 rounded-lg p-3">
                                <span className="block text-sm font-bold opacity-80 uppercase">{t('irrigation_duration')}</span>
                                <span className="text-2xl font-bold">{durationMins} {t('mins')}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleApply}
                            className="w-full h-16 bg-white text-green-800 border-4 border-black rounded-xl text-xl font-black uppercase flex items-center justify-center gap-3 active:scale-95 transition-transform"
                        >
                            {t('set_auto_irrigation')}
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </section>
                )}
            </main>
        </div>
    );
}
