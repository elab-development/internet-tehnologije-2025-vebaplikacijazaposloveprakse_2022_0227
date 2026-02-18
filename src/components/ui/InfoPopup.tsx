'use client';

import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";

interface InfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
}

export const InfoPopup = ({ isOpen, onClose, title, message, type = 'error' }: InfoPopupProps) => {
  if (!isOpen) return null;
  const getConfig = () => {
    switch (type) {
      case 'success':
        return { icon: CheckCircle, bgColor: 'bg-[#4ade80]', title: 'USPEŠNO!' };
      case 'warning':
        return { icon: AlertTriangle, bgColor: 'bg-[#ffdc00]', title: 'PAŽNJA!' };
      case 'info':
        return { icon: Info, bgColor: 'bg-[#2bc3c3]', title: 'INFO' };
      default: 
        return { icon: AlertCircle, bgColor: 'bg-[#ff4d4d]', title: 'GREŠKA!' };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`relative w-full max-w-md border-4 border-[#1a3a94] ${config.bgColor} p-8 shadow-[12px_12px_0px_0px_rgba(26,58,148,1)] animate-in zoom-in-95 duration-200`}>
        
        <button onClick={onClose} className="cursor-pointer absolute top-4 right-4 text-[#1a3a94] hover:rotate-90 transition-transform">
          <X size={24} strokeWidth={3} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="bg-white border-4 border-[#1a3a94] p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(26,58,148,1)]">
            <Icon size={40} className="text-[#1a3a94]" />
          </div>

          <h2 className="text-3xl font-[1000] uppercase tracking-tighter text-[#1a3a94] mb-2">
            {title || config.title}
          </h2>
          
          <p className="text-[#1a3a94] font-bold uppercase text-xs tracking-widest mb-8 leading-relaxed">
            {message}
          </p>
          <button 
            onClick={onClose}
            className="w-full cursor-pointer bg-[#1a3a94] border-4 border-[#1a3a94] py-3 text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-[#1a3a94] transition-all shadow-[4px_4px_0px_0px_rgba(26,58,148,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            U REDU
          </button>
        </div>
      </div>
    </div>
  );
};