'use client';
import HeaderSection from "@/src/components/layout/HeaderSection";
import { SectionHeader } from "@/src/components/ui/SectionHeader";
import { Company } from "@/src/types/company";
import { CompanyCard } from "@/src/components/companies/CompanyCard";
import bgUrl from "@/public/bgcompanies.avif";
export default function CompaniesPage() {
  // Dummy podaci koji prate tvoj Company interface
  const DUMMY_COMPANIES: Partial<Company>[] = [
    {
      companyId: 1,
      companyName: "Microsoft",
      industry: "Software Development",
      location: "Beograd",
      description: "Globalni lider u sferi softvera, usluga i rešenja koja pomažu ljudima i kompanijama da ostvare svoj puni potencijal.",
      website: "https://microsoft.com",
      _count: { ads: 12 }
    },
    {
      companyId: 2,
      companyName: "Nordeus",
      industry: "Gaming Industry",
      location: "Beograd",
      description: "Nezavisna gejming kompanija koja stvara globalne hitove i neguje kulturu inovacija i timskog rada.",
      website: "https://nordeus.com",
      _count: { ads: 8 }
    },
    {
      companyId: 3,
      companyName: "Continental",
      industry: "Automotive",
      location: "Novi Sad",
      description: "Razvijamo pionirske tehnologije i usluge za održivu i povezanu mobilnost ljudi i njihovih dobara.",
      website: "https://continental.com",
      _count: { ads: 24 }
    },
    {
      companyId: 4,
      companyName: "Schneider Electric",
      industry: "Energy Management",
      location: "Novi Sad",
      description: "Predvodnik u digitalnoj transformaciji upravljanja energijom i automatizaciji u domovima i industrijama.",
      website: "https://se.com",
      _count: { ads: 15 }
    },
    {
      companyId: 5,
      companyName: "Levi9",
      industry: "IT Services",
      location: "Beograd / Novi Sad",
      description: "Strateški tehnološki partner fokusiran na razvoj kompleksnih softverskih rešenja za vodeće evropske brendove.",
      website: "https://levi9.com",
      _count: { ads: 10 }
    },
    {
      companyId: 6,
      companyName: "RT-RK",
      industry: "Embedded Systems",
      location: "Niš / Novi Sad",
      description: "Vodeća razvojna kuća u jugoistočnoj Evropi fokusirana na ugrađene sisteme i softver za potrošačku elektroniku.",
      website: "https://rt-rk.com",
      _count: { ads: 6 }
    }
  ];

  return (
    <div className="min-h-screen bg-white text-career-blue">
      <HeaderSection  />

      <div className="max-w-7xl mx-auto py-24 px-6 md:px-8">
        <SectionHeader 
          title="Partnerske kompanije" 
          subtitle="Mreža vodećih organizacija koje podržavaju razvoj mladih talenata kroz prakse i zaposlenje." 
        />

        <div className="my-12">
            {/* Tvoj SearchBar ide ovde */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-100">
          {DUMMY_COMPANIES.map((company) => (
            <div key={company.companyId}>
              {/* @ts-ignore - castujemo Partial<Company> jer nam ne trebaju svi fieldovi za listu */}
              <CompanyCard item={company} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}