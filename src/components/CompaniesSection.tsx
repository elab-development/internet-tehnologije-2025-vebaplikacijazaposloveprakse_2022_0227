import React from 'react';


// 1. Ovde pravimo spisak (niz) kompanija
const companies = [
  { id: 1, name: "Partner 1" },
  { id: 2, name: "Partner 2" },
  { id: 3, name: "Partner 3" },
  { id: 4, name: "Partner 4" },
];

export default function CompaniesSection() {
  // 2. Ovde počinje logika
  
  return (
    // 3. Sve unutar ovog return-a se prikazuje na sajtu
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        
        {/* NASLOV */}
        <h2 className="text-[#1a3a94] text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16">
          Naši <span className="text-[#2bc3c3]">Partneri</span>
        </h2>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {companies.map((company) => (
            <div 
              key={company.id} 
              className="bg-white aspect-square flex items-center justify-center p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <img 
                src="/Logo.jpg" 
                alt={company.name} 
                className="max-h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" 
              />
            </div>
          ))}
        </div>
        {/* --- KRAJ GRIDA --- */}

        {/* DUGME */}
        <button className="bg-[#2bc3c3] text-[#1a3a94] font-black px-12 py-4 rounded-full uppercase text-xs tracking-widest hover:bg-[#1a3a94] hover:text-white transition-all shadow-lg shadow-[#2bc3c3]/20">
          Postani partner
        </button>

      </div>
    </section>
  ); 
}