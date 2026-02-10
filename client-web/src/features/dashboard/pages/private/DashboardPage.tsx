import { Card, CardContent, CardHeader, CardTitle } from '../../../../shared/ui/Card';
import { CircularProgress } from '../../../../shared/ui/CircularProgress';
import { LuTrendingUp } from 'react-icons/lu';
import { useAuthStore } from '../../../auth/store/useAuthStore';
import { Navigate } from 'react-router-dom';
import { Sidebar } from '../../../../shared/ui/Sidebar';
import { useActivity } from '../../../activity/hooks/queries/useActivity';
import moment from 'moment';
import { useFoodUser } from '../../../food/hooks/queries/useFood';
import DashHeader from '../../components/DashHeader';
import { calculateData } from '../../../../shared/utils/CalculateData';

export const DashboardPage = () => {
    const { user } = useAuthStore();
    const { data: activities } = useActivity();
    const { data: foodUser } = useFoodUser({
        startOfDay: moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        endOfDay: moment().add(1, 'days').endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    });

    if (!user?.age || !user?.weight || !user?.height || !user?.goal) {
        return <Navigate to="/onboarding" />;
    }

    // Calculations   
    const caloriesBurned = activities?.filter((activity) => moment(activity.createdAt).isSame(moment(), 'day')).reduce((sum, current) => sum + current.calories, 0) || 0;
    const { dailyCalories } = calculateData(user!);

    const totalCaloriesBurned = activities?.filter((activity) => moment(activity.createdAt).isSame(moment(), 'day')).reduce((sum, current) => sum + current.calories, 0) || 0;
    const burnPercentage = (totalCaloriesBurned / caloriesBurned) * 100;

    const mealTotals = {
        breakfast: foodUser?.foodEntries?.filter(l => l.mealType === "BREAKFAST").reduce((sum, l) => sum + l.calories, 0) || 0,
        lunch: foodUser?.foodEntries?.filter(l => l.mealType === "LUNCH").reduce((sum, l) => sum + l.calories, 0) || 0,
        dinner: foodUser?.foodEntries?.filter(l => l.mealType === "DINNER").reduce((sum, l) => sum + l.calories, 0) || 0,
        snacks: foodUser?.foodEntries?.filter(l => l.mealType === "SNACK").reduce((sum, l) => sum + l.calories, 0) || 0,
    };

    let totalCalories = Object.values(mealTotals).reduce((sum, cal) => sum + cal, 0);
    const remainingCalories = dailyCalories - totalCalories;

    return (
        <div className="min-h-screen bg-[#0a150a] text-white ml-64">
            <Sidebar />
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <DashHeader user={user!} dailyCalories={dailyCalories} totalCalories={totalCalories} totalCaloriesBurned={totalCaloriesBurned} />

                {/* Calorie Progress Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Daily Calorie Intake */}
                    <Card>
                        <CardHeader>
                            <CardTitle><span className="text-white">Consumo Diario de Calorías</span></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center mb-4">
                                <CircularProgress
                                    value={totalCalories}
                                    max={dailyCalories}
                                    size={220}
                                    color="#BA3211"
                                    label={totalCalories.toLocaleString()}
                                    sublabel={`de ${dailyCalories.toLocaleString()} kcal`}
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-[#BA3211] font-semibold flex items-center justify-center gap-2">
                                    <LuTrendingUp className="w-4 h-4" />
                                    Restante: {remainingCalories} kcal
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Active Calorie Burn */}
                    <Card>
                        <CardHeader>
                            <CardTitle><span className="text-white">Quema Diaria de Calorías</span></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center mb-4">
                                <CircularProgress
                                    value={caloriesBurned}
                                    max={user?.dailyCalorieBurn!}
                                    size={220}
                                    color="#11BA48"
                                    label={caloriesBurned.toString()}
                                    sublabel={`de ${user?.dailyCalorieBurn} kcal`}
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-[#11BA48] font-semibold flex items-center justify-center gap-2">
                                    <LuTrendingUp className="w-4 h-4" />
                                    {burnPercentage.toFixed(0)}% Achieved
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;