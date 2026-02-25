"use client";

import { useAuth } from "@/src/context/AuthContext";
import { ConfirmPopup } from "../../ui/ConfirmPopup";
import { InfoPopup } from "../../ui/InfoPopup";
import { useEffect, useState } from "react";
import { userService } from "@/src/services/userService";
import { StudentStatus } from "@/src/types/user";
import { ApplicationCard } from "../../application/ApplicationCard";
import { StudentApplication } from "@/src/types/jobApplication";
import { applicationService } from "@/src/services/applicationService";

export const StudentProfile = () => {
    const { user, refetch } = useAuth();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [infoConfig, setInfoConfig] = useState<{ type: 'success' | 'error', message: string }>({
        type: 'success',
        message: ''
    });
    const [pendingData, setPendingData] = useState<any>(null);
    const [avatarUrl] = useState(user?.studentProfile?.avatarUrl || "");
    const [cvUrl] = useState(user?.studentProfile?.cvUrl || "");
    const [applications, setApplications] = useState<StudentApplication[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState<number | null>(null);


    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await applicationService.myApplications();
                setApplications(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchApplications();
    }, []);

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
            if (refetch) await refetch();
            setInfoConfig({ type: 'success', message: 'Profil uspesno azuriran!' });
            setShowInfo(true);
        } catch (error) {
            setInfoConfig({ type: 'error', message: error instanceof Error ? error.message : "Greska pri azuriranju." });
            setShowInfo(true);
        }
    };
    const handleDeleteClick = (id: number) => {
        setSelectedAppId(id);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedAppId) return;
        try {
            await applicationService.deleteApplication(selectedAppId);
            setApplications(prev => prev.filter(app => app.id !== selectedAppId));
            setInfoConfig({ type: 'success', message: 'Prijava obrisana' });
            setShowInfo(true);
        } catch (error) {
            setInfoConfig({ type: 'error', message: 'Greska pri brisanju' });
            setShowInfo(true);
        } finally {
            setShowDeleteConfirm(false);
            setSelectedAppId(null);
        }
    };
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-10">
            <div className="flex flex-col md:flex-row items-end gap-6 border-b-8 border-[#1a3a94] pb-8">
                <div className="w-32 h-40 border-4 border-[#1a3a94] bg-white flex flex-col items-center justify-center shadow-[6px_6px_0px_0px_rgba(43,195,195,1)] flex-shrink-0 overflow-hidden relative group cursor-pointer">
                    <img
                        src={avatarUrl || `https://robohash.org/${user?.email}.png?set=set4`}
                        alt="Avatar"
                        className="w-full h-full object-cover bg-zinc-50"
                    />
                    <div className="absolute bottom-0 w-full bg-[#1a3a94] text-white text-[8px] font-black text-center py-1 uppercase">
                        Student ID
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="text-5xl font-[1000] text-[#1a3a94] uppercase tracking-tighter leading-none">
                        {user?.firstName} {user?.lastName}
                    </h1>
                    <p className="text-[#2bc3c3] font-black text-lg uppercase tracking-[0.3em] mt-2">
                        Indeks: {user?.studentProfile?.studentIndex || "NIJE UNET"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-4 space-y-6">
                    <div className="bg-[#1a3a94] p-6 text-white shadow-[8px_8px_0px_0px_rgba(43,195,195,1)]">
                        <h3 className="font-black uppercase tracking-widest text-xs mb-6 border-b border-white/20 pb-2 text-[#2bc3c3]">
                            Slike i Dokumenta
                        </h3>

                        <div className="space-y-6">
                            <div className="group cursor-pointer">
                                <p className="text-[10px] font-bold text-white/50 uppercase italic mb-2">Profilna slika</p>
                                <div className="border-2 border-dashed border-[#2bc3c3] p-4 text-center transition-all">
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        Upload uskoro
                                    </span>
                                </div>
                            </div>

                            <div className="group cursor-pointer pt-4 border-t border-white/10">
                                <p className="text-[10px] font-bold text-white/50 uppercase italic mb-2">Biografija (PDF)</p>
                                <div className="bg-[#2bc3c3] text-[#1a3a94] p-4 text-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] font-black uppercase text-xs hover:translate-x-1 hover:translate-y-1 transition-all">
                                    {cvUrl ? "✓ CV UCITAN" : "Zakaci CV"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-4 border-[#1a3a94] bg-white">
                        <h3 className="font-black uppercase tracking-widest text-xs mb-4 text-[#1a3a94]">Akademski Status</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#2bc3c3] rounded-full animate-pulse"></div>
                            <span className="text-[#1a3a94] text-xs font-black uppercase italic">
                                {user?.studentProfile?.status || "AKTIVAN"}
                            </span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="md:col-span-8 bg-white border-4 border-[#1a3a94] p-8 shadow-[10px_10px_0px_0px_rgba(26,58,148,1)]">
                    <h2 className="text-2xl font-[1000] text-[#1a3a94] uppercase mb-8 border-l-8 border-[#2bc3c3] pl-4">
                        Podesavanja Profila
                    </h2>

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#1a3a94] tracking-widest">Status Studija</label>
                                <select
                                    name="status"
                                    defaultValue={user?.studentProfile?.status || StudentStatus.STUDYING}
                                    className="w-full border-2 border-[#1a3a94] p-3 font-bold text-[#1a3a94] focus:bg-[#2bc3c3]/10 outline-none appearance-none cursor-pointer"
                                >
                                    <option value={StudentStatus.STUDYING}>Student (U toku)</option>
                                    <option value={StudentStatus.GRADUATED}>Diplomac</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#1a3a94] tracking-widest">Broj Indeksa</label>
                                <input
                                    name="studentIndex"
                                    type="text"
                                    defaultValue={user?.studentProfile?.studentIndex || ""}
                                    placeholder="2021/0001"
                                    className="w-full border-2 border-[#1a3a94] p-3 font-bold text-[#1a3a94] focus:bg-[#2bc3c3]/10 outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#1a3a94] tracking-widest">Ime</label>
                                <input
                                    name="firstName"
                                    type="text"
                                    defaultValue={user?.firstName || ""}
                                    className="w-full border-2 border-[#1a3a94] p-3 font-bold text-[#1a3a94] focus:bg-[#2bc3c3]/10 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#1a3a94] tracking-widest">Prezime</label>
                                <input
                                    name="lastName"
                                    type="text"
                                    defaultValue={user?.lastName || ""}
                                    className="w-full border-2 border-[#1a3a94] p-3 font-bold text-[#1a3a94] focus:bg-[#2bc3c3]/10 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#1a3a94] tracking-widest">Kratka Biografija</label>
                            <textarea
                                name="profileDescription"
                                rows={4}
                                defaultValue={user?.studentProfile?.profileDescription || ""}
                                className="w-full border-2 border-[#1a3a94] p-4 font-bold text-[#1a3a94] focus:bg-[#2bc3c3]/5 outline-none resize-none"
                                placeholder="Napisi nesto o sebi..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#1a3a94] text-white py-4 font-[1000] uppercase tracking-[0.3em] border-4 border-[#1a3a94] shadow-[6px_6px_0px_0px_rgba(43,195,195,1)] hover:bg-[#2bc3c3] hover:text-[#1a3a94] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
                        >
                            Sacuvaj Podatke
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-16 space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-3 bg-[#2bc3c3]"></div>
                    <h2 className="text-3xl font-[1000] text-[#1a3a94] uppercase tracking-tight">
                        Moje Prijave
                    </h2>
                </div>

                <div className="mt-16 space-y-8">

                    <div className="grid grid-cols-1 gap-6">
                        {applications.length > 0 ? (
                            applications.map((app) => (
                                <ApplicationCard
                                    key={app.id}
                                    title={app.ad.title}
                                    company={app.ad.company.companyName}
                                    type={app.ad.jobType}
                                    date={new Date(app.appliedAt).toLocaleDateString('sr-RS')}
                                    status={app.status}
                                    onDelete={() => handleDeleteClick(app.id)}
                                    adId={app.ad.id}
                                />
                            ))
                        ) : (
                            <div className="border-4 border-dashed border-[#1a3a94]/20 p-12 text-center">
                                <p className="text-[#1a3a94]/30 font-black uppercase tracking-[0.4em] text-sm italic">
                                    Trenutno nemas aktivnih prijava
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmPopup
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirmSave}
                title="Sacuvaj izmene?"
                message="Tvoj profil ce biti azuriran novim podacima."
                confirmText="Da, azuriraj"
            />
            <ConfirmPopup
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleConfirmDelete}
                title="Obrisi prijavu?"
                message="Da li si siguran da zelis da povuces prijavu za ovaj oglas?"
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