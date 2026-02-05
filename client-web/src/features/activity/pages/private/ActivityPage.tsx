import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../shared/ui/Card';
import { CircularProgress } from '../../../../shared/ui/CircularProgress';
import { LuFlame, LuFootprints } from 'react-icons/lu';
import { QuickActivitiesGrid } from '../../../../shared/ui/ActivityButton';
import { BiCalendar } from 'react-icons/bi';
import { StatCard } from '../../../../shared/ui/Statcard';
import { BsClock } from 'react-icons/bs';
import { Button } from '../../../../shared/ui/Button';
import { Sidebar } from '../../../../shared/ui/Sidebar';

const quickActivities = [
    { name: "Walking", emoji: "🚶", rate: 5 },
    { name: "Running", emoji: "🏃", rate: 11 },
    { name: "Cycling", emoji: "🚴", rate: 8 },
    { name: "Swimming", emoji: "🏊", rate: 10 },
];

const recentActivities = [
    {
        id: 1,
        name: "Morning Run",
        time: "08:30 AM • Today",
        calories: 300,
        duration: "30 min",
        icon: "🏃",
        color: "#00ff66"
    },
    {
        id: 2,
        name: "Evening Swim",
        time: "06:30 PM • Yesterday",
        calories: 420,
        duration: "45 min",
        icon: "🏊",
        color: "#3b82f6"
    },
    {
        id: 3,
        name: "Quick Cycling",
        time: "07:30 PM • Yesterday",
        calories: 180,
        duration: "20 min",
        icon: "🚴",
        color: "#f59e0b"
    },
];

const weeklyData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 80 },
    { day: 'Wed', value: 60 },
    { day: 'Thu', value: 95 },
    { day: 'Fri', value: 70 },
    { day: 'Sat', value: 50 },
    { day: 'Sun', value: 65 },
];

const ActivityPage = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);

    const totalSteps = 8432;
    const activeMinutes = 45;
    const caloriesBurned = 520;
    const dailyGoals = {
        calories: 2100,
        steps: 10000,
    };

    const maxWeeklyValue = Math.max(...weeklyData.map(d => d.value));

    return (
        <div className="min-h-screen bg-[#0a150a] text-white ml-64">
            <Sidebar />
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Good Morning, Alex</h1>
                    <p className="text-gray-400">Ready to crush your goals today?</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                        <BiCalendar className="w-4 h-4" />
                        <span>October 24, 2023</span>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Total Steps"
                        value={totalSteps.toLocaleString()}
                        icon={LuFootprints}
                        trend="up"
                        trendValue="+23% vs yesterday"
                        color="#00ff66"
                    />
                    <StatCard
                        title="Active Minutes"
                        value={activeMinutes.toString()}
                        unit="min"
                        icon={BsClock}
                        trend="up"
                        trendValue="+5% vs yesterday"
                        color="#3b82f6"
                    />
                    <StatCard
                        title="Calories Burned"
                        value={caloriesBurned.toString()}
                        unit="kcal"
                        icon={LuFlame}
                        trend="down"
                        trendValue="-2% vs yesterday"
                        color="#f59e0b"
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
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">Duration (min)</label>
                                                <input
                                                    type="number"
                                                    placeholder="30"
                                                    className="w-full bg-[#1a2f1a] text-white rounded-lg px-4 py-2 border border-[#2a4a2a] focus:border-[#00ff66] focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">
                                                    Est. Calories: {selectedActivity.rate * 30} kcal
                                                </label>
                                                <Button variant="primary" size="sm" className="w-full">
                                                    Log Activity
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Weekly Activity Chart */}
                        <Card className="mt-6">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Weekly Activity</CardTitle>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="w-3 h-3 bg-[#00ff66] rounded-full"></span>
                                        <span className="text-gray-400">Energy</span>
                                        <span className="text-white font-semibold ml-2">Goal</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-end justify-between gap-2 h-48">
                                    {weeklyData.map((item, index) => (
                                        <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="relative w-full flex items-end justify-center h-full">
                                                <div
                                                    className="w-full bg-[#00ff66] rounded-t-lg transition-all duration-500 hover:bg-[#00dd55]"
                                                    style={{
                                                        height: `${(item.value / maxWeeklyValue) * 100}%`,
                                                        minHeight: '20px'
                                                    }}
                                                />
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
                                    <CardTitle>Recent Activities</CardTitle>
                                    <Button variant="outline" size="sm">View All</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentActivities.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="p-4 bg-[#0f1f0f] rounded-xl border border-[#2a4a2a] hover:border-[#00ff66] transition-all"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="text-3xl">{activity.icon}</div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-semibold">{activity.name}</h4>
                                                    <p className="text-gray-400 text-sm">{activity.time}</p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-[#00ff66] text-sm font-medium">
                                                            {activity.calories} kcal
                                                        </span>
                                                        <span className="text-gray-400 text-sm">
                                                            {activity.duration}
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
                                <CardTitle>Daily Goal Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {/* Calories Progress */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-400 text-sm">Calories</span>
                                            <span className="text-white font-semibold text-sm">
                                                {caloriesBurned} / {dailyGoals.calories}
                                            </span>
                                        </div>
                                        <div className="w-full bg-[#1a2f1a] rounded-full h-2 overflow-hidden">
                                            <div
                                                className="h-full bg-[#00ff66] rounded-full transition-all duration-500"
                                                style={{ width: `${(caloriesBurned / dailyGoals.calories) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Steps Progress */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-400 text-sm">Steps</span>
                                            <span className="text-white font-semibold text-sm">
                                                {totalSteps.toLocaleString()} / {dailyGoals.steps.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="w-full bg-[#1a2f1a] rounded-full h-2 overflow-hidden">
                                            <div
                                                className="h-full bg-[#00ff66] rounded-full transition-all duration-500"
                                                style={{ width: `${(totalSteps / dailyGoals.steps) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Overall Progress Circle */}
                                    <div className="flex justify-center pt-4">
                                        <div className="text-center">
                                            <CircularProgress
                                                value={75}
                                                max={100}
                                                size={120}
                                                strokeWidth={10}
                                                color="#00ff66"
                                                label="75%"
                                                sublabel="OVERALL"
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