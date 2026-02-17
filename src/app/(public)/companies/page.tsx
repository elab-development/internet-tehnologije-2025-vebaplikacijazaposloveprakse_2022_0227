'use client';
import HeaderSection from "@/src/components/layout/HeaderSection";
import { SectionHeader } from "@/src/components/ui/SectionHeader";
import { Company } from "@/src/types/company";
import { CompanyCard } from "@/src/components/companies/CompanyCard";
import { useEffect, useState } from "react";
import { companyService } from "@/src/services/companyService";
import { LoadingState } from "@/src/components/ui/LoadingState";
import { ErrorState } from "@/src/components/ui/ErrorState";
export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            try {
                const res = await companyService.getCompanies();
                setCompanies(res.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Greska pri dobavljanju kompanija");
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    return (
        <div className="min-h-screen bg-white text-career-blue">
            <HeaderSection />

            <div className="max-w-7xl mx-auto py-24 px-6 md:px-8">
                <SectionHeader
                    title="Partnerske kompanije"
                    subtitle="Mreža vodećih organizacija koje podržavaju razvoj mladih talenata kroz prakse i zaposlenje."
                />

                <div className="my-12">
                    {/* SearchBar ide ovde */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-100">
                    {companies.map((company) => (
                        <div key={company.companyId} className="border-r border-b border-gray-100 relative group">
                            <CompanyCard item={company} />
                        </div>
                    ))}
                </div>
                {companies.length === 0 && (
                    <div className="text-center py-20 border-r border-b border-l border-gray-100 font-bold uppercase tracking-widest text-gray-400 text-sm">
                        Trenutno nema dostupnih kompanija.
                    </div>
                )}
            </div>
        </div>
    );
}