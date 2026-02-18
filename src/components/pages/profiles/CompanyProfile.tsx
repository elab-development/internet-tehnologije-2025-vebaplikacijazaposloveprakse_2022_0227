"use client";

import { useAuth } from "@/src/context/AuthContext";
import { ConfirmPopup } from "../../ui/ConfirmPopup";
import { InfoPopup } from "../../ui/InfoPopup";
import { useState } from "react";
import { userService } from "@/src/services/userService";

export const CompanyProfile = () => {
    const { user, refetch } = useAuth();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [infoConfig, setInfoConfig] = useState<{ type: 'success' | 'error', message: string }>({
        type: 'success',
        message: ''
    });
    const [pendingData, setPendingData] = useState<any>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const cleanData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                key, value === "" ? undefined : value
            ])
        );
        setPendingData(cleanData);
        setShowConfirm(true);
    };

    const handleConfirmSave = async () => {
        setShowConfirm(false);
        try {
            await userService.updateUser(pendingData);
            if (refetch) {
                await refetch();
            }
            setInfoConfig({ type: 'success', message: 'Profil je uspesno azuriran! Sve izmene su sacuvane.' });
            setShowInfo(true);
        } catch (error) {
            setInfoConfig({ type: 'error', message: error instanceof Error ? error.message : "Doslo je do greske tokom azuriranja profila." });
            setShowInfo(true);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-10">
            <div className="flex flex-col md:flex-row items-end gap-6 border-b-8 border-[#1a3a94] pb-8">
                <div className="w-32 h-32 border-4 border-[#1a3a94] bg-white flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(43,195,195,1)] flex-shrink-0 overflow-hidden">
                    {user?.companyProfile?.logoUrl ? (
                        <img
                            src={user.companyProfile.logoUrl}
                            alt="Logo"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-xl font-[1000] text-[#1a3a94] uppercase text-center p-2">Logo</span>
                    )}
                </div>
                <div className="flex-1">
                    <h1 className="text-5xl font-[1000] text-[#1a3a94] uppercase tracking-tighter leading-none">
                        {user?.companyProfile?.companyName || "Naziv Kompanije"}
                    </h1>
                    <p className="text-[#2bc3c3] font-black text-lg uppercase tracking-[0.3em] mt-2">
                        Poreski ID: {user?.companyProfile?.taxNumber || "---------"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-4 space-y-6">
                    <div className="bg-[#1a3a94] p-6 text-white shadow-[8px_8px_0px_0px_rgba(43,195,195,1)]">
                        <h3 className="font-black uppercase tracking-widest text-xs mb-6 border-b border-white/20 pb-2 text-[#2bc3c3]">
                            Sistemski podaci
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-bold text-white/50 uppercase">Maticni Broj</p>
                                <p className="font-mono text-lg font-bold">{user?.companyProfile?.regNumber || "--------"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/50 uppercase">Email Naloga</p>
                                <p className="font-bold truncate text-sm">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/50 uppercase">Status Naloga</p>
                                <span className="inline-block bg-[#2bc3c3] text-[#1a3a94] text-[10px] font-black px-2 py-0.5 mt-1 uppercase">
                                    Verifikovan
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-4 border-[#1a3a94] bg-white">
                        <h3 className="font-black uppercase tracking-widest text-xs mb-4 text-[#1a3a94]">Administracija</h3>
                        <p className="text-sm font-bold text-zinc-500 uppercase leading-tight">
                            Za promenu PIB-a ili naziva firme kontaktirajte podrsku.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="md:col-span-8 bg-white border-4 border-[#1a3a94] p-8 shadow-[10px_10px_0px_0px_rgba(26,58,148,1)]">
                    <h2 className="text-2xl font-[1000] text-[#1a3a94] uppercase mb-8 border-l-8 border-[#2bc3c3] pl-4">
                        Uredi Javan Profil
                    </h2>

                    <div className="space-y-8">
                        <div className="space-y-2 border-b-4 border-zinc-50 pb-8">
                            <label className="text-[10px] font-black uppercase text-[#1a3a94] tracking-widest">
                                URL Logotipa Kompanije
                            </label>
                            <input
                                type="text"
                                name="logoUrl"
                                defaultValue={user?.companyProfile?.logoUrl || ""}
                                placeholder="https://putanja-do-slike.png"
                                className="w-full border-2 border-[#1a3a94] p-3 font-bold text-[#1a3a94] focus:bg-[#2bc3c3]/10 outline-none"
                            />
                            <p className="text-[9px] text-zinc-400 font-bold uppercase italic text-right">Direktan link do PNG ili JPG fajla</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#1a3a94] tracking-widest">Industrija</label>
                                <input
                                    type="text"
                                    name="industry"
                                    defaultValue={user?.companyProfile?.industry || ""}
                                    className="w-full border-2 border-[#1a3a94] p-3 font-bold text-[#1a3a94] focus:bg-[#2bc3c3]/10 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#1a3a94] tracking-widest">Sediste (Grad)</label>
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={user?.companyProfile?.location || ""}
                                    className="w-full border-2 border-[#1a3a94] p-3 font-bold text-[#1a3a94] focus:bg-[#2bc3c3]/10 outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#1a3a94] tracking-widest">Kontakt Telefon</label>
                                <input
                                    type="text"
                                    name="phone"
                                    defaultValue={user?.phone || ""}
                                    className="w-full border-2 border-[#1a3a94] p-3 font-bold text-[#1a3a94] focus:bg-[#2bc3c3]/10 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#1a3a94] tracking-widest">Website Link</label>
                                <input
                                    type="text"
                                    name="website"
                                    defaultValue={user?.companyProfile?.website || ""}
                                    className="w-full border-2 border-[#1a3a94] p-3 font-bold text-[#1a3a94] focus:bg-[#2bc3c3]/10 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#1a3a94] tracking-widest">Opis Delatnosti</label>
                            <textarea
                                rows={6}
                                name="profileDescription"
                                defaultValue={user?.companyProfile?.description || ""}
                                className="w-full border-2 border-[#1a3a94] p-4 font-bold text-[#1a3a94] focus:bg-[#2bc3c3]/5 outline-none resize-none"
                                placeholder="Unesite opis kompanije..."
                            />
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="cursor-pointer w-full bg-[#1a3a94] text-white py-4 font-[1000] uppercase tracking-[0.3em] border-4 border-[#1a3a94] shadow-[6px_6px_0px_0px_rgba(43,195,195,1)] hover:bg-[#2bc3c3] hover:text-[#1a3a94] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                                Sacuvaj sve promene
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <ConfirmPopup
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirmSave}
                title="Sacuvaj izmene?"
                message="Da li ste sigurni da zelite da azurirate podatke na profilu kompanije?"
                confirmText="Sacuvaj"
            />

            <InfoPopup
                isOpen={showInfo}
                onClose={() => setShowInfo(false)}
                type={infoConfig.type}
                message={infoConfig.message}
            />
        </div>
    );
};