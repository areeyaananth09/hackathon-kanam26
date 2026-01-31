'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Timer, AlertCircle, Waves, Play, Square, Loader2, Minus, Plus, Lock, Volume2 } from 'lucide-react';

import { authClient } from '@/lib/auth-client';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

export default function IrrigationControllerPage() {
    const { speak, t } = useLanguage();
    const searchParams = useSearchParams();
    // Defaulting to 5 minutes if not present to avoid NaNs
    const durationParam = searchParams.get('duration');
    const isAutoMode = searchParams.get('auto') === 'true';

    // User Customizable State (Locked if Auto)
    const [durationMins, setDurationMins] = useState(5);

    useEffect(() => {
        if (durationParam) {
            setDurationMins(parseInt(durationParam));
        }
    }, [durationParam]);

    const targetWater = (durationMins * 5); // 5L/min default

    const [isIrrigating, setIsIrrigating] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [waterUsed, setWaterUsed] = useState(0); // Liters
    const [logId, setLogId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const FLOW_RATE_LPM = 5; // 5 Liters per minute
    const FLOW_RATE_LPS = FLOW_RATE_LPM / 60;

    useEffect(() => {
        // Fetch session
        async function getSession() {
            const session = await authClient.getSession();
            if (session.data?.user) {
                setUserId(session.data.user.id);
            }
        }
        getSession();
    }, []);

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const secs = (totalSeconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const handleStop = async () => {
        if (!logId) return;
        setIsLoading(true);
        try {
            await fetch('/api/irrigation/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'stop',
                    logId: logId
                })
            });
            setIsIrrigating(false);
            setLogId(null);
            speak(t('irrigation_finished'));
            alert(`${t('cycle_completed')} (${durationMins} ${t('mins')})`);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStart = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/irrigation/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'start',
                    userId: userId || 'demo_user',
                    cropName: searchParams.get('crop') || 'Wheat'
                })
            });
            const data = await res.json();
            if (data.success) {
                setLogId(data.logId);
                setSeconds(0);
                setWaterUsed(0);
                setIsIrrigating(true);
                speak(`${t('starting_irrigation')} ${durationMins} ${t('minutes')}`);
            } else {
                alert(t('failed_to_start') + ': ' + data.error);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const MAX_DURATION_SECONDS = durationMins * 60;

    useEffect(() => {
        let interval: any;
        if (isIrrigating) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);
                setWaterUsed(prev => prev + FLOW_RATE_LPS);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isIrrigating]);

    // Auto Stop Effect
    useEffect(() => {
        if (isIrrigating && seconds >= MAX_DURATION_SECONDS) {
            handleStop();
        }
    }, [seconds, isIrrigating]);

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24">
            {/* Header - High Contrast */}
            <div className="bg-[var(--card-bg)] border-b-2 border-[var(--card-border)] p-4 sticky top-0 z-20 flex items-center gap-4">
                <Link href="/dashboard" className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-xl font-black uppercase tracking-wide">{t('irrigation_control')}</h1>
                </div>
            </div>

            <main className="max-w-md mx-auto p-4 space-y-6">

                {/* Main Timer Display */}
                <div className={`
                    rounded-3xl border-4 border-black p-8 text-center flex flex-col items-center justify-center min-h-[300px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                    ${isIrrigating ? 'bg-[#C1E1C1]' : 'bg-white'}
                `}>
                    <div className="uppercase font-black text-xl mb-4 tracking-widest">
                        {isIrrigating ? t('running_now') : t('ready_to_start')}
                    </div>

                    <div className="text-7xl font-mono font-black mb-4">
                        {formatTime(isIrrigating ? seconds : MAX_DURATION_SECONDS)}
                    </div>

                    <div className="text-xl font-bold opacity-70 mb-8">
                        {isIrrigating ? t('target') + ': ' + formatTime(MAX_DURATION_SECONDS) : t('duration_set')}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-black/10 h-6 rounded-full overflow-hidden border-2 border-black">
                        <div
                            className="bg-blue-600 h-full transition-all duration-1000"
                            style={{ width: `${Math.min(100, (seconds / MAX_DURATION_SECONDS) * 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Duration Controls (Only if not running) */}
                {!isIrrigating && (
                    <div className="bg-white border-4 border-black rounded-xl p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <button
                            onClick={() => setDurationMins(p => Math.max(1, p - 1))}
                            disabled={isAutoMode}
                            className={`p-4 bg-[var(--secondary)] rounded-xl border-2 border-black ${isAutoMode ? 'opacity-30' : 'active:scale-95'}`}
                        >
                            <Minus className="w-8 h-8" />
                        </button>

                        <div className="text-center">
                            <span className="block text-xs font-bold uppercase mb-1">{isAutoMode ? t('ai_locked') : t('set_duration')}</span>
                            <span className="text-3xl font-black">{durationMins} {t('min')}</span>
                        </div>

                        <button
                            onClick={() => setDurationMins(p => p + 1)}
                            disabled={isAutoMode}
                            className={`p-4 bg-[var(--secondary)] rounded-xl border-2 border-black ${isAutoMode ? 'opacity-30' : 'active:scale-95'}`}
                        >
                            <Plus className="w-8 h-8" />
                        </button>
                    </div>
                )}


                {/* BIG Start/Stop Buttons */}
                <div className="pt-4">
                    {!isIrrigating ? (
                        <button
                            onClick={handleStart}
                            disabled={isLoading}
                            className="w-full py-8 bg-green-600 text-white rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-4"
                        >
                            {isLoading ? <Loader2 className="w-10 h-10 animate-spin" /> : <Play className="w-10 h-10 fill-current" />}
                            <span className="text-3xl font-black uppercase">{t('start_irrigation')}</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleStop}
                            disabled={isLoading}
                            className="w-full py-8 bg-red-600 text-white rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-4"
                        >
                            <Square className="w-10 h-10 fill-current" />
                            <span className="text-3xl font-black uppercase">{t('stop_immediately')}</span>
                        </button>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border-4 border-black rounded-xl p-4 text-center">
                        <div className="text-xs font-bold uppercase mb-1">{t('flow_rate')}</div>
                        <div className="text-2xl font-black text-blue-800">{isIrrigating ? FLOW_RATE_LPM : '0'} L/m</div>
                    </div>
                    <div className="bg-cyan-50 border-4 border-black rounded-xl p-4 text-center">
                        <div className="text-xs font-bold uppercase mb-1">{t('water_used')}</div>
                        <div className="text-2xl font-black text-cyan-800">{waterUsed.toFixed(1)} L</div>
                    </div>
                </div>

            </main>
        </div>
    );
}
