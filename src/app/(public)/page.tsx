"use client";

import React, { useState } from 'react';
import Link from 'next/link';

/**
 * 1. TIPOV I MOCK PODACI (Srpska verzija)
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
    location: 'Beograd',
    type: 'Puno radno vreme',
    skills: ['React', 'Next.js', 'Tailwind'],
    postedAt: 'pre 2 dana',
  },
  {
    id: '2',
    title: 'Marketing Praktikant',
    company: 'Creative Agency',
    location: 'Daljinski (Remote)',
    type: 'Praksa',
    skills: ['SEO', 'Copywriting', 'Analytics'],
    postedAt: 'pre 1 dan',
  },
  {
    id: '3',
    title: 'Studentski projekat analize podataka',
    company: 'DataTech Labs',
    location: 'Novi Sad',
    type: 'Studentski projekat',
    skills: ['Python', 'SQL', 'Pandas'],
    postedAt: 'pre 3 sata',
  },
];

/**
 * 2. IKONICE
 */
const LogoIcon = () => (
  <svg className="w-8 h-8 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

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
 * 3. POMOĆNE KOMPONENTE (Navbar i Kartica)
 */
const Navbar = () => (
  <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon />
          <span className="text-2xl font-bold text-blue-900 tracking-tight">Career Hub</span>
        </Link>

        {/* Linkovi na srpskom */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/o-nama" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">O nama</Link>
          <Link href="/za-studente" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Za studente</Link>
          <Link href="/za-kompanije" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Za kompanije</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-900 font-bold hover:text-blue-600 px-4 py-2 transition-colors">
            Prijava
          </Link>
          <Link href="/register" className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 py-2.5 rounded-lg transition-all shadow-md active:scale-95">
            Registracija
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

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
 * 4. GLAVNA STRANICA
 */
export default function AdsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Navbar />

      {/* HERO SEKCIJA */}
      <section className="relative w-full pt-40 pb-20 md:pt-48 md:pb-32 px-4 bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#14b8a6]">
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Poveži talenat sa <br /> <span className="text-teal-200">prilikom</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-50 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Vodeća platforma koja spaja studente i diplomce sa kompanijama radi posla, praksi i projekata.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-2xl">
              <div className="flex-grow flex items-center px-4">
                <div className="text-gray-400">
                  <SearchIcon />
                </div>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pretraži poslove, kompanije ili veštine..." 
                  className="w-full py-3.5 px-3 text-gray-700 focus:outline-none bg-transparent text-lg"
                />
              </div>
              <button className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 items-center gap-2">
                <SearchIcon />
                Pretraži
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AKTUELNI OGLASI */}
      <section className="max-w-7xl mx-auto py-24 px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Aktuelni oglasi
            </h2>
            <p className="text-gray-500 mt-2">Prioritetne pozicije dostupne odmah</p>
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


