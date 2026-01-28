'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Cloud, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed bottom-0 left-0 w-full h-1/3 bg-[#E0F2FE] -z-10 rounded-t-[50%]" />
            <div className="fixed bottom-0 right-0 w-2/3 h-1/4 bg-[#D1FAE5] -z-10 rounded-t-[60%]" />

            <div className="w-full max-w-lg">
                {/* Navigation */}
                <div className="mb-6">
                    <Link href="/settings" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Settings
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">

                    {/* Header */}
                    <div className="bg-green-50 p-8 border-b border-green-100 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
                        <p className="text-gray-500 text-sm mt-1">Last updated: January 28, 2026</p>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="p-8 overflow-y-auto space-y-8 scroll-smooth" id="privacy-content">

                        {/* Introduction */}
                        <section>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                At <strong className="text-gray-900">SmartIrrigate</strong>, we value your trust and are committed to protecting your personal and farm data. This policy explains how we collect, use, and safeguard your information.
                            </p>
                        </section>

                        {/* Data Collection */}
                        <section className="space-y-3">
                            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                                <FileText className="w-5 h-5 text-green-600" />
                                1. Information We Collect
                            </h2>
                            <ul className="space-y-2 list-disc pl-5 text-sm text-gray-600 marker:text-green-500">
                                <li><strong>Personal Details:</strong> Name, Email, and Phone number for account management.</li>
                                <li><strong>Farm Data:</strong> Location, crop type, and soil data to generate accurate schedules.</li>
                                <li><strong>Device Info:</strong> Approximate location for local weather services.</li>
                            </ul>
                        </section>

                        {/* Data Usage */}
                        <section className="space-y-3">
                            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                                <Cloud className="w-5 h-5 text-blue-500" />
                                2. How We Use Your Data
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                We use your location and crop data to fetch real-time <strong>weather forecasts</strong> and calculate the optimal <strong>evapotranspiration rates</strong>. This allows us to recommend precise irrigation schedules that save water.
                            </p>
                        </section>

                        {/* Data Protection */}
                        <section className="space-y-3">
                            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                                <Lock className="w-5 h-5 text-orange-500" />
                                3. Data Protection
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Your data is encrypted and stored securely. We <strong>never sell</strong> your personal information to third parties. We only share anonymized aggregate data with agricultural research partners to improve farming practices.
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="space-y-3 pt-4 border-t border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800">Contact Us</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                If you have questions about our privacy practices, please contact us at <a href="mailto:privacy@smartirrigate.com" className="text-green-600 hover:underline">privacy@smartirrigate.com</a>.
                            </p>
                        </section>

                        {/* Spacer for bottom scrolling */}
                        <div className="h-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
