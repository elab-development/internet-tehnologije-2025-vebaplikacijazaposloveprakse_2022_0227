import React from 'react';

export default function CompaniesSection() {
  return (
    <section className="py-20 bg-[#1a3a94]/5">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-[#1a3a94] text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">
          Kompanije na platformi <span className="text-[#2bc3c3]">Career Hub</span>
        </h2>
        <div className="flex justify-center items-center mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 transition-transform hover:scale-105 duration-300">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Belgrade_Airport_Logo.svg" 
              alt="Belgrade Airport" 
              className="h-12 md:h-16 object-contain"
            />
          </div>
        </div>
        <button className="bg-[#2bc3c3] text-[#1a3a94] font-extrabold px-12 py-4 rounded-full uppercase text-xs tracking-[0.2em] hover:bg-[#1a3a94] hover:text-white transition-all shadow-lg shadow-[#2bc3c3]/20">
          Pridružite se
        </button>
      </div>
    </section>
  );
}