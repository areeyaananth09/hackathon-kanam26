'use client';

import { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
    BarChart, Bar, Legend, Cell
} from 'recharts';
import { ArrowLeft, Sprout, MapPin, Calendar, Activity, AlertTriangle, Loader2, Droplets, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
    const [formData, setFormData] = useState({
        cropName: 'Wheat',
        plantingDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default 3 months ago
        lat: '30.7333',
        lon: '76.7794',
        duration: '120'
    });

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null); // Changed type to any to accommodate full response
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
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 p-6 sticky top-0 z-10 flex items-center gap-4">
                <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">Crop Growth Analytics</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Sprout className="w-5 h-5 text-green-600" />
                            Crop Configuration
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Crop Name</label>
                                <select
                                    name="cropName"
                                    value={formData.cropName}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="Wheat">Wheat</option>
                                    <option value="Rice">Rice</option>
                                    <option value="Corn">Corn</option>
                                    <option value="Cotton">Cotton</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Planting Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <input
                                        type="date"
                                        name="plantingDate"
                                        value={formData.plantingDate}
                                        onChange={handleChange}
                                        className="w-full pl-10 p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Latitude</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            name="lat"
                                            value={formData.lat}
                                            onChange={handleChange}
                                            className="w-full pl-10 p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Longitude</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            name="lon"
                                            value={formData.lon}
                                            onChange={handleChange}
                                            className="w-full pl-10 p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Total Duration (Days)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g. 120"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 "
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {loading ? 'Analyzing...' : 'Show Report'}
                            </button>
                        </form>
                    </div>

                    {/* Stats Card */}
                    {data && (
                        <div className={`p-6 rounded-3xl shadow-sm text-white ${isMatured ? 'bg-amber-500' : 'bg-green-600'}`}>
                            <h3 className="text-white/80 font-medium mb-1">Current Status</h3>
                            <div className="text-4xl font-extrabold mb-2">{currentGrowth}%</div>
                            <p className="text-sm opacity-90">
                                {isMatured ? 'Crop is nearing maturity. Prepare for harvest.' : 'Crop is in active growth phase.'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Column: Visuals */}
                <div className="lg:col-span-2 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-start gap-4">
                            <div className="bg-red-100 p-2 rounded-full text-red-600">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-red-800">Analysis Failed</h3>
                                <p className="text-red-600 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    {!data && !loading && !error && (
                        <div className="bg-white rounded-3xl p-12 border border-gray-100 flex flex-col items-center justify-center text-center h-96">
                            <div className="bg-gray-50 p-4 rounded-full mb-4">
                                <Activity className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-gray-800 font-bold text-lg">No Data to Display</h3>
                            <p className="text-gray-500 max-w-sm mt-2">
                                Enter your crop details and location to generate a growth and water savings report.
                            </p>
                        </div>
                    )}

                    {loading && (
                        <div className="bg-white rounded-3xl p-12 border border-gray-100 flex flex-col items-center justify-center text-center h-96">
                            <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-4" />
                            <h3 className="text-gray-800 font-bold">Processing Satellite Data...</h3>
                            <p className="text-gray-500 text-sm">Simulating crop growth and water usage models</p>
                        </div>
                    )}

                    {data && (
                        <div className="space-y-6">
                            {/* TABS */}
                            <div className="flex bg-gray-200/50 p-1 rounded-2xl w-fit">
                                <button
                                    onClick={() => setActiveTab('growth')}
                                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'growth'
                                        ? 'bg-white shadow-sm text-green-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Growth Analysis
                                </button>
                                <button
                                    onClick={() => setActiveTab('water')}
                                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'water'
                                        ? 'bg-white shadow-sm text-sky-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <Droplets className="w-4 h-4" />
                                    Water Saved
                                </button>
                            </div>

                            {/* CONTENT */}
                            {activeTab === 'growth' ? (
                                <>
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                        <div className="flex items-center justify-between mb-8">
                                            <h2 className="font-bold text-gray-800">Growth Trajectory</h2>
                                            <div className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                                                Day 1 - Day {chartData[chartData.length - 1].day}
                                            </div>
                                        </div>

                                        <div className="h-80 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                                                    <defs>
                                                        <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                                                            <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                    <XAxis
                                                        dataKey="day"
                                                        label={{ value: 'Days After Planting', position: 'bottom', offset: 0 }}
                                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                                        axisLine={false}
                                                        tickLine={false}
                                                    />
                                                    <YAxis
                                                        label={{ value: 'Growth %', angle: -90, position: 'insideLeft' }}
                                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                                        axisLine={false}
                                                        tickLine={false}
                                                        domain={[0, 100]}
                                                    />
                                                    <Tooltip
                                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                        itemStyle={{ color: '#16a34a', fontWeight: 'bold' }}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="growthPercentage"
                                                        stroke="#16a34a"
                                                        strokeWidth={3}
                                                        fillOpacity={1}
                                                        fill="url(#colorGrowth)"
                                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-6">
                                            <div>
                                                <span className="block text-xs uppercase font-semibold text-gray-400">Start Date</span>
                                                <span className="font-medium text-gray-800">{new Date(formData.plantingDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-xs uppercase font-semibold text-gray-400">Latest Reading</span>
                                                <span className="font-medium text-gray-800">{new Date().toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Growth Reference Table */}
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden">
                                        <h2 className="font-bold text-gray-800 mb-6">Growth Stages Reference</h2>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-xs">
                                                    <tr>
                                                        <th className="px-4 py-3 rounded-l-lg">Growth %</th>
                                                        <th className="px-4 py-3">Biological Stage</th>
                                                        <th className="px-4 py-3 rounded-r-lg">Meaning</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {[
                                                        { range: '0–10%', stage: 'Low Germination', desc: 'Seed just started sprouting' },
                                                        { range: '11–20%', stage: 'Active Germination', desc: 'Roots and shoots forming' },
                                                        { range: '21–30%', stage: 'Early Vegetative Stage', desc: 'Leaf development begins' },
                                                        { range: '31–45%', stage: 'Healthy Vegetative Growth', desc: 'Rapid leaf & stem growth' },
                                                        { range: '46–60%', stage: 'Tillering Stage', desc: 'Multiple shoots forming' },
                                                        { range: '61–75%', stage: 'Flower Initiation', desc: 'Reproductive phase begins' },
                                                        { range: '76–90%', stage: 'Grain / Fruit Development', desc: 'Yield formation' },
                                                        { range: '91–100%', stage: 'Physiological Maturity', desc: 'Ready for harvest' },
                                                    ].map((row, idx) => (
                                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-4 py-3 font-medium text-green-600">{row.range}</td>
                                                            <td className="px-4 py-3 font-semibold text-gray-800">{row.stage}</td>
                                                            <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* WATER SAVED TAB CONTENT */
                                <div className="space-y-6">
                                    {/* Hero Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-sky-500 rounded-3xl p-8 text-white flex flex-col justify-between h-48 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                            <div>
                                                <div className="flex items-center gap-2 text-sky-100 font-bold mb-1">
                                                    <Trophy className="w-5 h-5" />
                                                    Total Saved
                                                </div>
                                                <div className="text-4xl font-extrabold">{waterStats?.saved_percentage || 0}%</div>
                                                <p className="text-sky-100 text-sm mt-2 font-medium">Water conserved vs traditional methods</p>
                                            </div>
                                            <div className="mt-4 bg-white/20 backdrop-blur-md rounded-xl p-3 inline-flex items-center gap-3 w-fit">
                                                <Droplets className="w-5 h-5 text-white" />
                                                <span className="font-bold">{waterStats?.saved_gallons || 0} Gallons</span>
                                            </div>
                                        </div>

                                        <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-center gap-6">
                                            <div>
                                                <div className="text-sm text-gray-500 font-bold uppercase mb-1">Traditional Usage</div>
                                                <div className="text-2xl font-bold text-gray-800">{waterStats?.traditional_usage || 0} <span className="text-sm font-medium text-gray-400">units</span></div>
                                            </div>
                                            <div className="h-px bg-gray-100 w-full"></div>
                                            <div>
                                                <div className="text-sm text-gray-500 font-bold uppercase mb-1">Smart Usage</div>
                                                <div className="text-2xl font-bold text-green-600">{waterStats?.smart_usage || 0} <span className="text-sm font-medium text-gray-400">units</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Impact Chart */}
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                        <h2 className="font-bold text-gray-800 mb-6">Efficiency Comparison</h2>
                                        <div className="h-80 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    data={[
                                                        { name: 'Traditional', usage: waterStats?.traditional_usage || 0 },
                                                        { name: 'SmartIrrigate', usage: waterStats?.smart_usage || 0 },
                                                    ]}
                                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                    <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 14, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                                                    <YAxis tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                                                    <Tooltip
                                                        cursor={{ fill: 'transparent' }}
                                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                    />
                                                    <Bar dataKey="usage" name="Water Usage" fill="#3b82f6" radius={[10, 10, 0, 0]} barSize={80}>
                                                        {
                                                            [{ name: 'Traditional', color: '#94a3b8' }, { name: 'SmartIrrigate', color: '#16a34a' }].map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                                            ))
                                                        }
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <p className="text-center text-sm text-gray-500 mt-4 max-w-lg mx-auto">
                                            By using predictive weather algorithms, SmartIrrigate avoided {waterStats?.saved_gallons || 0} gallons of unnecessary watering while maintaining optimal soil moisture.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
