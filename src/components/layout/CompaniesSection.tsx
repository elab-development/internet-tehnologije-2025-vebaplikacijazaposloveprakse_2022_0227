import React from 'react';
import { CompanyCard } from './CompanyCard';

const companies = [
  { id: 1, name: "Partner 1", logo: "/Logo.jpg" },
  { id: 2, name: "Partner 2", logo: "/Logo.jpg" },
  { id: 3, name: "Partner 3", logo: "/Logo.jpg" },
  { id: 4, name: "Partner 4", logo: "/Logo.jpg" },
];

export default function CompaniesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        
        <h2 className="text-[#1a3a94] text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16">
          Naši <span className="text-[#2bc3c3]">Partneri</span>
        </h2>

        {/* Ovde se dešava magija: map prolazi kroz listu i za svakog crta CompanyCard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {companies.map((company) => (
            <CompanyCard 
              key={company.id} 
              name={company.name} 
              logo={company.logo} 
            />
          ))}
        </div>

        <button className="bg-[#2bc3c3] text-[#1a3a94] font-black px-12 py-4 rounded-full uppercase text-xs tracking-widest hover:bg-[#1a3a94] hover:text-white transition-all shadow-lg">
          Postani partner
        </button>

      </div>
    </section>
  ); 
}