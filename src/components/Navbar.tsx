"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn, Building2, BriefcaseBusiness, Info } from "lucide-react";

export default function Navbar() {
  return (
    <div className="fixed top-0 w-full z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12 h-full">
          <div className="relative w-32 h-12 transition-transform hover:scale-105">
            <Link href="/" className="block w-full h-full">
              <Image 
                src="/Logo.png" 
                alt="CareerHub Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
          </div>
          <div className="hidden lg:flex items-center gap-6 h-full">
            <div className="flex items-center gap-2 group cursor-pointer h-full">
              <BriefcaseBusiness size={18} className="text-zinc-400 group-hover:text-hub-cyan transition-colors" />
              <Link href="/oglasi" className="text-sm font-semibold text-zinc-600 group-hover:text-career-blue transition-colors">
                Oglasi
              </Link>
            </div>
            
            <div className="flex items-center gap-2 group cursor-pointer h-full">
              <Building2 size={18} className="text-zinc-400 group-hover:text-hub-cyan transition-colors" />
              <Link href="/kompanije" className="text-sm font-semibold text-zinc-600 group-hover:text-career-blue transition-colors">
                Kompanije
              </Link>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer h-full">
              <Info size={18} className="text-zinc-400 group-hover:text-hub-cyan transition-colors" />
              <Link href="/o-nama" className="text-sm font-semibold text-zinc-600 group-hover:text-career-blue transition-colors">
                O nama
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8 h-full">
          
          <div className="hidden md:flex items-center gap-8 border-r border-zinc-200 pr-8 h-10">
            <div className="group flex flex-col items-end justify-center cursor-pointer h-full">
              <Link href="/register" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-hub-cyan transition-colors">
                Za studente
              </Link>
              <div className="h-[2px] w-0 bg-hub-cyan group-hover:w-full transition-all duration-300" />
            </div>

            <div className="group flex flex-col items-end justify-center cursor-pointer h-full">
              <Link href="/register?role=company" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-career-blue transition-colors">
                Za kompanije
              </Link>
              <div className="h-[2px] w-0 bg-career-blue group-hover:w-full transition-all duration-300" />
            </div>
          </div>
          <div className="flex items-center">
            <Link 
              href="/login" 
              className="flex items-center gap-2.5 px-6 py-2.5 bg-gradient-to-r from-career-blue to-hub-cyan rounded-xl text-white text-sm font-bold shadow-lg shadow-career-blue/20 hover:shadow-xl hover:brightness-105 transition-all active:scale-95"
            >
              <LogIn size={18} />
              <span>Prijava</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}