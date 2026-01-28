'use client';

import Link from 'next/link';
import { ArrowLeft, User, Bell, Shield, FileText, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
    const settingSections = [
        {
            title: 'Account',
            items: [
                { icon: <User className="w-5 h-5 text-gray-500" />, label: 'Profile Settings', href: '/profile' },
                { icon: <Bell className="w-5 h-5 text-gray-500" />, label: 'Notification Preferences', href: '/settings/notifications' },
            ]
        },
        {
            title: 'Legal & Support',
            items: [
                { icon: <Shield className="w-5 h-5 text-gray-500" />, label: 'Privacy Policy', href: '/privacy' },
                { icon: <FileText className="w-5 h-5 text-gray-500" />, label: 'Terms & Conditions', href: '#' },
                { icon: <HelpCircle className="w-5 h-5 text-gray-500" />, label: 'Help & Feedback', href: '#' },
            ]
        }
    ];

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

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-green-50 p-6 border-b border-green-100">
                        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-500 text-sm">Manage your app preferences</p>
                    </div>

                    <div className="p-6 space-y-8">
                        {settingSections.map((section, idx) => (
                            <div key={idx}>
                                <h2 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3 ml-2">{section.title}</h2>
                                <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                                    {section.items.map((item, itemIdx) => (
                                        <Link
                                            key={itemIdx}
                                            href={item.href}
                                            className={`flex items-center justify-between p-4 hover:bg-gray-100 transition-colors ${itemIdx !== section.items.length - 1 ? 'border-b border-gray-200' : ''}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                    {item.icon}
                                                </div>
                                                <span className="text-gray-700 font-medium">{item.label}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Log Out Button */}
                        <div className="pt-2">
                            <Link href="/" className="flex items-center justify-center gap-2 w-full p-4 rounded-xl text-red-600 hover:bg-red-50 font-bold transition-colors border border-transparent hover:border-red-100">
                                <LogOut className="w-5 h-5" />
                                Log Out
                            </Link>
                            <p className="text-center text-xs text-gray-400 mt-4">
                                Version 1.0.2 • SmartIrrigate
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
