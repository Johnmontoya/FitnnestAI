import type { UseFormRegister } from "react-hook-form";
import type { UpdateBiometricsRequest, User } from "../../../auth/types/auth.types";
import { BiUserCircle, BiMaleFemale, BiExpand } from "react-icons/bi";
import { LuWeight } from "react-icons/lu";

interface PersonalMetricProps {
    user: User;
    editMode: boolean;
    isSubmitting: boolean;
    setEditMode: (mode: boolean) => void;
    register: UseFormRegister<UpdateBiometricsRequest>;
}

const PersonalMetric = ({ editMode, register }: PersonalMetricProps) => {
    const fields = [
        { label: "Edad", name: "age", icon: BiUserCircle, unit: "Años" },
        { label: "Altura", name: "height", icon: BiExpand, unit: "cm" },
        { label: "Peso", name: "weight", icon: LuWeight, unit: "kg" },
    ];

    return (
        <div className="glass rounded-[32px] border-[var(--border)] p-10!">
            <div className="flex items-center gap-3 mb-10!">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                    <BiUserCircle className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Biometría Base</h3>
                    <p className="text-[var(--text-muted)] text-[0.7rem] font-bold uppercase tracking-widest mt-1!">Métricas de Rendimiento</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fields.map((field) => (
                    <div key={field.name} className="space-y-2!">
                        <label className="flex items-center gap-2 text-[0.65rem] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] ml-1">
                            <field.icon className="text-[var(--accent)]" />
                            {field.label}
                        </label>
                        <div className="relative group">
                            <input
                                {...register(field.name as keyof UpdateBiometricsRequest, { valueAsNumber: true })}
                                disabled={!editMode}
                                type="number"
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6! py-4! font-display font-bold text-lg text-white placeholder-white/20 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all outline-none disabled:opacity-60"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[0.6rem] font-black text-[var(--text-subtle)] uppercase tracking-widest">
                                {field.unit}
                            </span>
                        </div>
                    </div>
                ))}

                <div className="space-y-2!">
                    <label className="flex items-center gap-2 text-[0.65rem] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] ml-1!">
                        <BiMaleFemale className="text-[var(--accent)]" />
                        Género
                    </label>
                    <div className="relative">
                        <select
                            {...register("gender")}
                            disabled={!editMode}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6! py-4! font-display font-bold text-lg text-white appearance-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all outline-none disabled:opacity-60"
                        >
                            <option value="MALE">Masculino</option>
                            <option value="FEMALE">Femenino</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="w-2 h-2 border-r-2 border-b-2 border-white/40 rotate-45"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalMetric;