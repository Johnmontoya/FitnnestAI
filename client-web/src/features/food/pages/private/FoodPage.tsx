import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../shared/ui/Card';
import { BiCoffee, BiCookie, BiDroplet, BiMoon, BiPlus, BiSun } from 'react-icons/bi';
import { Button } from '../../../../shared/ui/Button';
import { Input, Select } from '../../../../shared/ui/Input';
import { FoodLogItem } from '../../../../shared/ui/FoodLogItem';
import { CircularProgress } from '../../../../shared/ui/CircularProgress';
import { ProgressBar } from '../../../../shared/ui/ProgressBar';
import { Sidebar } from '../../../../shared/ui/Sidebar';

const mealTypeOptions = [
    { value: "breakfast", label: "🌅 Breakfast" },
    { value: "lunch", label: "☀️ Lunch" },
    { value: "dinner", label: "🌙 Dinner" },
    { value: "snack", label: "🍪 Snack" },
];

const quickLogIcons = {
    breakfast: "🥣",
    lunch: "🍔",
    dinner: "🍝",
    snack: "🍎",
};

const todaysLogs = [
    {
        id: 1,
        name: "Black Coffee",
        mealType: "breakfast",
        portion: "1 cup",
        calories: 5,
    },
    {
        id: 2,
        name: "Oatmeal with Blueberries",
        mealType: "breakfast",
        portion: "1 bowl",
        calories: 300,
    },
    {
        id: 3,
        name: "Chicken Salad",
        mealType: "lunch",
        portion: "1 serving",
        calories: 450,
    },
];

const FoodPage = () => {
    const [selectedMealType, setSelectedMealType] = useState("");
    const [foodName, setFoodName] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    // Calculations
    const mealTotals = {
        breakfast: todaysLogs.filter(l => l.mealType === "breakfast").reduce((sum, l) => sum + l.calories, 0),
        lunch: todaysLogs.filter(l => l.mealType === "lunch").reduce((sum, l) => sum + l.calories, 0),
        dinner: todaysLogs.filter(l => l.mealType === "dinner").reduce((sum, l) => sum + l.calories, 0),
        snacks: todaysLogs.filter(l => l.mealType === "snack").reduce((sum, l) => sum + l.calories, 0),
    };

    const totalCalories = Object.values(mealTotals).reduce((sum, cal) => sum + cal, 0);
    const dailyGoal = 2200;
    const macros = {
        protein: { current: 456, goal: 165, color: "#00ff66" },
        carbs: { current: 826, goal: 275, color: "#3b82f6" },
        fats: { current: 286, goal: 73, color: "#f59e0b" },
    };

    return (
        <div className="min-h-screen bg-[#0a150a] text-white ml-64">
            <Sidebar />
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Nutrition & Food Log</h1>
                    <p className="text-gray-400">Track your daily intake and hit your goals.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Food Log */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Meal Breakdown */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card padding="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <BiCoffee className="w-5 h-5 text-amber-500" />
                                    <span className="text-gray-400 text-sm font-medium">Breakfast</span>
                                </div>
                                <p className="text-white text-2xl font-bold">{mealTotals.breakfast}</p>
                                <p className="text-gray-400 text-xs">kcal</p>
                            </Card>

                            <Card padding="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <BiSun className="w-5 h-5 text-orange-500" />
                                    <span className="text-gray-400 text-sm font-medium">Lunch</span>
                                </div>
                                <p className="text-white text-2xl font-bold">{mealTotals.lunch}</p>
                                <p className="text-gray-400 text-xs">kcal</p>
                            </Card>

                            <Card padding="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <BiMoon className="w-5 h-5 text-indigo-500" />
                                    <span className="text-gray-400 text-sm font-medium">Dinner</span>
                                </div>
                                <p className="text-white text-2xl font-bold">{mealTotals.dinner}</p>
                                <p className="text-gray-400 text-xs">kcal</p>
                            </Card>

                            <Card padding="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <BiCookie className="w-5 h-5 text-pink-500" />
                                    <span className="text-gray-400 text-sm font-medium">Snacks</span>
                                </div>
                                <p className="text-white text-2xl font-bold">{mealTotals.snacks}</p>
                                <p className="text-gray-400 text-xs">kcal</p>
                            </Card>
                        </div>

                        {/* Add Food Form */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Add Food</CardTitle>
                                    {!showAddForm && (
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => setShowAddForm(true)}
                                        >
                                            <BiPlus className="w-4 h-4 mr-2" />
                                            Add Food
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>

                            {showAddForm && (
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                label="Food Name"
                                                placeholder="e.g. Chicken Salad"
                                                value={foodName}
                                                onChange={(e) => setFoodName(e.target.value)}
                                            />
                                            <Select
                                                label="Meal Type"
                                                options={mealTypeOptions}
                                                value={selectedMealType}
                                                onChange={(e) => setSelectedMealType(e.target.value)}
                                                placeholder="Select meal type"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 text-sm font-medium">QUICK LOG:</span>
                                            <div className="flex gap-2">
                                                {Object.entries(quickLogIcons).map(([type, icon]) => (
                                                    <button
                                                        key={type}
                                                        onClick={() => setSelectedMealType(type)}
                                                        className={`w-12 h-12 rounded-lg transition-all ${selectedMealType === type
                                                            ? 'bg-[#00ff66] scale-110'
                                                            : 'bg-[#1a2f1a] hover:bg-[#2a4a2a]'
                                                            }`}
                                                    >
                                                        <span className="text-2xl">{icon}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button variant="primary" className="flex-1">
                                                Log Item
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => setShowAddForm(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Today's Logs */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Today's Logs</CardTitle>
                                    <Button variant="outline" size="sm">
                                        Recent Meals
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {todaysLogs.map((log) => (
                                        <FoodLogItem
                                            key={log.id}
                                            name={log.name}
                                            calories={log.calories}
                                            mealType={log.mealType}
                                            onEdit={() => console.log('Edit', log.id)}
                                            onDelete={() => console.log('Delete', log.id)}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Progress */}
                    <div className="space-y-6">
                        {/* Calorie Progress */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Calorie Progress</CardTitle>
                                    <span className="px-3 py-1 bg-[#00ff66] bg-opacity-20 text-[#00ff66] rounded-full text-xs font-semibold">
                                        MAINTAIN WEIGHT
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">Based on your activity level</p>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center mb-6">
                                    <CircularProgress
                                        value={totalCalories}
                                        max={dailyGoal}
                                        size={200}
                                        strokeWidth={14}
                                        color="#00ff66"
                                        label={totalCalories.toString()}
                                        sublabel={`OF ${dailyGoal.toLocaleString()} KCAL`}
                                    />
                                </div>

                                {/* Macros */}
                                <div className="space-y-4">
                                    {Object.entries(macros).map(([name, data]) => (
                                        <ProgressBar
                                            key={name}
                                            label={name.toUpperCase()}
                                            value={data.current}
                                            max={data.goal}
                                            color={data.color}
                                        />
                                    ))}
                                </div>

                                <Button variant="outline" className="w-full mt-6">
                                    Adjust Daily Goals
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Hydration */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <BiDroplet className="w-5 h-5 text-blue-400" />
                                    <CardTitle>Hydration</CardTitle>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">Goal: 3.5 Liters</p>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-white text-2xl font-bold">2.5L</span>
                                        <span className="text-gray-400 text-sm">71%</span>
                                    </div>
                                    <div className="w-full bg-[#1a2f1a] rounded-full h-3 overflow-hidden">
                                        <div
                                            className="h-full bg-blue-400 rounded-full transition-all duration-500"
                                            style={{ width: '71%' }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-2">
                                    {[...Array(8)].map((_, i) => (
                                        <button
                                            key={i}
                                            className={`aspect-square rounded-lg transition-all ${i < 5
                                                ? 'bg-blue-400 hover:bg-blue-500'
                                                : 'bg-[#1a2f1a] hover:bg-[#2a4a2a]'
                                                }`}
                                        >
                                            <span className="text-xl">{i < 5 ? '💧' : '⚪'}</span>
                                        </button>
                                    ))}
                                </div>

                                <Button variant="primary" className="w-full mt-4">
                                    +250ml (500ml)
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodPage;