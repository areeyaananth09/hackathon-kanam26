'use client';

import Link from 'next/link';
import { Clock, Sun, Droplets, ArrowLeft, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export default function ScheduleDetailsPage() {
    // Mock data for the recommendation
    const schedule = {
        date: 'Wednesday, 28 Jan',
        period: 'Morning', // Morning | Evening
        timeRange: '06:00 AM - 08:00 AM',
        duration: 45, // minutes
        reason: 'High temperature (32°C) expected in the afternoon. Early irrigation prevents evaporation loss.',
        waterAmount: '1200 Liters'
    };

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
                        Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
                    {/* Header */}
                    <div className="bg-green-600 p-6 text-white text-center">
                        <h1 className="text-xl font-bold">Planned Schedule</h1>
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
                                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Time</span>
                                <span className="text-gray-900 font-bold text-lg">{schedule.period}</span>
                                <span className="text-gray-500 text-xs">{schedule.timeRange}</span>
                            </div>

                            {/* Duration Card */}
                            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex flex-col items-center justify-center text-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                </div>
                                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Duration</span>
                                <span className="text-gray-900 font-bold text-lg">{schedule.duration} Min</span>
                                <span className="text-gray-500 text-xs">Continuous Flow</span>
                            </div>
                        </div>

                        {/* Info List */}
                        <div className="space-y-4 mb-8">
                            <div className="flex bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <div className="mr-4 mt-1">
                                    <AlertCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-1">Why this schedule?</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {schedule.reason}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <span className="text-gray-600 text-sm">Estimated Water:</span>
                                <span className="font-bold text-gray-900 flex items-center gap-1">
                                    <Droplets className="w-4 h-4 text-blue-500" />
                                    {schedule.waterAmount}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                                <CheckCircle2 className="w-6 h-6" />
                                Accept Schedule
                            </button>

                            <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                                <XCircle className="w-6 h-6 text-gray-400" />
                                Skip / Override
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-2">
                                Overriding may affect your yield optimization.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
