import { Briefcase, Pencil, Search, XCircle } from "lucide-react";
import { Ad } from "@/src/types/ad";

interface AdCardProps {
    ad: Ad;
    onSelect: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (ad: Ad) => void;
}

export const AdCard = ({ ad, onSelect, onDelete, onEdit }: AdCardProps) => (
    <div className="group border-4 border-[#1a3a94] p-6 hover:bg-[#1a3a94] transition-all flex items-center justify-between shadow-[8px_8px_0px_0px_rgba(43,195,195,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
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
                <button onClick={() => onSelect(ad.id)} className="bg-white border-2 border-[#1a3a94] p-2 text-[#1a3a94] hover:bg-[#2bc3c3] transition-colors cursor-pointer">
                    <Search size={16} strokeWidth={3} />
                </button>
                <button onClick={() => onEdit(ad)} className="bg-white border-2 border-[#1a3a94] p-2 text-[#1a3a94] hover:bg-[#ffdc00] transition-colors cursor-pointer" title="Izmeni oglas">
                    <Pencil size={16} strokeWidth={3} />
                </button>
                <button onClick={() => onDelete(ad.id)} className="bg-white border-2 border-[#1a3a94] p-2 text-[#1a3a94] hover:bg-red-400 transition-colors cursor-pointer">
                    <XCircle size={16} strokeWidth={3} />
                </button>
            </div>
        </div>
    </div>
);