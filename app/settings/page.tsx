'use client';

import Link from 'next/link';
import { ArrowLeft, User, Bell, Shield, FileText, HelpCircle, LogOut, ChevronRight, Volume2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SettingsPage() {
    const { t, speak } = useLanguage();

    const settingSections = [
        {
            title: t('account'),
            items: [
                { icon: <User className="w-8 h-8 text-black" />, label: t('profile_settings'), href: '/profile' },
                { icon: <Bell className="w-8 h-8 text-black" />, label: t('notification_preferences'), href: '/settings/notifications' },
            ]
        },
        {
            title: t('legal_support'),
            items: [
                { icon: <Shield className="w-8 h-8 text-black" />, label: t('privacy_policy'), href: '/privacy' },
                { icon: <FileText className="w-8 h-8 text-black" />, label: t('terms_conditions'), href: '/terms' },
                { icon: <HelpCircle className="w-8 h-8 text-black" />, label: t('help_feedback'), href: '/help' },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24">

            {/* Header - High Contrast */}
            <div className="bg-[var(--card-bg)] border-b-2 border-[var(--card-border)] p-4 sticky top-0 z-20 flex items-center gap-4">
                <Link href="/dashboard" className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-xl font-black uppercase tracking-wide">{t('settings_title')}</h1>
                </div>
                <button onClick={() => speak(t('settings_title'))} className="p-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--card-border)] hover:bg-gray-300">
                    <Volume2 className="w-6 h-6" />
                </button>
            </div>

            <main className="p-4 space-y-8 max-w-md mx-auto mt-4">

                {settingSections.map((section, idx) => (
                    <div key={idx}>
                        <h2 className="text-xl font-black uppercase tracking-wide mb-4 flex items-center gap-2 px-2">
                            {section.title}
                        </h2>
                        <div className="space-y-4">
                            {section.items.map((item, itemIdx) => (
                                <Link
                                    key={itemIdx}
                                    href={item.href}
                                    className="block w-full bg-white border-4 border-black rounded-xl p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                                    onClick={() => speak(item.label)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gray-100 p-2 rounded-lg border-2 border-black">
                                            {item.icon}
                                        </div>
                                        <span className="text-lg font-bold text-black">{item.label}</span>
                                    </div>
                                    <ChevronRight className="w-6 h-6 text-black" />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Log Out Button */}
                <div className="pt-4">
                    <Link href="/" className="block w-full py-4 bg-red-600 text-white font-black text-xl uppercase text-center rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-transform flex items-center justify-center gap-2">
                        <LogOut className="w-6 h-6" />
                        {t('log_out')}
                    </Link>
                    <p className="text-center text-sm font-bold text-gray-400 mt-6 uppercase tracking-widest">
                        v1.0.2 • SmartIrrigate
                    </p>
                </div>

            </main>
        </div>
    );
}
