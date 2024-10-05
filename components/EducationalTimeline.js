import React, { useState } from 'react';
import Popup from './pop'; // Ensure this path is correct

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

  return (
    <div className="max-w-4xl mx-auto p-5 h-full">
      <h2 className="text-3xl font-bold text-center mb-6">Educational Timeline</h2>
      <div className="relative">
        {events.map((event, index) => (
          <div key={index} className={`mb-10 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`absolute top-0 w-1 h-full bg-gray-200 ${index % 2 === 0 ? 'md:left-1/2 left-2' : 'md:right-1/2 right-2'} hidden md:block`} />
            <div className={`flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white z-10 absolute ${index % 2 === 0 ? 'md:left-1/2 left-2 transform -translate-x-1/2' : 'md:right-1/2 right-2 transform translate-x-1/2'}`}>
              {index + 1}
            </div>
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:px-8 px-8' : 'lg:px-8 px-8'}`}>
              <div className={`ml-4 ${index % 2 === 0 ? 'mr-auto text-left' : 'ml-auto text-right'}`}>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date}</p>
                <p className="mt-1">{event.description}</p>
                <button 
                  className="mt-2 text-blue-500 underline" 
                  onClick={() => handleOpenPopup(event)} // Open popup with the event data
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Popup 
        isOpen={isOpen} 
        onClose={handleClosePopup} 
        title={selectedEvent.title} 
        description={selectedEvent.description} 
        imageUrl={selectedEvent.imageUrl} // Use the image URL from the selected event
      />
    </div>
  );
};

export default EducationalTimeline;
