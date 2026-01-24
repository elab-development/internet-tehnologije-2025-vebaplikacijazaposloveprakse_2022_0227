"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
    const searchParams = useSearchParams();

    const roleQuery = searchParams.get("role");
    const isStudent = roleQuery !== "company";

    const careerBlue = "#1a3a94";
    const hubCyan = "#2bc3c3";

    const brandBg = isStudent ? "bg-[#1a3a94]" : "bg-[#2bc3c3]";
    const brandText = isStudent ? "text-[#1a3a94]" : "text-[#2bc3c3]";
    const brandRing = isStudent ? "focus:ring-[#1a3a94]" : "focus:ring-[#2bc3c3]";

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
            <div className="absolute top-8 left-8">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#1a3a94] transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Nazad na početnu
                </Link>
            </div>
            <div className="mb-10 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                        src="/Logo.png"
                        alt="Career Hub Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <h1 className="text-3xl font-black tracking-tighter text-[#1a3a94]">
                    Career <span className="text-[#2bc3c3]">Hub</span>
                </h1>
            </div>

            <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
                <div className={`h-2.5 w-full ${brandBg}`} />

                <div className="p-8 sm:p-12">
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                            Registracija
                        </h2>
                        <p className="text-gray-400 mt-2 font-bold uppercase text-xs tracking-[0.2em]">
                            Kreirate nalog kao: <span className={brandText}>{isStudent ? "Student" : "Kompanija"}</span>
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Ime</label>
                                <input
                                    type="text"
                                    placeholder="Marko"
                                    className={`w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ${brandRing} focus:bg-white transition-all`}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Prezime</label>
                                <input
                                    type="text"
                                    placeholder="Marković"
                                    className={`w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ${brandRing} focus:bg-white transition-all`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email adresa</label>
                            <input
                                type="email"
                                placeholder="ime@primer.com"
                                className={`w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ${brandRing} focus:bg-white transition-all`}
                            />
                        </div>
                        {isStudent ? (
                            <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1a3a94] ml-1">Broj Indeksa</label>
                                    <input
                                        type="text"
                                        placeholder="2024/0001"
                                        className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#1a3a94] transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1a3a94] ml-1">Biografija</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Ukratko o tvojim veštinama..."
                                        className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#1a3a94] transition-all"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 rounded-3xl bg-teal-50/30 border border-teal-100 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#2bc3c3] ml-1">Naziv Firme</label>
                                        <input
                                            type="text"
                                            placeholder="Tech Solutions"
                                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2bc3c3] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#2bc3c3] ml-1">PIB</label>
                                        <input
                                            type="text"
                                            placeholder="123456789"
                                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2bc3c3] transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#2bc3c3] ml-1">Website</label>
                                    <input
                                        type="url"
                                        placeholder="https://kompanija.rs"
                                        className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2bc3c3] transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Lozinka</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className={`w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ${brandRing} focus:bg-white transition-all`}
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-5 rounded-2xl text-white font-black tracking-widest shadow-xl hover:translate-y-[-2px] active:scale-95 transition-all duration-200 ${brandBg}`}
                            style={{ boxShadow: `0 20px 30px -10px ${isStudent ? careerBlue + '50' : hubCyan + '50'}` }}
                        >
                            ZAVRŠI REGISTRACIJU
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Već imaš nalog?{" "}
                            <Link href="/login" className={`underline underline-offset-4 decoration-2 ${brandText}`}>
                                Prijavi se
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}