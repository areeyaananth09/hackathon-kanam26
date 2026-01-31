'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, KeyRound, ArrowLeft } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

export default function LoginPage() {
    const { t } = useLanguage();
    const [showPassword, setShowPassword] = useState(false);
    const [useOTP, setUseOTP] = useState(true); // Default to OTP as requested
    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/onboarding" // Redirect to onboarding after login
        });
    };

    const handleSendOTP = async () => {
        setLoading(true);
        try {
            await authClient.emailOtp.sendVerificationOtp({
                email,
                type: "sign-in"
            });
            setOtpSent(true);
        } catch (error) {
            console.error(error);
            alert("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleSignInWithOTP = async () => {
        setLoading(true);
        try {
            await authClient.signIn.emailOtp({
                email,
                otp
            });
            router.push('/onboarding');
        } catch (error) {
            console.error(error);
            alert("Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleSignInWithPassword = async () => {
        setLoading(true);
        try {
            await authClient.signIn.email({
                email,
                password,
                callbackURL: "/onboarding"
            });
            router.push('/onboarding');
        } catch (error) {
            console.error(error);
            alert("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 text-black">
            {/* Back Button */}
            <div className="absolute top-6 left-6">
                <Link href="/" className="p-3 bg-white rounded-xl border-4 border-black hover:bg-gray-100 block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
                    <ArrowLeft className="w-8 h-8" />
                </Link>
            </div>

            <div className="w-full max-w-md space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">Login</h1>
                    <p className="text-xl font-bold text-gray-600">{t('login_welcome')}</p>
                </div>

                <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

                    <div className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-xl font-black mb-2 uppercase" htmlFor="email">{t('label_email')}</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-16 px-4 text-xl font-bold border-4 border-black rounded-xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-green-300"
                                placeholder={t('placeholder_email')}
                                disabled={otpSent && useOTP}
                            />
                        </div>

                        {useOTP ? (
                            <>
                                {otpSent && (
                                    <div>
                                        <label className="block text-xl font-black mb-2 uppercase" htmlFor="otp">{t('label_otp')}</label>
                                        <input
                                            id="otp"
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full h-16 px-4 text-xl font-bold border-4 border-black rounded-xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-green-300 tracking-widest text-center"
                                            placeholder="123456"
                                        />
                                    </div>
                                )}

                                <button
                                    onClick={otpSent ? handleSignInWithOTP : handleSendOTP}
                                    disabled={loading}
                                    className="w-full h-16 bg-green-600 text-white font-black text-2xl uppercase rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all hover:bg-green-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? t('btn_processing') : (otpSent ? t('btn_verify_signin') : t('btn_send_code'))}
                                    {!loading && !otpSent && <ArrowRight className="w-8 h-8" />}
                                </button>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-xl font-black mb-2 uppercase" htmlFor="password">{t('label_password')}</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full h-16 px-4 text-xl font-bold border-4 border-black rounded-xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-green-300"
                                            placeholder="********"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                                        >
                                            {showPassword ? <EyeOff className="w-8 h-8" /> : <Eye className="w-8 h-8" />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSignInWithPassword}
                                    disabled={loading}
                                    className="w-full h-16 bg-green-600 text-white font-black text-2xl uppercase rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all hover:bg-green-500 disabled:opacity-70"
                                >
                                    {loading ? t('btn_signing_in') : t('btn_signin')}
                                </button>
                            </>
                        )}

                        <div className="text-center pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setUseOTP(!useOTP);
                                    setOtpSent(false);
                                    setOtp('');
                                }}
                                className="text-xl font-bold underline decoration-2 decoration-black underline-offset-4 hover:bg-yellow-200"
                            >
                                {useOTP ? t('login_with_password') : t('login_with_code')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Login */}
                <div className="space-y-4">
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-[#FDFBF7] text-gray-500 font-bold uppercase tracking-widest">{t('or_continue_with')}</span>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full h-16 bg-white border-4 border-black text-black font-black text-xl uppercase rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 hover:bg-gray-50"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </button>

                    <p className="mt-8 text-center text-lg font-bold text-gray-500">
                        {t('no_account')}{' '}
                        <Link href="/signup" className="text-green-600 underline decoration-2 decoration-green-600 underline-offset-4 hover:bg-green-100">
                            {t('sign_up_link')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
