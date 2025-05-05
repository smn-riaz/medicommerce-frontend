import React from 'react';

import injection from '../../assets/injection.png'
import syrup from '../../assets/syrup.png'
import drugs from '../../assets/drugs.png'
import nutrition from '../../assets/nutrition.png'

import skincare from '../../assets/skincare.png'
import playtime from '../../assets/playtime.png'
import drop from '../../assets/eye-dropper.png'
import medicine from '../../assets/medicine.png'
import Image from 'next/image';


const DynamicCategories = () => {
    const categories = [
        {
          image: injection,
          name: "Injection",
        },
        {
          image: syrup,
          name: "Syrup",
        },
        {
          image: drugs,
          name: "Drugs",
        },
        {
          image: nutrition,
          name: "Nutrition",
        },
        {
          image: skincare,
          name: "Skincare",
        },
        {
          image: playtime,
          name: "Playtime",
        },
        {
          image: drop,
          name: "Eye Drops",
        },
        {
          image: medicine,
          name: "Medicine",
        },
      ];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center p-4 cursor-pointer group"
          >
            <div className="bg-slate-100 p-2 rounded-full group-hover:scale-105 transition-transform duration-200">
              <Image
                src={cat.image}
                alt={cat.name}
                width={40}
                height={40}
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
      
      
    );
};

export default DynamicCategories;