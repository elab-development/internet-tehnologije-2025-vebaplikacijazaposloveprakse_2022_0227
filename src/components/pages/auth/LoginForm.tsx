"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ArrowRight, ArrowLeft, CircleX, CheckCircle2 } from "lucide-react";
import { authService } from "@/src/services/authService";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/src/lib/validators/auth";
import { useAuth } from "@/src/context/AuthContext";
export function LoginForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isSuccess = searchParams.get("registered") === "success";
    const { refetch } = useAuth();
    //--------------------------------------------//
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    //--------------------------------------------//
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        const validatedData = LoginSchema.safeParse(data);
        if (!validatedData.success) {
            setError(validatedData.error.issues[0].message);
            setLoading(false);
            return;
        }
        try {
            await authService.login(validatedData.data);
            await refetch();
            router.push("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Doslo je do greske tokom prijave.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
            <div className="absolute top-8 left-8">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-career-blue transition-colors group"
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
                <h1 className="text-3xl font-black text-career-blue">
                    Career <span className="text-hub-cyan">Hub</span>
                </h1>
            </div>
            <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-[#1a3a94] to-[#2bc3c3]" />
                {isSuccess && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                        <CheckCircle2 size={18} strokeWidth={3} />
                        <span>Uspešna registracija! Prijavi se.</span>
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                        <CircleX size={18} strokeWidth={3} />
                        <span>{error}</span>
                    </div>
                )}
                <div className="p-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail
                                    size={20}
                                    strokeWidth={2.5}
                                    className="text-gray-300 group-focus-within:text-hub-cyan transition-colors duration-300"
                                />
                            </div>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email adresa"
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-hub-cyan focus:bg-white font-bold transition-all text-gray-700 placeholder:text-gray-300"
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock
                                    size={20}
                                    strokeWidth={2.5}
                                    className="text-gray-300 group-focus-within:text-hub-cyan transition-colors duration-300"
                                />
                            </div>
                            <input
                                name="password"
                                type="password"
                                placeholder="Lozinka"
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-hub-cyan focus:bg-white font-bold transition-all text-gray-700 placeholder:text-gray-300"
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="cursor-pointer w-full flex items-center justify-center gap-2 py-5 rounded-2xl bg-hub-cyan text-white font-black tracking-[0.2em] shadow-xl shadow-hub-cyan/30 transition-all hover:translate-y-[-2px] active:scale-95">
                            {loading ? "SLANJE PODATAKA..." : "PRIJAVI SE"}
                            <ArrowRight size={18} strokeWidth={3} />
                        </button>
                    </form>
                    <div className="mt-8 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                            Nemaš nalog?{" "}
                            <Link href="/register" className="ml-1 text-career-blue underline underline-offset-4 decoration-2 hover:text-hub-cyan transition-colors">
                                Registruj se
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}