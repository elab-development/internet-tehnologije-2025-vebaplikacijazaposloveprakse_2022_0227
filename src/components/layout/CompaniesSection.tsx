import Link from 'next/link';
import { CompanyCard } from "@/src/components/companies/CompanyCard";
import { Company } from '@/src/types/company';
const DUMMY_COMPANIES: Company[] = [
  {
    companyId: 1,
    companyName: "Microsoft",
    industry: "Software & Cloud",
    location: "Beograd",
    description: "Vodeći svetski tehnološki gigant fokusiran na razvoj softvera, veštačke inteligencije i cloud infrastrukture.",
    website: "microsoft.com",
    isApproved: true,
    taxNumber: "123456789",
    regNumber: "987654321",
    _count: { ads: 14 }
  } as Company,
  {
    companyId: 2,
    companyName: "Nordeus",
    industry: "Gaming Industry",
    location: "Beograd",
    description: "Najuspešnija regionalna gejming kompanija, tvorci globalnog hita Top Eleven i lideri u inovacijama.",
    website: "nordeus.com",
    isApproved: true,
    taxNumber: "223456789",
    regNumber: "887654321",
    _count: { ads: 6 }
  } as Company,
  {
    companyId: 3,
    companyName: "Schneider Electric",
    industry: "Energy & AI",
    location: "Novi Sad",
    description: "Globalni lider u digitalnoj transformaciji upravljanja energijom i automatizaciji za industriju i domove.",
    website: "se.com",
    isApproved: true,
    taxNumber: "323456789",
    regNumber: "787654321",
    _count: { ads: 21 }
  } as Company,
  {
    companyId: 4,
    companyName: "Levi9",
    industry: "IT Services",
    location: "Beograd / Novi Sad",
    description: "Strateški tehnološki partner koji pruža usluge razvoja softvera vrhunskim svetskim klijentima.",
    website: "levi9.com",
    isApproved: true,
    taxNumber: "423456789",
    regNumber: "687654321",
    _count: { ads: 9 }
  } as Company
];
export default function CompaniesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        
        <h2 className="text-[#1a3a94] text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16">
          Naši <span className="text-[#2bc3c3]">Partneri</span>
        </h2>

        {/* Ovde se dešava magija: map prolazi kroz listu i za svakog crta CompanyCard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {DUMMY_COMPANIES.map((company) => (
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