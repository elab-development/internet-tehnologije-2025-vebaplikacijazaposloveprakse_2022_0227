'use client';
import { adService } from "@/src/services/adService";
import { Ad } from "@/src/types/ad";
import { useEffect, useState } from "react";
import { OpportunityCard } from "@/src/components/ads/OpportunityCard";
import { LoadingState } from "@/src/components/ui/LoadingState";
import { ErrorState } from "@/src/components/ui/ErrorState";

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
        <div className="min-h-screen bg-white text-slate-900">
            <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
                <div className="flex flex-col mb-16 border-b border-slate-100 pb-12">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                        Aktuelni <br /> Oglasi
                    </h1>
                    <p className="mt-6 text-slate-500 font-medium max-w-lg leading-relaxed">
                        Pregledaj dostupne pozicije i pronađi idealnu priliku za početak ili nastavak tvoje karijere.
                    </p>
                </div>
                {error && (
                    <ErrorState message={error} />
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">

                    {loading && (
                        <LoadingState />
                    )}
                    {!loading && !error && ads.map((ad) => (
                        <OpportunityCard key={ad.id} item={ad} />
                    ))}
                    {!loading && !error && ads.length === 0 && (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Trenutno nema oglasa</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}