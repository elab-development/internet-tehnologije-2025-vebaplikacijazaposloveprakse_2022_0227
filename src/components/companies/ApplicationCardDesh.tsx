import { Check, X, Mail, Phone, FileText, Calendar } from "lucide-react";
import { JobApplication } from "@/src/types/jobApplication";
import { ApplicationStatus } from "@/src/types/jobApplication";

interface ApplicationCardProps {
  app: JobApplication;
  onStatusUpdate: (id: number, status: ApplicationStatus) => void;
}

export const ApplicationCardDesh = ({ app, onStatusUpdate }: ApplicationCardProps) => {
  const isAccepted = app.status === 'ACCEPTED';
  const isRejected = app.status === 'REJECTED';
  const isPending = app.status === 'PENDING';

  return (
    <div className="border-4 border-career-blue p-6 bg-white shadow-[8px_8px_0px_0px_rgba(26,58,148,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all relative overflow-hidden">
      
      {isAccepted && (
        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
          <div className="absolute transform rotate-45 bg-[#4ade80] text-career-blue text-[10px] font-black py-1.5 right-[-50px] top-[20px] w-[220px] text-center shadow-lg uppercase tracking-[0.25em]">
            PRIHVACENO
          </div>
        </div>
      )}

      {isRejected && (
        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
          <div className="absolute transform rotate-45 bg-[#ff4d4d] text-white text-[10px] font-black py-1.5 right-[-50px] top-[20px] w-[220px] text-center shadow-lg uppercase tracking-[0.25em]">
            ODBIJENO
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-career-blue to-hub-cyan flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0">
            {app.student.user.firstName[0]}{app.student.user.lastName[0]}
          </div>
          
          <div>
            <h3 className="text-2xl font-[1000] uppercase tracking-tighter text-career-blue mb-1">
              {app.student.user.firstName} {app.student.user.lastName}
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase italic">
              <Calendar size={12} />
              <span>
                {new Date(app.appliedAt).toLocaleDateString('sr-RS')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2">
          <Mail size={14} className="text-hub-cyan" />
          <p className="text-sm font-black text-career-blue uppercase">{app.student.user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-hub-cyan" />
          <p className="text-sm font-black text-career-blue uppercase tracking-wide">
            {app.student.user.phone || "Nije naveden"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => alert("Nije implementirano")} 
          className="w-full bg-white border-4 border-career-blue py-3 text-career-blue font-[1000] uppercase text-[10px] tracking-[0.2em] hover:bg-hub-cyan hover:text-white transition-all cursor-pointer"
        >
          POGLEDAJ CV KANDIDATA
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => onStatusUpdate(app.id, isAccepted ? ApplicationStatus.PENDING : ApplicationStatus.ACCEPTED)}
            className={`flex-1 flex items-center justify-center gap-2 border-4 border-career-blue py-3 font-[1000] uppercase text-[10px] tracking-widest hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(26,58,148,1)] transition-all cursor-pointer ${
              isAccepted
                ? 'bg-[#4ade80] text-career-blue'
                : 'bg-white text-career-blue'
            }`}
          >
            <Check size={16} strokeWidth={4} />
            {isAccepted ? 'Prihvaceno' : 'Prihvati'}
          </button>

          <button
            onClick={() => onStatusUpdate(app.id, isRejected ? ApplicationStatus.PENDING : ApplicationStatus.REJECTED)}
            className={`flex-1 flex items-center justify-center gap-2 border-4 border-career-blue py-3 font-[1000] uppercase text-[10px] tracking-widest hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(26,58,148,1)] transition-all cursor-pointer ${
              isRejected
                ? 'bg-[#ff4d4d] text-career-blue'
                : 'bg-white text-career-blue'
            }`}
          >
            <X size={16} strokeWidth={4} />
            {isRejected ? 'Odbijeno' : 'Odbij'}
          </button>
        </div>
      </div>
    </div>
  );
};