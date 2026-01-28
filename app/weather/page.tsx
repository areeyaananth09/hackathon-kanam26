'use client';

import Link from 'next/link';
import { ArrowLeft, CloudRain, Sun, Cloud, CloudSun, Droplets, Wind, MapPin } from 'lucide-react';

export default function WeatherPage() {
    // Mock forecast data
    const forecast = [
        { day: 'Today', date: '28 Jan', tempHigh: 32, tempLow: 24, rain: '10%', icon: <Sun className="w-8 h-8 text-orange-500" />, status: 'Sunny' },
        { day: 'Tomorrow', date: '29 Jan', tempHigh: 31, tempLow: 23, rain: '30%', icon: <CloudSun className="w-8 h-8 text-yellow-500" />, status: 'Partly Cloudy' },
        { day: 'Friday', date: '30 Jan', tempHigh: 28, tempLow: 22, rain: '80%', icon: <CloudRain className="w-8 h-8 text-blue-500" />, status: 'Heavy Rain' },
        { day: 'Saturday', date: '31 Jan', tempHigh: 29, tempLow: 23, rain: '45%', icon: <Cloud className="w-8 h-8 text-gray-400" />, status: 'Cloudy' },
        { day: 'Sunday', date: '01 Feb', tempHigh: 30, tempLow: 24, rain: '20%', icon: <CloudSun className="w-8 h-8 text-yellow-500" />, status: 'Mostly Sunny' },
    ];

    return (
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed bottom-0 left-0 w-full h-1/3 bg-[#E0F2FE] -z-10 rounded-t-[50%]" />
            <div className="fixed bottom-0 right-0 w-2/3 h-1/4 bg-[#D1FAE5] -z-10 rounded-t-[60%]" />

            <div className="w-full max-w-lg">
                {/* Navigation */}
                <div className="mb-6 flex items-center justify-between">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-1 text-gray-500 text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                        <MapPin className="w-3 h-3 text-red-500" />
                        Punjab, India
                    </div>
                </div>

                <div className="space-y-6">

                    {/* Current Weather Hero Card */}
                    <div className="bg-gradient-to-br from-[#0EA5E9] to-[#3B82F6] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-5xl font-bold mb-1">28°</h1>
                                    <p className="text-blue-100 text-lg">Sunny</p>
                                    <p className="text-blue-200 text-sm mt-4">H:32° L:24°</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Sun className="w-20 h-20 text-yellow-300 animate-pulse-slow" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
                                <div className="flex flex-col items-center">
                                    <Wind className="w-5 h-5 text-blue-200 mb-1" />
                                    <span className="font-bold">12 km/h</span>
                                    <span className="text-xs text-blue-200">Wind</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Droplets className="w-5 h-5 text-blue-200 mb-1" />
                                    <span className="font-bold">65%</span>
                                    <span className="text-xs text-blue-200">Humidity</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <CloudRain className="w-5 h-5 text-blue-200 mb-1" />
                                    <span className="font-bold">10%</span>
                                    <span className="text-xs text-blue-200">Precip</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Forecast List */}
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-6">
                        <h2 className="text-gray-800 font-bold mb-6 flex items-center gap-2">
                            <CloudSun className="w-5 h-5 text-orange-500" />
                            5-Day Forecast
                        </h2>

                        <div className="space-y-6">
                            {forecast.map((day, index) => (
                                <div key={index} className="flex items-center justify-between group">
                                    <div className="w-24">
                                        <p className="font-bold text-gray-800">{day.day}</p>
                                        <p className="text-xs text-gray-400">{day.date}</p>
                                    </div>

                                    <div className="flex items-center gap-3 flex-1 justify-center">
                                        {day.icon}
                                        <span className="text-xs text-gray-500 font-medium w-16 text-center">{day.status}</span>
                                    </div>

                                    <div className="flex items-center gap-4 w-28 justify-end">
                                        <div className="text-right">
                                            <span className="font-bold text-gray-800">{day.tempHigh}°</span>
                                            <span className="text-gray-400 mx-1">/</span>
                                            <span className="text-gray-500">{day.tempLow}°</span>
                                        </div>
                                        <div className="flex items-center text-xs font-semibold text-blue-500 w-10 justify-end">
                                            <Droplets className="w-3 h-3 mr-0.5" />
                                            {day.rain}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Irrigation Insight */}
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3 items-start">
                        <div className="bg-orange-100 p-2 rounded-full mt-0.5">
                            <Sun className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Planning Tip</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mt-1">
                                Heavy rain expected on Friday (80%). Consider delaying irrigation until Saturday to save water.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
