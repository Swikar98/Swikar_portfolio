"use client";
import React, { useState } from 'react';
import { stackItems } from '@/data/stack/stackData'; 

const StackDisplay = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (index) => {
        setSelectedItem(index);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stackItems.map((item, index) => (
                    <div 
                        key={index} 
                        className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-transform duration-300 hover:scale-105`} 
                        onClick={() => handleSelect(index)}
                    >
                        <div className="flex items-center mb-4">
                            <span className="text-4xl">{item.icon}</span>
                            <h2 className="text-2xl font-bold ml-3">{item.name}</h2>
                        </div>
                        <p className="text-gray-700 mb-4">{item.details}</p>
                        <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:underline"
                        >
                            Learn More
                        </a>
                    </div>
                ))}
            </div>

            {isOpen && selectedItem !== null && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-1/3">
                        <h2 className="text-2xl font-bold">{stackItems[selectedItem].name}</h2>
                        <p className="text-gray-700 mb-4">{stackItems[selectedItem].details}</p>
                        <a 
                            href={stackItems[selectedItem].url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:underline mb-4 block"
                        >
                            Learn More
                        </a>
                        <button 
                            className="bg-blue-500 text-white rounded px-4 py-2" 
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StackDisplay;
