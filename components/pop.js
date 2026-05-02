"use client";
import React from 'react';
import Image from 'next/image';

const Popup = ({ isOpen, onClose, title, description, imageUrl, date }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-[#1a1a3e]/95 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up">
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500"></div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          onClick={onClose}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Image */}
          {imageUrl && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-500/20">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Date Badge */}
          {date && (
            <div className="flex justify-center mb-4">
              <span className="px-4 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 text-purple-300 text-sm">
                {formatDate(date)}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            {title}
          </h3>

          {/* Description */}
          <p className="text-white/70 text-center leading-relaxed">
            {description}
          </p>

          {/* Action Button */}
          <div className="mt-8 flex justify-center">
            <button
              className="px-8 py-3 rounded-full font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
              onClick={onClose}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
