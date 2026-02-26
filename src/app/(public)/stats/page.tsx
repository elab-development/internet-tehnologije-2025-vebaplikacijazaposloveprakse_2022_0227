'use client';

import { useEffect, useState } from "react";
import { statsService } from "@/src/services/statsService";
import { LoadingState } from "@/src/components/ui/LoadingState";
import { ErrorState } from "@/src/components/ui/ErrorState";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function StatsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await statsService.getStats();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Greska");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const pieData = [
    { name: "Studenti", value: stats.totalStudents },
    { name: "Kompanije", value: stats.totalCompanies },
  ];

  const adsData = [
    { name: "Aktivni", value: stats.activeAds },
    { name: "Ukupno", value: stats.totalAds },
    { name: "Prijave", value: stats.totalApplications },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1a3a94]">
      <div className="max-w-7xl mx-auto py-24 px-6 md:px-8">

        <div className="mb-12 border-b-8 border-[#1a3a94] pb-8">
          <p className="text-xs font-black uppercase tracking-widest text-[#2bc3c3] mb-2">— Statistika</p>
          <h1 className="text-6xl font-[1000] uppercase leading-none">
            Platforma <span className="text-[#2bc3c3]">u Brojevima.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-gray-100">
          <div className="border-r border-b border-gray-100 p-8">
            <p className="text-xs font-black uppercase tracking-widest text-[#1a3a94] mb-6">Korisnici</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                  <Cell fill="#1a3a94" />
                  <Cell fill="#2bc3c3" />
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="border-r border-b border-gray-100 p-8">
            <p className="text-xs font-black uppercase tracking-widest text-[#1a3a94] mb-6">Oglasi i prijave</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={adsData}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 900, fill: "#1a3a94" }} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <Tooltip />
                <Bar dataKey="value" fill="#1a3a94" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}