'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, HelpCircle, MessageSquare, Mail, ChevronDown, CheckCircle2, Send, Phone, Leaf, Droplet, AlertCircle, MapPin, Clock, Zap } from 'lucide-react';

export default function HelpPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [feedbackType, setFeedbackType] = useState<'suggestion' | 'issue'>('suggestion');
    const [feedbackText, setFeedbackText] = useState('');

    const faqs = [
        {
            id: 1,
            question: "How is my irrigation schedule calculated?",
            answer: "Our system uses advanced science! We analyze your local weather patterns, soil type, crop variety, and field size to calculate precisely how much water your crops need. We use evapotranspiration models (how much water evaporates from soil and plants) to ensure you're watering at just the right time with just the right amount—saving water and boosting your yield."
        },
        {
            id: 2,
            question: "Can I manually adjust or skip watering recommendations?",
            answer: "Absolutely! You're in control. On your Schedule page, you can 'Skip' a watering day, 'Override' with your own timing, or 'Accept' our recommendation. Your farm knowledge matters—use your judgment combined with our data for the best results."
        },
        {
            id: 3,
            question: "What if the weather suddenly changes?",
            answer: "Our app updates automatically when weather changes! Heavy rain? The system will skip the next watering to avoid overwatering. Unexpected heat wave? It may recommend more frequent watering. You'll get a notification each time a schedule changes."
        },
        {
            id: 4,
            question: "How accurate is the water recommendation?",
            answer: "Very accurate! When you input correct soil type and crop information, our model is typically within 90-95% accuracy. The more historical data you provide (through your feedback), the smarter the system becomes for your specific field."
        },
        {
            id: 5,
            question: "What crops does the app support?",
            answer: "We support major crops including wheat, rice, corn, cotton, sugarcane, vegetables (tomato, potato, onion), and many others. If your crop isn't listed, select the closest match or contact us—we're always adding new crops!"
        },
        {
            id: 6,
            question: "Is my data private and secure?",
            answer: "Your field data is yours alone. We don't share personal information with anyone without permission. All data is encrypted and stored securely. You can delete your account and data anytime."
        }
    ];

    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (feedbackText.trim().length > 0) {
            // Here you would send to your backend
            console.log({ type: feedbackType, message: feedbackText });
            setFeedbackSent(true);
            setFeedbackText('');
            setTimeout(() => setFeedbackSent(false), 4000); // Reset after 4s
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-green-50 p-4">
            {/* Background decoration */}
            <div className="fixed top-20 right-0 w-96 h-96 bg-green-100 rounded-full -z-10 opacity-20 blur-3xl" />
            <div className="fixed bottom-0 left-0 w-96 h-96 bg-green-50 rounded-full -z-10 opacity-40 blur-3xl" />

            <div className="w-full max-w-2xl mx-auto">
                {/* Navigation */}
                <div className="mb-8">
                    <Link href="/settings" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors font-semibold text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Settings
                    </Link>
                </div>

                {/* Main Container */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Hero Header */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 md:p-12 text-center relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-400 rounded-full opacity-10 -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full opacity-10 -ml-8 -mb-8" />
                        
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mb-6 border border-white border-opacity-30">
                                <HelpCircle className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">We're Here to Help!</h1>
                            <p className="text-green-50 text-base md:text-lg font-medium">Get answers, share feedback, and let's grow together</p>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto max-h-[calc(100vh-200px)] px-6 md:px-8 py-8 space-y-8">

                        {/* Quick Contact Cards */}
                        <section>
                            <h2 className="text-sm font-bold text-green-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Quick Contact
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Email Card */}
                                <a href="mailto:support@smartirrigate.com" className="group block">
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-2 border-green-200 hover:border-green-400 p-6 rounded-2xl transition-all duration-300 cursor-pointer h-full">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                            <Mail className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-1">Email Support</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Get detailed help via email
                                        </p>
                                        <p className="text-xs text-green-700 font-semibold mt-3">📧 support@smartirrigate.com</p>
                                    </div>
                                </a>

                                {/* Call Card */}
                                <a href="tel:+911234567890" className="group block">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200 hover:border-blue-400 p-6 rounded-2xl transition-all duration-300 cursor-pointer h-full">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                            <Phone className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Speak with our team directly
                                        </p>
                                        <p className="text-xs text-blue-700 font-semibold mt-3">📞 +91 123 456 7890</p>
                                        <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am-5pm IST</p>
                                    </div>
                                </a>
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section>
                            <h2 className="text-sm font-bold text-green-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-3">
                                {faqs.map((faq) => (
                                    <div key={faq.id} className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-green-300 transition-colors">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                            className="w-full flex items-center justify-between p-4 bg-white text-left font-semibold text-gray-900 hover:bg-green-50 transition-colors"
                                        >
                                            <span className="text-base">{faq.question}</span>
                                            <ChevronDown className={`w-5 h-5 text-green-600 flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-green-50`}>
                                            <div className={`${openFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <p className="p-4 text-gray-700 leading-relaxed text-sm border-t-2 border-green-100">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Feedback Section */}
                        <section className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-2xl p-6 md:p-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <Leaf className="w-5 h-5 text-green-600" />
                                Share Your Feedback
                            </h2>
                            <p className="text-sm text-gray-600 mb-5">Your ideas help us grow. Tell us what's working, what can improve, or report any issues you face.</p>

                            {feedbackSent ? (
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-5 flex items-start gap-4 animate-in">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-green-900">Thank You, Farmer! 🌾</p>
                                        <p className="text-sm text-green-700 mt-1">Your feedback has been received. Our team will review it and use it to make the app better for you and other farmers.</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                    {/* Feedback Type */}
                                    <div className="flex gap-3">
                                        <label className="flex items-center gap-3 cursor-pointer flex-1 p-3 bg-white border-2 border-green-200 rounded-xl hover:border-green-400 transition-colors" onClick={() => setFeedbackType('suggestion')}>
                                            <input
                                                type="radio"
                                                name="feedbackType"
                                                value="suggestion"
                                                checked={feedbackType === 'suggestion'}
                                                onChange={() => setFeedbackType('suggestion')}
                                                className="w-4 h-4 text-green-600 cursor-pointer accent-green-600"
                                            />
                                            <span className="text-sm font-medium text-gray-700">💡 Suggestion</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer flex-1 p-3 bg-white border-2 border-red-200 rounded-xl hover:border-red-400 transition-colors" onClick={() => setFeedbackType('issue')}>
                                            <input
                                                type="radio"
                                                name="feedbackType"
                                                value="issue"
                                                checked={feedbackType === 'issue'}
                                                onChange={() => setFeedbackType('issue')}
                                                className="w-4 h-4 text-red-600 cursor-pointer accent-red-600"
                                            />
                                            <span className="text-sm font-medium text-gray-700">🐛 Report Issue</span>
                                        </label>
                                    </div>

                                    {/* Textarea */}
                                    <textarea
                                        value={feedbackText}
                                        onChange={(e) => setFeedbackText(e.target.value)}
                                        className="w-full p-4 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-sm bg-white resize-none placeholder-gray-400 font-medium transition-colors"
                                        placeholder="Share your thoughts here... (Be as detailed as possible to help us understand better)"
                                        rows={5}
                                        required
                                    ></textarea>

                                    {/* Submit Button */}
                                    <button 
                                        type="submit"
                                        disabled={feedbackText.trim().length === 0}
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-base disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                        Submit Feedback
                                    </button>
                                </form>
                            )}
                        </section>

                        {/* Help Tips */}
                        <section className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-blue-900 text-sm mb-2">💡 Pro Tips for Best Results:</p>
                                    <ul className="space-y-1 text-sm text-blue-800">
                                        <li>• <strong>Accurate soil info:</strong> Better details = smarter recommendations</li>
                                        <li>• <strong>Check daily:</strong> Tap into the Schedule view each morning for the day's plan</li>
                                        <li>• <strong>Share feedback:</strong> Tell us how our recommendations worked for you</li>
                                        <li>• <strong>Trust your instinct:</strong> You know your farm best—override when needed!</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <div className="h-6"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
