'use client';

import { useState } from 'react';
import { X, Save, Calendar, MapPin, Type, FileText, Award, Plus, Trash2 } from 'lucide-react';
import { JobType, JobStatus } from "@/src/types/ad";
import { adService } from '@/src/services/adService';
import { InfoPopup } from '../ui/InfoPopup';

interface CreateAdModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function CreateAdModal({ isOpen, onClose, onSuccess }: CreateAdModalProps) {
    const [requirementsList, setRequirementsList] = useState<string[]>([]);
    const [currentRequirement, setCurrentRequirement] = useState('');
    const [jobType, setJobType] = useState<JobType>(JobType.JOB);
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
                status: JobStatus.ACTIVE,
                requirements: JSON.stringify(requirementsList)
            };
            await adService.createAd(finalPayload);
            setPopup({ type: 'success', msg: 'Vas oglas je uspesno postavljen na platformu!' });
        } catch (err) {
            setPopup({ type: 'error', msg: err instanceof Error ? err.message : 'Doslo je do neke greske!' });
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

            <div className="relative w-full max-w-2xl bg-white border-4 border-[#1a3a94] shadow-[16px_16px_0px_0px_rgba(26,58,148,1)] overflow-y-auto max-h-[90vh]">
                <div className="bg-[#1a3a94] p-5 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-2xl font-[1000] text-white uppercase tracking-tighter">Kreiraj Oglas</h2>
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
                                <input
                                    name="title"
                                    required
                                    className="w-full border-2 border-[#1a3a94] p-4 pl-10 text-[15px] font-black text-[#1a3a94] placeholder:text-zinc-400 focus:outline-none focus:bg-[#2bc3c3]/10 transition-colors"
                                    placeholder="Npr. Senior Software Engineer"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[12px] font-[1000] uppercase tracking-[0.2em] text-[#1a3a94] mb-2">Lokacija</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a3a94]" size={20} />
                                <input
                                    name="location"
                                    required
                                    className="w-full border-2 border-[#1a3a94] p-4 pl-10 text-[15px] font-black text-[#1a3a94] placeholder:text-zinc-400 focus:outline-none focus:bg-[#2bc3c3]/10"
                                    placeholder="Beograd (Remote)"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[12px] font-[1000] uppercase tracking-[0.2em] text-[#1a3a94] mb-2">Rok za prijavu</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a3a94]" size={20} />
                                <input
                                    name="deadline"
                                    required
                                    type="date"
                                    className="w-full border-2 border-[#1a3a94] p-4 pl-10 text-[15px] font-black text-[#1a3a94] focus:outline-none focus:bg-[#2bc3c3]/10 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[12px] font-[1000] uppercase tracking-[0.2em] text-[#1a3a94] mb-2">Tip Angazmana</label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setJobType(JobType.JOB)}
                                    className={`flex-1 py-4 font-[1000] uppercase tracking-widest text-xs border-4 transition-all cursor-pointer ${jobType === JobType.JOB ? 'bg-[#2bc3c3] border-[#1a3a94] text-[#1a3a94] shadow-[6px_6px_0px_0px_rgba(26,58,148,1)]' : 'bg-white border-zinc-300 text-zinc-400'}`}
                                >
                                    Stalni Posao
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setJobType(JobType.INTERNSHIP)}
                                    className={`flex-1 py-4 font-[1000] uppercase tracking-widest text-xs border-4 transition-all cursor-pointer ${jobType === JobType.INTERNSHIP ? 'bg-[#2bc3c3] border-[#1a3a94] text-[#1a3a94] shadow-[6px_6px_0px_0px_rgba(26,58,148,1)]' : 'bg-white border-zinc-300 text-zinc-400'}`}
                                >
                                    Praksa
                                </button>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[12px] font-[1000] uppercase tracking-[0.2em] text-[#1a3a94] mb-2">Opis Pozicije</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                className="w-full border-2 border-[#1a3a94] p-4 text-[15px] font-bold text-[#1a3a94] placeholder:text-zinc-400 focus:outline-none focus:bg-[#2bc3c3]/10"
                                placeholder="Detaljan opis odgovornosti..."
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[12px] font-[1000] uppercase tracking-[0.2em] text-[#1a3a94] mb-2">Potrebne Vestine</label>
                            <div className="flex gap-2 mb-4">
                                <div className="relative flex-1">
                                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a3a94]" size={20} />
                                    <input
                                        type="text"
                                        value={currentRequirement}
                                        onChange={(e) => setCurrentRequirement(e.target.value)}
                                        className="w-full border-2 border-[#1a3a94] p-4 pl-10 text-[15px] font-black text-[#1a3a94] placeholder:text-zinc-400 focus:outline-none"
                                        placeholder="Dodaj vestinu..."
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addRequirement(); } }}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={addRequirement}
                                    className="bg-[#2bc3c3] border-2 border-[#1a3a94] px-6 text-[#1a3a94] shadow-[4px_4px_0px_0px_rgba(26,58,148,1)] cursor-pointer active:translate-y-1"
                                >
                                    <Plus size={24} strokeWidth={4} />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {requirementsList.map((req, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-[#1a3a94] text-white px-4 py-2 border-2 border-[#1a3a94] shadow-[4px_4px_0px_0px_rgba(43,195,195,1)]">
                                        <span className="text-[11px] font-[1000] uppercase tracking-widest">{req}</span>
                                        <button type="button" onClick={() => removeRequirement(index)} className="hover:text-[#2bc3c3] cursor-pointer">
                                            <Trash2 size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col md:flex-row gap-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-8 py-5 border-4 border-[#1a3a94] text-[#1a3a94] font-[1000] uppercase tracking-widest text-sm hover:bg-zinc-100 cursor-pointer"
                        >
                            Odustani
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-[2] px-8 py-5 font-[1000] uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${loading
                                ? "bg-zinc-400 cursor-not-allowed shadow-none translate-y-1 text-zinc-200"
                                : "bg-[#1a3a94] text-white hover:bg-[#2bc3c3] hover:text-[#1a3a94] cursor-pointer shadow-[10px_10px_0px_0px_rgba(43,195,195,1)] active:translate-y-1"
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-4 border-zinc-200 border-t-transparent rounded-full animate-spin" />
                                    <span>Upisivanje...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={22} strokeWidth={3} />
                                    <span>Objavi Oglas</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {popup && (
                <InfoPopup
                    isOpen={!!popup}
                    type={popup.type}
                    title={popup.type === 'success' ? 'USPESNO!' : 'GRESKA!'}
                    message={popup.msg}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
}