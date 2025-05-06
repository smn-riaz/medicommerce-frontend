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
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const categories = [
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
    name: "Capsule",
  },
  {
    image: nutrition,
    name: "Food",
  },
  {
    image: skincare,
    name: "Skin Care",
  },
  {
    image: playtime,
    name: "Baby",
  },
  {
    image: drop,
    name: "Drops",
  },
  {
    image: medicine,
    name: "Tablet",
  },
];

const DynamicCategories = () => {
  
    return (
      <div className='flex flex-col justify-between'>
      <h1 className='text-3xl text-center font-bold'>Our Products Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 p-4">
        {categories.map((cat, i) => (
          <Link href={`/shop/${cat.name}`}
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
            <p className="mt-3 flex gap-x-2 text-center text-sm font-medium text-gray-700 group-hover:font-semibold hover:text-md transition-colors">
              {cat.name}  
              <span className="relative">
              <ArrowRight
  className="absolute left-0 transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-blue-700 font-semibold transition-all duration-300 ease-in-out"
/>

              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
    
    
      
      
    );
};

export default DynamicCategories;