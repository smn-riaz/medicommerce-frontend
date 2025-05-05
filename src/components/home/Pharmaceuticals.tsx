'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Import assets
import square from '../../assets/square.svg';
import aristopharma from '../../assets/aristopharma.png';
import acme from '../../assets/acme.png';
import aci from '../../assets/aci.svg';
import healthcare from '../../assets/healthcare.png';
import renetea from '../../assets/renetea.png';
import opsonin from '../../assets/opsonin.png';
import beximco from '../../assets/beximco.png';
import incepta from '../../assets/incepta.png';
import gilead from '../../assets/gilead.svg';
import amgen from '../../assets/amgen.svg';
import bristol from '../../assets/bristol.svg';
import pfizer from '../../assets/phizer.png';
import merckco from '../../assets/merckco.png';

// Logos array
const logos = [
  { image: aristopharma, color: '#e0e0e0', height: 250, width: 200 },
  { image: acme, color: '#e0e0e0', height: 180, width: 170 },
  { image: aci, color: '#d0d0d0', height: 200, width: 180 },
  { image: healthcare, color: '#c0c0c0', height: 55, width: 55 },
  { image: renetea, color: '#b0b0b0', height: 55, width: 60 },
  { image: opsonin, color: '#a0a0a0', height: 90, width: 90 },
  { image: beximco, color: '#909090', height: 80, width: 65 },
  { image: incepta, color: '#808080', height: 55, width: 55 },
  { image: square, color: '#707070', height: 50, width: 55 },
  { image: gilead, color: '#707070', height: 250, width: 130 },
  { image: amgen, color: '#707070', height: 200, width: 110 },
  { image: bristol, color: '#707070', height: 200, width: 200 },
  { image: pfizer, color: '#707070', height: 130, width: 150 },
  { image: merckco, color: '#707070', height: 110, width: 120 },
];

export default function Pharmaceuticals() {
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-12 overflow-hidden">
      <motion.div
        className="flex gap-x-16 w-max"
        initial={{ x: 0 }}
        animate={{ x: `-${100 / 2}%` }} 
        transition={{ repeat: Infinity, duration: 100, ease: 'linear' }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center">
            <Image
              src={logo.image}
              alt={`Logo ${index}`}
              width={logo.width}
              height={logo.height}
              className="grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
