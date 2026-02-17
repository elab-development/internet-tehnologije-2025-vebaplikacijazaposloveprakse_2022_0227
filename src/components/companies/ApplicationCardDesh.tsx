import { Users } from "lucide-react";
import { JobApplication } from "@/src/types/jobApplication";

export const ApplicationCardDesh = ({ app }: { app: JobApplication }) => (
  <div className="border-4 border-[#1a3a94] p-6 bg-white shadow-[8px_8px_0px_0px_rgba(26,58,148,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
    <div className="flex justify-between items-start mb-6">
      <div className="bg-[#2bc3c3] p-3 border-2 border-[#1a3a94]">
        <Users className="text-[#1a3a94]" size={24} />
      </div>
      <span className="text-[10px] font-black text-gray-300 uppercase italic">
        {new Date(app.appliedAt).toLocaleDateString('sr-RS')}
      </span>
    </div>
    <h3 className="text-2xl font-[1000] uppercase tracking-tighter text-[#1a3a94] mb-1">
      {app.student.user.firstName} {app.student.user.lastName}
    </h3>
    <div className="space-y-1 mb-6">
      <p className="text-xs font-bold text-[#2bc3c3] uppercase">{app.student.user.email}</p>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
        TEL: {app.student.user.phone || "Nije naveden"}
      </p>
    </div>
    <button className="w-full bg-white border-4 border-[#1a3a94] py-3 text-[#1a3a94] font-[1000] uppercase text-[10px] tracking-[0.2em] hover:bg-[#2bc3c3] transition-all cursor-pointer">
      POGLEDAJ CV KANDIDATA
    </button>
  </div>
);