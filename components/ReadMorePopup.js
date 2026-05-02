"use client";
import { useState } from 'react';
import { popupData } from '@/data/herosection/data';
import Link from 'next/link';

const ContactUsPopup = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible((prev) => !prev);
    };

    return (
        <div>
            <button
                className="flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-all duration-300"
                onClick={togglePopup}
                aria-label="Read More"
            >
                <span>Read More</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isPopupVisible ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={togglePopup}
                    ></div>

                    {/* Modal */}
                    <div className="relative bg-[#1a1a3e]/95 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up">
                        {/* Gradient Top Border */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500"></div>

                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            onClick={togglePopup}
                            aria-label="Close Popup"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Content */}
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">{popupData.title}</h2>
                            <p className="text-white/70 leading-relaxed mb-6">{popupData.fullText}</p>

                            <div className="flex gap-4">
                                <Link href="/contact" className="flex-1">
                                    <button className="w-full px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5">
                                        Contact Me
                                    </button>
                                </Link>
                                <button
                                    className="px-6 py-3 rounded-full font-medium text-white/70 border border-white/20 hover:bg-white/10 transition-all duration-300"
                                    onClick={togglePopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUsPopup;
