import { Button } from "../../../shared/ui/Button"
import type { User } from "../../auth/types/auth.types"

interface DashHeaderProps {
    user: User;
    totalCalories: number;
    dailyCalories: number;
    totalCaloriesBurned: number;
}

const DashHeader = ({ user, totalCalories, dailyCalories, totalCaloriesBurned }: DashHeaderProps) => {
    // Motivational message
    const getMotivationalMessage = () => {
        const percentage = (totalCalories / dailyCalories) * 100;

        if (totalCalories === 0 && totalCaloriesBurned === 0) {
            return { text: "Listo para la rutina? Inicia a registrar!", emoji: "💪" };
        }
        if (percentage > 100) {
            return { text: "Superaste el límite, pero mañana es un nuevo día!", emoji: "🌅" };
        }
        if (percentage >= 80) {
            return { text: "Casi llegas a tu límite, ¡mantente alerta!", emoji: "⚡" };
        }
        if (totalCaloriesBurned >= 30) {
            return { text: "¡Excelente rutina hoy! ¡Sigue adelante!", emoji: "🔥" };
        }
        if (percentage >= 50) {
            return { text: "¡Excelente progreso, sigue adelante!", emoji: "✨" };
        }
        return { text: "¡Cada paso cuenta. Tienes esto!", emoji: "🚀" };
    };

    const motivation = getMotivationalMessage();
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Bienvenido, {user.name}</h1>
                    <p className="text-gray-400">Listo para tu siguiente rutina? Ingrese tus detalles para rastrear tu progreso.</p>
                </div>
                <Button variant="primary" size="md">
                    Ver Estadísticas
                </Button>
            </div>

            {/* Motivational Banner */}
            <div className="bg-emerald-500 rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-4xl">{motivation.emoji}</span>
                    <div>
                        <h3 className="text-black font-bold text-lg">{motivation.text}</h3>
                        <p className="text-black opacity-70 text-sm">
                            Estas {Math.round((totalCalories / dailyCalories) * 100)}% hacia tu objetivo diario de {dailyCalories} kcal quemadas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashHeader