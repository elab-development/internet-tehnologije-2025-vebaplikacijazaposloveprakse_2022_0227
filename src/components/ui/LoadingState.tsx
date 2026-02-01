import { Loader2 } from "lucide-react";

export const LoadingState = () => (
  <div className="col-span-full py-32 flex flex-col items-center justify-center border-r border-b border-gray-100">
    <Loader2 className="w-10 h-10 text-[#2bc3c3] animate-spin mb-4" />
    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Ucitavanje podataka...</p>
  </div>
);