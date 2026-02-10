import { FiTarget } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card"
import type { User } from "../../auth/types/auth.types";
import { calculateData } from "../../../shared/utils/CalculateData";

interface ProfileGoalProps {
    user: User;
}

const ProfileGoal = ({ user }: ProfileGoalProps) => {
    const calculateTargets = () => {
        const data = calculateData(user);

        return {
            calories: Math.round(data.dailyCalories),
            protein: Math.round((data.dailyCalories * 0.3) / 4), // 30% of calories, 4 cal/g
            carbs: Math.round((data.dailyCalories * 0.4) / 4),   // 40% of calories
            fats: Math.round((data.dailyCalories * 0.3) / 9),    // 30% of calories, 9 cal/g
        };
    };

    const targets = calculateTargets();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Objetivos Calculados</CardTitle>
                <p className="text-gray-400 text-sm mt-1">
                    Basado en tus métricas actuales
                </p>
            </CardHeader>
            <CardContent>
                <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-emerald-500 bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <FiTarget className="w-10 h-10 text-slate-800" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">OBJETIVO DIARIO</h3>
                    <p className="text-5xl font-bold text-emerald-500 mb-1">
                        {targets.calories}
                    </p>
                    <p className="text-gray-400 text-sm">Kilocalorías / día</p>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-[#0f1f0f] rounded-lg">
                        <span className="text-gray-400">Proteínas</span>
                        <span className="text-[#00ff66] font-bold">{targets.protein}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#0f1f0f] rounded-lg">
                        <span className="text-gray-400">Carbohidratos</span>
                        <span className="text-blue-400 font-bold">{targets.carbs}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#0f1f0f] rounded-lg">
                        <span className="text-gray-400">Grasas</span>
                        <span className="text-amber-400 font-bold">{targets.fats}g</span>
                    </div>
                </div>

                <div className="p-4 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-xl">
                    <p className="text-blue-200 text-sm">
                        💡 Tus datos están encriptados y seguros. Usamos estas métricas para calcular tu TMB (Tasa Metabólica Basal) y GET (Gasto Energético Total) para ayudarte a alcanzar tus objetivos más rápido.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileGoal