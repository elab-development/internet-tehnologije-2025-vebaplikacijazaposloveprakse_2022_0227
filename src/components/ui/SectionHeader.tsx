import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  location?: string;
}

export const SectionHeader = ({ title, subtitle, buttonText, location }: SectionHeaderProps) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b-2 border-gray-200 pb-8">
    <div>
      <h2 className="text-3xl md:text-5xl font-black text-career-blue tracking-tighter uppercase leading-none">
        {title}
      </h2>
      <p className="text-hub-cyan font-black mt-3 uppercase text-xs tracking-[0.2em]">
        {subtitle} —
      </p>
    </div>

    {buttonText && (
      <Link href={location || "/"} className="cursor-pointer px-8 py-4 border-2 border-career-blue text-career-blue text-[10px] font-black uppercase tracking-[0.2em] hover:bg-career-blue hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(26,58,148,0.1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
        {buttonText}
      </Link>
    )}
  </div>
);