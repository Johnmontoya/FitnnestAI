import { useState } from 'react';
import { Sidebar } from "../../../../shared/ui/Sidebar";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import StatsFood from "../../components/StatsFood";
import ProgressFood from "../../components/ProgressFood";
import FoodRecent from "../../components/FoodRecent";
import HydrationCard from "../../components/HydrationCard";
import FormCreate from "../../components/Form/FormCreate";
import FormUpdate from "../../components/Form/FormUpdate";
import { useFoodUser } from "../../hooks/queries/useFood";
import moment from "moment";
import type { FoodFormData } from "../../types/food.types";

interface FoodEntry extends FoodFormData {
    id: string;
}

const FoodPage = () => {
    const { user } = useAuthStore();
    const [editingFood, setEditingFood] = useState<FoodEntry | null>(null);

    const { data: foodUser } = useFoodUser({
        startOfDay: moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        endOfDay: moment().add(1, 'days').endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    });

    const mealTotals = {
        breakfast: foodUser?.foodEntries?.filter(l => l.mealType === "BREAKFAST").reduce((sum, l) => sum + l.calories, 0) || 0,
        lunch: foodUser?.foodEntries?.filter(l => l.mealType === "LUNCH").reduce((sum, l) => sum + l.calories, 0) || 0,
        dinner: foodUser?.foodEntries?.filter(l => l.mealType === "DINNER").reduce((sum, l) => sum + l.calories, 0) || 0,
        snacks: foodUser?.foodEntries?.filter(l => l.mealType === "SNACK").reduce((sum, l) => sum + l.calories, 0) || 0,
    };

    return (
        <div className="flex flex-row aurora-bg min-h-screen bg-black text-white ml-64 overflow-hidden">
            <Sidebar />
            <div className='w-full px-4! relative' style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="p-10 max-w-7xl mx-auto animate-fade-up">
                    {/* Header */}
                    <div className="mb-12!">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="accent-line"></span>
                            <p style={{
                                fontFamily: 'Syne, sans-serif',
                                fontWeight: 700,
                                fontSize: '0.72rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'var(--accent)',
                            }}>
                                Nutrición & Bio-Metas
                            </p>
                        </div>
                        <h1 className='lg:text-6xl text-4xl font-bold p-3!' style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 800,
                            color: 'var(--text)',
                            letterSpacing: '-0.04em',
                            lineHeight: 1.1
                        }}>
                            Métricas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-white">Alimentación</span>
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '1rem', maxWidth: '600px' }}>
                            Monitorea tu ingesta calórica y balances de macronutrientes para optimizar tu rendimiento físico.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Left Column */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                            <StatsFood mealTotals={mealTotals} />

                            <div className="glass rounded-[32px] border-[var(--border-mid)] p-8! relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-[0.03] blur-3xl"></div>
                                {editingFood ? (
                                    <FormUpdate
                                        initialData={editingFood}
                                        onCancel={() => setEditingFood(null)}
                                    />
                                ) : (
                                    <FormCreate />
                                )}
                            </div>

                            <FoodRecent
                                foodUser={foodUser!}
                                onEdit={(food) => setEditingFood(food)}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-8 sticky top-8">
                            <ProgressFood
                                mealTotals={mealTotals}
                                foodUser={foodUser!}
                                user={user!}
                            />
                            <HydrationCard user={user!} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodPage;