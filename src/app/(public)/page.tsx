'use client';
import { ErrorState } from "@/src/components/ui/ErrorState";
import HeaderSection from "@/src/components/layout/HeaderSection";
import { LoadingState } from "@/src/components/ui/LoadingState";
import { OpportunityCard } from "@/src/components/ads/OpportunityCard";
import { SectionHeader } from "@/src/components/ui/SectionHeader";
import { adService } from "@/src/services/adService";
import { Ad } from "@/src/types/ad";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";


export default function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
    fetchAds();
  }, []);
  return (
    <div className="min-h-screen bg-white text-[#1a3a94]">

      <HeaderSection />

      <div className="max-w-7xl mx-auto py-24 px-6 md:px-8">
        <SectionHeader title="Aktuelni oglasi za poslove i prakse" subtitle="Pronadjite svoju sledecu priliku medju najnovijim oglasima." buttonText="Pogledajte sve" />
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

