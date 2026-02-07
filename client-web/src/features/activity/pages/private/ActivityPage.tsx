import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../shared/ui/Card';
import { CircularProgress } from '../../../../shared/ui/CircularProgress';
import { LuActivity, LuFlame, LuFootprints } from 'react-icons/lu';
import { QuickActivitiesGrid } from '../../../../shared/ui/ActivityButton';
import { BiCalendar, BiX } from 'react-icons/bi';
import { StatCard } from '../../../../shared/ui/Statcard';
import { BsClock } from 'react-icons/bs';
import { Button } from '../../../../shared/ui/Button';
import { Sidebar } from '../../../../shared/ui/Sidebar';
import { useActivityMutation } from '../../hooks/mutation/useActivityMutation';
import { activitySchema, type ActivityFormData } from '../../types/activity.types';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useActivity } from '../../hooks/queries/useActivity';
import { useAuthStore } from '../../../auth/store/useAuthStore';

const quickActivities = [
    { name: "Walking", emoji: "🚶", rate: 5 },
    { name: "Running", emoji: "🏃", rate: 11 },
    { name: "Cycling", emoji: "🚴", rate: 8 },
    { name: "Swimming", emoji: "🏊", rate: 10 },
];

interface Activity {
    name: string;
    rate: number;
}

interface ActivityResult {
    valor: number;
    porcentaje: string;
    tipo: 'incremento' | 'decremento';
    color: string;
}

const ActivityPage = () => {
    const { user } = useAuthStore();
    const { createActivity } = useActivityMutation();
    const { deleteActivity } = useActivityMutation();
    const { data: activities } = useActivity();
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    console.log(activities);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset
    } = useForm<ActivityFormData>({
        resolver: zodResolver(activitySchema),
        values: {
            name: selectedActivity?.name!,
            duration: 0,
            calories: 0,
            date: moment(new Date()).format('YYYY-MM-DD'),
        },
        mode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<ActivityFormData> = async (data) => {
        try {
            data.calories = selectedActivity?.rate! * data.duration;
            await createActivity.mutateAsync(data);
            reset();
        } catch (error) {
            console.error(error);
        } finally {
            isSubmitting
        }
    }

    const handleDeleteActivity = (id: string) => {
        try {
            deleteActivity.mutateAsync(id);
        } catch (error) {
            console.error(error);
        }
    }

    const last7Days = [...Array(7)].map((_, i) => moment().subtract(i, 'days').format('ddd')).reverse();

    const weeklyData = last7Days.map(dayName => {
        const dailySum = activities?.filter(activity => moment(activity.createdAt).format('ddd') === dayName).reduce((sum, current) => sum + current.calories, 0);

        return {
            day: dayName,
            value: dailySum
        };
    });

    let dailyCalories = user?.dailyCalorieIntake!;
    if (user?.goal === 'LOSE') dailyCalories = dailyCalories - 500;
    if (user?.goal === 'GAIN') dailyCalories = dailyCalories + 500;

    const durationTime = activities?.filter((activity) => moment(activity.createdAt).isSame(moment(), 'day')).reduce((sum, current) => sum + current.duration, 0);
    const prevDayTime = activities?.filter((activity) => moment(activity.createdAt).isSame(moment().subtract(1, 'days'), 'day')).reduce((sum, current) => sum + current.duration, 0);

    console.log(durationTime);

    const totalSteps = durationTime! * 100;
    const activeMinutes = durationTime;
    const caloriesBurned = activities?.filter((activity) => moment(activity.createdAt).isSame(moment(), 'day')).reduce((sum, current) => sum + current.calories, 0);
    const dailyGoals = {
        calories: dailyCalories,
        steps: totalSteps,
    };

    const prevDay = activities?.filter((activity) => moment(activity.createdAt).isSame(moment().subtract(1, 'days'), 'day')).reduce((sum, current) => sum + current.calories, 0);
    const diff = caloriesBurned! - prevDay!;
    const porcentaje = prevDay! > 0 ? (diff / prevDay!) * 100 : 0;

    const result: ActivityResult = {
        valor: Math.abs(diff),
        porcentaje: Math.abs(porcentaje).toFixed(2),
        tipo: diff >= 0 ? 'incremento' : 'decremento',
        color: diff >= 0 ? '#00e676' : '#ff5252' // Verde para incremento, Rojo para decremento
    };

    /** end  */
    const diffTime = durationTime! - prevDayTime!;
    const porcentajeTime = prevDayTime! > 0 ? (diffTime / prevDayTime!) * 100 : 0;

    const resultTime: ActivityResult = {
        valor: Math.abs(diffTime),
        porcentaje: Math.abs(porcentajeTime).toFixed(2),
        tipo: diffTime >= 0 ? 'incremento' : 'decremento',
        color: diffTime >= 0 ? '#00e676' : '#ff5252' // Verde para incremento, Rojo para decremento
    };

    const maxWeeklyValue = Math.max(...weeklyData.map(d => d.value!));

    return (
        <div className="min-h-screen bg-[#0a150a] text-white ml-64">
            <Sidebar />
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Buenos días, {user?.name}</h1>
                    <p className="text-gray-400">¿Listo para alcanzar tus metas hoy?</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                        <BiCalendar className="w-4 h-4" />
                        <span>{moment().format('MMMM DD, YYYY')}</span>
                    </div>
                </div>

                {/* Stats Overview */}
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
                        value={activeMinutes!.toString()}
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Log Activity */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Log Activity</CardTitle>
                                    <Button variant="outline" size="sm">Quick Log</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <QuickActivitiesGrid
                                    activities={quickActivities}
                                    selectedActivity={selectedActivity}
                                    onActivityClick={setSelectedActivity}
                                />

                                {selectedActivity && (
                                    <div className="mt-6 p-4 bg-[#0f1f0f] rounded-xl border border-[#2a4a2a]">
                                        <h4 className="text-white font-semibold mb-3">
                                            Log {selectedActivity.name}
                                        </h4>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-400 text-sm mb-2">Duration (min)</label>
                                                    <input
                                                        type="number"
                                                        {...register('duration', { valueAsNumber: true })}
                                                        placeholder="30"
                                                        className="w-full bg-[#1a2f1a] text-white rounded-lg px-4 py-2 border border-[#2a4a2a] focus:border-[#00ff66] focus:outline-none"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-center mt-6">
                                                    <Button variant="primary" type='submit' size="sm" className="w-full">
                                                        Registro de actividad
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Weekly Activity Chart */}
                        <Card className="mt-6">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Actividad semanal</CardTitle>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                                        <span className="text-gray-400">Calorias</span>
                                        <span className="text-white font-semibold ml-2">Meta</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-end justify-between gap-2 h-48">
                                    {weeklyData.map((item) => (
                                        <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="relative w-full h-[100px] flex items-end justify-center h-full">
                                                <div
                                                    className="w-full flex justify-center items-center bg-amber-500 rounded-t-lg transition-all duration-500 hover:bg-amber-400"
                                                    style={{
                                                        height: `${(item.value! / maxWeeklyValue) * 100}px`,
                                                        minHeight: '20px'
                                                    }}
                                                >
                                                    {item.value}
                                                </div>
                                            </div>
                                            <span className={`text-sm font-medium ${item.day === 'Thu' ? 'text-[#00ff66]' : 'text-gray-400'
                                                }`}>
                                                {item.day}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Recent Activities */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Actividades recientes</CardTitle>
                                    <Button variant="outline" size="sm">Ver todas</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {activities?.slice(0, 3).map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="relative p-4 bg-[#0f1f0f] rounded-xl border border-[#2a4a2a] hover:border-[#00ff66] transition-all"
                                        >
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                                                onClick={() => handleDeleteActivity(activity.id)}
                                            >
                                                <BiX size={16} />
                                            </Button>
                                            <div className="flex items-start gap-3">
                                                <div className="text-3xl"><LuActivity size={24} /></div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-semibold">{activity.name}</h4>
                                                    <p className="text-gray-400 text-sm">Duración: {activity.duration} minutos</p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-[#00ff66] text-sm font-medium">
                                                            Calorias: {activity.calories} kcal
                                                        </span>
                                                        <span className="text-white text-sm font-medium">
                                                            Fecha: {moment(activity.date).format('DD-MM-YYYY')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Daily Goal Progress */}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityPage;