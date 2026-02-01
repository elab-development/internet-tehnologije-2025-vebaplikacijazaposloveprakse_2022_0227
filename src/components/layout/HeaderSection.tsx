
export default function HeaderSection() {
    return (
        <div className="w-full pt-40 pb-20 md:pt-48 md:pb-32 px-6 border-b border-gray-100 bg-[#1a3a94]/5">
            <div className="max-w-5xl mx-auto text-left">
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-[2px] w-10 bg-[#2bc3c3]"></div>
                    <span className="text-[#2bc3c3] font-bold tracking-[0.3em] uppercase text-[10px]">Pronadji svoju priliku</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] text-[#1a3a94]">
                    CONNECTING <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a3a94] to-[#2bc3c3]">
                        OPPORTUNITIES.
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-medium leading-relaxed italic">
                    Spajamo studente i diplomce sa vodećim kompanijama kroz digitalni ekosistem.
                </p>
            </div>
        </div>
    )
}