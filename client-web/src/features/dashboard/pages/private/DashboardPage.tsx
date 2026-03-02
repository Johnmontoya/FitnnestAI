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
    const burnPercentage = caloriesBurned > 0 ? (totalCaloriesBurned / caloriesBurned) * 100 : 0;

    const mealTotals = {
        breakfast: foodUser?.foodEntries?.filter(l => l.mealType === "BREAKFAST").reduce((sum, l) => sum + l.calories, 0) || 0,
        lunch: foodUser?.foodEntries?.filter(l => l.mealType === "LUNCH").reduce((sum, l) => sum + l.calories, 0) || 0,
        dinner: foodUser?.foodEntries?.filter(l => l.mealType === "DINNER").reduce((sum, l) => sum + l.calories, 0) || 0,
        snacks: foodUser?.foodEntries?.filter(l => l.mealType === "SNACK").reduce((sum, l) => sum + l.calories, 0) || 0,
    };

    let totalCalories = Object.values(mealTotals).reduce((sum, cal) => sum + cal, 0);
    const remainingCalories = dailyCalories - totalCalories;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', marginLeft: '240px' }}>
            <Sidebar />
            <div style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                <DashHeader user={user!} dailyCalories={dailyCalories} totalCalories={totalCalories} totalCaloriesBurned={totalCaloriesBurned} />

                {/* Calorie Progress Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem',
                }}>
                    {/* Daily Calorie Intake */}
                    <Card className='p-4!'>
                        <CardHeader>
                            <CardTitle>Consumo Diario de Calorías</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <CircularProgress
                                    value={totalCalories}
                                    max={dailyCalories}
                                    size={220}
                                    color="#c6f135"
                                    label={totalCalories.toLocaleString()}
                                    sublabel={`de ${dailyCalories.toLocaleString()} kcal`}
                                />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{
                                    color: remainingCalories >= 0 ? 'var(--accent)' : '#f87171',
                                    fontWeight: 600,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                    fontFamily: 'Syne, sans-serif',
                                }}>
                                    <LuTrendingUp style={{ width: '16px', height: '16px' }} />
                                    Restante: {remainingCalories} kcal
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Active Calorie Burn */}
                    <Card className='p-4!'>
                        <CardHeader>
                            <CardTitle>Quema Diaria de Calorías</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <CircularProgress
                                    value={caloriesBurned}
                                    max={user?.dailyCalorieBurn!}
                                    size={220}
                                    color="#c6f135"
                                    label={caloriesBurned.toString()}
                                    sublabel={`de ${user?.dailyCalorieBurn} kcal`}
                                />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{
                                    color: 'var(--accent)',
                                    fontWeight: 600,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                    fontFamily: 'Syne, sans-serif',
                                }}>
                                    <LuTrendingUp style={{ width: '16px', height: '16px' }} />
                                    {burnPercentage.toFixed(0)}% del objetivo
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