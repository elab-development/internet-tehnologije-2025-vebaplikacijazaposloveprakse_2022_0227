"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronDown, CircleX } from "lucide-react";
import { useState } from "react";
import { authService } from "@/src/services/authService";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/src/lib/validators/auth";

export default function RegisterPage() {
    //----------------------------------------------------------------------------------//
    const searchParams = useSearchParams();
    const router = useRouter();
    const roleQuery = searchParams.get("role");
    const isStudent = roleQuery !== "company";

    const brandBg = isStudent ? "bg-career-blue" : "bg-hub-cyan";
    const brandText = isStudent ? "text-career-blue" : "text-hub-cyan";
    const brandRing = isStudent ? "focus:ring-career-blue" : "focus:ring-hub-cyan";
    const brandShadow = isStudent ? "shadow-career-blue/30" : "shadow-hub-cyan/30";
    //----------------------------------------------------------------------------------//
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        const payload = {
            ...data,
            role: isStudent ? "STUDENT" : "COMPANY",
        };
        const validatedData = RegisterSchema.safeParse(payload);
        if (!validatedData.success) {
            setError(validatedData.error.issues[0].message);
            setLoading(false);
            return;
        }
        try {
            await authService.register(validatedData.data);
            router.push("/login?registered=success");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Doslo je do greske tokom registracije.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
            <div className="absolute top-8 left-8">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-career-blue transition-colors group"
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
                <h1 className="text-3xl font-black tracking-tighter text-career-blue">
                    Career <span className="text-hub-cyan">Hub</span>
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
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                            <CircleX size={18} strokeWidth={3} />
                            <span>{error}</span>
                        </div>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Ime</label>
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder="Marko"
                                    className={`w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ${brandRing} focus:bg-white transition-all`}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Prezime</label>
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Marković"
                                    className={`w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ${brandRing} focus:bg-white transition-all`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email adresa</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="ime@primer.com"
                                className={`w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ${brandRing} focus:bg-white transition-all`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Broj telefona</label>
                            <input
                                name="phone"
                                type="tel"
                                placeholder="+381 60 1234567"
                                className={`w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ${brandRing} focus:bg-white transition-all`}
                            />
                        </div>
                        {isStudent ? (
                            <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1a3a94] ml-1">Broj Indeksa</label>
                                    <input
                                        name="studentIndex"
                                        type="text"
                                        placeholder="2024/0001"
                                        className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#1a3a94] transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1a3a94] ml-1">Biografija</label>
                                    <textarea
                                        name="profileDescription"
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
                                            name="companyName"
                                            type="text"
                                            placeholder="Tech Solutions"
                                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2bc3c3] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#2bc3c3] ml-1">PIB</label>
                                        <input
                                            name="taxNumber"
                                            type="text"
                                            placeholder="123456789"
                                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2bc3c3] transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#2bc3c3] ml-1">Maticni Broj</label>
                                        <input
                                            name="regNumber"
                                            type="text"
                                            required
                                            placeholder="08765432"
                                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2bc3c3] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#2bc3c3] ml-1">
                                            Industrija
                                        </label>
                                        <div className="relative group">
                                            <select
                                                name="industry"
                                                required
                                                defaultValue=""
                                                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2bc3c3] transition-all font-bold text-gray-700 appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Odaberi...</option>
                                                <option value="IT">IT & Softver</option>
                                                <option value="Marketing">Marketing</option>
                                                <option value="Dizajn">Dizajn</option>
                                                <option value="Finansije">Finansije</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none text-[#2bc3c3] group-focus-within:rotate-180 transition-transform duration-300">
                                                <ChevronDown size={20} strokeWidth={3} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#2bc3c3] ml-1">Website</label>
                                    <input
                                        name="website"
                                        type="url"
                                        placeholder="https://kompanija.rs"
                                        className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2bc3c3] transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#2bc3c3] ml-1">Lokacija (Grad)</label>
                                    <input
                                        name="location"
                                        type="text"
                                        required
                                        placeholder="Beograd"
                                        className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2bc3c3] transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Lozinka</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className={`w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 ${brandRing} focus:bg-white transition-all`}
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className={`w-full py-5 rounded-2xl text-white font-black tracking-widest shadow-xl hover:translate-y-[-2px] active:scale-95 transition-all duration-200 ${brandBg} ${brandShadow}`}
                        >
                            {loading ? "SLANJE PODATAKA..." : "ZAVRSI REGISTRACIJU"}
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