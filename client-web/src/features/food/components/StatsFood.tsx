import { BiCoffee, BiCookie, BiMoon, BiSun } from "react-icons/bi";

interface StatsFoodProps {
    mealTotals: {
        breakfast: number;
        lunch: number;
        dinner: number;
        snacks: number;
    };
}

const StatsFood = ({ mealTotals }: StatsFoodProps) => {
    const meals = [
        { label: "Desayuno", value: mealTotals.breakfast, icon: BiCoffee, color: "#f59e0b" },
        { label: "Almuerzo", value: mealTotals.lunch, icon: BiSun, color: "#fb923c" },
        { label: "Cena", value: mealTotals.dinner, icon: BiMoon, color: "#818cf8" },
        { label: "Snacks", value: mealTotals.snacks, icon: BiCookie, color: "#f472b6" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {meals.map((meal) => (
                <div
                    key={meal.label}
                    className="glass rounded-2xl p-5! border-[var(--border)] hover:border-[var(--border-mid)] transition-all duration-300 group cursor-default"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            style={{
                                background: `${meal.color}10`,
                                border: `1px solid ${meal.color}20`
                            }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        >
                            <meal.icon style={{ width: '20px', height: '20px', color: meal.color }} />
                        </div>
                        <span className="font-display font-bold text-[0.65rem] tracking-[0.15em] uppercase text-[var(--text-muted)]">
                            {meal.label}
                        </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <p className="font-display font-extrabold text-2xl text-[var(--text)] leading-none tracking-tight">
                            {meal.value}
                        </p>
                        <span className="text-[0.7rem] text-[var(--text-subtle)] font-bold uppercase tracking-wider">kcal</span>
                    </div>

                    {/* Decorative accent line */}
                    <div className="mt-4 h-[2px] w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                                width: meal.value > 0 ? '40%' : '0%',
                                background: meal.color,
                                boxShadow: `0 0 10px ${meal.color}40`
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsFood;