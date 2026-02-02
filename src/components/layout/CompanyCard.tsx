import React from 'react';
import Image from 'next/image';

// Definišemo šta svaka kartica mora da dobije (ime i logo)
interface CompanyCardProps {
  name: string;
  logo: string;
}

export const CompanyCard = ({ name, logo }: CompanyCardProps) => {
  return (
    // Ovde je border-2 (pojačana bordura) i border-gray-200 (tamnija siva)
    <div className="bg-white aspect-square flex items-center justify-center p-8 rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative">
      <div className="relative w-full h-full">
        <Image 
          src={logo} 
          alt={name} 
          fill 
          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 p-2"
        />
      </div>
    </div>
  );
};