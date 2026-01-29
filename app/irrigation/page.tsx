'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Timer, CheckCircle, AlertCircle, Waves, Play, Square, Loader2, Minus, Plus, Lock } from 'lucide-react';


import { authClient } from '@/lib/auth-client';
import { useSearchParams } from 'next/navigation';

export default function IrrigationControllerPage() {
    const searchParams = useSearchParams();
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
            alert(`Cycle Completed (${durationMins} Mins)`);
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
            } else {
                alert('Failed to start: ' + data.error);
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
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 p-6 sticky top-0 z-10 flex items-center gap-4">
                <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Droplets className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Irrigation Controller</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <button onClick={() => setDurationMins(p => Math.max(1, p - 1))} className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors ${isAutoMode ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isIrrigating || isAutoMode}>
                                <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <div className="text-center relative">
                                <p className="text-sm font-bold text-gray-800">{durationMins} Min</p>
                                <p className="text-[10px] text-blue-500 font-medium">~{targetWater} L</p>
                                {isAutoMode && <Lock className="w-3 h-3 text-green-600 absolute -top-1 -right-4" />}
                            </div>
                            <button onClick={() => setDurationMins(p => p + 1)} className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors ${isAutoMode ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isIrrigating || isAutoMode}>
                                <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-md mx-auto p-6 space-y-8">

                {/* Visual Timer Circle */}
                <div className="relative flex items-center justify-center py-10">
                    {/* Outer Rings */}
                    <div className={`absolute w-64 h-64 rounded-full border-4 ${isIrrigating ? 'border-blue-100 animate-pulse' : 'border-gray-100'}`}></div>
                    <div className={`absolute w-56 h-56 rounded-full border-4 ${isIrrigating ? 'border-blue-200' : 'border-gray-200'}`}></div>

                    {/* Main Circle */}
                    <div className={`w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-xl z-10 transition-colors duration-500 ${isIrrigating ? 'bg-blue-500 text-white shadow-blue-200' : 'bg-white text-gray-800'}`}>
                        <div className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">
                            {isIrrigating ? 'Running' : 'Ready'}
                        </div>
                        <div className="text-5xl font-mono font-bold tracking-tight">
                            {formatTime(seconds)}
                        </div>
                        <div className="text-xs font-medium mt-2 opacity-80">
                            TARGET: {formatTime(MAX_DURATION_SECONDS)}
                        </div>
                    </div>

                    {/* Animated Particles if running */}
                    {isIrrigating && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-full h-full animate-spin-slow opacity-30">
                                {/* Pseudocode for droplets rotation could go here, simplified for now */}
                            </div>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => !isIrrigating && handleStart()}
                        disabled={isIrrigating || isLoading}
                        className={`py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isIrrigating ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-500 text-white shadow-lg shadow-green-200 hover:bg-green-600 transform hover:scale-105'}`}
                    >
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Play className="w-6 h-6 fill-current" />}
                        Start Cycle
                    </button>

                    <button
                        onClick={() => isIrrigating && handleStop()}
                        disabled={!isIrrigating || isLoading}
                        className={`py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${!isIrrigating ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-500 text-white shadow-lg shadow-red-200 hover:bg-red-600 transform hover:scale-105'}`}
                    >
                        <Square className="w-6 h-6 fill-current" />
                        Stop Early
                    </button>
                </div>

                {/* Field Status Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                                <Waves className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Field Status</h3>
                                <p className="text-xs text-gray-500">Zone 1 • North Patch</p>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${isIrrigating ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                            {isIrrigating ? 'Irrigation Active' : 'System Idle'}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-2xl">
                            <div className="text-blue-400 text-xs font-bold uppercase mb-1">Flow Rate</div>
                            <div className="text-2xl font-bold text-blue-700">
                                {isIrrigating ? FLOW_RATE_LPM : '0'} <span className="text-sm font-medium opacity-60">L/min</span>
                            </div>
                        </div>
                        <div className="bg-cyan-50 p-4 rounded-2xl">
                            <div className="text-cyan-600 text-xs font-bold uppercase mb-1">Water Used</div>
                            <div className="text-2xl font-bold text-cyan-800">
                                {waterUsed.toFixed(1)} <span className="text-sm font-medium opacity-60">L</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <p className="text-center text-xs text-gray-400 max-w-xs mx-auto">
                    Manual override enabled. Automated schedule will resume after manual cycle completes.
                </p>

            </div>
        </div>
    );
}
