"use client";
import { use, useEffect, useState } from 'react';
import { Ad, JobType, JobStatus } from '@/src/types/ad';
import { useParams } from 'next/navigation';
import { adService } from '@/src/services/adService';
import { LoadingState } from '@/src/components/ui/LoadingState';
import { ErrorState } from '@/src/components/ui/ErrorState';
import { applicationService } from '@/src/services/applicationService';
import Link from 'next/link';

export default function AdDetailsPage() {
  const params = useParams();
  const adId = params.id;
  const [applied, setApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await adService.getAdById(Number(adId));
        setAd(res);
        if (res.hasApplied) {
          setApplied(true);
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Greska pri dobavljanju oglasa");
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [adId]);
  const handleApply = async () => {
    setIsApplying(true);
    setApplyError(null);
    try {
      await applicationService.applyToAd(Number(adId));
      setApplied(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Greska pri prijavi";
      if (message.includes("401") || message.toLowerCase().includes("ulogovani")) {
        setApplyError("Morate biti ulogovani kao student da biste aplicirali.");
      } else if (message.includes("403")) {
        setApplyError("Samo studenti imaju pravo prijave na oglase.");
      } else {
        setApplyError(message);
      }
    } finally {
      setIsApplying(false);
    }
  };
  const getStatusLabel = (status: string) => status === JobStatus.ACTIVE ? 'Aktivan' : 'Zatvoren';
  const getJobTypeLabel = (type: string) => type === JobType.INTERNSHIP ? 'Praksa' : 'Posao';
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('sr-RS', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  if (loading) return (
    <LoadingState />
  );

  if (error || !ad) return (
    <ErrorState message={error || "Oglas nije pronađen"} />
  );
  const isExpired = new Date(ad.deadline) < new Date();
  const getRequirements = () => {
    try {
      if (Array.isArray(ad.requirements)) return ad.requirements;
      if (typeof ad.requirements === 'string') {
        if (ad.requirements.startsWith('[')) {
          return JSON.parse(ad.requirements);
        }
        return ad.requirements.split(',').map(s => s.trim());
      }
      return [];
    } catch (e) {
      return [];
    }
  };

  const requirements = getRequirements();
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {ad.title}
              </h1>
              {ad.company && (
                <p className="text-xl text-gray-600">{ad.company.companyName}</p>
              )}
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${ad.status === JobStatus.ACTIVE
                ? 'bg-green-100 text-green-800'
                : ad.status === JobStatus.CLOSED
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
                }`}
            >
              {getStatusLabel(ad.status)}
            </span>
          </div>

          {/* Meta informacije */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {ad.location}
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {getJobTypeLabel(ad.jobType)}
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Rok: {formatDate(ad.deadline)}
            </div>
            {ad._count && (
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {ad._count.applications} prijava
              </div>
            )}
          </div>
        </div>

        {/* Opis posla */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Opis posla</h2>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {ad.description}
          </div>
        </div>

        {/* Zahtevi */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Zahtevi</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {requirements.map((skill:string, index:number) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#1a3a94] text-white text-[10px] font-[1000] uppercase tracking-widest border-2 border-[#1a3a94] shadow-[3px_3px_0px_0px_rgba(43,195,195,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Informacije o kompaniji */}
        {ad.company && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              O kompaniji
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-xl font-bold text-gray-900">{ad.company.companyName}</p>
                <p className="text-sm text-gray-500 font-medium">{ad.company.industry} • {ad.company.location}</p>
              </div>

              {ad.company.description && (
                <p className="text-gray-700 leading-relaxed border-t border-gray-50 pt-4">
                  {ad.company.description}
                </p>
              )}

              <div className="flex flex-wrap gap-x-8 gap-y-2 pt-2">
                {ad.company.website && (
                  <div className="text-sm">
                    <span className="font-semibold text-gray-900">Vebsajt: </span>
                    <a href={ad.company.website} target="_blank" className="text-gray-600 hover:text-black transition-colors">
                      {ad.company.website}
                    </a>
                  </div>
                )}
                {ad.company.user?.email && (
                  <div className="text-sm">
                    <span className="font-semibold text-gray-900">Kontakt: </span>
                    <span className="text-gray-600">{ad.company.user.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dodatne informacije */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Dodatne informacije
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <span className="font-semibold">Objavljeno:</span>{' '}
              {formatDate(ad.createdAt)}
            </div>
            <div>
              <span className="font-semibold">Ažurirano:</span>{' '}
              {formatDate(ad.updatedAt)}
            </div>
          </div>
        </div>

        {/* Apply dugme */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {isExpired ? (
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-4">
                Ovaj oglas je istekao
              </p>
              <button
                disabled
                className="cursor-pointer w-full md:w-auto px-8 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
              >
                Rok za prijavu je istekao
              </button>
            </div>
          ) : ad.status !== JobStatus.ACTIVE ? (
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-4">
                Ovaj oglas trenutno nije aktivan
              </p>
              <button
                disabled
                className="cursor-pointer w-full md:w-auto px-8 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
              >
                Prijave nisu moguće
              </button>
            </div>
          ) : applied ? (
            <div className="text-center">
              <p className="text-green-600 font-semibold mb-4">
                Uspešno ste aplicirali na ovaj oglas!
              </p>
              <button
                disabled
                className="cursor-pointer w-full md:w-auto px-8 py-3 bg-green-500 text-white rounded-lg font-semibold cursor-not-allowed"
              >
                ✓ Aplicirali ste
              </button>
            </div>
          ) : applyError ? (
            <div className="text-center">
              <p className="text-red-600 mb-4 font-medium">
                Morate biti prijavljeni kao student.
              </p>
              <button
                disabled
                className="cursor-pointer w-full md:w-auto px-8 py-3 bg-red-500 text-white rounded-lg font-semibold cursor-not-allowed opacity-80"
              >
                Niste ulogovani
              </button>
              <div className="mt-2 text-sm text-gray-600">
                <Link href="/login" className="text-[#1a3a94] font-bold underline hover:text-[#1a3a94]/80">
                  Prijavite se ovde
                </Link>
              </div>
            </div>) :
            (
              <div className="text-center">
                <p className="text-gray-700 mb-4">
                  Zainteresovani ste za ovu poziciju? Aplicirajte odmah!
                </p>
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className={`cursor-pointer w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-colors ${isApplying
                    ? 'bg-[#1a3a94]/60 cursor-not-allowed'
                    : 'bg-[#1a3a94] hover:bg-[#1a3a94]/90'
                    } text-white`}
                >
                  {isApplying ? 'Apliciranje...' : 'Apliciraj na oglas'}
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}