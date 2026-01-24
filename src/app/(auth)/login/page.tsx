"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
            <div className="absolute top-8 left-8">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#1a3a94] transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Nazad na pocetnu
                </Link>
            </div>
            <div className="mb-10 text-center">
                <Image
                    src="/Logo.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    priority
                    className="mx-auto mb-4"
                />
                <h1 className="text-3xl font-black text-[#1a3a94]">
                    Career <span className="text-[#2bc3c3]">Hub</span>
                </h1>
            </div>
            <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-[#1a3a94] to-[#2bc3c3]" />

                <div className="p-10">
                    <form className="space-y-6">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail
                                    size={20}
                                    strokeWidth={2.5}
                                    className="text-gray-300 group-focus-within:text-[#2bc3c3] transition-colors duration-300"
                                />
                            </div>
                            <input
                                type="email"
                                placeholder="Email adresa"
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#2bc3c3] focus:bg-white font-bold transition-all text-gray-700 placeholder:text-gray-300"
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock
                                    size={20}
                                    strokeWidth={2.5}
                                    className="text-gray-300 group-focus-within:text-[#2bc3c3] transition-colors duration-300"
                                />
                            </div>
                            <input
                                type="password"
                                placeholder="Lozinka"
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#2bc3c3] focus:bg-white font-bold transition-all text-gray-700 placeholder:text-gray-300"
                            />
                        </div>

                        <button className="cursor-pointer w-full flex items-center justify-center gap-2 py-5 rounded-2xl bg-[#2bc3c3] text-white font-black tracking-[0.2em] shadow-xl shadow-[#2bc3c3]/30 transition-all hover:translate-y-[-2px] active:scale-95">
                            PRIJAVI SE
                            <ArrowRight size={18} strokeWidth={3} />
                        </button>
                    </form>
                    <div className="mt-8 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                            Nemaš nalog?{" "}
                            <Link href="/register" className="ml-1 text-[#1a3a94] underline underline-offset-4 decoration-2 hover:text-[#2bc3c3] transition-colors">
                                Registruj se
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}