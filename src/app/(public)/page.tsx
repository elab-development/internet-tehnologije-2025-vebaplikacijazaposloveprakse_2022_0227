import { OpportunityCard } from "@/src/components/ui/OpportunityCard";


const OPPORTUNITIES = [
  { id: '1', title: 'Junior Frontend Developer', company: 'TechCorp Solutions', location: 'Beograd', type: 'Puno radno vreme', skills: ['React', 'Next.js', 'Tailwind'], postedAt: 'pre 2 dana' },
  { id: '2', title: 'Marketing Praktikant', company: 'Creative Agency', location: 'Remote', type: 'Praksa', skills: ['SEO', 'Copywriting', 'Analytics'], postedAt: 'pre 1 dan' },
  { id: '3', title: 'Studentski projekat analize podataka', company: 'DataTech Labs', location: 'Novi Sad', type: 'Studentski projekat', skills: ['Python', 'SQL', 'Pandas'], postedAt: 'pre 3 sata' },
];

export default function AdsPage() {
  return (
    <div className="min-h-screen bg-white text-[#1a3a94]">

      {/* --- HERO DEO --- */}
      <div className="w-full pt-40 pb-20 md:pt-48 md:pb-32 px-6 border-b border-gray-100 bg-[#1a3a94]/5">
        <div className="max-w-5xl mx-auto text-left">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-[2px] w-10 bg-[#2bc3c3]"></div>
            <span className="text-[#2bc3c3] font-bold tracking-[0.3em] uppercase text-[10px]">Pronađi svoju priliku</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] text-[#1a3a94]">
            CONNECTING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a3a94] to-[#2bc3c3]">
              OPPORTUNITIES.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-medium leading-relaxed italic">
            Spajamo studente i diplomce sa vodećim kompanijama kroz digitalni ekosistem.
          </p>
        </div>
      </div>

      {/* --- LISTING DEO --- */}
      <div className="max-w-7xl mx-auto py-24 px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#1a3a94] tracking-tighter uppercase">
              Aktuelni oglasi
            </h2>
            <p className="text-[#2bc3c3] font-bold mt-2 uppercase text-xs tracking-widest">
              Prioritetne pozicije dostupne odmah —
            </p>
          </div>
          
          <button className="px-8 py-4 border-2 border-[#1a3a94] text-[#1a3a94] text-xs font-black uppercase tracking-[0.2em] hover:bg-[#1a3a94] hover:text-white transition-all duration-300">
            Pogledaj sve
          </button>
        </div>

        {/* Grid sistem bez razmaka, sa borderima */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-100">
          {OPPORTUNITIES.map((opp) => (
            <div key={opp.id} className="border-r border-b border-gray-100">
               <OpportunityCard item={opp} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

