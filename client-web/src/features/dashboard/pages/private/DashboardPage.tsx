import { useState } from 'react';
import { Button } from '../../../../shared/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../shared/ui/Card';
import { CircularProgress } from '../../../../shared/ui/CircularProgress';
import { LuTrendingUp } from 'react-icons/lu';
import { QuickActivitiesGrid } from '../../../../shared/ui/ActivityButton';
import { BiPlus } from 'react-icons/bi';
import { FoodLogItem } from '../../../../shared/ui/FoodLogItem';
import { useAuthStore } from '../../../auth/store/useAuthStore';
import { Navigate } from 'react-router-dom';
import { Sidebar } from '../../../../shared/ui/Sidebar';

// Dummy data (reemplazar con datos de Strapi)
const quickActivities = [
    { name: "Walking", emoji: "🚶", rate: 5 },
    { name: "Running", emoji: "🏃", rate: 11 },
    { name: "Cycling", emoji: "🚴", rate: 8 },
    { name: "Swimming", emoji: "🏊", rate: 10 },
    { name: "Yoga", emoji: "🧘", rate: 4 },
    { name: "Weight Training", emoji: "🏋️", rate: 6 },
];

export const DashboardPage = () => {
    const { user } = useAuthStore();

    if (!user?.age || !user?.weight || !user?.height || !user?.goal) {
        return <Navigate to="/onboarding" />;
    }

    const [userData, setUserData] = useState({
        name: "DemoUser",
        dailyCalorieIntake: 2200,
        dailyCalorieBurn: 400,
        goal: "maintain"
    });

    const [foodLogs, setFoodLogs] = useState([
        {
            id: "1",
            name: "Oatmeal with Blueberries",
            calories: 300,
            mealType: "breakfast"
        },
        {
            id: "2",
            name: "Grilled Chicken Salad",
            calories: 450,
            mealType: "lunch"
        }
    ]);

    const [activityLogs, setActivityLogs] = useState([
        {
            id: "1",
            name: "Morning Run",
            duration: 30,
            calories: 300
        }
    ]);

    // Calculations
    const totalCaloriesConsumed = foodLogs.reduce((sum, food) => sum + food.calories, 0);
    const totalCaloriesBurned = activityLogs.reduce((sum, activity) => sum + activity.calories, 0);
    const remainingCalories = userData.dailyCalorieIntake - totalCaloriesConsumed;
    const burnPercentage = (totalCaloriesBurned / userData.dailyCalorieBurn) * 100;

    // Motivational message
    const getMotivationalMessage = () => {
        const percentage = (totalCaloriesConsumed / userData.dailyCalorieIntake) * 100;

        if (totalCaloriesConsumed === 0 && totalCaloriesBurned === 0) {
            return { text: "Ready to crush today? Start logging!", emoji: "💪" };
        }
        if (percentage > 100) {
            return { text: "Over limit, but tomorrow is a new day!", emoji: "🌅" };
        }
        if (percentage >= 80) {
            return { text: "Almost at your limit, stay mindful!", emoji: "⚡" };
        }
        if (totalCaloriesBurned >= 30) {
            return { text: "Great workout today! Keep it up!", emoji: "🔥" };
        }
        if (percentage >= 50) {
            return { text: "You're doing great, keep going!", emoji: "✨" };
        }
        return { text: "Every step counts. You've got this!", emoji: "🚀" };
    };

    const motivation = getMotivationalMessage();

    return (
        <div className="min-h-screen bg-[#0a150a] text-white ml-64">
            <Sidebar />
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Welcome Back, {userData.name}</h1>
                            <p className="text-gray-400">Ready for your next workout? Enter your details to track your progress.</p>
                        </div>
                        <Button variant="primary" size="md">
                            View Stats
                        </Button>
                    </div>

                    {/* Motivational Banner */}
                    <div className="bg-gradient-to-r from-[#00ff66] to-[#00dd55] rounded-2xl p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{motivation.emoji}</span>
                            <div>
                                <h3 className="text-black font-bold text-lg">{motivation.text}</h3>
                                <p className="text-black opacity-70 text-sm">
                                    You're {Math.round((totalCaloriesConsumed / userData.dailyCalorieIntake) * 100)}% towards your daily goal of {userData.dailyCalorieIntake} kcal burned.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calorie Progress Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Daily Calorie Intake */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Calorie Intake</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center mb-4">
                                <CircularProgress
                                    value={totalCaloriesConsumed}
                                    max={userData.dailyCalorieIntake}
                                    size={220}
                                    color="#ff8c00"
                                    label={totalCaloriesConsumed.toLocaleString()}
                                    sublabel={`of ${userData.dailyCalorieIntake.toLocaleString()} kcal`}
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-[#ff8c00] font-semibold flex items-center justify-center gap-2">
                                    <LuTrendingUp className="w-4 h-4" />
                                    Remaining: {remainingCalories} kcal
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Active Calorie Burn */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Calorie Burn</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center mb-4">
                                <CircularProgress
                                    value={totalCaloriesBurned}
                                    max={userData.dailyCalorieBurn}
                                    size={220}
                                    color="#00ff66"
                                    label={totalCaloriesBurned.toLocaleString()}
                                    sublabel={`of ${userData.dailyCalorieBurn} kcal`}
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-[#00ff66] font-semibold flex items-center justify-center gap-2">
                                    <LuTrendingUp className="w-4 h-4" />
                                    {burnPercentage.toFixed(0)}% Achieved
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Activities */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Quick Activities</h2>
                        <Button variant="outline" size="sm">
                            See All
                        </Button>
                    </div>
                    <QuickActivitiesGrid
                        activities={quickActivities.slice(0, 3)}
                        onActivityClick={(activity) => console.log('Selected:', activity)} selectedActivity={undefined} />
                </div>

                {/* Daily Food Log */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Daily Food Log</CardTitle>
                            <Button variant="primary" size="sm" className="flex items-center gap-2">
                                <BiPlus className="w-4 h-4" />
                                Add Food
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {foodLogs.length > 0 ? (
                                foodLogs.map((food) => (
                                    <FoodLogItem
                                        key={food.id}
                                        {...food}
                                        onEdit={() => console.log('Edit', food.id)}
                                        onDelete={() => console.log('Delete', food.id)}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-400 mb-4">No meals logged yet today</p>
                                    <Button variant="outline" size="sm">
                                        + Add another meal
                                    </Button>
                                </div>
                            )}

                            {foodLogs.length > 0 && (
                                <button className="w-full py-3 text-gray-400 hover:text-[#00ff66] border-2 border-dashed border-[#2a4a2a] hover:border-[#00ff66] rounded-xl transition-all">
                                    + Add another meal
                                </button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;