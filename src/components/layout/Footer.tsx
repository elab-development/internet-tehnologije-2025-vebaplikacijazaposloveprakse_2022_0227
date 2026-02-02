import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#1a3a94] text-white py-16 px-6 border-t border-white/10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Kolona 1: Logo i opis (Prvi deo koda) */}
        <div className="space-y-6">
          <div className="bg-white p-3 inline-block rounded-xl shadow-lg">
            <Image src="/Logo.jpg" alt="Career Hub Logo" width={130} height={50} className="object-contain" />
          </div>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            Povezujemo ambiciju sa prilikom. Vaš prvi korak ka uspešnoj karijeri počinje ovde.
          </p>
        </div>

        {/* Kolona 2: Meni (Drugi deo koda) */}
        <div className="space-y-6">
          <h4 className="text-[#2bc3c3] font-bold uppercase tracking-widest text-xs">Meni</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="/" className="hover:text-[#2bc3c3] transition-colors">Početna</a></li>
            <li><a href="/ponuda" className="hover:text-[#2bc3c3] transition-colors">Ponuda</a></li>
            <li><a href="/za-kompanije" className="hover:text-[#2bc3c3] transition-colors">Za kompanije</a></li>
            <li><a href="/o-nama" className="hover:text-[#2bc3c3] transition-colors">O nama</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[#2bc3c3] font-bold uppercase tracking-widest text-xs">Kontakt</h4>
          <div className="space-y-4 text-sm">
            <div className="flex flex-col">
              <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">Lokacija</span>
              <p className="font-semibold text-white/90">Jove Ilića 154, Beograd</p>
            </div>
            <div className="flex flex-col">
              <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">E-mail</span>
              <a href="mailto:office@careerhub.rs" className="font-semibold text-white hover:text-[#2bc3c3] transition-colors">
                office@careerhub.rs
              </a>
            </div>
          </div>
        </div>
      </div> 

      
      <div className="container mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">
        <p>© 2026 CAREER HUB. SVA PRAVA ZADRŽANA.</p>
        <p className="mt-4 md:mt-0 opacity-50">Design & Development by Career Hub Team</p>
      </div>

      </div>
    </footer>
  );
}