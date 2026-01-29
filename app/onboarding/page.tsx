'use client';

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Sprout, ChevronDown, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { useLanguage } from '../context/LanguageContext';

export default function OnboardingPage() {
    const { t } = useLanguage();
    const [cropType, setCropType] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [plantingDate, setPlantingDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function loadExistingDetails() {
            setCheckingStatus(true);
            try {
                // Check if user session exists and fetch farm details if possible
                // For MVP, we might don't have a direct 'get-farm' API yet easily accessible here without auth context wrapper
                // But we can check session first
                const session = await authClient.getSession();
                if (session.data?.user) {
                    // We could fetch existing details here if we had an endpoint
                    // Future improvement: GET /api/user/farm-details
                }
            } catch (err) {
                console.error(err);
            } finally {
                setCheckingStatus(false);
            }
        }
        loadExistingDetails();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cropType || !location) {
            alert("Please fill in all required fields");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/user/onboarding', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cropType,
                    location,

                    lastIrrigated: date || null,
                    plantingDate: plantingDate || null
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to save details");
            }

            // Success - go to dashboard
            router.push('/dashboard');
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (checkingStatus) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F0F9FF]">
                <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed bottom-0 left-0 w-full h-1/3 bg-[#E0F2FE] -z-10 rounded-t-[50%]" />
            <div className="fixed bottom-0 right-0 w-2/3 h-1/4 bg-[#D1FAE5] -z-10 rounded-t-[60%]" />

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden my-4">
                {/* Header Illustration */}
                <div className="h-64 relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-sky-400 to-sky-200">
                    {/* Sun */}
                    <div className="absolute top-8 right-12 w-16 h-16 bg-yellow-200 rounded-full blur-xl opacity-60" />

                    {/* Hills */}
                    <svg className="absolute bottom-0 left-0 w-full h-24 text-green-500 z-0" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#22C55E" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-full h-16 text-green-600 opacity-60 z-0" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#16A34A" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>

                    {/* Text Content */}
                    <div className="relative z-10 text-center text-white p-6 pb-12 mt-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-lg">
                            <Sprout className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold drop-shadow-md">{t('onboarding_title')}</h1>
                        <p className="text-green-50 text-base mt-2 drop-shadow-sm font-medium">{t('onboarding_subtitle')}</p>
                    </div>
                </div>

                <div className="p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Crop Type Selector */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">{t('label_crop_type')}</label>
                            <div className="relative group">
                                <select
                                    className="w-full appearance-none pl-12 pr-10 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800 cursor-pointer"
                                    value={cropType}
                                    onChange={(e) => setCropType(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>{t('placeholder_select_crop')}</option>
                                    <option value="rice">{t('crop_rice')}</option>
                                    <option value="wheat">{t('crop_wheat')}</option>
                                    <option value="corn">{t('crop_corn')}</option>
                                    <option value="vegetables">{t('crop_vegetables')}</option>
                                    <option value="sugarcane">{t('crop_sugarcane')}</option>
                                    <option value="cotton">{t('crop_cotton')}</option>
                                </select>
                                <Sprout className="w-5 h-5 text-green-600 absolute left-4 top-4.5" />
                                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-4.5 pointer-events-none group-hover:text-green-600 transition-colors" />
                            </div>
                        </div>

                        {/* Location Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">{t('label_location')}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    placeholder={t('placeholder_location')}
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                                <MapPin className="w-5 h-5 text-green-600 absolute left-4 top-4.5" />
                            </div>
                            <p className="text-xs text-gray-400 ml-1">{t('hint_location')}</p>
                        </div>

                        {/* Planting Date Picker */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">{t('label_planting_date')}</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    value={plantingDate}
                                    onChange={(e) => setPlantingDate(e.target.value)}
                                    required
                                />
                                <Sprout className="w-5 h-5 text-green-600 absolute left-4 top-4.5 pointer-events-none" />
                            </div>
                        </div>

                        {/* Last Irrigated Picker */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">{t('label_last_irrigated')}</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <Calendar className="w-5 h-5 text-green-600 absolute left-4 top-4.5 pointer-events-none" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {t('btn_processing')}
                                    </>
                                ) : (
                                    <>
                                        {t('btn_generate_schedule')}
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
