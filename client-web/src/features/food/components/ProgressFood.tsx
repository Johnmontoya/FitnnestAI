import { Button } from "../../../shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card";
import { CircularProgress } from "../../../shared/ui/CircularProgress";
import { ProgressBar } from "../../../shared/ui/ProgressBar";
import { calculateData } from "../../../shared/utils/CalculateData";

interface ProgressFoodProps {
    mealTotals: {
        breakfast: number;
        lunch: number;
        dinner: number;
        snacks: number;
    };
    foodUser: any;
    user: any;
}

const ProgressFood = ({ mealTotals, foodUser, user }: ProgressFoodProps) => {
    const { dailyCalories } = calculateData(user!);
    let totalCalories = Object.values(mealTotals).reduce((sum, cal) => sum + cal, 0);
    const macros = {
        calories: { current: totalCalories, goal: dailyCalories, color: "#00ff66" },
        protein: { current: foodUser?.stats._sum.proteinas || 0, goal: Math.round((dailyCalories * 0.3) / 4), color: "#00ff66" },
        carbs: { current: foodUser?.stats._sum.carbs || 0, goal: Math.round((dailyCalories * 0.4) / 4), color: "#3b82f6" },
        fats: { current: foodUser?.stats._sum.fats || 0, goal: Math.round((dailyCalories * 0.3) / 9), color: "#f59e0b" },
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Progreso de calorías</CardTitle>
                    <span className="px-3 py-1 bg-emerald-500 bg-opacity-20 text-slate-800 rounded-full text-xs font-semibold">
                        {user?.goal}
                    </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">Basado en tu nivel de actividad</p>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center mb-6">
                    <CircularProgress
                        value={totalCalories}
                        max={dailyCalories}
                        size={200}
                        strokeWidth={14}
                        color="#00ff66"
                        label={totalCalories.toString()}
                        sublabel={`DE ${dailyCalories} KCAL`}
                    />
                </div>

                {/* Macros */}
                <div className="space-y-4">
                    {Object.entries(macros).map(([name, data]) => (
                        <ProgressBar
                            key={name}
                            label={name.toUpperCase()}
                            value={data.current}
                            max={data.goal}
                            color={data.color}
                        />
                    ))}
                </div>

                <Button variant="primary" className="w-full mt-6">
                    Ajustar metas diarias
                </Button>
            </CardContent>
        </Card>
    )
}

export default ProgressFood;