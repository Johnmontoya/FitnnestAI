import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card";
import { CircularProgress } from "../../../shared/ui/CircularProgress";
import { calculateData } from "../../../shared/utils/CalculateData";
import type { User } from "../../auth/types/auth.types";

interface IDailyGoal {
    user: User;
    caloriesBurned: number;
    totalSteps: number;
}

const DayliGoal = ({ user, caloriesBurned, totalSteps }: IDailyGoal) => {
    const { dailyCalories } = calculateData(user!);
    const dailyGoals = {
        calories: dailyCalories,
        steps: totalSteps,
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Progreso de la meta diaria</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Calories Progress */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Calorias</span>
                            <span className="text-white font-semibold text-sm">
                                {caloriesBurned} / {Math.round(dailyCalories)}
                            </span>
                        </div>
                        <div className="w-full bg-[#1a2f1a] rounded-full h-2 overflow-hidden">
                            <div
                                className="h-full bg-[#00ff66] rounded-full transition-all duration-500"
                                style={{ width: `${(caloriesBurned! / dailyGoals.calories) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Steps Progress */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Pasos</span>
                            <span className="text-white font-semibold text-sm">
                                {totalSteps.toLocaleString()} / {12000}
                            </span>
                        </div>
                        <div className="w-full bg-[#1a2f1a] rounded-full h-2 overflow-hidden">
                            <div
                                className="h-full bg-[#00ff66] rounded-full transition-all duration-500"
                                style={{ width: `${(dailyGoals.steps / 12000) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Overall Progress Circle */}
                    <div className="flex justify-center pt-4">
                        <div className="text-center">
                            <CircularProgress
                                value={(dailyGoals.steps / 10000) * 100}
                                max={100}
                                size={120}
                                strokeWidth={10}
                                color="#00ff66"
                                label={`${(dailyGoals.steps / 10000) * 100}%`}
                                sublabel="METAS"
                                showPercentage={false}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default DayliGoal;