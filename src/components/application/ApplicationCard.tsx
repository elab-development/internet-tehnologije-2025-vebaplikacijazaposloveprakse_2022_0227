"use client";

import { useRouter } from "next/navigation";

interface ApplicationProps {
  adId: number;
  title: string;
  company: string;
  type: string;
  date: string;
  status: string;
  onDelete: () => void;
}

export const ApplicationCard = ({ adId, title, company, type, date, status, onDelete }: ApplicationProps) => {
  const router = useRouter();

  return(
  <div className="group relative bg-white border-4 border-[#1a3a94] p-6 shadow-[8px_8px_0px_0px_rgba(26,58,148,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="bg-[#2bc3c3] text-[#1a3a94] text-[10px] font-black px-2 py-0.5 uppercase">
            {type}
          </span>
          <span className="text-[10px] font-bold text-[#1a3a94]/40 uppercase tracking-widest italic">
            Poslato: {date}
          </span>
        </div>
        <h3 className="text-2xl font-black text-[#1a3a94] uppercase leading-tight">
          {title}
        </h3>
        <p className="text-sm font-bold text-[#1a3a94]/60 uppercase tracking-tighter">
          Kompanija: {company}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button 
        onClick={() => router.push(`/ads/${adId}`)}
        className="flex-1 md:flex-none px-6 py-3 border-4 border-[#1a3a94] font-black uppercase text-xs text-[#1a3a94] hover:bg-[#1a3a94] hover:text-white transition-colors cursor-pointer">
          Vidi oglas
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex-1 md:flex-none px-6 py-3 bg-[#ff4d4d] text-white border-4 border-[#1a3a94] font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(26,58,148,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer">
          Obrisi prijavu
        </button>
      </div>
    </div>

    <div className="absolute -top-4 -right-4 bg-[#1a3a94] text-[#2bc3c3] px-4 py-1 border-4 border-[#1a3a94] font-black uppercase text-[10px] tracking-widest transform rotate-3 pointer-events-none">
      {status}
    </div>
  </div>
)};