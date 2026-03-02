import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { UpdateBiometricsRequest } from "../../../auth/types/auth.types";
import { BiTargetLock, BiTrophy, BiTrendingUp } from "react-icons/bi";

interface HealGoalProps {
    editMode: boolean;
    watch: UseFormWatch<UpdateBiometricsRequest>;
    setValue: UseFormSetValue<UpdateBiometricsRequest>;
}

const HealGoal = ({ editMode, watch, setValue }: HealGoalProps) => {
    const goals = [
        { id: "LOSE", label: "Pérdida de Peso", desc: "Optimización de déficit calórico", icon: BiTrendingUp, color: "#f87171" },
        { id: "MAINTAIN", label: "Mantenimiento", desc: "Equilibrio bio-energético", icon: BiTargetLock, color: "var(--accent)" },
        { id: "GAIN", label: "Ganancia Muscular", desc: "Superávit de alto rendimiento", icon: BiTrophy, color: "#38bdf8" },
    ];

    const currentGoal = watch("goal");

    return (
        <div className="glass rounded-[32px] border-[var(--border)] p-10!">
            <div className="flex items-center gap-3 mb-8!">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                    <BiTargetLock className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Objetivo Vital</h3>
                    <p className="text-[var(--text-muted)] text-[0.7rem] font-bold uppercase tracking-widest mt-1">Calibración de Protocolo</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {goals.map((goal) => {
                    const isActive = currentGoal === goal.id;
                    return (
                        <button
                            key={goal.id}
                            type="button"
                            disabled={!editMode}
                            onClick={() => setValue("goal", goal.id as any)}
                            className={`relative p-8! rounded-[24px] border-2 text-left transition-all duration-300 group ${isActive
                                ? 'bg-white/[0.05] border-[var(--accent)] shadow-[0_0_20px_rgba(var(--accent-glow-rgb),0.1)]'
                                : 'bg-black/40 border-white/5 hover:border-white/20'
                                } disabled:cursor-default`}
                        >
                            <div
                                style={{ background: isActive ? `${goal.color}20` : 'transparent' }}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-all ${isActive ? 'text-white' : 'text-white/20'
                                    }`}
                            >
                                <goal.icon style={{ color: isActive ? goal.color : '' }} />
                            </div>

                            <h4 className={`font-display font-black text-sm uppercase tracking-widest mb-2 ${isActive ? 'text-white' : 'text-[var(--text-muted)] group-hover:text-[var(--text-subtle)]'
                                }`}>
                                {goal.label}
                            </h4>
                            <p className="text-[0.65rem] font-bold text-[var(--text-subtle)] uppercase tracking-tighter leading-relaxed">
                                {goal.desc}
                            </p>

                            {isActive && (
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)] animate-pulse"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default HealGoal;