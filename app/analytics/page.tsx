'use client';

import Link from 'next/link';
import { ArrowLeft, Droplets, TrendingDown, Info, Sprout } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-[#F0F9FF] p-4 flex items-center justify-center">
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

                <div className="space-y-6">
                    {/* Header / Hero Section */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Water Analytics</h1>
                        <p className="text-gray-500 text-sm">Review your farm's efficiency</p>
                    </div>

                    {/* Total Saved Card */}
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                                <Droplets className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-blue-100 text-sm font-medium uppercase tracking-wider">Total Water Saved</span>
                            <h2 className="text-4xl font-extrabold mt-1 mb-2">1,240 L</h2>
                            <div className="inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                                <TrendingDown className="w-3 h-3" />
                                <span>30% less than average</span>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Chart Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-800">Usage Comparison</h3>
                            <div className="group relative">
                                <Info className="w-5 h-5 text-gray-400 cursor-help" />
                                <div className="absolute right-0 top-6 w-48 bg-gray-800 text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    Comparison based on regional standard practices vs your actual usage.
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-center gap-6 mb-8 text-xs font-medium">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                                <span className="text-gray-500">Traditional</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <span className="text-gray-700">Smart Irrigation</span>
                            </div>
                        </div>

                        {/* Bar Chart (CSS) */}
                        <div className="space-y-6">
                            {/* Item 1 */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-gray-600">This Week</span>
                                    <span className="text-emerald-600 font-bold">-350 L Saved</span>
                                </div>
                                <div className="h-4 bg-gray-100 rounded-full overflow-hidden relative">
                                    {/* Background (Traditional) - Full width represents baseline */}
                                    <div className="absolute top-0 left-0 h-full bg-gray-300 w-full rounded-full"></div>
                                    {/* Foreground (Smart) */}
                                    <div className="absolute top-0 left-0 h-full bg-emerald-500 w-[70%] rounded-full shadow-sm"></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>Smart Usage: 70%</span>
                                    <span>Baseline: 100%</span>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="space-y-2 pt-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-gray-600">Last Week</span>
                                    <span className="text-emerald-600 font-bold">-280 L Saved</span>
                                </div>
                                <div className="h-4 bg-gray-100 rounded-full overflow-hidden relative">
                                    <div className="absolute top-0 left-0 h-full bg-gray-300 w-[90%] rounded-full"></div>
                                    <div className="absolute top-0 left-0 h-full bg-emerald-500 w-[65%] rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Encouragement Card */}
                    <div className="bg-green-50 rounded-2xl p-5 border border-green-100 flex gap-4 items-start">
                        <div className="bg-green-100 p-2 rounded-full shrink-0">
                            <Sprout className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-sm">Great job, Farmer!</h4>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                By using smart schedules, you've saved enough water to irrigate an extra acre of land this month.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
