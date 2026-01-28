'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, CloudRain, Sun, Droplets, CheckCircle2 } from 'lucide-react';

export default function NotificationsPage() {
    const [preferences, setPreferences] = useState({
        dailyReminders: true,
        rainAlerts: true,
        heatWarnings: false,
        insights: true
    });

    const toggle = (key: keyof typeof preferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed bottom-0 left-0 w-full h-1/3 bg-[#E0F2FE] -z-10 rounded-t-[50%]" />
            <div className="fixed bottom-0 right-0 w-2/3 h-1/4 bg-[#D1FAE5] -z-10 rounded-t-[60%]" />

            <div className="w-full max-w-md">
                {/* Navigation */}
                <div className="mb-6">
                    <Link href="/settings" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Settings
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-green-50 p-6 border-b border-green-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                            <p className="text-gray-500 text-sm">Control your alerts</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">

                        {/* Daily Reminders */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-100 p-2 rounded-xl text-green-600">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm">Daily Reminders</h3>
                                    <p className="text-xs text-gray-500 mt-1">Schedule alerts (AM/PM)</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggle('dailyReminders')}
                                className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${preferences.dailyReminders ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${preferences.dailyReminders ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        {/* Rain Alerts */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                                    <CloudRain className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm">Rainfall Alerts</h3>
                                    <p className="text-xs text-gray-500 mt-1">Forecast warnings</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggle('rainAlerts')}
                                className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${preferences.rainAlerts ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${preferences.rainAlerts ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        {/* Heatwave Alerts */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                                    <Sun className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm">Heatwave Alerts</h3>
                                    <p className="text-xs text-gray-500 mt-1">High temp warnings</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggle('heatWarnings')}
                                className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${preferences.heatWarnings ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${preferences.heatWarnings ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        {/* Insights */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-100 p-2 rounded-xl text-purple-600">
                                    <Droplets className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm">Saving Insights</h3>
                                    <p className="text-xs text-gray-500 mt-1">Weekly reports</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggle('insights')}
                                className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${preferences.insights ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${preferences.insights ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4">
                            <Link href="/settings" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                                <CheckCircle2 className="w-5 h-5" />
                                Save Preferences
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
