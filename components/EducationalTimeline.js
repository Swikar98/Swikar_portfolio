"use client";
import React, { useState } from 'react';
import Popup from './pop';

const EducationalTimeline = ({ events }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const handleOpenPopup = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="relative">
        {/* Center Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-teal-500 transform md:-translate-x-1/2"></div>

        {events.map((event, index) => (
          <div
            key={index}
            className={`relative flex items-center mb-12 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline Node */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16 pl-20 md:pl-0' : 'md:pl-16 pl-20 md:pr-0'}`}>
              <div
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
                onClick={() => handleOpenPopup(event)}
              >
                {/* Date Badge */}
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 mb-4">
                  <span className="text-purple-300 text-sm font-medium">
                    {formatDate(event.date)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Read More Button */}
                <button className="flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
                  <span>View Details</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Spacer for opposite side */}
            <div className="hidden md:block md:w-5/12"></div>
          </div>
        ))}
      </div>

      <Popup
        isOpen={isOpen}
        onClose={handleClosePopup}
        title={selectedEvent.title}
        description={selectedEvent.description}
        imageUrl={selectedEvent.imageUrl}
        date={selectedEvent.date}
      />
    </div>
  );
};

export default EducationalTimeline;
