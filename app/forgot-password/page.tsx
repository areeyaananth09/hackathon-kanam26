'use client';

import Link from 'next/link';
import { Mail, ArrowLeft, Sprout } from 'lucide-react';

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed bottom-0 left-0 w-full h-1/3 bg-[#E0F2FE] -z-10 rounded-t-[50%]" />
            <div className="fixed bottom-0 right-0 w-2/3 h-1/4 bg-[#D1FAE5] -z-10 rounded-t-[60%]" />

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden my-4 relative">
                {/* Top Decoration */}
                <div className="h-24 bg-gradient-to-b from-green-50 to-white relative overflow-hidden flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-sm z-10">
                        <div className="text-green-600">
                            <Sprout className="w-8 h-8" />
                        </div>
                    </div>
                    {/* Subtle circles */}
                    <div className="absolute top-[-20%] left-[-10%] w-32 h-32 bg-green-50 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 bg-sky-50 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                </div>

                <div className="px-8 pb-10 pt-2">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            Forgot Password?
                        </h1>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                            Don't worry! It happens. Please enter the email address linked to your account.
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    placeholder="name@example.com"
                                />
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                            </div>
                        </div>

                        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            Send Reset Link
                        </button>
                    </form>

                    <footer className="mt-8 text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Sign In
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    );
}
