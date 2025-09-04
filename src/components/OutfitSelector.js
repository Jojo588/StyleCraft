import React from "react"; 
import shirt from '../images/outfit selector/KenteShirtPurpleYellow1718028298.6661.jpeg.jpg';
import dress from '../images/outfit selector/c886e9979104a8d4d18fbe9ab46375d7.jpg';
import shorts from '../images/outfit selector/il_1140xN.3229124509_84xq.jpg';
import skirt from '../images/outfit selector/il_1140xN.1917250365_4eo1.jpg';

const OutfitSelector = ({ onSelect }) => {
  const outfitOptions = [
    {
      type: "shirt",
      name: "Shirt",
      description: "Classic formal",
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
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white rounded-xl sm:rounded-2xl shadow-inner">
      <p className="text-gray-700 text-center mb-6 sm:mb-8 text-base sm:text-lg md:text-xl font-medium px-2">
        Select the base outfit style you'd like to customize
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {outfitOptions.map((outfit) => (
          <div
            key={outfit.type}
            className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 cursor-pointer border border-gray-200 hover:border-teal-500 hover:-translate-y-1"
            onClick={() => onSelect(outfit.type)}
          >
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <img
                src={outfit.icon}
                alt="outfit"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-full border-4 border-gray-100 shadow-sm"
              />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                {outfit.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-snug px-2 sm:px-4">
                {outfit.description}
              </p>
              <button
                className="mt-2 px-4 sm:px-5 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm sm:text-base font-medium rounded-md sm:rounded-lg shadow hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 w-full sm:w-auto"
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
