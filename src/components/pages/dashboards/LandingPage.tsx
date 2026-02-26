'use client';
import { ErrorState } from "@/src/components/ui/ErrorState";
import HeaderSection from "@/src/components/layout/HeaderSection";
import { LoadingState } from "@/src/components/ui/LoadingState";
import { OpportunityCard } from "@/src/components/ads/OpportunityCard";
import { SectionHeader } from "@/src/components/ui/SectionHeader";
import { adService } from "@/src/services/adService";
import { Ad } from "@/src/types/ad";
import { useEffect, useState } from "react";
import CompaniesSection from "@/src/components/layout/CompaniesSection";
import { adzunaService } from "@/src/services/publicAPI/adzunaService";

const ALL_POSITIONS = [
  "Software Engineer",
  "Web Developer", 
  "DevOps Engineer",
  "Cloud Engineer",
  "Java Developer",
  "Python Developer",
  "Backend Developer",
  "Mobile Developer",
  "QA Engineer",
  "Full Stack Developer"
];

const SALARY_POSITIONS = ALL_POSITIONS.sort(() => Math.random() - 0.5).slice(0, 3);
export default function LandingPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [salaries, setSalaries] = useState<Record<string, number | null>>({});
  const [salaryLoading, setSalaryLoading] = useState<boolean>(true);
  useEffect(() => {

    const fetchAds = async () => {
      setLoading(true);
      try {
        const res = await adService.getAds();
        setAds(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Greska pri dobavljanju oglasa");
      } finally {
        setLoading(false);
      }
    };
    const fetchSalaries = async () => {
      setSalaryLoading(true);
      const results: Record<string, number | null> = {};
      await Promise.all(
        SALARY_POSITIONS.map(async (position) => {
          try {
            const data = await adzunaService.getAverageSalary(position);
            const months = Object.values(data.month) as number[];
            results[position] = months.length > 0 ? Math.round(months[months.length - 1]) : null;
          } catch (err) {
            results[position] = null;
          }
        })
      );
      setSalaries(results);
      setSalaryLoading(false);
    };
    fetchSalaries();
    fetchAds();
  }, []);
  return (
    <div className="min-h-screen bg-white text-[#1a3a94]">

      <HeaderSection />

      <div className="max-w-7xl mx-auto py-24 px-6 md:px-8">
        <SectionHeader title="Aktuelni oglasi za poslove i prakse" subtitle="Pronadjite svoju sledecu priliku medju najnovijim oglasima." buttonText="Pogledajte sve" />
        <CompaniesSection />
        <div className="my-16">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-[#2bc3c3] mb-2">— Trziste rada</p>
            <h2 className="text-4xl font-[1000] uppercase text-[#1a3a94]">Prosecne <span className="text-[#2bc3c3]">Plate.</span></h2>
            <p className="text-sm text-slate-400 uppercase tracking-widest mt-1">Godisnje plate u IT sektoru — trziste SAD</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-100">
            {SALARY_POSITIONS.map((position) => (
              <div key={position} className="border-r border-b border-gray-100 p-8">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">{position}</p>
                {salaryLoading ? (
                  <div className="h-8 w-32 bg-gray-100 animate-pulse" />
                ) : salaries[position] ? (
                  <p className="text-3xl font-[1000] text-[#1a3a94]">
                    ${salaries[position]?.toLocaleString()}
                    <span className="text-sm text-slate-400 font-normal ml-2">/ god</span>
                  </p>
                ) : (
                  <p className="text-sm text-slate-400 font-bold uppercase">Nema podataka</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-100">
          {loading && (
            <LoadingState />
          )}
          {!loading && error && (
            <ErrorState message={error} />
          )}
          {!loading && !error && (ads.length > 0 ? (
            ads.map((ad) => (
              <div key={ad.id} className="border-r border-b border-gray-100">
                <OpportunityCard item={ad} />
              </div>
            ))) : (
            <div className="col-span-full py-20 text-center border-r border-b border-gray-100">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                Trenutno nema aktuelnih oglasa. Proverite kasnije!
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

