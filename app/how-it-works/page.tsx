import Link from "next/link";
import { CloudRain, Cpu, CalendarClock, Smartphone, ArrowRight, Sprout, Check } from "lucide-react";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-green-700 hover:text-green-800 transition-colors">
                            <Sprout className="h-6 w-6" />
                            <span>SmartIrrigate</span>
                        </Link>
                        <div className="flex gap-4">
                            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-700 hover:text-green-600 transition-colors px-3 py-2">
                                Log in
                            </Link>
                            <Link href="/signup" className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 hover:shadow-green-200 transition-all">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-green-50 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
                        How SmartIrrigate Works
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our system takes the complexity out of irrigation. By combining real-time weather data with soil analytics, we give you a simple, actionable plan every single day.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="space-y-24">

                    {/* Step 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
                                <CloudRain className="w-8 h-8 text-sky-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                1. Real-Time Data Collection
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                We continuously monitor hyper-local weather conditions including rainfall forecasts, temperature, and humidity. Optionally, we can integrate with on-ground soil moisture sensors for even higher precision.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-green-500" /> Satellite Weather Tracking
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-green-500" /> Soil Moisture Estimation
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-green-500" /> Evapotranspiration Rates
                                </li>
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2 bg-sky-50 rounded-3xl p-8 border border-sky-100 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                            {/* Decorative Abstract UI */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:16px_16px]"></div>
                            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl w-64">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-semibold text-gray-500">WEATHER</span>
                                    <span className="text-xs text-sky-600 font-bold">LIVE</span>
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                    <CloudRain className="w-8 h-8 text-sky-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-gray-800">24°C</div>
                                        <div className="text-xs text-gray-500">Chance of Rain: 80%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
                            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl w-64 space-y-3">
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-3/4"></div>
                                </div>
                                <div className="h-2 w-2/3 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-sky-500 w-1/2"></div>
                                </div>
                                <div className="h-2 w-5/6 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 w-2/3"></div>
                                </div>
                                <div className="pt-2 flex justify-between text-xs text-gray-500 font-mono">
                                    <span>PROCESSING</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                                <Cpu className="w-8 h-8 text-amber-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                2. Intelligent Analysis
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Our algorithm processes the raw data. It calculates exactly how much water your specific crop needs at its current growth stage, avoiding both under-watering (stress) and over-watering (root rot/waste).
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-green-500" /> Crop-Specific Models
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-green-500" /> Soil Type Adaptation
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-green-500" /> Growth Stage Tracking
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                <CalendarClock className="w-8 h-8 text-purple-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                3. Optimized Scheduling
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                The system generates a precise irrigation schedule. If heavy rain is forecast, it advises you to skip irrigation. If a heatwave is coming, it suggests extra watering beforehand.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-green-500" /> Water Saving Recommendations
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-green-500" /> Optimal Time of Day
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-green-500" /> Duration Calculation
                                </li>
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2 bg-purple-50 rounded-3xl p-8 border border-purple-100 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]"></div>
                            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl w-64 border-l-4 border-purple-500">
                                <div className="text-sm text-gray-500 uppercase font-semibold mb-1">Today's Plan</div>
                                <div className="text-xl font-bold text-gray-900">Irrigate: 45 Mins</div>
                                <div className="text-sm text-gray-600 mt-1">Start at 06:30 AM</div>
                            </div>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="bg-green-50 rounded-3xl p-8 border border-green-100 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>
                            <div className="relative z-10 bg-black rounded-[2rem] p-3 shadow-2xl w-48 border-4 border-gray-800">
                                <div className="bg-white rounded-[1.5rem] h-full p-4 overflow-hidden relative min-h-[250px] flex flex-col items-center pt-8">
                                    <div className="absolute top-0 w-20 h-4 bg-gray-800 rounded-b-xl z-20"></div>
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                                        <Sprout className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-sm">Update</div>
                                        <div className="text-xs text-gray-500 px-2 mt-1">
                                            Skip irrigation today. Heavy rain expected at 2 PM.
                                        </div>
                                    </div>
                                    <div className="mt-auto w-full bg-green-600 text-white text-xs py-2 rounded-lg text-center font-bold">
                                        View Details
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                                <Smartphone className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                4. Instant Notification
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                You get the plan directly on your phone. No complicated charts to read—just a simple instruction on what to do. We support SMS for basic phones and app notifications for smartphones.
                            </p>
                            <div className="mt-8">
                                <Link href="/signup" className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-500 transition-all">
                                    Start Your Free Trial
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
                        <Sprout className="h-5 w-5 text-green-600" />
                        <span>SmartIrrigate</span>
                    </Link>
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} SmartIrrigate. Empowering farmers everyday.
                    </p>
                </div>
            </footer>
        </div>
    );
}
