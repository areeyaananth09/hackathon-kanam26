'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Droplets, CloudSun, CloudRain, Sun, XCircle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HistoryPage() {
    const [historyItems, setHistoryItems] = useState<any[]>([]);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const res = await fetch('/api/irrigation/history');
                const data = await res.json();
                if (data.history) {
                    const formatted = data.history.map((row: any) => ({
                        id: row.id,
                        date: new Date(row.display_time).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
                        status: row.status === 'In Progress' ? 'Running' : (row.status || (row.action === 'Skip' ? 'Skipped' : 'Irrigated')),
                        duration: row.durationMinutes ? `${Math.round(row.durationMinutes)} Mins` : '-',
                        weatherText: row.reason || `${row.waterConsumed ? Math.round(row.waterConsumed) + 'L' : ''}`,
                        weatherIcon: row.status === 'Completed' ? <Sun className="w-5 h-5 text-orange-500" /> : <CloudSun className="w-5 h-5 text-gray-400" />
                    }));
                    setHistoryItems(formatted);
                }
            } catch (e) {
                console.error("History fetch failed", e);
            }
        }
        fetchHistory();
    }, []);

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
                    <div className="bg-white p-2 rounded-xl shadow-sm cursor-pointer">
                        <Calendar className="w-5 h-5 text-gray-500" />
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
                    {/* Header */}
                    <div className="bg-green-50 p-6 border-b border-green-100">
                        <h1 className="text-xl font-bold text-gray-900">Irrigation History</h1>
                        <p className="text-gray-500 text-sm">Past 30 days activity</p>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {historyItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border boundary-gray-100 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-shadow group border border-gray-100"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Date Box */}
                                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-50 rounded-xl text-center flex-shrink-0 group-hover:bg-green-50 transition-colors">
                                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{item.date.split(',')[0]}</span>
                                        <span className="text-lg font-bold text-gray-800 leading-none mt-0.5">{item.date.split(' ')[1]}</span>
                                    </div>

                                    {/* Details */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-sm font-bold ${item.status === 'Irrigated' ? 'text-blue-600' : 'text-gray-500'}`}>
                                                {item.status}
                                            </span>
                                            {item.status === 'Irrigated' && (
                                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-full font-medium">
                                                    {item.duration}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            {item.weatherIcon}
                                            <span>{item.weatherText}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Icon */}
                                <div className="pr-2">
                                    {item.status === 'Irrigated' ? (
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Droplets className="w-4 h-4 text-blue-600" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            <XCircle className="w-4 h-4 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer gradient fade */}
                    <div className="h-4 bg-gradient-to-t from-white to-transparent"></div>
                </div>
            </div>
        </div>
    );
}
