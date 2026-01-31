'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Sun, Droplets, ArrowLeft, CheckCircle2, AlertCircle, XCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getWeather } from '@/backend/actions/getWeather';
import { getFarmDetails } from '@/backend/actions/getFarmDetails';
import { authClient } from '@/lib/auth-client';
import { useLanguage } from '../context/LanguageContext';

export default function ScheduleDetailsPage() {
    const router = useRouter();
    const { t } = useLanguage();

    const [schedule, setSchedule] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function generateDailySchedule() {
            try {
                // 1. Get Current Date
                const now = new Date();
                const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
                const dateStr = now.toLocaleDateString('en-GB', dateOptions);

                // 2. Get Environment (Location & Weather)
                const session = await authClient.getSession();
                let location = "Punjab,IN";
                if (session.data?.user?.id) {
                    const farm = await getFarmDetails(session.data.user.id);
                    if (farm?.farmLocation) location = farm.farmLocation;
                }

                const weather = await getWeather(location);
                const temp = weather?.current?.main?.temp || 30; // Default 30 if fail
                const isHot = temp > 30;

                // 3. Generate AI Schedule Logic
                let period = 'Morning';
                let timeRange = '06:00 AM - 07:00 AM';
                let reason = `Temperature is moderate (${Math.round(temp)}°C). Standard irrigation cycle recommended.`;
                let duration = 45;
                let waterAmount = '800'; // Liters

                if (isHot) {
                    period = 'Early Morning';
                    timeRange = '05:00 AM - 06:00 AM';
                    reason = `High temperature (${Math.round(temp)}°C) expected. Irrigating early prevents evaporation loss.`;
                    duration = 60;
                    waterAmount = '1200';
                } else if (temp < 20) {
                    period = 'Afternoon';
                    timeRange = '12:00 PM - 01:00 PM';
                    reason = `Low temperature (${Math.round(temp)}°C). Mid-day irrigation ensures absorption before night freeze risk.`;
                    duration = 30;
                    waterAmount = '500';
                }

                setSchedule({
                    date: dateStr,
                    period,
                    timeRange,
                    duration,
                    reason,
                    waterAmount
                });

            } catch (e) {
                console.error("Schedule Gen Error", e);
                // Fallback
                setSchedule({
                    date: 'Today',
                    period: 'Morning',
                    timeRange: '06:00 AM - 07:00 AM',
                    duration: 45,
                    reason: 'Standard daily irrigation schedule.',
                    waterAmount: '1000'
                });
            } finally {
                setIsLoading(false);
            }
        }

        generateDailySchedule();
    }, []);

    const handleAccept = () => {
        if (!schedule) return;
        // Pass params to Irrigation Controller
        router.push(`/irrigation?duration=${schedule.duration}&water=${schedule.waterAmount}&auto=true`);
    };

    const handleSkip = () => {
        router.push('/dashboard');
    };

    if (isLoading || !schedule) {
        return (
            <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed bottom-0 left-0 w-full h-1/3 bg-[#E0F2FE] -z-10 rounded-t-[50%]" />
            <div className="fixed bottom-0 right-0 w-2/3 h-1/4 bg-[#D1FAE5] -z-10 rounded-t-[60%]" />

            <div className="w-full max-w-md">
                {/* Navigation */}
                <div className="mb-6">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        {t('back_dashboard')}
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
                    {/* Header */}
                    <div className="bg-green-600 p-6 text-white text-center">
                        <h1 className="text-xl font-bold">{t('daily_planned_schedule')}</h1>
                        <p className="opacity-90 text-sm mt-1">{schedule.date}</p>
                    </div>

                    <div className="p-8">
                        {/* Time & Duration Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {/* Time Card */}
                            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 flex flex-col items-center justify-center text-center">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                                    <Sun className="w-5 h-5 text-orange-500" />
                                </div>
                                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">{t('time')}</span>
                                <span className="text-gray-900 font-bold text-lg">{schedule.period}</span>
                                <span className="text-gray-500 text-xs">{schedule.timeRange}</span>
                            </div>

                            {/* Duration Card */}
                            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex flex-col items-center justify-center text-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                </div>
                                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">{t('duration')}</span>
                                <span className="text-gray-900 font-bold text-lg">{schedule.duration} Min</span>
                                <span className="text-gray-500 text-xs">{t('continuous_flow')}</span>
                            </div>
                        </div>

                        {/* Info List */}
                        <div className="space-y-4 mb-8">
                            <div className="flex bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <div className="mr-4 mt-1">
                                    <AlertCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-1">{t('why_this_schedule')}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {schedule.reason}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">{t('estimated_water')}:</span>
                                <span className="font-bold text-gray-900 flex items-center gap-1">
                                    <Droplets className="w-4 h-4 text-blue-500" />
                                    {schedule.waterAmount} {t('liters')}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={handleAccept}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 className="w-6 h-6" />
                                {t('accept_schedule')}
                            </button>

                            <button
                                onClick={handleSkip}
                                className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <XCircle className="w-6 h-6 text-gray-400" />
                                {t('skip_override')}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-2">
                                {t('override_warning')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
