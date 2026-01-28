'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, MapPin, Sprout, ChevronDown, Check, X, ArrowLeft } from 'lucide-react';

export default function EditProfilePage() {
    // Mock initial state - in a real app, this would be pre-filled
    const [formData, setFormData] = useState({
        name: 'John Farmer',
        email: 'john.farmer@example.com',
        location: 'Punjab, India',
        crop: 'wheat'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed bottom-0 left-0 w-full h-1/3 bg-[#E0F2FE] -z-10 rounded-t-[50%]" />
            <div className="fixed bottom-0 right-0 w-2/3 h-1/4 bg-[#D1FAE5] -z-10 rounded-t-[60%]" />

            <div className="w-full max-w-md">
                {/* Navigation */}
                <div className="mb-6">
                    <Link href="/profile" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Cancel Edit
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-green-50 p-6 border-b border-green-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
                            <p className="text-gray-500 text-sm">Update your personal details</p>
                        </div>
                    </div>

                    <div className="p-8">
                        <form className="space-y-5">

                            {/* Name Input */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1" htmlFor="name">Full Name</label>
                                <div className="relative">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 outline-none transition-all text-gray-800 font-medium"
                                    />
                                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1" htmlFor="email">Email Address</label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 outline-none transition-all text-gray-800 font-medium"
                                    />
                                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                                </div>
                            </div>

                            {/* Location Input */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1" htmlFor="location">Farm Location</label>
                                <div className="relative">
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 outline-none transition-all text-gray-800 font-medium"
                                    />
                                    <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                                </div>
                            </div>

                            {/* Crop Type Selector */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Crop Type</label>
                                <div className="relative group">
                                    <select
                                        name="crop"
                                        className="w-full appearance-none pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800 font-medium cursor-pointer"
                                        value={formData.crop}
                                        onChange={handleChange}
                                    >
                                        <option value="rice">Rice (Paddy)</option>
                                        <option value="wheat">Wheat</option>
                                        <option value="corn">Corn (Maize)</option>
                                        <option value="vegetables">Vegetables</option>
                                        <option value="sugarcane">Sugarcane</option>
                                        <option value="cotton">Cotton</option>
                                    </select>
                                    <Sprout className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                                    <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-3.5 pointer-events-none group-hover:text-green-600 transition-colors" />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <Link
                                    href="/profile"
                                    className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <X className="w-5 h-5" />
                                    Cancel
                                </Link>
                                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                                    <Check className="w-5 h-5" />
                                    Save Changes
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
