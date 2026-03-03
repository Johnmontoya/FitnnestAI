import { CircularProgress } from "../../../shared/ui/CircularProgress";
import { ProgressBar } from "../../../shared/ui/ProgressBar";
import { calculateData } from "../../../shared/utils/CalculateData";
import type { FoodResponse } from "../types/food.types";
import type { User } from "../../auth/types/auth.types";

interface ProgressFoodProps {
    mealTotals: {
        breakfast: number;
        lunch: number;
        dinner: number;
        snacks: number;
    };
    foodUser: FoodResponse;
    user: User;
}

const ProgressFood = ({ mealTotals, foodUser, user }: ProgressFoodProps) => {
    const { dailyCalories } = calculateData(user!);
    const totalCalories = Object.values(mealTotals).reduce((sum, cal) => (sum as number) + (cal as number), 0);

    const macros = [
        { name: "Proteínas", current: foodUser?.stats._sum.proteinas || 0, goal: Math.round((dailyCalories * 0.3) / 4), color: "var(--accent)" },
        { name: "Carbs", current: foodUser?.stats._sum.carbs || 0, goal: Math.round((dailyCalories * 0.4) / 4), color: "#38bdf8" },
        { name: "Grasas", current: foodUser?.stats._sum.fats || 0, goal: Math.round((dailyCalories * 0.3) / 9), color: "#fbbf24" },
    ];

    return (
        <div className="glass rounded-[32px] border-[var(--border-mid)] p-8! relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8!">
                <div>
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Status Bio-Energético</h3>
                    <p className="text-[var(--text-muted)] text-sm font-medium mt-1">Metas optimizadas para tu perfil</p>
                </div>
                <div className="px-3! py-1! bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full font-display font-bold text-[0.65rem] text-[var(--accent)] tracking-wider">
                    {user?.goal === "LOSE" ? "CUTTING" : user?.goal === "GAIN" ? "BULKING" : "MAINTAIN"}
                </div>
            </div>

            <div className="flex justify-center mb-10! relative">
                <div className="absolute inset-0 bg-[var(--accent)]/5 blur-3xl rounded-full"></div>
                <CircularProgress
                    value={totalCalories as number}
                    max={dailyCalories}
                    size={200}
                    strokeWidth={16}
                    color="var(--accent)"
                    label={totalCalories.toLocaleString()}
                    sublabel="KCAL TOTALES"
                    showPercentage
                />
            </div>

            {/* Macros Section */}
            <div className="space-y-5!">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
                    <span className="text-[0.65rem] font-bold text-[var(--accent)] uppercase tracking-[0.15em]">Desglose de Macros</span>
                </div>
                {macros.map((macro) => (
                    <div key={macro.name} className="space-y-2">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold text-[var(--text-muted)]">{macro.name}</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-white font-bold">{macro.current}g</span>
                                <span className="text-[var(--text-subtle)] text-xs">/ {macro.goal}g</span>
                            </div>
                        </div>
                        <ProgressBar
                            value={macro.current}
                            max={macro.goal}
                            color={macro.color}
                            showValues={false}
                            height="6px"
                        />
                    </div>
                ))}
            </div>

            <button className="w-full mt-10! py-4! rounded-xl border border-[var(--border-mid)] bg-white/5 hover:bg-[var(--accent)] hover:text-black font-display font-bold text-sm tracking-widest uppercase transition-all duration-300">
                Ajustar Protocolo
            </button>
        </div>
    );
};

export default ProgressFood;