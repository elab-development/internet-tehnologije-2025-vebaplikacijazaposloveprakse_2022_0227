import { Users2, GraduationCap, Briefcase, Network } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white text-[#1a3a94]">
      {/* --- HERO --- */}
      <div className="py-24 px-6 border-b border-gray-100 bg-[#1a3a94]/5">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-[#2bc3c3]"></div>
            <span className="text-[#2bc3c3] font-bold tracking-[0.2em] uppercase text-xs">
              Vasa karijera pocinje ovde
            </span>
          </div>

          <div className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-[#1a3a94]">
            CAREER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a3a94] to-[#2bc3c3]">
              HUB.
            </span>
          </div>

          <div className="text-xl md:text-2xl max-w-2xl text-slate-600 font-medium leading-relaxed">
            Mi smo digitalni ekosistem dizajniran da ubrza vas profesionalni razvoj
            i poveze vas sa najboljim prilikama na trzistu.
          </div>
        </div>
      </div>

      {/* --- KARTICE --- */}
      <div className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-gray-100">
          {[
            { icon: <GraduationCap />, title: "Edukacija", desc: "Ekskluzivne radionice i resursi." },
            { icon: <Network />, title: "Umrezavanje", desc: "Direktan kontakt sa liderima." },
            { icon: <Briefcase />, title: "Iskustvo", desc: "Prakse u top kompanijama." },
            { icon: <Users2 />, title: "Mentorstvo", desc: "Podrska strucnjaka iz industrije." },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-10 border-r border-b border-gray-100 hover:bg-[#1a3a94] transition-all duration-500 last:border-r-0"
            >
              <div className="mb-8 text-[#2bc3c3] group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
                {item.title}
              </div>
              <div className="text-slate-500 group-hover:text-[#2bc3c3] text-sm font-medium transition-colors">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MANIFEST --- */}
      <div className="py-24 bg-[#1a3a94]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="md:w-1/2">
            <div className="text-[#2bc3c3] font-bold mb-4 italic text-sm uppercase tracking-widest">
              Nasa misija —
            </div>
            <div className="text-4xl font-bold text-white leading-tight mb-6">
              Pomazemo studentima da preuzmu kontrolu nad svojom profesionalnom sudbinom.
            </div>
            <div className="text-[#2bc3c3]/80 text-lg font-medium">
              Mi dajemo alat, vi dajete talenat.
            </div>
          </div>

          {/* --- UNIFICIRAN CH LOGO (Sve u tirkiznoj boji) --- */}
          <div className="md:w-1/6 aspect-square bg-white/5 border border-white/10 flex items-center justify-center rounded-2xl">
            <svg
              viewBox="0 0 100 100"
              className="w-2/3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* C - Tirkizna boja #2bc3c3 */}
              <path
                d="M40 30 A20 20 0 1 0 40 70"
                stroke="#2bc3c3"
                strokeWidth="12"
                strokeLinecap="round"
              />
              
              {/* H - Tirkizna boja #2bc3c3 */}
              <path
                d="M55 30 V70 M85 30 V70 M55 50 H85"
                stroke="#2bc3c3"
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}