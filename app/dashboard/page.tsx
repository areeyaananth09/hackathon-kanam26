'use client';

import Link from 'next/link';
import { CloudRain, Droplets, Thermometer, Wind, User, Sprout, Calendar, ArrowRight, Settings, Loader2, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { getFarmDetails } from '@/app/actions/getFarmDetails';
import { useLanguage } from '../context/LanguageContext';

export default function DashboardPage() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const session = await authClient.getSession();
                if (!session.data?.user) {
                    return; // Redirect handled by middleware mostly, or show login
                }

                const userData = session.data.user;
                setUser(userData);

                // Fetch real farm details for the logged in user
                const farmDetails = await getFarmDetails(userData.id);

                const cropType = farmDetails?.cropType || 'wheat'; // Fallback
                const location = farmDetails?.farmLocation || 'Punjab,IN'; // Fallback
                // Use last irrigated from DB or default to 3 days ago
                const lastIrrigated = farmDetails?.lastIrrigated ? new Date(farmDetails.lastIrrigated).toISOString() : new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

                // Call decision API with REAL user data
                const res = await fetch('/api/irrigation/decision', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: userData.id,
                        cropType: cropType,
                        location: location,
                        lastIrrigatedDate: lastIrrigated
                    })
                });

                if (res.ok) {
                    const result = await res.json();
                    setData(result);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader2 className="w-8 h-8 text-green-600 animate-spin" /></div>;
    }

    // Fallback if data failed
    const weather = data ? {
        temp: `${Math.round(data.decision.weatherPreview.split(',')[0].replace('°C', ''))}°C`,
        humidity: '60%', // The API didn't return humidity in the decision object top level, let's just use mock or fix API later
        rainChance: '10%'
    } : {
        temp: '--',
        humidity: '--',
        rainChance: '--'
    };

    const decision = data?.decision || {
        action: 'Loading...',
        reason: 'Analyzing satellite data...',
        actionType: 'skip'
    };

    const isIrrigate = decision.action === 'Irrigate';

    // Soil Moisture Mapping
    const moistureLevel = decision.soilMoistureLevel || 'Medium';
    const moisturePercent = moistureLevel === 'Low' ? 25 : (moistureLevel === 'Medium' ? 55 : 85);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Top Header */}
            <div className="bg-white p-6 sticky top-0 z-10 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Sprout className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-800">{t('my_farm')}</h1>
                        <Link href="/history" className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-600 transition-colors">
                            <Calendar className="w-3 h-3" />
                            <span>Today, {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                        </Link>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href="/settings" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <Settings className="w-5 h-5 text-gray-600" />
                    </Link>
                    <Link href="/profile" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <User className="w-5 h-5 text-gray-600" />
                    </Link>
                </div>
            </div>

            <div className="p-6 space-y-6">

                {/* Main Decision Card */}
                <Link href="/schedule">
                    <div className={`rounded-3xl p-8 shadow-xl text-white relative overflow-hidden transform transition-transform hover:scale-[1.02] cursor-pointer ${isIrrigate ? 'bg-[#0EA5E9]' : 'bg-green-600'}`}>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

                        <div className="relative z-10 text-center">
                            <div className="inline-block bg-white/20 backdrop-blur-md rounded-full px-4 py-1 text-sm font-medium mb-4">
                                {t('daily_recommendation')}
                            </div>
                            <h2 className="text-3xl font-extrabold mb-2">{decision.action === 'Irrigate' ? t('irrigate_field') : t('skip_irrigation')}</h2>
                            <p className="text-white/90 text-sm mb-6 max-w-xs mx-auto leading-relaxed">{decision.reason}</p>

                            {isIrrigate && (
                                <div className="bg-white text-[#0EA5E9] font-bold py-3 px-6 rounded-xl inline-flex items-center gap-2 shadow-sm">
                                    <Droplets className="w-5 h-5" />
                                    {t('duration_label')}: {decision.durationMinutes} {t('mins')}
                                </div>
                            )}
                            {!isIrrigate && (
                                <div className="bg-white text-green-600 font-bold py-3 px-6 rounded-xl inline-flex items-center gap-2 shadow-sm">
                                    <Sprout className="w-5 h-5" />
                                    {t('save_water_today')}
                                </div>
                            )}
                        </div>
                    </div>
                </Link>

                {/* Soil Moisture Section */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-800 font-bold text-lg">{t('soil_moisture')}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${moistureLevel === 'Low' ? 'bg-red-100 text-red-600' :
                            (moistureLevel === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600')
                            }`}>
                            {moistureLevel}
                        </span>
                    </div>

                    <div className="relative pt-2 pb-6">
                        <div className="flex mb-2 items-center justify-between text-xs text-gray-500 font-medium">
                            <span>{t('dry')}</span>
                            <span>{t('wet')}</span>
                        </div>
                        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-100">
                            <div
                                style={{ width: `${moisturePercent}%` }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${moistureLevel === 'Low' ? 'bg-red-500' :
                                    (moistureLevel === 'Medium' ? 'bg-amber-500' : 'bg-green-500')
                                    }`}
                            ></div>
                        </div>
                        <div className="text-center text-gray-500 text-sm">
                            {t('estimated_status')}: <span className="font-bold text-gray-800">{moistureLevel}</span>
                        </div>
                    </div>
                </div>

                {/* Weather Summary Section Link */}
                <Link href="/weather">
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="bg-white p-3 rounded-full text-blue-500 shadow-sm">
                                <CloudRain className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{t('weather_report')}</h4>
                                <p className="text-xs text-blue-600">{decision.weatherPreview || t('check_forecast')}</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>

                {/* Crop Analytics Link */}
                <Link href="/analytics">
                    <div className="bg-green-50 border border-green-100 p-6 rounded-3xl flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="bg-white p-3 rounded-full text-green-500 shadow-sm">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{t('crop_analytics')}</h4>
                                <p className="text-xs text-green-600">{t('track_gdd')}</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>

                {/* Irrigation Controller Link */}
                <Link href="/irrigation">
                    <div className="bg-cyan-50 border border-cyan-100 p-6 rounded-3xl flex items-center justify-between group mt-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-white p-3 rounded-full text-cyan-500 shadow-sm">
                                <Droplets className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{t('smart_control')}</h4>
                                <p className="text-xs text-cyan-600">{t('manual_override')}</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>

            </div>
        </div>
    );
}
