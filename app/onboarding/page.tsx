'use client';

import { useState } from 'react';
import { MapPin, Calendar, Sprout, ChevronDown, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
    const [cropType, setCropType] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');

    return (
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed bottom-0 left-0 w-full h-1/3 bg-[#E0F2FE] -z-10 rounded-t-[50%]" />
            <div className="fixed bottom-0 right-0 w-2/3 h-1/4 bg-[#D1FAE5] -z-10 rounded-t-[60%]" />

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden my-4">
                {/* Header Illustration */}
                <div className="h-60 relative overflow-hidden flex items-center justify-center">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: "url('/assets/header-bg.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>

                    {/* Gradient overlay for text readability if needed, or just the content */}
                    <div className="relative z-10 text-center text-white p-6 pb-16">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                            <Sprout className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold">Let's Set Up Your Farm</h1>
                        <p className="text-green-100 text-sm mt-1">We just need a few details to get started.</p>
                    </div>
                </div>

                <div className="p-8">
                    <form className="space-y-6">

                        {/* Crop Type Selector */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">What are you growing?</label>
                            <div className="relative group">
                                <select
                                    className="w-full appearance-none pl-12 pr-10 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800 cursor-pointer"
                                    value={cropType}
                                    onChange={(e) => setCropType(e.target.value)}
                                >
                                    <option value="" disabled>Select Crop Type</option>
                                    <option value="rice">Rice (Paddy)</option>
                                    <option value="wheat">Wheat</option>
                                    <option value="corn">Corn (Maize)</option>
                                    <option value="vegetables">Vegetables</option>
                                    <option value="sugarcane">Sugarcane</option>
                                    <option value="cotton">Cotton</option>
                                </select>
                                <Sprout className="w-5 h-5 text-green-600 absolute left-4 top-4.5" />
                                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-4.5 pointer-events-none group-hover:text-green-600 transition-colors" />
                            </div>
                        </div>

                        {/* Location Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Where is your farm located?</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    placeholder="Enter city or village"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <MapPin className="w-5 h-5 text-green-600 absolute left-4 top-4.5" />
                            </div>
                            <p className="text-xs text-gray-400 ml-1">We need this for accurate weather data.</p>
                        </div>

                        {/* Date Picker */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">When did you last irrigate?</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <Calendar className="w-5 h-5 text-green-600 absolute left-4 top-4.5" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <a
                                href="/dashboard"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
                            >
                                Generate Smart Schedule
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
