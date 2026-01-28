import Link from "next/link";
import { Droplets, Sprout, CloudSun, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-green-700 hover:text-green-800 transition-colors">
              <Sprout className="h-6 w-6" />
              <span>SmartIrrigate</span>
            </Link>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-700 hover:text-green-600 transition-colors px-3 py-2"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 hover:shadow-green-200 transition-all flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 hidden lg:block">
            <div className="h-96 w-96 rounded-full bg-green-100/50 blur-3xl"></div>
          </div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 hidden lg:block">
            <div className="h-96 w-96 rounded-full bg-sky-100/50 blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                The Future of Farming is Here
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
                Grow More with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-sky-600">
                  Intelligent Irrigation
                </span>
              </h1>
              <p className="text-lg leading-8 text-gray-600 mb-10 mx-auto max-w-2xl">
                Eliminate the guesswork. SmartIrrigate helps small farmers conserve water and increase crop yields by providing data-driven schedules based on real-time weather and soil conditions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto rounded-xl bg-green-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-green-500 hover:scale-105 transition-all duration-200"
                >
                  Start Saving Water
                </Link>
                <Link
                  href="/how-it-works"
                  className="w-full sm:w-auto rounded-xl bg-white border border-gray-200 px-8 py-4 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  See How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-3xl bg-gray-50 p-8 sm:p-12 overflow-hidden border border-gray-100">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/50 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">The Challenge</h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-0.5">✕</div>
                    <p className="text-gray-600">Reliance on strict schedules or manual judgment.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-0.5">✕</div>
                    <p className="text-gray-600">Over-irrigation leads to water wastage and increased costs.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-0.5">✕</div>
                    <p className="text-gray-600">Unexpected weather causes crop damage and yield loss.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-0.5">✕</div>
                    <p className="text-gray-600">Lack of accessible, easy-to-use digital tools for small farmers.</p>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                  Why Essential Resources Are Being Wasted
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Traditional irrigation practices often fail to account for the dynamic nature of weather and soil needs. Without precise data, farmers are forced to guess, risking their harvest and depleting valuable water resources.
                </p>
                <p className="text-lg text-gray-600 font-medium border-l-4 border-green-500 pl-4 bg-green-50/50 py-2">
                  "Small farmers need a solution that bridges the gap between traditional knowledge and modern precision."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution/Features Section */}
        <section id="how-it-works" className="py-24 bg-green-900 text-white rounded-t-[3rem] -mt-10 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                The Smart Solution
              </h2>
              <p className="text-green-100 text-lg">
                We empower farmers with a simple, software-based system that turns complex data into actionable daily plans.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all">
                <div className="h-12 w-12 rounded-lg bg-sky-500/20 flex items-center justify-center mb-6">
                  <CloudSun className="h-8 w-8 text-sky-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">Weather Analytics</h3>
                <p className="text-green-100">
                  Real-time analysis of rain forecasts and heatwaves to adjust schedules automatically, preventing water logging or drought stress.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all">
                <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-6">
                  <Droplets className="h-8 w-8 text-green-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Plans</h3>
                <p className="text-green-100">
                  Receive daily notifications on exactly when to irrigate, how much water to use, or when to skip watering entirely.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all">
                <div className="h-12 w-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-6">
                  <BarChart3 className="h-8 w-8 text-amber-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">Yield Optimization</h3>
                <p className="text-green-100">
                  Maintain optimal soil moisture levels to boost crop health and agricultural productivity while reducing costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-sky-50 rounded-3xl p-8 sm:p-16 text-center border border-sky-100">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                Ready to optimize your farm?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of small farmers who are saving water and growing better crops with SmartIrrigate tommorow.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-green-500 transition-all"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

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
