import Link from 'next/link';
import { CompanyCard } from "@/src/components/companies/CompanyCard";
import { Company } from '@/src/types/company';
import { useEffect, useState } from 'react';
import { companyService } from '@/src/services/companyService';
import { ErrorState } from '../ui/ErrorState';
export default function CompaniesSection() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const res = await companyService.getRandomCompanies();
        setCompanies(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Greska pri dobavljanju kompanija");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);
  if (loading) return (
    <div className="h-[200px] flex items-center justify-center">
      <span className="text-gray-200 animate-pulse font-black uppercase text-xs tracking-widest">
        Ucitavanje partnera...
      </span>
    </div>
  );
  if (error) return null;
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">

        <h2 className="text-[#1a3a94] text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16">
          Naši <span className="text-[#2bc3c3]">Partneri</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {companies.map((company) => (
            <CompanyCard key={company.companyId} item={company}
            />
          ))}
        </div>

        <Link href="/register?role=company" className="cursor-pointer bg-[#2bc3c3] text-[#1a3a94] font-black px-12 py-4 rounded-full uppercase text-xs tracking-widest hover:bg-[#1a3a94] hover:text-white transition-all shadow-lg">
          Postani partner
        </Link>

      </div>
    </section>
  );
}