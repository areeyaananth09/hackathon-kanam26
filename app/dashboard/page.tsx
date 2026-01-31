'use client';

import Link from 'next/link';
import { CloudRain, Droplets, Thermometer, User, Calendar, Settings, Volume2, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { getFarmDetails } from '@/backend/actions/getFarmDetails';
import { useLanguage } from '../context/LanguageContext';

export default function DashboardPage() {
    const { t, speak } = useLanguage();
    const [mounted, setMounted] = useState(false);
    // Initialize state from local storage if available to avoid loading spinners
    const [data, setData] = useState<any>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('dashboard_data');
            return saved ? JSON.parse(saved) : null;
        }
        return null;
    });
    const [isOnline, setIsOnline] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        // Set mounted to true after hydration
        setMounted(true);

        // Handle online/offline status
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        if (typeof window !== 'undefined') {
            setIsOnline(navigator.onLine);
            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);
        }

        async function loadData() {
            setIsSyncing(true);
            try {
                const session = await authClient.getSession();
                if (!session.data?.user) {
                    // If offline and no session, we might be stuck, but if we have cached data we can show it
                    return;
                }

                const userData = session.data.user;

                // Fetch real farm details
                const farmDetails = await getFarmDetails(userData.id);

                const cropType = farmDetails?.cropType || 'wheat';
                const location = farmDetails?.farmLocation || 'Punjab,IN';
                const lastIrrigated = farmDetails?.lastIrrigated ? new Date(farmDetails.lastIrrigated).toISOString() : new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

                // Call decision API
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
                    // Cache the successful result
                    localStorage.setItem('dashboard_data', JSON.stringify(result));
                }
            } catch (err) {
                console.error("Using cached data due to error:", err);
            } finally {
                setIsSyncing(false);
            }
        }

        // Always try to load fresh data on mount
        loadData();

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
            }
        };
    }, []);

    // Default empty state if no cache and no data (first load ever)
    const decision = data?.decision || {
        action: 'Loading...',
        reason: 'Analyzing satellite data...',
        actionType: 'skip'
    };

    const isIrrigate = decision.action === 'Irrigate';
    const moistureLevel = decision.soilMoistureLevel || 'Medium';

    // Prevent hydration mismatch by not rendering dynamic content until mounted
    if (!mounted) {
        return (
            <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🚜</div>
                    <p className="text-xl font-bold">{t('loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24">
            {/* Top Bar - High Contrast */}
            <div className="bg-[var(--card-bg)] border-b-2 border-[var(--card-border)] p-4 sticky top-0 z-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-2xl border-2 border-black">
                        🚜
                    </div>
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-wide">{t('my_farm')}</h1>
                        <div className="flex items-center gap-2 text-sm font-bold opacity-80">
                            {isOnline ? <Wifi className="w-4 h-4 text-green-700" /> : <WifiOff className="w-4 h-4 text-red-600" />}
                            <span>{isOnline ? 'Online' : 'Offline Mode'}</span>
                            {isSyncing && <RefreshCw className="w-4 h-4 animate-spin" />}
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => speak(t('my_farm'))} className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                        <Volume2 className="w-6 h-6" />
                    </button>
                    <Link href="/profile" className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)]">
                        <User className="w-6 h-6" />
                    </Link>
                </div>
            </div>

            <main className="p-4 space-y-8 max-w-md mx-auto">

                {/* Main Action Card - HUGE Tap Area */}
                <section aria-label="Daily Decision">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-black">{t('daily_recommendation')}</h2>
                        <button onClick={() => speak(decision.reason)} className="p-2 border-2 border-black rounded-full hover:bg-gray-100">
                            <Volume2 className="w-5 h-5" />
                        </button>
                    </div>

                    <Link href="/schedule" className="block active:scale-95 transition-transform">
                        <div className={`
                            relative overflow-hidden rounded-[2rem] border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                            ${isIrrigate ? 'bg-[#C1E1C1]' : 'bg-[#FFD1D1]'}
                        `}>
                            <div className="text-8xl mb-4">
                                {isIrrigate ? '💧' : '🛑'}
                            </div>
                            <h3 className="text-4xl font-black mb-2 uppercase leading-tight">
                                {isIrrigate ? t('irrigate_field') : t('skip_irrigation')}
                            </h3>
                            <p className="text-xl font-bold mb-6 leading-snug">
                                {decision.reason}
                            </p>

                            <div className="inline-flex items-center justify-center w-full py-4 bg-white border-2 border-black rounded-xl text-xl font-bold uppercase tracking-wider">
                                {isIrrigate
                                    ? `${t('duration_label')}: ${decision.durationMinutes} ${t('mins')}`
                                    : t('save_water_today')
                                }
                            </div>
                        </div>
                    </Link>
                </section>

                {/* Soil Moisture - High Visibility */}
                <section>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-black">{t('soil_moisture')}</h2>
                        <button onClick={() => speak(t('soil_moisture') + ' ' + moistureLevel)} className="p-2 border-2 border-black rounded-full hover:bg-gray-100">
                            <Volume2 className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-lg font-bold opacity-60 uppercase">{t('estimated_status')}</span>
                            <span className={`text-3xl font-black ${moistureLevel === 'Low' ? 'text-red-600' :
                                moistureLevel === 'Medium' ? 'text-amber-600' : 'text-green-700'
                                }`}>
                                {moistureLevel}
                            </span>
                        </div>
                        <div className="h-24 w-24 rounded-full border-4 border-black flex items-center justify-center bg-gray-50 text-4xl">
                            {moistureLevel === 'Low' ? '🏜️' : (moistureLevel === 'Medium' ? '🌱' : '💧')}
                        </div>
                    </div>
                </section>

                {/* Weather Quick View */}
                <section className="grid grid-cols-2 gap-4">
                    <Link href="/weather" className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
                        <div className="flex flex-col items-center text-center">
                            <CloudRain className="w-10 h-10 mb-2" />
                            <span className="font-bold text-lg">{t('weather_report')}</span>
                            <span className="text-sm font-medium mt-1 uppercase text-blue-700">{decision.weatherPreview || t('check_forecast')}</span>
                        </div>
                    </Link>

                    <Link href="/irrigation" className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
                        <div className="flex flex-col items-center text-center">
                            <Settings className="w-10 h-10 mb-2" />
                            <span className="font-bold text-lg">{t('smart_control')}</span>
                            <span className="text-sm font-medium mt-1 uppercase text-green-700">{t('manual_override')}</span>
                        </div>
                    </Link>
                </section>

            </main>
        </div>
    );
}
