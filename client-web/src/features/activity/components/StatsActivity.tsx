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

    /** end  */
    const diffTime = durationTime! - prevDayTime!;


    const porcentajeTime = prevDayTime! > 0 ? (diffTime / prevDayTime!) * 100 : 0;

    const result: ActivityResult = {
        valor: Math.abs(diff),
        porcentaje: Math.abs(porcentaje).toFixed(2),
        tipo: diff >= 0 ? 'incremento' : 'decremento',
        color: diff >= 0 ? '#00e676' : '#ff5252' // Verde para incremento, Rojo para decremento
    };

    const resultTime: ActivityResult = {
        valor: Math.abs(diffTime),
        porcentaje: Math.abs(porcentajeTime).toFixed(2),
        tipo: diffTime >= 0 ? 'incremento' : 'decremento',
        color: diffTime >= 0 ? '#00e676' : '#ff5252' // Verde para incremento, Rojo para decremento
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                title="Total Pasos"
                value={totalSteps.toLocaleString()}
                icon={LuFootprints}
                trend="up"
                trendValue="Pasos recorridos el dia de hoy"
                color="#00ff66"
            />
            <StatCard
                title="Minutos Activo"
                value={activeMinutes!.toString() || '0'}
                unit="min"
                icon={BsClock}
                trend={resultTime.tipo === 'decremento' ? 'down' : 'up'}
                trendValue={`${resultTime.porcentaje}% vs yesterday`}
                color={resultTime.color}
            />
            <StatCard
                title="Calorias Quemadas"
                value={caloriesBurned!.toString()}
                unit="kcal"
                icon={LuFlame}
                trend={result.tipo === 'decremento' ? 'down' : 'up'}
                trendValue={`${result.porcentaje}% vs yesterday`}
                color={result.color}
            />
        </div>
    );
};

export default StatsActivity;