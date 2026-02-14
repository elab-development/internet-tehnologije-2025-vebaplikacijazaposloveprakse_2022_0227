"use client";
import { useState } from 'react';
import { JobType, JobStatus } from "@prisma/client";

// Dummy podaci koji odgovaraju Prisma modelu
const dummyAd = {
  id: 1,
  companyId: 1,
  company: {
    id: 1,
    name: "Tech Solutions d.o.o.",
    description: "Vodeca IT kompanija u regionu.",
  },
  title: "Senior Frontend Developer",
  description: "Tražimo iskusnog Frontend developera za rad na challenging projektima.",
  requirements: "Minimum 3 godine iskustva sa React-om, TypeScript, Next.js",
  location: "Beograd, Srbija",
  deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  status: "ACTIVE" as JobStatus,
  jobType: "FULL_TIME" as JobType,
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  _count: {
    applications: 24,
  },
};

export default function AdDetailsPage() {
  const [applied, setApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const ad = dummyAd;

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setApplied(true);
      setIsApplying(false);
    }, 1500);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('sr-RS', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getJobTypeLabel = (type: JobType) => {
    const labels: Record<JobType, string> = {
       INTERNSHIP: 'Praksa',
      JOB: 'Puno radno vreme',
      
    };
    return labels[type] || type;
  };

  const getStatusLabel = (status: JobStatus) => {
    const labels: Record<JobStatus, string> = {
      ACTIVE: 'Aktivan',
      CLOSED: 'Zatvoren',
      EXPIRED: 'Istekao',
    };
    return labels[status] || status;
  };

  const isExpired = new Date(ad.deadline) < new Date();

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
                <p className="text-xl text-gray-600">{ad.company.name}</p>
              )}
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                ad.status === 'ACTIVE'
                  ? 'bg-green-100 text-green-800'
                  : ad.status === 'CLOSED'
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
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {ad.requirements}
          </div>
        </div>

        {/* Informacije o kompaniji */}
        {ad.company && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              O kompaniji
            </h2>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {ad.company.name}
            </p>
            {ad.company.description && (
              <p className="text-gray-700">{ad.company.description}</p>
            )}
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
                className="w-full md:w-auto px-8 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
              >
                Rok za prijavu je istekao
              </button>
            </div>
          ) : ad.status !== 'ACTIVE' ? (
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-4">
                Ovaj oglas trenutno nije aktivan
              </p>
              <button
                disabled
                className="w-full md:w-auto px-8 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
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
                className="w-full md:w-auto px-8 py-3 bg-green-500 text-white rounded-lg font-semibold cursor-not-allowed"
              >
                ✓ Aplicirali ste
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                Zainteresovani ste za ovu poziciju? Aplicirajte odmah!
              </p>
              <button
                onClick={handleApply}
                disabled={isApplying}
                className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-colors ${
                  isApplying
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