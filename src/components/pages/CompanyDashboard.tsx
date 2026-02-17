'use client';
import { useState } from 'react';
import { Ad, JobStatus, JobType } from "@/src/types/ad";
import { Plus, Users, Briefcase, Search, XCircle, AlertCircle, MousePointer2 } from "lucide-react";
import CreateAdModal from '../companies/CreateAdModal';

export default function CompanyDashboard() {
    const [activeTab, setActiveTab] = useState<'oglasi' | 'prijave'>('oglasi');
    const [ads, setAds] = useState<Ad[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="p-8 bg-white min-h-screen font-sans selection:bg-[#2bc3c3] selection:text-[#1a3a94]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-6xl font-[1000] uppercase tracking-tighter text-[#1a3a94] leading-none">
                        WORK<span className="text-[#2bc3c3]">SPACE</span>
                    </h1>
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => setActiveTab('oglasi')}
                            className={`cursor-pointer text-xs font-black uppercase tracking-[0.2em] pb-1 border-b-4 transition-all ${activeTab === 'oglasi' ? 'border-[#2bc3c3] text-[#1a3a94]' : 'border-transparent text-gray-400 hover:text-[#1a3a94]'}`}
                        >
                            Moji Oglasi
                        </button>
                        <button
                            onClick={() => setActiveTab('prijave')}
                            className={`cursor-pointer text-xs font-black uppercase tracking-[0.2em] pb-1 border-b-4 transition-all ${activeTab === 'prijave' ? 'border-[#2bc3c3] text-[#1a3a94]' : 'border-transparent text-gray-400 hover:text-[#1a3a94]'}`}
                        >
                            Pristigle Prijave
                        </button>
                    </div>
                </div>

                <button onClick={() => setIsModalOpen(true)} className="cursor-pointer group relative px-8 py-4 bg-[#1a3a94] border-2 border-[#1a3a94] transition-all duration-300 active:scale-95 hover:bg-[#2bc3c3] hover:border-[#1a3a94]">
                    <div className="relative flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-white border-2 border-[#1a3a94] transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[4px_4px_0px_0px_rgba(26,58,148,1)]">
                            <Plus size={14} className="text-[#1a3a94]" strokeWidth={4} />
                        </div>
                        <span className="text-white text-sm font-[1000] uppercase tracking-widest transition-colors duration-300 group-hover:text-[#1a3a94]">
                            Novi oglas
                        </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#1a3a94] opacity-0 group-hover:opacity-100 transition-all" />
                </button>
            </div>

            <div className="relative">
                {activeTab === 'oglasi' ? (
                    ads && ads.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {ads.map((ad) => (
                                <div key={ad.id} className="group border-4 border-[#1a3a94] p-6 hover:bg-[#1a3a94] transition-all flex items-center justify-between shadow-[8px_8px_0px_0px_rgba(43,195,195,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                                    <div className="flex items-center gap-6">
                                        <div className="bg-[#2bc3c3] p-4 border-2 border-[#1a3a94] group-hover:bg-white transition-colors">
                                            <Briefcase className="text-[#1a3a94]" size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1a3a94] group-hover:text-white">
                                                {ad.title}
                                            </h3>
                                            <div className="flex gap-3 mt-1">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2bc3c3]">{ad.jobType}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-300 italic">{ad.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="text-center">
                                            <p className="text-3xl font-[1000] text-[#1a3a94] group-hover:text-[#2bc3c3] leading-none">
                                                {ad._count?.applications || 0}
                                            </p>
                                            <p className="text-[9px] font-black uppercase text-gray-400 group-hover:text-white/50">Prijave</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <button className="bg-white border-2 border-[#1a3a94] p-2 text-[#1a3a94] hover:bg-[#2bc3c3] transition-colors cursor-pointer">
                                                <Search size={16} strokeWidth={3} />
                                            </button>
                                            <button className="bg-white border-2 border-[#1a3a94] p-2 text-[#1a3a94] hover:bg-red-400 transition-colors cursor-pointer">
                                                <XCircle size={16} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-20 border-4 border-dashed border-gray-200 bg-gray-50/50">
                            <AlertCircle size={48} className="text-gray-300 mb-4" />
                            <h2 className="text-3xl font-black text-[#1a3a94] uppercase tracking-tighter">Niste objavili ni jedan oglas</h2>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2 mb-8">Vasa lista oglasa je trenutno prazna</p>
                            <button onClick={() => setIsModalOpen(true)} className="cursor-pointer bg-[#2bc3c3] border-4 border-[#1a3a94] px-10 py-4 text-[#1a3a94] font-[1000] uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(26,58,148,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                                Napravite prvi oglas
                            </button>
                        </div>
                    )
                ) : (
                    <div className="relative border-4 border-[#1a3a94] p-20 bg-white overflow-hidden shadow-[12px_12px_0px_0px_rgba(26,58,148,0.05)]">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="mb-6 relative">
                                <div className="absolute -inset-4 bg-[#2bc3c3] opacity-20 blur-xl rounded-full animate-pulse" />
                                <MousePointer2 size={64} className="text-[#1a3a94] relative rotate-12" strokeWidth={2.5} />
                            </div>
                            
                            <h2 className="text-4xl font-[1000] uppercase text-[#1a3a94] tracking-tighter mb-4">
                                Izaberite <span className="text-[#2bc3c3]">Oglas</span>
                            </h2>
                            
                            <div className="max-w-md">
                                <p className="text-gray-400 font-bold text-sm uppercase tracking-[0.2em] leading-relaxed">
                                    Da biste videli prijave i kandidate, morate prvo oznaciti oglas na listi oglasa.
                                </p>
                            </div>

                            <button 
                                onClick={() => setActiveTab('oglasi')}
                                className="mt-8 flex items-center gap-2 text-[#1a3a94] font-black uppercase text-[10px] tracking-widest border-b-2 border-[#1a3a94] hover:text-[#2bc3c3] hover:border-[#2bc3c3] transition-all cursor-pointer"
                            >
                                Idi na listu oglasa <Search size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 right-0 p-4 opacity-10 pointer-events-none select-none">
                <h1 className="text-[150px] font-black leading-none">HUB</h1>
            </div>
            <CreateAdModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}