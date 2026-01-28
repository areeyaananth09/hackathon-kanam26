'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
            {/* Background decoration - subtle hills */}
            <div className="fixed bottom-0 left-0 w-full h-1/3 bg-[#E0F2FE] -z-10 rounded-t-[50%]" />
            <div className="fixed bottom-0 right-0 w-2/3 h-1/4 bg-[#D1FAE5] -z-10 rounded-t-[60%]" />

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Landscape Illustration Area */}
                <div className="h-40 bg-gradient-to-b from-sky-300 to-sky-100 relative overflow-hidden">
                    {/* Sun */}
                    <div className="absolute top-6 right-8 w-12 h-12 bg-yellow-200 rounded-full blur-sm opacity-80" />

                    {/* Hills */}
                    <svg className="absolute bottom-0 left-0 w-full h-16 text-green-500" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#22C55E" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-full h-12 text-green-600 opacity-60" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#16A34A" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                            Smart Irrigation <br />
                            <span className="text-green-600">Scheduling Analytics</span>
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">Welcome back, farmer!</p>
                    </div>

                    <form className="space-y-5">
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

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    placeholder="Enter your password"
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <div className="flex justify-end pt-1">
                                <Link href="/forgot-password" className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <Link href="/onboarding" className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            Sign In
                        </Link>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-all">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Continue with Google
                            </button>

                            <button className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white font-medium py-3 rounded-xl hover:bg-[#1864D9] transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                    />
                                </svg>
                                Continue with Facebook
                            </button>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-green-600 font-semibold hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
