'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

export default function SignupPage() {
    const { t } = useLanguage();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: "/onboarding",
            }, {
                onSuccess: () => {
                    router.push('/onboarding');
                },
                onError: (ctx) => {
                    alert(ctx.error.message);
                }
            });
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
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

            <div className="w-full max-w-md space-y-6 my-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">{t('signup_title')}</h1>
                    <p className="text-lg font-bold text-gray-600">{t('signup_subtitle')}</p>
                </div>

                <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <form className="space-y-6" onSubmit={handleSignUp}>
                        {/* Name */}
                        <div>
                            <label className="block text-xl font-black mb-2 uppercase" htmlFor="fullname">{t('label_fullname')}</label>
                            <input
                                id="fullname"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-16 px-4 text-xl font-bold border-4 border-black rounded-xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-green-300"
                                placeholder={t('placeholder_fullname')}
                                required
                            />
                        </div>

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
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xl font-black mb-2 uppercase" htmlFor="password">{t('label_password')}</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-16 px-4 text-xl font-bold border-4 border-black rounded-xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-green-300"
                                    placeholder="Min 8 chars"
                                    required
                                    minLength={8}
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

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xl font-black mb-2 uppercase" htmlFor="confirm-password">{t('label_confirm_password')}</label>
                            <div className="relative">
                                <input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full h-16 px-4 text-xl font-bold border-4 border-black rounded-xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-green-300"
                                    placeholder="Repeat password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-8 h-8" /> : <Eye className="w-8 h-8" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 bg-green-600 text-white font-black text-2xl uppercase rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all hover:bg-green-500 mt-4 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                    {t('btn_creating_account')}
                                </>
                            ) : t('btn_create_account')}
                        </button>
                    </form>

                    <div className="space-y-4 mt-8">
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500 font-bold uppercase tracking-widest">{t('or_signup_with')}</span>
                        </div>

                        <button
                            onClick={async () => {
                                await authClient.signIn.social({
                                    provider: "google",
                                    callbackURL: "/onboarding"
                                });
                            }}
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

                        <p className="text-center text-lg font-bold text-gray-500">
                            {t('already_have_account')}{' '}
                            <Link href="/login" className="text-green-600 underline decoration-2 decoration-green-600 underline-offset-4 hover:bg-green-100">
                                {t('sign_in_link')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
