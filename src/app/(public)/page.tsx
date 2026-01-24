
"use client";

import React, { useState } from 'react';

/**
 * 1. TIPES & MOCK DATA
 */
interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  skills: string[];
  postedAt: string;
}

const OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Junior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'Belgrade',
    type: 'Full-time',
    skills: ['React', 'Next.js', 'Tailwind'],
    postedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Marketing Intern',
    company: 'Creative Agency',
    location: 'Remote',
    type: 'Internship',
    skills: ['SEO', 'Copywriting', 'Analytics'],
    postedAt: '1 day ago',
  },
  {
    id: '3',
    title: 'Data Analysis Student Project',
    company: 'DataTech Labs',
    location: 'Novi Sad',
    type: 'Student Project',
    skills: ['Python', 'SQL', 'Pandas'],
    postedAt: '3 hours ago',
  },
];

/**
 * 2. ICONS
 */
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

/**
 * 3. SUB-COMPONENT: OPPORTUNITY CARD
 */
const OpportunityCard = ({ item }: { item: Opportunity }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
    <div className="mb-5">
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <BriefcaseIcon />
      </div>
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
        {item.title}
      </h3>
      <p className="text-blue-600 font-semibold text-sm">{item.company}</p>
    </div>

    <div className="space-y-2.5 mb-6">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <MapPinIcon />
        <span>{item.location}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <ClockIcon />
        <span>{item.type}</span>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-8">
      {item.skills.map((skill) => (
        <span 
          key={skill} 
          className="px-3 py-1 bg-teal-50 text-teal-700 text-[11px] font-bold rounded-full uppercase tracking-wider border border-teal-100"
        >
          {skill}
        </span>
      ))}
    </div>

    <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
      <span className="text-xs text-gray-400 font-medium">
        Objavljeno: {item.postedAt}
      </span>
      <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
        Detalji &rarr;
      </button>
    </div>
  </div>
);

/**
 * 4. MAIN PAGE COMPONENT
 */
export default function AdsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full py-20 md:py-32 px-4 bg-gradient-to-br from-blue-700 via-blue-600 to-teal-500">
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Poveži talenat sa <br /> <span className="text-teal-200">prilikom</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-50 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Spajamo studente i diplomce sa vodećim kompanijama. 
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center bg-white p-2 rounded-2xl shadow-2xl">
              <div className="flex-grow flex items-center px-4">
                <div className="text-gray-400">
                  <SearchIcon />
                </div>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pretraži poslove ili kompanije..." 
                  className="w-full py-3.5 px-3 text-gray-700 focus:outline-none bg-transparent text-lg"
                />
              </div>
              <button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95">
                Pretraži
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED OPPORTUNITIES */}
      <section className="max-w-7xl mx-auto py-24 px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Aktuelni oglasi
            </h2>
          </div>
          <button className="px-6 py-3 border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all">
            Pogledaj sve oglase
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {OPPORTUNITIES.map((opp) => (
            <OpportunityCard key={opp.id} item={opp} />
          ))}
        </div>
      </section>
    </div>
  );
}
