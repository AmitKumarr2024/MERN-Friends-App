import React from 'react';

const Card = ({ image, title, description, buttonText, onButtonClick }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image Section */}
      {image && (
        <img
          src={image}
          alt={title || "Card Image"}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Card Content */}
      <div className="p-4">
        {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
        {description && (
          <p className="mt-2 text-gray-600 text-sm font-bold  ">
            {description}
          </p>
        )}

        {/* Button */}
        {buttonText && (
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
