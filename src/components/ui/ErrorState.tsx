import { AlertCircle } from "lucide-react";

export const ErrorState = ({ message }: { message: string }) => (
  <div className="col-span-full py-20 flex flex-col items-center justify-center border-r border-b border-gray-100 bg-slate-50/50">
    <div className="flex items-center gap-3 px-6 py-4 bg-white border border-red-100 shadow-sm">
      <AlertCircle className="w-5 h-5 text-red-500" />
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
          Sistemska greska
        </span>
        <p className="text-xs font-bold text-[#1a3a94] uppercase">
          {message}
        </p>
      </div>
    </div>
  </div>
);