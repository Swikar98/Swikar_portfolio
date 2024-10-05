import React from 'react';
import Image from 'next/image';

const Popup = ({ isOpen, onClose, title, description, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            height={100} 
            width={100} 
            className="mb-4 rounded"
          />
        )}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
        <button 
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded" 
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
