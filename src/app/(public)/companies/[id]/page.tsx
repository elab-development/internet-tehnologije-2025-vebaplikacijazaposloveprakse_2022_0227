"use client";

import { MapPin, Globe, Briefcase, ArrowLeft, ExternalLink, Users } from "lucide-react"; 
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { companyService } from "@/src/services/companyService";
import { Company } from "@/src/types/company";
import { OpportunityCard } from "@/src/components/ads/OpportunityCard";
import { LoadingState } from "@/src/components/ui/LoadingState";
import { ErrorState } from "@/src/components/ui/ErrorState";
import Link from "next/link";

export default function CompanyProfileDesign() {
    const [company, setCompany] = useState<Company | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const param = useParams();
    const companyId = param.id;

    useEffect(() => {
        const fetchCompany = async () => {
            if (!companyId) return;
            setLoading(true);
            try {
                const res = await companyService.getCompanyById(Number(companyId)); 
                setCompany(res);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Greska pri dobavljanju kompanije");
            } finally {
                setLoading(false);
            }
        };
        fetchCompany();
    }, [companyId]);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;

    const activeAdsCount = (company as any)?.ads?.length || 0;

    return (
      <div className="min-h-screen bg-white">
        
        <div className="bg-gray-50 border-b-2 border-gray-200">
          <div className="container mx-auto px-6 py-8">
            
            <Link 
              href="/companies"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-hub-cyan transition-colors mb-8 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Sve kompanije
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2">
                
                <div className="inline-flex items-center bg-hub-cyan px-4 py-2 shadow-sm mb-6">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                    {company?.industry || "IT"}
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-career-blue mb-8 tracking-tighter uppercase italic leading-none">
                  {company?.companyName || "Učitavanje..."}
                </h1>

                <div className="border-l-4 border-hub-cyan pl-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-hub-cyan mb-4">
                    O kompaniji
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {company?.description || "Opis kompanije nije dostupan."}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white border-4 border-career-blue p-8 sticky top-8">
                  
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
                    <h4 className="font-black uppercase text-career-blue text-sm tracking-wider">
                      Kontakt Info
                    </h4>
                    <Briefcase size={20} className="text-hub-cyan" />
                  </div>

                  <div className="space-y-6">
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-hub-cyan/10 flex items-center justify-center shrink-0">
                        <MapPin size={18} className="text-hub-cyan stroke-[2.5px]" />
                      </div>
                      <div className="pt-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Lokacija</p>
                        <p className="font-black uppercase text-xs tracking-wide text-career-blue">
                          {company?.location || "Nepoznata lokacija"}
                        </p>
                      </div>
                    </div>
                    
                    {company?.website && (
                      <a 
                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 group/link"
                      >
                        <div className="w-10 h-10 bg-career-blue/10 flex items-center justify-center shrink-0">
                          <Globe size={18} className="text-career-blue stroke-[2.5px]" />
                        </div>
                        <div className="pt-1">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Website</p>
                          <p className="font-bold text-xs text-career-blue group-hover/link:text-hub-cyan transition-colors flex items-center gap-2">
                            {company.website.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')}
                            <ExternalLink size={12} />
                          </p>
                        </div>
                      </a>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-hub-cyan/10 flex items-center justify-center shrink-0">
                        <Users size={18} className="text-hub-cyan stroke-[2.5px]" />
                      </div>
                      <div className="pt-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Otvorene pozicije</p>
                        <p className="font-black uppercase text-xs tracking-wide text-career-blue">
                          {activeAdsCount} {activeAdsCount === 1 ? 'Oglas' : 'Oglasa'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="container mx-auto px-6 py-16">
          
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-career-blue uppercase tracking-tighter italic mb-2">
              Otvorene <span className="text-hub-cyan">Pozicije</span>
            </h2>
            <p className="text-sm font-medium text-gray-600">
              {activeAdsCount > 0 
                ? `Trenutno ${activeAdsCount} ${activeAdsCount === 1 ? 'dostupna pozicija' : 'dostupne pozicije'}`
                : 'Trenutno nema aktivnih oglasa'}
            </p>
          </div>

          {activeAdsCount > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t-2 border-l-2 border-career-blue/10">
              {(company as any).ads.map((item: any) => (
                <OpportunityCard item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-gray-200 mb-4">
                <Briefcase size={28} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">
                Trenutno nema aktivnih oglasa
              </p>
            </div>
          )}
        </section>
      </div>
    );
}