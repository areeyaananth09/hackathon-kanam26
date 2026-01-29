'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
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
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
            {/* Background decoration - matching login page */}
            <div className="fixed bottom-0 left-0 w-full h-1/3 bg-[#E0F2FE] -z-10 rounded-t-[50%]" />
            <div className="fixed bottom-0 right-0 w-2/3 h-1/4 bg-[#D1FAE5] -z-10 rounded-t-[60%]" />

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden my-4">
                {/* Landscape Illustration Area */}
                <div className="h-40 relative overflow-hidden">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: "url('/images/farmer-header-v2.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                </div>

                <div className="p-8 pt-6">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {t('signup_title')}
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">{t('signup_subtitle')}</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSignUp}>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1" htmlFor="fullname">{t('label_fullname')}</label>
                            <div className="relative">
                                <input
                                    id="fullname"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    placeholder={t('placeholder_fullname')}
                                    required
                                />
                                <User className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1" htmlFor="email">{t('label_email')}</label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    placeholder={t('placeholder_email')}
                                    required
                                />
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1" htmlFor="password">{t('label_password')}</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    placeholder="Create a password"
                                    required
                                    minLength={8}
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
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1" htmlFor="confirm-password">{t('label_confirm_password')}</label>
                            <div className="relative">
                                <input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    placeholder={t('placeholder_confirm_password')}
                                    required
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {t('btn_creating_account')}
                                </>
                            ) : t('btn_create_account')}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">{t('or_signup_with')}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <button
                                onClick={async () => {
                                    await authClient.signIn.social({
                                        provider: "google",
                                        callbackURL: "/onboarding"
                                    });
                                }}
                                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-all"
                            >
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
                                {t('continue_google')}
                            </button>
                        </div>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            {t('already_have_account')}{' '}
                            <Link href="/login" className="text-green-600 font-semibold hover:underline">
                                {t('sign_in_link')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
