import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#1a3a94] text-white py-16 px-6 border-t border-white/10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Kolona 1: Logo */}
        <div className="space-y-6">
          <div className="bg-white p-3 inline-block rounded-xl shadow-lg">
            <Image src="/Logo.jpg" alt="Career Hub Logo" width={130} height={50} className="object-contain" />
          </div>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            Povezujemo ambiciju sa prilikom. Vaš prvi korak ka uspešnoj karijeri počinje ovde.
          </p>
        </div>
        {/* Ovde staješ za prvi commit */}
      </div>
    </footer>
  );
}