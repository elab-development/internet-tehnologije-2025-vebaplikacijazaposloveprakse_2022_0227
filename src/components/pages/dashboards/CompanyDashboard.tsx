'use client';
import { useEffect, useState } from 'react';
import { Ad } from "@/src/types/ad";
import { Plus, AlertCircle, MousePointer2, Filter, Inbox } from "lucide-react";
import CreateAdModal from '../../companies/CreateAdModal';
import { adService } from '@/src/services/adService';
import { LoadingState } from '../../ui/LoadingState';
import { ErrorState } from '../../ui/ErrorState';
import { ApplicationStatus, JobApplication } from '@/src/types/jobApplication';
import { AdCard } from '../../companies/AdCard';
import { ApplicationCardDesh } from '../../companies/ApplicationCardDesh';
import { ConfirmPopup } from '../../ui/ConfirmPopup';
import EditAdModal from '../../companies/EditAdModal';
import { applicationService } from '@/src/services/applicationService';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CompanyDashboard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [activeTab, setActiveTab] = useState<'oglasi' | 'prijave'>('oglasi');
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdId, setSelectedAdId] = useState<number | null>(null);
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAdToEdit, setSelectedAdToEdit] = useState<Ad | null>(null);
    const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'ALL'>('ALL');
    const [confirmConfig, setConfirmConfig] = useState<{
        isOpen: boolean;
        adId: number | null;
    }>({ isOpen: false, adId: null });

    useEffect(() => {
        fetchAds();
    }, []);

    useEffect(() => {
        const adIdParam = searchParams.get('adId');
        const statusParam = searchParams.get('status');
        
        if (adIdParam) {
            const adId = parseInt(adIdParam);
            if (!isNaN(adId) && adId !== selectedAdId) {
                handleSelectAd(adId);
            }
        }
        
        if (statusParam && (statusParam === 'ALL' || statusParam === 'PENDING' || statusParam === 'ACCEPTED' || statusParam === 'REJECTED')) {
            setStatusFilter(statusParam as ApplicationStatus | 'ALL');
        }
    }, [searchParams]);

    const fetchAds = async () => {
        setLoading(true);
        try {
            const res = await adService.getMyAds();
            setAds(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Greska pri dobavljanju oglasa");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (ad: Ad) => {
        setSelectedAdToEdit(ad);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setConfirmConfig({ isOpen: true, adId: id });
    };

    const handleActualDelete = async () => {
        if (!confirmConfig.adId) return;
        try {
            await adService.deleteAd(confirmConfig.adId);
            setAds(prev => prev.filter(ad => ad.id !== confirmConfig.adId));
            if (selectedAdId === confirmConfig.adId) {
                setSelectedAdId(null);
                router.push('/dashboard/company');
            }
            setConfirmConfig({ isOpen: false, adId: null });
        } catch (err) {
            alert("Greška pri brisanju oglasa");
        }
    };

    const handleSelectAd = async (adId: number) => {
        setSelectedAdId(adId);
        setActiveTab('prijave');
        const currentStatus = searchParams.get('status') || 'ALL';
        setStatusFilter(currentStatus as ApplicationStatus | 'ALL');
        
        router.push(`?adId=${adId}&status=${currentStatus}`);
        
        setLoading(true);
        try {
            const res = await adService.getApplicationsForAd(adId, currentStatus as ApplicationStatus | 'ALL');
            setApplications(res as JobApplication[]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Greska pri dobavljanju prijava");
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = async (newStatus: ApplicationStatus | 'ALL') => {
        setStatusFilter(newStatus);
        if (!selectedAdId) return;
        
        router.push(`?adId=${selectedAdId}&status=${newStatus}`);
        
        setLoading(true);
        try {
            const res = await adService.getApplicationsForAd(selectedAdId, newStatus);
            setApplications(res as JobApplication[]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Greska pri dobavljanju prijava");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (applicationId: number, newStatus: ApplicationStatus) => {
        try {
            await applicationService.updateApplicationStatus(applicationId, newStatus);
            setApplications(prev =>
                prev.map(app => app.id === applicationId ? { ...app, status: newStatus } : app)
            );
        } catch (err) {
            alert(err instanceof Error ? err.message : "Greška");
        }
    };

    const handleCloseApplications = () => {
        router.push('/');
        setSelectedAdId(null);
        setActiveTab('oglasi');
    };

    const getEmptyStateMessage = () => {
        switch (statusFilter) {
            case 'ACCEPTED':
                return 'Nema prihvacenih prijava';
            case 'REJECTED':
                return 'Nema odbijenih prijava';
            case 'PENDING':
                return 'Nema prijava na cekanju';
            default:
                return 'Nema prijava za ovaj oglas';
        }
    };

    return (
        <div className="p-8 bg-white min-h-screen font-sans selection:bg-[#2bc3c3] selection:text-[#1a3a94]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-6xl font-[1000] uppercase tracking-tighter text-[#1a3a94] leading-none">
                        WORK<span className="text-[#2bc3c3]">SPACE</span>
                    </h1>
                    <div className="flex gap-4 mt-4">
                        {['oglasi', 'prijave'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`cursor-pointer text-xs font-black uppercase tracking-[0.2em] pb-1 border-b-4 transition-all ${activeTab === tab ? 'border-[#2bc3c3] text-[#1a3a94]' : 'border-transparent text-gray-400 hover:text-[#1a3a94]'}`}
                            >
                                {tab === 'oglasi' ? 'Moji Oglasi' : 'Pristigle Prijave'}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={() => setIsModalOpen(true)} className="cursor-pointer group relative px-8 py-4 bg-[#1a3a94] border-2 border-[#1a3a94] transition-all duration-300 active:scale-95 hover:bg-[#2bc3c3] hover:border-[#1a3a94]">
                    <div className="relative flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-white border-2 border-[#1a3a94] transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[4px_4px_0px_0px_rgba(26,58,148,1)]">
                            <Plus size={14} className="text-[#1a3a94]" strokeWidth={4} />
                        </div>
                        <span className="text-white text-sm font-[1000] uppercase tracking-widest transition-colors duration-300 group-hover:text-[#1a3a94]">Novi oglas</span>
                    </div>
                </button>
            </div>

            {loading ? <LoadingState /> : error ? <ErrorState message={error} /> : (
                <div className="relative">
                    {activeTab === 'oglasi' ? (
                        ads.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {ads.map(ad => (
                                    <AdCard
                                        key={ad.id}
                                        ad={ad}
                                        onSelect={handleSelectAd}
                                        onDelete={handleDeleteClick}
                                        onEdit={() => handleEditClick(ad)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-20 border-4 border-dashed border-gray-200">
                                <AlertCircle size={48} className="text-gray-300 mb-4" />
                                <h2 className="text-3xl font-black text-[#1a3a94] uppercase">Niste objavili oglas</h2>
                                <button onClick={() => setIsModalOpen(true)} className="mt-8 cursor-pointer bg-[#2bc3c3] border-4 border-[#1a3a94] px-10 py-4 text-[#1a3a94] font-[1000] uppercase shadow-[6px_6px_0px_0px_rgba(26,58,148,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">Napravite prvi oglas</button>
                            </div>
                        )
                    ) : (
                        selectedAdId ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-8 border-[#1a3a94] pb-4 mb-8">
                                    <div>
                                        <h2 className="text-4xl font-[1000] uppercase tracking-tighter text-[#1a3a94]">
                                            KANDIDATI ZA <span className="text-[#2bc3c3]">OGLAS #{selectedAdId}</span>
                                        </h2>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">
                                            {applications.length} {applications.length === 1 ? 'Prijava' : 'Prijave'}
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <Filter size={16} className="text-[#2bc3c3]" />
                                            <select
                                                value={statusFilter}
                                                onChange={(e) => handleFilterChange(e.target.value as ApplicationStatus | 'ALL')}
                                                className="cursor-pointer bg-white border-4 border-[#1a3a94] px-4 py-2 text-[#1a3a94] font-black uppercase text-[10px] tracking-widest hover:bg-[#2bc3c3] transition-all"
                                            >
                                                <option value="ALL">Sve prijave</option>
                                                <option value="PENDING">Na cekanju</option>
                                                <option value="ACCEPTED">Prihvaceni</option>
                                                <option value="REJECTED">Odbijeni</option>
                                            </select>
                                        </div>
                                        
                                        <button 
                                            onClick={handleCloseApplications}
                                            className="cursor-pointer bg-[#1a3a94] text-white px-6 py-2 text-[10px] font-black uppercase hover:bg-red-500 transition-colors"
                                        >
                                            Zatvori
                                        </button>
                                    </div>
                                </div>

                                {applications.length > 0 ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {applications.map(app => (
                                            <ApplicationCardDesh
                                                key={app.id}
                                                app={app}
                                                onStatusUpdate={handleStatusChange} 
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 border-4 border-dashed border-gray-200">
                                        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center mb-6">
                                            <Inbox size={40} className="text-gray-300" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-400 uppercase tracking-tight mb-2">
                                            {getEmptyStateMessage()}
                                        </h3>
                                        <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                                            {statusFilter !== 'ALL' ? 'Probajte drugi filter' : 'Jos nema prijava'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="relative border-4 border-[#1a3a94] p-20 text-center bg-white shadow-[12px_12px_0px_0px_rgba(26,58,148,0.05)]">
                                <MousePointer2 size={64} className="text-[#1a3a94] mx-auto mb-4 rotate-12" />
                                <h2 className="text-4xl font-[1000] uppercase text-[#1a3a94]">Izaberite <span className="text-[#2bc3c3]">Oglas</span></h2>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Prvo oznacite oglas u listi da biste videli kandidate.</p>
                            </div>
                        )
                    )}
                </div>
            )}

            <div className="fixed bottom-0 right-0 p-4 opacity-10 pointer-events-none select-none">
                <h1 className="text-[150px] font-black leading-none">HUB</h1>
            </div>

            <CreateAdModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchAds}
            />
            {selectedAdToEdit && (
                <EditAdModal
                    key={selectedAdToEdit.id}
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedAdToEdit(null);
                    }}
                    onSuccess={fetchAds}
                    adToEdit={selectedAdToEdit}
                />
            )}
            <ConfirmPopup
                isOpen={confirmConfig.isOpen}
                onClose={() => setConfirmConfig({ isOpen: false, adId: null })}
                onConfirm={handleActualDelete}
                title="Brisanje Oglasa"
                message="Da li ste sigurni da zelite da obrisete ovaj oglas? Ova akcija je nepovratna."
                confirmText="Obrisi"
                type="warning"
            />
        </div>
    );
}