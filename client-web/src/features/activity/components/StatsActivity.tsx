import { StatCard } from "../../../shared/ui/Statcard";
import { LuFootprints } from "react-icons/lu";
import { BsClock } from "react-icons/bs";
import { LuFlame } from "react-icons/lu";
import moment from "moment";
import type { ActivityResponse } from "../types/activity.types";

interface ActivityResult {
    valor: number;
    porcentaje: string;
    tipo: 'incremento' | 'decremento';
    color: string;
}

interface StatsActivityProps {
    activities: ActivityResponse[];
    totalSteps: number;
    caloriesBurned: number;
    durationTime: number;
}

const StatsActivity = ({ activities, totalSteps, caloriesBurned, durationTime }: StatsActivityProps) => {
    const prevDayTime = activities?.filter((activity) => moment(activity.createdAt).isSame(moment().subtract(1, 'days'), 'day')).reduce((sum, current) => sum + current.duration, 0);
    const activeMinutes = durationTime ? durationTime : 0;
    const prevDay = activities?.filter((activity) => moment(activity.createdAt).isSame(moment().subtract(1, 'days'), 'day')).reduce((sum, current) => sum + current.calories, 0);
    const diff = caloriesBurned! - prevDay!;
    const porcentaje = prevDay! > 0 ? (diff / prevDay!) * 100 : 0;

    const diffTime = durationTime! - prevDayTime!;
    const porcentajeTime = prevDayTime! > 0 ? (diffTime / prevDayTime!) * 100 : 0;

    const result: ActivityResult = {
        valor: Math.abs(diff),
        porcentaje: Math.abs(porcentaje).toFixed(1),
        tipo: diff >= 0 ? 'incremento' : 'decremento',
        color: diff >= 0 ? 'var(--accent)' : '#ff5252'
    };

    const resultTime: ActivityResult = {
        valor: Math.abs(diffTime),
        porcentaje: Math.abs(porcentajeTime).toFixed(1),
        tipo: diffTime >= 0 ? 'incremento' : 'decremento',
        color: diffTime >= 0 ? 'var(--accent)' : '#ff5252'
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12!">
            <div className="animate-fade-up-delay-1">
                <StatCard
                    title="Pasos Totales"
                    value={totalSteps.toLocaleString()}
                    icon={LuFootprints}
                    trend="up"
                    trendValue="Impulso cinético diario"
                    color="var(--accent)"
                />
            </div>
            <div className="animate-fade-up-delay-2">
                <StatCard
                    title="Tiempo de Actividad"
                    value={activeMinutes!.toString()}
                    unit="min"
                    icon={BsClock}
                    trend={resultTime.tipo === 'decremento' ? 'down' : 'up'}
                    trendValue={`${resultTime.porcentaje}% vs anterior`}
                    color={resultTime.color === 'var(--accent)' ? 'var(--accent)' : '#f87171'}
                />
            </div>
            <div className="animate-fade-up-delay-3">
                <StatCard
                    title="Gasto Calórico"
                    value={caloriesBurned!.toString()}
                    unit="kcal"
                    icon={LuFlame}
                    trend={result.tipo === 'decremento' ? 'down' : 'up'}
                    trendValue={`${result.porcentaje}% vs anterior`}
                    color={result.color === 'var(--accent)' ? 'var(--accent)' : '#f87171'}
                />
            </div>
        </div>
    );
};

export default StatsActivity;