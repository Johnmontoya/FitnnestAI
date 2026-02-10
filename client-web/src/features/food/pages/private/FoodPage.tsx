import { useState } from 'react';
import { Sidebar } from '../../../../shared/ui/Sidebar';
import { type FoodFormData } from '../../types/food.types';
import moment from 'moment';
import { useFoodUser } from '../../hooks/queries/useFood';
import { useAuthStore } from '../../../auth/store/useAuthStore';
import FormUpdate from '../../components/Form/FormUpdate';
import StatsFood from '../../components/StatsFood';
import FormCreate from '../../components/Form/FormCreate';
import ProgressFood from '../../components/ProgressFood';
import FoodRecent from '../../components/FoodRecent';
import HydratationCard from '../../components/HydratationCard';

interface FoodEntry extends FoodFormData {
    id: string;
}

const FoodPage = () => {
    const { user } = useAuthStore();
    const [showModal, setShowModal] = useState(false);
    const [selectedFood, setSelectedFood] = useState<FoodEntry | null>(null);

    const { data: foodUser } = useFoodUser({
        startOfDay: moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        endOfDay: moment().add(1, 'days').endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    });

    const onEdit = (food: FoodEntry) => {
        setSelectedFood(food);
        setShowModal(true);
    };

    // Calculations
    const mealTotals = {
        breakfast: foodUser?.foodEntries?.filter(l => l.mealType === "BREAKFAST").reduce((sum, l) => sum + l.calories, 0) || 0,
        lunch: foodUser?.foodEntries?.filter(l => l.mealType === "LUNCH").reduce((sum, l) => sum + l.calories, 0) || 0,
        dinner: foodUser?.foodEntries?.filter(l => l.mealType === "DINNER").reduce((sum, l) => sum + l.calories, 0) || 0,
        snacks: foodUser?.foodEntries?.filter(l => l.mealType === "SNACK").reduce((sum, l) => sum + l.calories, 0) || 0,
    };

    return (
        <>
            <div className="min-h-screen bg-[#0a150a] text-white ml-64">
                <Sidebar />
                <div className="p-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Nutrición & Registro de alimentos</h1>
                        <p className="text-gray-400">Registra tus comidas y alcanza tus metas.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Food Log */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Meal Breakdown */}
                            <StatsFood mealTotals={mealTotals} />

                            {/* Add Food Form */}
                            <FormCreate />

                            {/* Today's Logs */}
                            <FoodRecent foodUser={foodUser!} onEdit={onEdit} />
                        </div>

                        {/* Right Column - Progress */}
                        <div className="space-y-6">
                            {/* Calorie Progress */}
                            <ProgressFood mealTotals={mealTotals} foodUser={foodUser} user={user} />

                            {/* Hydration */}
                            <HydratationCard user={user!} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            {selectedFood && (
                <FormUpdate
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedFood(null);
                    }}
                    initialData={selectedFood}
                />
            )}
        </>
    );
};

export default FoodPage;