import React from 'react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  skills: string[];
  postedAt: string;
}

export const OpportunityCard = ({ item }: { item: Opportunity }) => (
  <div className="bg-white p-8 transition-all duration-500 flex flex-col h-full group hover:bg-[#1a3a94]/5 cursor-pointer relative overflow-hidden">
    {/* --- DEKORATIVNI ELEMENT NA HOVERU --- */}
    <div className="absolute top-0 right-0 w-0 h-1 bg-[#2bc3c3] transition-all duration-500 group-hover:w-full" />
    
    <div className="mb-6">
      {/* Oštra kocka za ikonicu */}
      <div className="w-12 h-12 bg-[#1a3a94]/5 border border-[#1a3a94]/10 flex items-center justify-center text-[#1a3a94] mb-6 group-hover:bg-[#1a3a94] group-hover:text-white transition-all duration-300">
        <Briefcase size={22} />
      </div>
      
      <h3 className="text-2xl font-black text-[#1a3a94] leading-tight mb-2 tracking-tighter">
        {item.title}
      </h3>
      <p className="text-[#2bc3c3] font-black text-xs uppercase tracking-[0.2em]">
        {item.company}
      </p>
    </div>

    <div className="space-y-3 mb-8">
      <div className="flex items-center gap-3 text-slate-500 text-sm font-bold uppercase tracking-tight">
        <MapPin size={16} className="text-[#2bc3c3]" />
        <span>{item.location}</span>
      </div>
      <div className="flex items-center gap-3 text-slate-500 text-sm font-bold uppercase tracking-tight">
        <Clock size={16} className="text-[#2bc3c3]" />
        <span>{item.type}</span>
      </div>
    </div>

    {/* Skills - kockasti tagovi */}
    <div className="flex flex-wrap gap-2 mb-10">
      {item.skills.map((skill) => (
        <span 
          key={skill} 
          className="px-3 py-1 bg-white border border-gray-200 text-[#1a3a94] text-[9px] font-black uppercase tracking-[0.15em] group-hover:border-[#2bc3c3] transition-colors"
        >
          {skill}
        </span>
      ))}
    </div>

    {/* Footer kartice */}
    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Objavljeno</span>
        <span className="text-xs text-[#1a3a94] font-black">{item.postedAt}</span>
      </div>
      
      <div className="flex items-center gap-2 text-xs font-black text-[#1a3a94] uppercase tracking-widest group-hover:text-[#2bc3c3] transition-all">
        Detalji <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);
