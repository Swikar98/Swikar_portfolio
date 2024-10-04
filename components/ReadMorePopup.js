"use client";
import { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { popupData } from '@/data/herosection/data';
import { FaArrowDown } from 'react-icons/fa';
import Link from 'next/link';

const ContactUsPopup = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible((prev) => !prev);
    };

    return (
        <div>
             <button
            className="flex items-center justify-center bg-blue-900 text-white border-blue-900 border-2 rounded-full p-2 transition-transform transform animate-pulse"
            onClick={togglePopup}
            aria-label="Read More"
        >
            <FaArrowDown size={30} />
        </button>
            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-gradient-to-b from-blue-200 to-white shadow-lg rounded-xl w-11/12 md:w-1/3 p-6">
                        <button
                            className="absolute top-2 right-2"
                            onClick={togglePopup}
                            aria-label="Close Popup"
                        >
                            <MdOutlineClose />
                        </button>
                        <h2 className="text-lg font-bold">{popupData.title}</h2>
                        <p className="my-4">{popupData.fullText}</p>
                        <Link href="/contact">
                            <button className="bg-blue-900 text-white rounded-xl p-2 mt-4">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUsPopup;
