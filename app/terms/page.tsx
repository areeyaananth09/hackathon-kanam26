'use client';

import Link from 'next/link';
import { ArrowLeft, FileCheck, Scale, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';

export default function TermsPage() {
    const [accepted, setAccepted] = useState(false);

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
                            <Scale className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Terms of Use</h1>
                        <p className="text-gray-500 text-sm mt-1">Agreement for SmartIrrigate Services</p>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="p-8 overflow-y-auto space-y-8 scroll-smooth flex-1 text-sm text-gray-600">

                        <p className="leading-relaxed">
                            Welcome to SmartIrrigate. By accessing or using our mobile application, you agree to be bound by these Terms and Conditions. Please read them carefully.
                        </p>

                        {/* Section 1 */}
                        <section className="space-y-3">
                            <h2 className="flex items-center gap-2 text-base font-bold text-gray-800">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs">1</span>
                                Acceptance of Terms
                            </h2>
                            <p className="leading-relaxed">
                                By creating an account, you affirm that you are at least 18 years of age or possess legal parental or guardian consent, and are fully able to enter into this agreement.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section className="space-y-3">
                            <h2 className="flex items-center gap-2 text-base font-bold text-gray-800">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs">2</span>
                                App Usage & Restrictions
                            </h2>
                            <ul className="space-y-2 list-disc pl-5 marker:text-green-500">
                                <li>You agree to use the app only for lawful agricultural purposes.</li>
                                <li>You must not attempt to reverse engineer the application code.</li>
                                <li>Data provided by the app (weather, irrigation) is an estimation; actual field conditions may vary.</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section className="space-y-3">
                            <h2 className="flex items-center gap-2 text-base font-bold text-gray-800">
                                <AlertTriangle className="w-4 h-4 text-orange-500" />
                                Limitation of Liability
                            </h2>
                            <p className="leading-relaxed bg-orange-50 p-4 rounded-xl border border-orange-100 text-orange-900/80">
                                SmartIrrigate is an advisory tool. We are not liable for any crop loss, yield reduction, or water damages resulting from reliance on the app's recommendations. Final farming decisions remain with you.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section className="space-y-3">
                            <h2 className="flex items-center gap-2 text-base font-bold text-gray-800">
                                <Info className="w-4 h-4 text-blue-500" />
                                Subscription & Fees
                            </h2>
                            <p className="leading-relaxed">
                                Basic features are free. Premium features (advanced analytics) may require a subscription fee, which will be clearly communicated before charge.
                            </p>
                        </section>

                        <div className="h-4"></div>
                    </div>

                    {/* Acceptance Footer */}
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => setAccepted(!accepted)}>
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${accepted ? 'bg-green-600 border-green-600' : 'bg-white border-gray-300'}`}>
                                {accepted && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </div>
                            <span className="text-sm font-medium text-gray-700 select-none">I have read and agree to the Terms</span>
                        </div>

                        <Link
                            href={accepted ? "/settings" : "#"}
                            className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all ${accepted
                                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 active:scale-[0.98]'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <FileCheck className="w-5 h-5" />
                            Accept & Continue
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
