'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, HelpCircle, MessageSquare, Mail, ChevronDown, CheckCircle2, ChevronRight, Send, Phone } from 'lucide-react';

export default function HelpPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    const faqs = [
        {
            id: 1,
            question: "How is the irrigation schedule calculated?",
            answer: "We use local weather data, your crop type, and soil information to calculate the exact water needs using scientific evapotranspiration models."
        },
        {
            id: 2,
            question: "Can I manually change the schedule?",
            answer: "Yes! on the Schedule Comparison screen, you can choose to 'Skip' or 'Override' any recommendation if you disagree with it."
        },
        {
            id: 3,
            question: "Is the app free to use?",
            answer: "The basic scheduling features are completely free for small farmers. Advanced analytics may require a premium subscription in the future."
        }
    ];

    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFeedbackSent(true);
        setTimeout(() => setFeedbackSent(false), 3000); // Reset after 3s
    };

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
                            <HelpCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
                        <p className="text-gray-500 text-sm mt-1">We're here to assist you</p>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="p-6 overflow-y-auto space-y-8 scroll-smooth flex-1">

                        {/* Contact Options */}
                        <div className="grid grid-cols-2 gap-4">
                            <a href="mailto:support@smartirrigate.com" className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 p-4 rounded-2xl transition-colors border border-blue-100 group">
                                <div className="bg-white p-2 rounded-full mb-2 shadow-sm group-hover:scale-110 transition-transform">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="text-sm font-bold text-gray-800">Email Us</span>
                                <span className="text-xs text-blue-600">Get a reply in 24h</span>
                            </a>
                            <a href="tel:+911234567890" className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 p-4 rounded-2xl transition-colors border border-green-100 group">
                                <div className="bg-white p-2 rounded-full mb-2 shadow-sm group-hover:scale-110 transition-transform">
                                    <Phone className="w-5 h-5 text-green-600" />
                                </div>
                                <span className="text-sm font-bold text-gray-800">Call Support</span>
                                <span className="text-xs text-green-600">Mon-Fri, 9am-5pm</span>
                            </a>
                        </div>

                        {/* FAQ Section */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-gray-400" />
                                Common Questions
                            </h2>
                            <div className="space-y-3">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                            className="w-full flex items-center justify-between p-4 bg-white text-left font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            {faq.question}
                                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <p className="p-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Feedback Form */}
                        <section className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Send Feedback</h2>
                            <p className="text-sm text-gray-500 mb-4">Help us improve the app for all farmers.</p>

                            {feedbackSent ? (
                                <div className="bg-green-100 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-green-700 animate-fade-in">
                                    <CheckCircle2 className="w-6 h-6" />
                                    <div>
                                        <p className="font-bold text-sm">Thank You!</p>
                                        <p className="text-xs">Your feedback has been received.</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                                    <textarea
                                        className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm min-h-[100px] resize-none"
                                        placeholder="Tell us what you think or report an issue..."
                                        required
                                    ></textarea>
                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm">
                                        <Send className="w-4 h-4" />
                                        Submit Feedback
                                    </button>
                                </form>
                            )}
                        </section>

                        <div className="h-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
