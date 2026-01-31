'use client';

import { useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';
import { ArrowLeft, Sprout, MapPin, Calendar, Activity, AlertTriangle, Loader2, Droplets, Trophy, Volume2, Search } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function AnalyticsPage() {
    const { t, speak } = useLanguage();

    const [formData, setFormData] = useState({
        cropName: 'Wheat',
        plantingDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default 3 months ago
        lat: '30.7333',
        lon: '76.7794',
        duration: '120'
    });

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'growth' | 'water'>('growth');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const res = await fetch('/api/crop-growth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    crop: formData.cropName,
                    sowing_date: formData.plantingDate,
                    location: `${formData.lat},${formData.lon}`, // string format
                    lat: formData.lat,
                    lon: formData.lon
                })
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Failed to fetch data");
            }

            setData(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const currentGrowth = data?.current_growth || 0;
    const isMatured = currentGrowth >= 95;
    const chartData = data?.data || [];
    const waterStats = data?.water_stats;

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24">

            {/* Header - High Contrast */}
            <div className="bg-[var(--card-bg)] border-b-2 border-[var(--card-border)] p-4 sticky top-0 z-20 flex items-center gap-4">
                <Link href="/dashboard" className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-xl font-black uppercase tracking-wide">{t('crop_growth_analytics')}</h1>
                </div>
                <button onClick={() => speak(t('crop_growth_analytics'))} className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                    <Volume2 className="w-6 h-6" />
                </button>
            </div>


            <main className="p-4 space-y-6 max-w-md mx-auto">

                {/* Config Card */}
                <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-xl font-black mb-6 uppercase flex items-center gap-2">
                        <Sprout className="w-6 h-6 text-green-700" />
                        {t('crop_configuration')}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-lg font-bold mb-2 uppercase text-sm">{t('crop_type')}</label>
                            <div className="relative">
                                <select
                                    name="cropName"
                                    value={formData.cropName}
                                    onChange={handleChange}
                                    className="w-full h-12 pl-4 pr-10 border-4 border-black rounded-lg bg-gray-50 text-lg font-bold appearance-none focus:outline-none focus:ring-4 focus:ring-green-300"
                                >
                                    <option value="Wheat">Wheat</option>
                                    <option value="Rice">Rice</option>
                                    <option value="Corn">Corn</option>
                                    <option value="Cotton">Cotton</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-bold mb-2 uppercase text-sm">{t('planting_date')}</label>
                            <input
                                type="date"
                                name="plantingDate"
                                value={formData.plantingDate}
                                onChange={handleChange}
                                className="w-full h-12 px-4 border-4 border-black rounded-lg bg-gray-50 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-green-300"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-lg font-bold mb-2 uppercase text-sm">{t('latitude')}</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="lat"
                                        value={formData.lat}
                                        onChange={handleChange}
                                        className="w-full h-12 pl-9 pr-4 border-4 border-black rounded-lg bg-gray-50 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-green-300"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-lg font-bold mb-2 uppercase text-sm">{t('longitude')}</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="lon"
                                        value={formData.lon}
                                        onChange={handleChange}
                                        className="w-full h-12 pl-9 pr-4 border-4 border-black rounded-lg bg-gray-50 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-green-300"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-bold mb-2 uppercase text-sm">{t('total_duration')}</label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full h-12 px-4 border-4 border-black rounded-lg bg-gray-50 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-green-300"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-black text-white font-black text-lg uppercase rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 mt-2 hover:bg-gray-900"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                            {loading ? t('analyzing') : t('show_report')}
                        </button>
                    </form>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-100 border-4 border-black rounded-xl p-6 flex items-start gap-4">
                        <AlertTriangle className="w-8 h-8 text-black shrink-0" />
                        <div>
                            <h3 className="font-black text-lg">Failed</h3>
                            <p className="font-bold">{error}</p>
                        </div>
                    </div>
                )}

                {/* Analysis Results */}
                {data && (
                    <div className="space-y-6">

                        {/* Tabs */}
                        <div className="flex border-4 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <button
                                onClick={() => setActiveTab('growth')}
                                className={`flex-1 py-4 font-black uppercase text-sm ${activeTab === 'growth' ? 'bg-green-600 text-white' : 'bg-white text-black'}`}
                            >
                                {t('growth_analysis')}
                            </button>
                            <div className="w-1 bg-black"></div>
                            <button
                                onClick={() => setActiveTab('water')}
                                className={`flex-1 py-4 font-black uppercase text-sm ${activeTab === 'water' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
                            >
                                {t('water_saved')}
                            </button>
                        </div>

                        {/* Current Status Badge */}
                        <div className={`p-6 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white text-center ${isMatured ? 'bg-amber-500' : 'bg-green-600'}`}>
                            <h3 className="font-bold mb-1 uppercase opacity-90">{t('current_status')}</h3>
                            <div className="text-6xl font-black mb-2">{currentGrowth}%</div>
                            <p className="font-bold opacity-90 leading-tight">
                                {isMatured ? 'Ready for Harvest' : 'Active Growth Phase'}
                            </p>
                        </div>

                        {/* CONTENT */}
                        {activeTab === 'growth' ? (
                            <>
                                <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <h2 className="font-black text-xl mb-4 uppercase">{t('growth_trajectory')}</h2>
                                    <div className="h-64 w-full -ml-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                                                <defs>
                                                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                <XAxis dataKey="day" hide />
                                                <YAxis hide domain={[0, 100]} />
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '8px', border: '2px solid black', fontWeight: 'bold' }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="growthPercentage"
                                                    stroke="black"
                                                    strokeWidth={3}
                                                    fillOpacity={1}
                                                    fill="url(#colorGrowth)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Chart Footer Info (Dates) */}
                                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider px-2">
                                    <div>
                                        <p>{t('start_date')}</p>
                                        <p className="text-black">{formData.plantingDate}</p>
                                    </div>
                                    <div className="text-right">
                                        <p>{t('latest_reading')}</p>
                                        <p className="text-black">{new Date().toISOString().split('T')[0]}</p>
                                    </div>
                                </div>

                                {/* Growth Stages Reference Table */}
                                <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <h2 className="font-black text-lg mb-4 uppercase">{t('growth_stages_reference')}</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs uppercase bg-gray-100 text-gray-500 border-b-2 border-gray-200">
                                                <tr>
                                                    <th className="px-4 py-3 font-black">{t('stage_growth_pct')}</th>
                                                    <th className="px-4 py-3 font-black">{t('stage_bio_stage')}</th>
                                                    <th className="px-4 py-3 font-black">{t('stage_meaning')}</th>
                                                </tr>
                                            </thead>
                                            <tbody className="font-bold">
                                                <tr className="border-b border-gray-100 hover:bg-green-50">
                                                    <td className="px-4 py-3 text-green-600">0-10%</td>
                                                    <td className="px-4 py-3">{t('stage_germination')}</td>
                                                    <td className="px-4 py-3 text-gray-500 font-medium">{t('stage_germination_desc')}</td>
                                                </tr>
                                                <tr className="border-b border-gray-100 hover:bg-green-50">
                                                    <td className="px-4 py-3 text-green-600">11-50%</td>
                                                    <td className="px-4 py-3">{t('stage_active')}</td>
                                                    <td className="px-4 py-3 text-gray-500 font-medium">{t('stage_active_desc')}</td>
                                                </tr>
                                                <tr className="hover:bg-green-50">
                                                    <td className="px-4 py-3 text-green-600">51-100%</td>
                                                    <td className="px-4 py-3">{t('stage_maturation')}</td>
                                                    <td className="px-4 py-3 text-gray-500 font-medium">{t('stage_maturation_desc')}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-6">
                                <div className="bg-sky-500 border-4 border-black rounded-xl p-6 text-white text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Trophy className="w-8 h-8 text-yellow-300" />
                                        <span className="font-black uppercase text-xl">{t('total_saved')}</span>
                                    </div>
                                    <div className="text-6xl font-black mb-2">{waterStats?.saved_percentage || 0}%</div>
                                    <div className="bg-black/20 rounded-lg p-2 font-bold inline-block">
                                        {waterStats?.saved_gallons || 0} Gallons
                                    </div>
                                </div>

                                <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <h2 className="font-black text-xl mb-6 uppercase">{t('efficiency_comparison')}</h2>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={[
                                                    { name: 'Trad.', usage: waterStats?.traditional_usage || 0 },
                                                    { name: 'Smart', usage: waterStats?.smart_usage || 0 },
                                                ]}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <XAxis dataKey="name" tick={{ fill: 'black', fontSize: 14, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                                                <Tooltip
                                                    cursor={{ fill: 'transparent' }}
                                                    contentStyle={{ borderRadius: '8px', border: '2px solid black', fontWeight: 'bold' }}
                                                />
                                                <Bar dataKey="usage" radius={[8, 8, 8, 8]} barSize={60}>
                                                    {
                                                        [{ color: '#94a3b8' }, { color: '#16a34a' }].map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="black" strokeWidth={2} />
                                                        ))
                                                    }
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
