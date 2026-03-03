import type { User } from "../../auth/types/auth.types";
import { calculateData } from "../../../shared/utils/CalculateData";
import { BiBoltCircle, BiTargetLock, BiDroplet } from "react-icons/bi";
import { LuFlame } from "react-icons/lu";

interface ProfileGoalProps {
    user: User;
}

const ProfileGoal = ({ user }: ProfileGoalProps) => {
    const { dailyCalories } = calculateData(user!);

    const targets = [
        { label: "Meta Calórica", value: Math.round(dailyCalories), unit: "kcal/día", icon: LuFlame, color: "var(--accent)" },
        { label: "Proteína", value: Math.round((dailyCalories * 0.3) / 4), unit: "g/día", icon: BiTargetLock, color: "#f87171" },
        { label: "Carbohidratos", value: Math.round((dailyCalories * 0.4) / 4), unit: "g/día", icon: BiBoltCircle, color: "#38bdf8" },
        { label: "Grasas", value: Math.round((dailyCalories * 0.3) / 9), unit: "g/día", icon: BiBoltCircle, color: "#fbbf24" },
        { label: "Hidratación", value: (user?.weight * 35 / 1000).toFixed(1), unit: "L/día", icon: BiDroplet, color: "#0ea5e9" },
    ];

    return (
        <div className="glass rounded-[32px] border-[var(--border)] overflow-hidden">
            <div className="p-8! border-b border-white/5 bg-white/[0.02]">
                <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Target Optimizado</h3>
                <p className="text-[var(--text-muted)] text-[0.8rem] font-medium mt-1 uppercase tracking-widest">IA Generative Calibration</p>
            </div>

            <div className="p-2! space-y-1!">
                {targets.map((target) => (
                    <div
                        key={target.label}
                        className="group flex items-center justify-between p-3! rounded-2xl hover:bg-white/[0.03] transition-all cursor-default"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                style={{ background: `${target.color}15`, border: `1px solid ${target.color}20` }}
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                            >
                                <target.icon style={{ color: target.color }} />
                            </div>
                            <div>
                                <span className="block text-[0.6rem] font-bold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-1">
                                    {target.label}
                                </span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="p-2! font-display font-black text-2xl text-white tracking-tighter leading-none">
                                        {target.value}
                                    </span>
                                    <span className="text-[var(--text-subtle)] text-[0.7rem] font-black uppercase">
                                        {target.unit}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_8px_var(--accent-glow)] transition-all"></div>
                    </div>
                ))}
            </div>

            <div className="p-8! bg-[var(--accent)]/5">
                <p className="text-[0.65rem] text-[var(--accent)] font-bold text-center leading-relaxed uppercase tracking-widest italic opacity-70">
                    "Tu metabolismo es un motor de precisión. Aliméntalo con intención."
                </p>
            </div>
        </div>
    );
};

export default ProfileGoal;