'use client';

import Link from 'next/link';
import { CloudRain, Droplets, Thermometer, Wind, User, Sprout, Calendar, ArrowRight, Settings } from 'lucide-react';

export default function DashboardPage() {
    // Mock data
    const weather = {
        temp: '28°C',
        humidity: '65%',
        rainChance: '10%'
    };

    const soilMoisture = {
        level: 35, // percentage
        status: 'Low', // Low, Medium, High
        color: 'text-amber-600',
        bgColor: 'bg-amber-100',
        barColor: 'bg-amber-500'
    };

    // Decision logic mock
    const decision = {
        action: 'Irrigate Field',
        subtext: 'Soil moisture is low and no rain is forecast.',
        type: 'irrigate' // irrigate | skip
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Top Header */}
            <div className="bg-white p-6 sticky top-0 z-10 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Sprout className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-800">My Farm</h1>
                        <Link href="/history" className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-600 transition-colors">
                            <Calendar className="w-3 h-3" />
                            <span>Today, 28 Jan</span>
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
                    <div className={`rounded-3xl p-8 shadow-xl text-white relative overflow-hidden transform transition-transform hover:scale-[1.02] cursor-pointer ${decision.type === 'irrigate' ? 'bg-[#0EA5E9]' : 'bg-green-600'}`}>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

                        <div className="relative z-10 text-center">
                            <div className="inline-block bg-white/20 backdrop-blur-md rounded-full px-4 py-1 text-sm font-medium mb-4">
                                Daily Recommendation
                            </div>
                            <h2 className="text-3xl font-extrabold mb-2">{decision.action}</h2>
                            <p className="text-white/90 text-lg mb-6">{decision.subtext}</p>

                            {decision.type === 'irrigate' && (
                                <div className="bg-white text-[#0EA5E9] font-bold py-3 px-6 rounded-xl inline-flex items-center gap-2 shadow-sm">
                                    <Droplets className="w-5 h-5" />
                                    Duration: 45 Mins
                                </div>
                            )}
                            {decision.type === 'skip' && (
                                <div className="bg-white text-green-600 font-bold py-3 px-6 rounded-xl inline-flex items-center gap-2 shadow-sm">
                                    <Sprout className="w-5 h-5" />
                                    Save Water Today
                                </div>
                            )}
                        </div>
                    </div>
                </Link>

                {/* Weather Summary Section */}
                <Link href="/weather">
                    <div className="group cursor-pointer">
                        <h3 className="text-gray-800 font-bold text-lg mb-3 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                            Weather Summary
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {/* Temp */}
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center group-hover:border-blue-200 transition-colors">
                                <Thermometer className="w-6 h-6 text-orange-500 mb-2" />
                                <span className="text-gray-800 font-bold text-lg">{weather.temp}</span>
                                <span className="text-xs text-gray-500">Temp</span>
                            </div>
                            {/* Humidity */}
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center group-hover:border-blue-200 transition-colors">
                                <Wind className="w-6 h-6 text-blue-500 mb-2" />
                                <span className="text-gray-800 font-bold text-lg">{weather.humidity}</span>
                                <span className="text-xs text-gray-500">Humidity</span>
                            </div>
                            {/* Rain */}
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center group-hover:border-blue-200 transition-colors">
                                <CloudRain className="w-6 h-6 text-gray-500 mb-2" />
                                <span className="text-gray-800 font-bold text-lg">{weather.rainChance}</span>
                                <span className="text-xs text-gray-500">Rain Prob.</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Soil Moisture Section */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-800 font-bold text-lg">Soil Moisture</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${soilMoisture.bgColor} ${soilMoisture.color}`}>
                            {soilMoisture.status}
                        </span>
                    </div>

                    <div className="relative pt-2 pb-6">
                        <div className="flex mb-2 items-center justify-between text-xs text-gray-500 font-medium">
                            <span>Dry</span>
                            <span>Wet</span>
                        </div>
                        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-100">
                            <div
                                style={{ width: `${soilMoisture.level}%` }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${soilMoisture.barColor} transition-all duration-500`}
                            ></div>
                        </div>
                        <div className="text-center text-gray-500 text-sm">
                            Current Level: <span className="font-bold text-gray-800">{soilMoisture.level}%</span>
                        </div>
                    </div>
                </div>

                {/* Tips Section (Optional extra value) */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-3xl border border-green-100 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-green-800 mb-1">Weekly Forecast</h4>
                        <p className="text-xs text-green-600 max-w-[200px]">Expect light rain on Friday. Plan irrigation accordingly.</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-600" />
                </div>

            </div>
        </div>
    );
}
