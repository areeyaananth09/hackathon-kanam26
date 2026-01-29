'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Thermometer, Sprout, CloudRain, Calculator, ArrowRight, MapPin, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getWeather } from '@/app/actions/getWeather';
import { getFarmDetails } from '@/app/actions/getFarmDetails';
import { authClient } from '@/lib/auth-client';

export default function WaterCalculatorPage() {
    const router = useRouter();

    // Inputs
    const [crop, setCrop] = useState('Tomato');
    const [soil, setSoil] = useState('Loamy');
    const [count, setCount] = useState(50);

    // Environmental Data (Auto-Fetched)
    const [temp, setTemp] = useState<number | null>(null);
    const [location, setLocation] = useState('Detecting Location...');
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
        <div className="min-h-screen bg-[#F8FAF5] p-6 pb-24">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <h1 className="text-xl font-bold text-gray-800">AI Water Calculator</h1>
            </div>

            <div className="max-w-xl mx-auto space-y-6">

                {/* Environment Card */}
                <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
                    <h2 className="text-sm font-bold text-blue-800 mb-4 flex items-center gap-2 uppercase tracking-wide">
                        <MapPin className="w-4 h-4" />
                        Detected Environment
                    </h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-blue-400 font-bold mb-1">LOCATION</p>
                            <p className="text-lg text-blue-900 font-bold">{location}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-blue-400 font-bold mb-1">TEMPERATURE</p>
                            {isLoadingWeather ? (
                                <Loader2 className="w-5 h-5 animate-spin text-blue-500 ml-auto" />
                            ) : (
                                <p className="text-lg text-blue-900 font-bold flex items-center gap-1 justify-end">
                                    <Thermometer className="w-4 h-4" />
                                    {temp}°C
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Inputs Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E9F4E3]">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Sprout className="w-5 h-5 text-green-600" />
                        Crop Details
                    </h2>

                    <div className="space-y-4">
                        {/* Crop Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Crop Type</label>
                            <select
                                value={crop}
                                onChange={(e) => setCrop(e.target.value)}
                                className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 font-medium appearance-none"
                            >
                                {Object.keys(BWR).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* Soil Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Soil Type</label>
                            <select
                                value={soil}
                                onChange={(e) => setSoil(e.target.value)}
                                className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-700 font-medium appearance-none"
                            >
                                <option value="Clay">Clay</option>
                                <option value="Loamy">Loamy</option>
                                <option value="Sandy">Sandy</option>
                            </select>
                        </div>

                        {/* Count */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Number of Plants</label>
                            <input
                                type="number"
                                value={count}
                                onChange={(e) => setCount(Number(e.target.value))}
                                className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold text-gray-800"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Card */}
                {temp !== null && (
                    <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-6 text-white shadow-xl shadow-green-200">
                        <h2 className="text-green-100 font-medium mb-4 flex items-center justify-between">
                            AI Calculated Requirement
                            <Calculator className="w-5 h-5 text-green-200" />
                        </h2>

                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-5xl font-bold">{totalWater}</span>
                            <span className="text-xl font-medium mb-1 text-green-100">Liters Total</span>
                        </div>

                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20 mb-6 space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-green-50">Per Plant</span>
                                <span className="font-bold">{waterPerPlant} L</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-green-50">Irrigation Duration</span>
                                <span className="font-bold">{durationMins} Mins</span>
                            </div>
                        </div>

                        <button
                            onClick={handleApply}
                            className="w-full py-4 bg-white text-green-700 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-green-50 transition-colors shadow-lg"
                        >
                            Set Auto-Irrigation
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <p className="text-center text-[10px] text-green-200/60 mt-2">
                            Schedule locked to AI Calculation
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
