'use client';

import { useState, useEffect } from 'react';
import { X, Save, Calendar, MapPin, Type, Award, Plus, Trash2 } from 'lucide-react';
import { JobType, JobStatus, Ad } from "@/src/types/ad";
import { adService } from '@/src/services/adService';
import { InfoPopup } from '../ui/InfoPopup';

interface EditAdModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    adToEdit: Ad;
}

export default function EditAdModal({ isOpen, onClose, onSuccess, adToEdit }: EditAdModalProps) {
    const [requirementsList, setRequirementsList] = useState<string[]>(() => {
        return typeof adToEdit.requirements === 'string'
            ? JSON.parse(adToEdit.requirements)
            : adToEdit.requirements || [];
    });
    const [currentRequirement, setCurrentRequirement] = useState('');
    const [jobType, setJobType] = useState<JobType>(adToEdit.jobType);
    const [loading, setLoading] = useState<boolean>(false);
    const [popup, setPopup] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    if (!isOpen) return null;

    const addRequirement = () => {
        if (currentRequirement.trim()) {
            setRequirementsList([...requirementsList, currentRequirement.trim()]);
            setCurrentRequirement('');
        }
    };

    const removeRequirement = (index: number) => {
        setRequirementsList(requirementsList.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const finalPayload = {
                title: data.title as string,
                description: data.description as string,
                location: data.location as string,
                deadline: data.deadline as string,
                jobType: jobType,
                status: adToEdit.status,
                requirements: JSON.stringify(requirementsList)
            };

            await adService.updateAd(adToEdit.id, finalPayload);
            setPopup({ type: 'success', msg: 'Oglas je uspesno izmenjen!' });

        } catch (err) {
            setPopup({ type: 'error', msg: err instanceof Error ? err.message : 'Doslo je do greske!' });
        } finally {
            setLoading(false);
        }
    };

    const handleClosePopup = () => {
        const isSuccess = popup?.type === 'success';
        setPopup(null);
        if (isSuccess) {
            if (onSuccess) onSuccess();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#1a3a94]/70 backdrop-blur-sm cursor-pointer" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-white border-4 border-[#1a3a94] shadow-[16px_16px_0px_0px_rgba(26,58,148,1)] overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200">
                <div className="bg-[#1a3a94] p-5 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-2xl font-[1000] text-white uppercase tracking-tighter italic">Izmeni <span className='text-[#ffdc00]'>Oglas</span></h2>
                    <button onClick={onClose} className="p-1 hover:bg-[#2bc3c3] text-white transition-colors cursor-pointer group">
                        <X size={28} strokeWidth={4} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-[12px] font-[1000] uppercase tracking-[0.2em] text-[#1a3a94] mb-2">Naslov Pozicije</label>
                            <div className="relative">
                                <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a3a94]" size={20} />
                                <input name="title" required defaultValue={adToEdit.title} className="w-full border-2 border-[#1a3a94] p-4 pl-10 text-[15px] font-black text-[#1a3a94] focus:outline-none focus:bg-[#ffdc00]/10 transition-colors" placeholder="Npr. Senior Software Engineer" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[12px] font-[1000] uppercase tracking-[0.2em] text-[#1a3a94] mb-2">Lokacija</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a3a94]" size={20} />
                                <input name="location" required defaultValue={adToEdit.location} className="w-full border-2 border-[#1a3a94] p-4 pl-10 text-[15px] font-black text-[#1a3a94] focus:outline-none focus:bg-[#ffdc00]/10" placeholder="Beograd (Remote)" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[12px] font-[1000] uppercase tracking-[0.2em] text-[#1a3a94] mb-2">Rok za prijavu</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a3a94]" size={20} />
                                <input name="deadline" required type="date" defaultValue={new Date(adToEdit.deadline).toISOString().split('T')[0]} className="w-full border-2 border-[#1a3a94] p-4 pl-10 text-[15px] font-black text-[#1a3a94] focus:outline-none focus:bg-[#ffdc00]/10 cursor-pointer" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[12px] font-[1000] uppercase tracking-[0.2em] text-[#1a3a94] mb-2">Tip Angazmana</label>
                            <div className="flex gap-4">
                                {(['JOB', 'INTERNSHIP'] as JobType[]).map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setJobType(type)}
                                        className={`flex-1 py-4 font-[1000] uppercase tracking-widest text-xs border-4 transition-all cursor-pointer ${jobType === type ? 'bg-[#ffdc00] border-[#1a3a94] text-[#1a3a94] shadow-[6px_6px_0px_0px_rgba(26,58,148,1)]' : 'bg-white border-zinc-300 text-zinc-400'}`}
                                    >
                                        {type === 'JOB' ? 'Stalni Posao' : 'Praksa'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[12px] font-[1000] uppercase tracking-[0.2em] text-[#1a3a94] mb-2">Opis Pozicije</label>
                            <textarea name="description" required rows={4} defaultValue={adToEdit.description} className="w-full border-2 border-[#1a3a94] p-4 text-[15px] font-bold text-[#1a3a94] focus:outline-none focus:bg-[#ffdc00]/10" placeholder="Detaljan opis odgovornosti..." />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[12px] font-[1000] uppercase tracking-[0.2em] text-[#1a3a94] mb-2">Potrebne Veštine</label>
                            <div className="flex gap-2 mb-4">
                                <div className="relative flex-1">
                                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a3a94]" size={20} />
                                    <input
                                        type="text"
                                        value={currentRequirement}
                                        onChange={(e) => setCurrentRequirement(e.target.value)}
                                        className="w-full border-2 border-[#1a3a94] p-4 pl-10 text-[15px] font-black text-[#1a3a94] focus:outline-none"
                                        placeholder="Dodaj vestinu (npr. React)..."
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addRequirement(); } }}
                                    />
                                </div>
                                <button type="button" onClick={addRequirement} className="bg-[#ffdc00] border-2 border-[#1a3a94] px-6 text-[#1a3a94] shadow-[4px_4px_0px_0px_rgba(26,58,148,1)] cursor-pointer active:translate-y-1">
                                    <Plus size={24} strokeWidth={4} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {requirementsList.map((req, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-[#1a3a94] text-white px-4 py-2 border-2 border-[#1a3a94] shadow-[4px_4px_0px_0px_rgba(43,195,195,1)]">
                                        <span className="text-[11px] font-[1000] uppercase tracking-widest">{req}</span>
                                        <button type="button" onClick={() => removeRequirement(index)} className="hover:text-[#ffdc00] cursor-pointer">
                                            <Trash2 size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col md:flex-row gap-5">
                        <button type="button" onClick={onClose} className="flex-1 px-8 py-5 border-4 border-[#1a3a94] text-[#1a3a94] font-[1000] uppercase tracking-widest text-sm hover:bg-zinc-100 cursor-pointer transition-colors">
                            Odustani
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-[2] px-8 py-5 font-[1000] uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${loading
                                ? "bg-zinc-400 cursor-not-allowed text-zinc-200"
                                : "bg-[#1a3a94] text-white hover:bg-[#ffdc00] hover:text-[#1a3a94] cursor-pointer shadow-[10px_10px_0px_0px_rgba(43,195,195,1)] active:translate-y-1 active:shadow-none"
                                }`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-4 border-zinc-200 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <><Save size={22} strokeWidth={3} /><span>Sačuvaj Izmene</span></>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {popup && (
                <InfoPopup
                    isOpen={!!popup}
                    type={popup.type}
                    title={popup.type === 'success' ? 'USPEŠNO!' : 'GREŠKA!'}
                    message={popup.msg}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
}