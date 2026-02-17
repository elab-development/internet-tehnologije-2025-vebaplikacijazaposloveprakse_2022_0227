'use client';

import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface StatusPopupProps {
    type: 'success' | 'error';
    title: string;
    message: string;
    onClose: () => void;
}

export default function StatusPopup({ type, title, message, onClose }: StatusPopupProps) {
    const isSuccess = type === 'success';
    const theme = isSuccess 
        ? {
            bg: 'bg-[#2bc3c3]',
            border: 'border-[#1a3a94]',
            shadow: 'shadow-[12px_12px_0px_0px_rgba(26,58,148,1)]',
            icon: <CheckCircle2 size={40} strokeWidth={3} className="text-[#1a3a94]" />
          }
        : {
            bg: 'bg-red-500',
            border: 'border-[#1a3a94]',
            shadow: 'shadow-[12px_12px_0px_0px_rgba(26,58,148,1)]',
            icon: <AlertCircle size={40} strokeWidth={3} className="text-white" />
          };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/20 backdrop-blur-[2px] animate-in fade-in duration-200">
            <div className={`relative w-full max-w-sm ${theme.bg} border-4 ${theme.border} ${theme.shadow} p-8 animate-in zoom-in duration-300`}>
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 hover:scale-110 transition-transform cursor-pointer"
                >
                    <X size={24} strokeWidth={3} className={isSuccess ? 'text-[#1a3a94]' : 'text-white'} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                        {theme.icon}
                    </div>
                    
                    <h3 className={`text-2xl font-[1000] uppercase tracking-tighter mb-2 ${isSuccess ? 'text-[#1a3a94]' : 'text-white'}`}>
                        {title}
                    </h3>
                    
                    <p className={`font-bold text-sm leading-tight mb-6 ${isSuccess ? 'text-[#1a3a94]/80' : 'text-white/90'}`}>
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className={`w-full py-3 bg-[#1a3a94] text-white font-[1000] uppercase tracking-widest text-xs border-2 border-[#1a3a94] hover:bg-white hover:text-[#1a3a94] transition-all cursor-pointer active:translate-y-1`}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}