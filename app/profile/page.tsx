'use client';

import { User, Mail, MapPin, Sprout, Edit2, ArrowLeft, Loader2, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { getFarmDetails } from '@/backend/actions/getFarmDetails';
import { useLanguage } from '../context/LanguageContext';

export default function ProfilePage() {
    const { t, speak } = useLanguage();
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
            <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-green-700 animate-spin" />
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
        location: farm?.farmLocation || t('not_set'),
        crop: farm?.cropType || t('not_selected')
    };

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24">
            {/* Header - High Contrast */}
            <div className="bg-[var(--card-bg)] border-b-2 border-[var(--card-border)] p-4 sticky top-0 z-20 flex items-center gap-4">
                <Link href="/dashboard" className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-xl font-black uppercase tracking-wide">{t('profile_title')}</h1>
                </div>
                <button onClick={() => speak(t('profile_title'))} className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                    <Volume2 className="w-6 h-6" />
                </button>
            </div>

            <main className="p-4 space-y-6 max-w-md mx-auto mt-4">

                {/* Profile Card - Big & Bold */}
                <div className="bg-white border-4 border-black rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-24 bg-green-600 border-b-4 border-black"></div>

                    <div className="relative z-10">
                        <div className="w-32 h-32 bg-white rounded-full mx-auto border-4 border-black p-1 flex items-center justify-center overflow-hidden mb-4">
                            {displayUser.image ? (
                                <img src={displayUser.image} alt={displayUser.name} className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <User className="w-16 h-16 text-gray-400" />
                            )}
                        </div>

                        <h2 className="text-2xl font-black uppercase break-words">{displayUser.name}</h2>
                        <p className="font-bold text-gray-500 uppercase text-sm mt-1">{t('member_since')} 2024</p>
                    </div>
                </div>

                {/* Details List - Big Touch Targets */}
                <div className="space-y-4">
                    {/* Email */}
                    <div className="bg-white border-4 border-black rounded-xl p-4 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="bg-blue-100 p-3 rounded-lg border-2 border-black">
                            <Mail className="w-6 h-6 text-blue-700" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-black uppercase text-gray-500">{t('email')}</p>
                            <p className="text-lg font-bold truncate">{displayUser.email}</p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-white border-4 border-black rounded-xl p-4 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="bg-red-100 p-3 rounded-lg border-2 border-black">
                            <MapPin className="w-6 h-6 text-red-700" />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase text-gray-500">{t('farm_location')}</p>
                            <p className="text-lg font-bold capitalize">{displayFarm.location}</p>
                        </div>
                    </div>

                    {/* Crop */}
                    <div className="bg-white border-4 border-black rounded-xl p-4 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="bg-amber-100 p-3 rounded-lg border-2 border-black">
                            <Sprout className="w-6 h-6 text-amber-700" />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase text-gray-500">{t('primary_crop')}</p>
                            <p className="text-lg font-bold capitalize">{displayFarm.crop}</p>
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <Link href="/onboarding" className="block w-full py-4 bg-green-600 text-white font-black text-xl uppercase text-center rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-transform flex items-center justify-center gap-2">
                    <Edit2 className="w-6 h-6" />
                    {t('edit_farm_details')}
                </Link>

            </main>
        </div>
    );
}
