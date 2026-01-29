'use client';

import { User, Mail, MapPin, Sprout, Edit2, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { getFarmDetails } from '@/app/actions/getFarmDetails';

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [farm, setFarm] = useState<any>(null);

    useEffect(() => {
        async function loadProfile() {
            try {
                const session = await authClient.getSession();
                if (session.data?.user) {
                    setUser(session.data.user);

                    // Fetch farm details
                    const details = await getFarmDetails(session.data.user.id);
                    setFarm(details);
                }
            } catch (e) {
                console.error("Failed to load profile", e);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
            </div>
        );
    }

    // Default fallbacks if no data found
    const displayUser = {
        name: user?.name || "Guest Farmer",
        email: user?.email || "No email",
        image: user?.image
    };

    const displayFarm = {
        location: farm?.farmLocation || "Not set",
        crop: farm?.cropType || "Not selected"
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

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative">
                    {/* Header Banner */}
                    <div className="h-32 bg-gradient-to-r from-green-500 to-green-600 relative">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    </div>

                    {/* Profile Avatar - Overlapping Header */}
                    <div className="px-8 relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                            <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                                <div className="w-full h-full bg-green-50 rounded-full flex items-center justify-center border border-green-100 overflow-hidden">
                                    {displayUser.image ? (
                                        <img src={displayUser.image} alt={displayUser.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-14 h-14 text-green-600" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="pt-20 pb-8 px-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-800">{displayUser.name}</h1>
                        <p className="text-gray-500 text-sm mt-1">SmartIrrigate Member</p>

                        <div className="mt-8 space-y-4 text-left">
                            {/* Email Item */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 dark:border-zinc-800">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</p>
                                    <p className="text-gray-800 font-medium truncate">{displayUser.email}</p>
                                </div>
                            </div>

                            {/* Location Item */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 dark:border-zinc-800">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Farm Location</p>
                                    <p className="text-gray-800 font-medium capitalize">{displayFarm.location}</p>
                                </div>
                            </div>

                            {/* Crop Item */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 dark:border-zinc-800">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <Sprout className="w-5 h-5 text-amber-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Primary Crop</p>
                                    <p className="text-gray-800 font-medium capitalize">{displayFarm.crop}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link href="/onboarding" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                                <Edit2 className="w-4 h-4" />
                                Edit Farm Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
