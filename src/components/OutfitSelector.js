import React from "react";
import shirt from '../images/outfit selector/KenteShirtPurpleYellow1718028298.6661.jpeg.jpg';
import dress from '../images/outfit selector/c886e9979104a8d4d18fbe9ab46375d7.jpg';
import shorts from '../images/outfit selector/il_1140xN.3229124509_84xq.jpg';
import skirt from '../images/outfit selector/il_1140xN.1917250365_4eo1.jpg'

const OutfitSelector = ({ onSelect }) => {
  const outfitOptions = [
    {
      type: "shirt",
      name: "Shirt",
      description: "Classic formal or casual combination",
      icon: shirt,
    },
    {
      type: "dress",
      name: "Straight Dress",
      description: "Elegant one-piece dress",
      icon: dress,
    },
    {
      type: "shorts",
      name: "Shorts",
      description: "Casual summer outfit",
      icon: shorts,
    },
    {
      type: "skirt",
      name: "Skirt",
      description: "Versatile feminine style",
      icon: skirt,
    },
  ];

  return (
    <div className="p-6">
      <p className="text-gray-600 text-center mb-6">
        Select the base outfit style you'd like to customize
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {outfitOptions.map((outfit) => (
          <div
            key={outfit.type}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer border border-gray-200 hover:border-teal-500"
            onClick={() => onSelect(outfit.type)}
          >
            <div className="flex flex-col items-center text-center">
                <img
                src={outfit.icon}
                alt="outfit"
                className="w-14 h-14"
                />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {outfit.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{outfit.description}</p>
              <button
                className="px-4 py-2 border border-gray-400 text-gray-700 rounded hover:text-white hover:bg-yellow-600 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation(); // prevent double triggering
                  onSelect(outfit.type);
                }}
              >
                Select This Style
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitSelector;
