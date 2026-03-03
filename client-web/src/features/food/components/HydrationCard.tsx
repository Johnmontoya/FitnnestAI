import { BiDroplet } from "react-icons/bi";
import { ProgressBar } from "../../../shared/ui/ProgressBar";
import type { User } from "../../auth/types/auth.types";

interface HydrationCardProps {
    user: User;
}

const HydrationCard = ({ user }: HydrationCardProps) => {
    const targetMl = user?.weight ? Math.round(user.weight * 35) : 2500;
    const currentMl = 1800; // Mock current value for now
    const percentage = Math.round((currentMl / targetMl) * 100);

    return (
        <div className="glass rounded-[32px] border-[#38bdf820] p-8! relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#38bdf8] opacity-[0.05] blur-3xl"></div>

            <div className="flex items-center gap-4 mb-8!">
                <div className="w-12 h-12 rounded-2xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center">
                    <BiDroplet className="w-6 h-6 text-[#38bdf8]" />
                </div>
                <div>
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight">H2O Nivel</h3>
                    <p className="text-[var(--text-muted)] text-sm font-medium">Meta Diaria: {(targetMl / 1000).toFixed(1)}L</p>
                </div>
            </div>

            <div className="mb-8! p-6! rounded-2xl bg-black/40 border border-[#38bdf810]">
                <div className="flex justify-between items-end mb-4">
                    <div className="flex items-baseline gap-1">
                        <span className="p-2! font-display font-black text-lg md:text-4xl text-white tracking-tighter">{(currentMl / 1000).toFixed(1)}</span>
                        <span className="text-[#38bdf8] font-black text-xl">L</span>
                    </div>
                    <div className="text-right">
                        <span className="block font-display font-bold text-xs text-[var(--text-muted)] uppercase tracking-widest">Status</span>
                        <span className="font-display font-extrabold text-[#38bdf8]">{percentage}%</span>
                    </div>
                </div>
                <ProgressBar
                    value={currentMl}
                    max={targetMl}
                    color="#38bdf8"
                    showValues={false}
                    height="12px"
                />
            </div>

            <div className="grid grid-cols-4 gap-3 mb-8!">
                {[...Array(8)].map((_, i) => (
                    <button
                        key={i}
                        className={`aspect-square rounded-xl border transition-all duration-300 flex items-center justify-center text-lg ${i < 5
                            ? 'bg-[#38bdf815] border-[#38bdf840] text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.1)]'
                            : 'bg-white/5 border-white/10 text-white/20'
                            } hover:scale-105 active:scale-95`}
                    >
                        {i < 5 ? <BiDroplet /> : <div className="w-1 h-1 rounded-full bg-current"></div>}
                    </button>
                ))}
            </div>

            <button className="w-full py-4! rounded-xl bg-[#38bdf8] text-black font-display font-black text-sm tracking-widest uppercase hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 transform active:scale-[0.98]">
                Inyectar 250ml
            </button>
        </div>
    );
};

export default HydrationCard;