import { BiTargetLock } from "react-icons/bi";
import { CircularProgress } from "../../../shared/ui/CircularProgress";
import { ProgressBar } from "../../../shared/ui/ProgressBar";
import { calculateData } from "../../../shared/utils/CalculateData";
import type { User } from "../../auth/types/auth.types";

interface IDailyGoal {
    user: User;
    caloriesBurned: number;
    totalSteps: number;
}

const DailyGoal = ({ user, caloriesBurned, totalSteps }: IDailyGoal) => {
    const { dailyCalories } = calculateData(user!);
    const stepGoal = 10000;
    const stepPercentage = Math.min(Math.round((totalSteps / stepGoal) * 100), 100);

    return (
        <div className="glass rounded-[32px] border-[var(--accent)]/20 p-8! mb-4! relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[var(--accent)] opacity-[0.05] blur-3xl"></div>

            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                    <BiTargetLock className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Estatus Diario</h3>
            </div>

            <div className="flex justify-center mb-10 relative">
                <div className="absolute inset-0 bg-[var(--accent)]/5 blur-3xl rounded-full"></div>
                <CircularProgress
                    value={stepPercentage}
                    max={100}
                    size={180}
                    strokeWidth={14}
                    color="var(--accent)"
                    label={`${stepPercentage}%`}
                    sublabel="OPTIMIZADO"
                    showPercentage={false}
                />
            </div>

            <div className="space-y-6">
                {/* Calories Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-widest">Gasto Térmico</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-white font-black text-lg">{caloriesBurned}</span>
                            <span className="text-[var(--text-subtle)] text-xs font-bold">/ {Math.round(dailyCalories)} KCAL</span>
                        </div>
                    </div>
                    <ProgressBar
                        value={caloriesBurned}
                        max={dailyCalories}
                        color="var(--accent)"
                        showValues={false}
                        height="8px"
                    />
                </div>

                {/* Steps Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-widest">Progreso Mecánico</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-white font-black text-lg">{totalSteps.toLocaleString()}</span>
                            <span className="text-[var(--text-subtle)] text-xs font-bold">/ {stepGoal.toLocaleString()} PASOS</span>
                        </div>
                    </div>
                    <ProgressBar
                        value={totalSteps}
                        max={stepGoal}
                        color="#38bdf8"
                        showValues={false}
                        height="8px"
                    />
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
                <div className="text-center">
                    <p className="text-[var(--text-subtle)] text-[0.7rem] font-medium leading-relaxed">
                        Sincronizando biometría en tiempo real para calibrar tus objetivos dinámicos.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DailyGoal;