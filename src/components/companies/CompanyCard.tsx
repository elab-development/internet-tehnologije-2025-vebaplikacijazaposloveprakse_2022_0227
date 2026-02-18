import Link from "next/link";
import { Company } from "@/src/types/company";
import { MapPin, Briefcase, ChevronRight, Globe, ExternalLink } from "lucide-react";
export const CompanyCard = ({ item }: { item: Company }) => {
  return (
    <div className="group relative flex flex-col h-full bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-hub-cyan/30 hover:-translate-y-1">
      
      {/* Gornji deo: Logo i Industrija */}
      <div className="flex justify-between items-start p-6 pb-0">
        {/* Ikonica kofera */}
        <div className="w-14 h-14 bg-gradient-to-br from-career-blue to-career-blue/90 flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
          <Briefcase className="w-7 h-7 text-white stroke-[2.5px]" />
        </div>
        
        {/* Industrija badge */}
        <div className="flex items-center bg-hub-cyan px-4 py-2 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white">
            {item.industry}
          </span>
        </div>
      </div>

      {/* Srednji deo: Naziv i Opis */}
      <div className="p-6 pb-4 flex-grow">
        <h3 className="text-2xl font-black text-career-blue mb-4 tracking-tight uppercase leading-tight group-hover:text-hub-cyan transition-colors">
          {item.companyName}
        </h3>
        <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
          {item.description || "Inovativna kompanija fokusirana na razvoj budućih stručnjaka i tehnološki napredak."}
        </p>
      </div>

      {/* Donji deo: Meta informacije */}
      <div className="px-6 pb-6 mt-auto">
        <div className="flex flex-col gap-3 mb-6 pb-6 border-t border-gray-200 pt-6">
          
          {/* Lokacija */}
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-hub-cyan stroke-[2.5px] flex-shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-career-blue">
              {item.location}
            </span>
          </div>
          
          {/* Website - Klikabilan link */}
          {item.website && (
            <a 
              href={item.website.startsWith('http') ? item.website : `https://${item.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-hub-cyan transition-colors group/link w-fit"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe size={16} className="stroke-[2.5px] flex-shrink-0" />
              <span className="text-xs font-semibold underline decoration-hub-cyan/30 decoration-2 underline-offset-2 group-hover/link:decoration-hub-cyan">
                {item.website.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')}
              </span>
              <ExternalLink size={12} className="opacity-50 group-hover/link:opacity-100" />
            </a>
          )}
        </div>

        {/* Action Button */}
        <Link 
          href={`/companies/${item.companyId}`}
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-career-blue text-white text-xs font-black uppercase tracking-[0.15em] transition-all hover:bg-hub-cyan hover:shadow-lg hover:shadow-hub-cyan/20 group/button"
        >
          Detalji profila
          <ChevronRight size={16} className="stroke-[3px] group-hover/button:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Dekorativni akcent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-hub-cyan/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};