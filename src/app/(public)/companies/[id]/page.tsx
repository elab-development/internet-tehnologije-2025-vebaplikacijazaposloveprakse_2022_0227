"use client";

import { MapPin, Globe, Briefcase, ArrowLeft, ExternalLink, Users, Building2, Fingerprint } from "lucide-react"; 
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

    const ads = (company as Company)?.ads || [];
    const activeAdsCount = ads.length;

    return (
      <div className="min-h-screen bg-white">
        <header className="border-b-4 border-career-blue bg-gray-50">
          <div className="container mx-auto px-6 py-10">
            <Link 
              href="/companies"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-hub-cyan mb-8 transition-colors"
            >
              <ArrowLeft size={14} /> Nazad na listu
            </Link>

            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white border-4 border-career-blue shadow-[8px_8px_0px_0px_#2bc3c3] flex items-center justify-center overflow-hidden shrink-0">
                {company?.logoUrl ? (
                  <img src={company.logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
                ) : (
                  <Building2 size={40} className="text-gray-200" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-hub-cyan text-white text-[10px] font-black uppercase tracking-widest px-2 py-1">
                        {company?.industry}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                        <MapPin size={12} className="text-hub-cyan" /> {company?.location}
                    </span>
                </div>
                <h1 className="text-4xl md:text-7xl font-[1000] text-career-blue uppercase italic tracking-tighter leading-[0.8] mb-6">
                  {company?.companyName}
                </h1>
                
                <div className="flex flex-wrap gap-4">
                    <div className="bg-white border-2 border-career-blue/10 px-4 py-2 flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-hub-cyan uppercase tracking-widest">Poreski broj</span>
                            <span className="text-xs font-mono font-black text-career-blue">{company?.taxNumber}</span>
                        </div>
                        <div className="w-[1px] h-6 bg-gray-100"></div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-hub-cyan uppercase tracking-widest">Maticni broj</span>
                            <span className="text-xs font-mono font-black text-career-blue">{company?.regNumber}</span>
                        </div>
                    </div>
                </div>
              </div>

              <div className="w-full lg:w-auto">
                {company?.website && (
                  <a 
                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                    target="_blank"
                    className="flex items-center justify-center gap-3 bg-career-blue text-white px-8 py-4 font-black uppercase text-sm tracking-[0.2em] shadow-[6px_6px_0px_0px_#2bc3c3] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    Poseti sajt <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-16">
          <div className="max-w-5xl">
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-hub-cyan">O kompaniji</h3>
                <div className="h-[1px] flex-1 bg-gray-100"></div>
              </div>
              <p className="text-xl md:text-2xl font-bold text-career-blue/90 leading-relaxed italic border-l-8 border-hub-cyan/20 pl-8">
                {company?.description || "Opis trenutno nije dostupan."}
              </p>
            </section>

            <section>
              <div className="flex items-center justify-between mb-12 border-b-4 border-gray-50 pb-6">
                <h2 className="text-4xl font-[1000] text-career-blue uppercase tracking-tighter italic">
                  Otvorene <span className="text-hub-cyan">pozicije</span>
                </h2>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                    <Users size={14} className="text-career-blue" />
                    <span className="text-xs font-black text-career-blue">{activeAdsCount}</span>
                </div>
              </div>

              {activeAdsCount > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {ads.map((item: any) => (
                    <OpportunityCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="py-24 border-4 border-dashed border-gray-100 flex flex-col items-center justify-center bg-gray-50/50">
                  <Briefcase size={40} className="text-gray-200 mb-4" />
                  <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Trenutno nema aktivnih oglasa</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    );
}