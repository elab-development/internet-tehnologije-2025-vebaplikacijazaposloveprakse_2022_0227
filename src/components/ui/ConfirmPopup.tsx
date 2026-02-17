import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  type?: 'warning' | 'info';
}

export const ConfirmPopup = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Potvrdi",type = 'warning' }: ConfirmModalProps) => {
  if (!isOpen) return null;

  const mainColor = type === 'warning' ? 'bg-[#ffdc00]' : 'bg-[#2bc3c3]';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`relative w-full max-w-md border-4 border-[#1a3a94] ${mainColor} p-8 shadow-[12px_12px_0px_0px_rgba(26,58,148,1)]`}>
        
        <button onClick={onClose} className="cursor-pointer absolute top-4 right-4 text-[#1a3a94] hover:rotate-90 transition-transform">
          <X size={24} strokeWidth={3} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="bg-white border-4 border-[#1a3a94] p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(26,58,148,1)]">
            <AlertTriangle size={40} className="text-[#1a3a94]" />
          </div>

          <h2 className="text-3xl font-[1000] uppercase tracking-tighter text-[#1a3a94] mb-2">
            {title}
          </h2>
          
          <p className="text-[#1a3a94] font-bold uppercase text-xs tracking-widest mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex w-full gap-4">
            <button 
              onClick={onClose}
              className="cursor-pointer flex-1 bg-white border-4 border-[#1a3a94] py-3 text-[#1a3a94] font-black uppercase text-xs tracking-widest hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(26,58,148,1)]"
            >
              Odustani
            </button>
            <button 
              onClick={() => { onConfirm(); onClose(); }}
              className="cursor-pointer flex-1 bg-[#1a3a94] border-4 border-[#1a3a94] py-3 text-white font-black uppercase text-xs tracking-widest hover:bg-[#2bc3c3] hover:text-[#1a3a94] transition-all"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};