import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../shared/ui/Card';
import { BiCoffee, BiCookie, BiDroplet, BiMoon, BiPlus, BiSun } from 'react-icons/bi';
import { Button } from '../../../../shared/ui/Button';
import { Input, Select } from '../../../../shared/ui/Input';
import { FoodLogItem } from '../../../../shared/ui/FoodLogItem';
import { CircularProgress } from '../../../../shared/ui/CircularProgress';
import { ProgressBar } from '../../../../shared/ui/ProgressBar';
import { Sidebar } from '../../../../shared/ui/Sidebar';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { foodCreateSchema, type FoodFormData } from '../../types/food.types';
import { toast } from 'sonner';
import moment from 'moment';
import { useFoodUser } from '../../hooks/queries/useFood';
import { useAuthStore } from '../../../auth/store/useAuthStore';
import { useFoodDeleteMutation, useFoodMutation } from '../../hooks/mutation/useFoodMutation';
import FormUpdate from '../../components/Form/FormUpdate';

const mealTypeOptions = [
    { value: "BREAKFAST", label: "🌅 Breakfast" },
    { value: "LUNCH", label: "☀️ Lunch" },
    { value: "DINNER", label: "🌙 Dinner" },
    { value: "SNACK", label: "🍪 Snack" },
];

interface FoodEntry extends FoodFormData {
    id: string;
}

const FoodPage = () => {
    const { user } = useAuthStore();
    const createFoodMutation = useFoodMutation();
    const deleteFoodMutation = useFoodDeleteMutation();

    const [showModal, setShowModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedFood, setSelectedFood] = useState<FoodEntry | null>(null);

    const { data: foodUser } = useFoodUser({
        startOfDay: moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        endOfDay: moment().add(1, 'days').endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<FoodFormData>({
        resolver: zodResolver(foodCreateSchema),
        defaultValues: {
            name: "",
            mealType: "",
            calories: 0,
            proteinas: 0,
            carbs: 0,
            fats: 0,
            portion: 0,
            date: moment(new Date()).format('YYYY-MM-DD')
        },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<FoodFormData> = async (data) => {
        try {
            await createFoodMutation.mutateAsync(data);
            reset();
            setShowAddForm(false);
            toast.success('Comida agregada exitosamente');
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message || 'Error al agregar la comida');
        }
    };

    const onDelete = async (id: string) => {
        try {
            await deleteFoodMutation.mutateAsync(id);
            toast.success('Comida eliminada exitosamente');
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message || 'Error al eliminar la comida');
        }
    };

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

    const totalCalories = Object.values(mealTotals).reduce((sum, cal) => sum + cal, 0);
    const bmr = 10 * (user?.weight || 0) + 6.25 * (user?.height || 0) - 5 * (user?.age || 0) + 5;
    const tdee = bmr * 1.55;

    let dailyCalories = Math.round(tdee);
    if (user?.goal === 'LOSE') dailyCalories = Math.round(tdee - 500);
    if (user?.goal === 'GAIN') dailyCalories = Math.round(tdee + 500);

    const macros = {
        calories: { current: totalCalories, goal: dailyCalories, color: "#00ff66" },
        protein: { current: foodUser?.stats._sum.proteinas || 0, goal: Math.round((dailyCalories * 0.3) / 4), color: "#00ff66" },
        carbs: { current: foodUser?.stats._sum.carbs || 0, goal: Math.round((dailyCalories * 0.4) / 4), color: "#3b82f6" },
        fats: { current: foodUser?.stats._sum.fats || 0, goal: Math.round((dailyCalories * 0.3) / 9), color: "#f59e0b" },
    };

    const hidratation = {
        agua: user?.weight! * 35,
    }

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
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Card padding="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BiCoffee className="w-5 h-5 text-amber-500" />
                                        <span className="text-gray-400 text-sm font-medium">Desayuno</span>
                                    </div>
                                    <p className="text-white text-2xl font-bold">{mealTotals.breakfast}</p>
                                    <p className="text-gray-400 text-xs">kcal</p>
                                </Card>

                                <Card padding="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BiSun className="w-5 h-5 text-orange-500" />
                                        <span className="text-gray-400 text-sm font-medium">Almuerzo</span>
                                    </div>
                                    <p className="text-white text-2xl font-bold">{mealTotals.lunch}</p>
                                    <p className="text-gray-400 text-xs">kcal</p>
                                </Card>

                                <Card padding="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BiMoon className="w-5 h-5 text-indigo-500" />
                                        <span className="text-gray-400 text-sm font-medium">Cena</span>
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
                                        <CardTitle>Agregar Comida</CardTitle>
                                        {!showAddForm && (
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => setShowAddForm(true)}
                                                className='flex flex-row justify-center items-center gap-1'
                                            >
                                                <BiPlus className="w-4 h-4 mr-2" />
                                                Agregar Comida
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>

                                {showAddForm && (
                                    <CardContent>
                                        <div className="space-y-4">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <Input
                                                        label="Comida"
                                                        placeholder="e.g. Chicken Salad"
                                                        {...register('name')}
                                                    />
                                                    <Input
                                                        label="Calorias en (Kilocalorias)"
                                                        placeholder="e.g. 200"
                                                        type="number"
                                                        step="0.1"
                                                        {...register('calories', { valueAsNumber: true })}
                                                    />
                                                    <Input
                                                        label="Proteinas en (Gramos)"
                                                        placeholder="e.g. 20"
                                                        type="number"
                                                        step="0.1"
                                                        {...register('proteinas', { valueAsNumber: true })}
                                                    />
                                                    <Input
                                                        label="Carbohidratos en (Gramos)"
                                                        placeholder="e.g. 20"
                                                        type="number"
                                                        step="0.1"
                                                        {...register('carbs', { valueAsNumber: true })}
                                                    />
                                                    <Input
                                                        label="Grasas en (Gramos)"
                                                        placeholder="e.g. 20"
                                                        type="number"
                                                        step="0.1"
                                                        {...register('fats', { valueAsNumber: true })}
                                                    />
                                                    <Input
                                                        label="Porcion en (Gramos)"
                                                        placeholder="e.g. 20"
                                                        type="number"
                                                        step="0.1"
                                                        {...register('portion', { valueAsNumber: true })}
                                                    />
                                                    <Select
                                                        label="Tipo de Alimento"
                                                        options={mealTypeOptions}
                                                        {...register('mealType')}
                                                        placeholder="Selecciona el tipo de alimento"
                                                    />
                                                </div>

                                                <div className="flex gap-3">
                                                    <Button
                                                        variant="primary"
                                                        type='submit'
                                                        className="flex-1"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? (
                                                            <div className="flex items-center justify-center gap-2">
                                                                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                                                Agregando...
                                                            </div>
                                                        ) : (
                                                            'Agregar comida'
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        type="button"
                                                        onClick={() => {
                                                            setShowAddForm(false);
                                                            reset();
                                                        }}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </CardContent>
                                )}
                            </Card>

                            {/* Today's Logs */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Comidas de hoy</CardTitle>
                                        <Button variant="outline" size="sm">
                                            Comidas recientes
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {!foodUser?.foodEntries || foodUser.foodEntries.length === 0 ? (
                                            <div className="text-center py-8">
                                                <p className="text-gray-400">No hay comidas registradas</p>
                                                <p className="text-gray-500 text-sm mt-2">Agrega tu primera comida para comenzar</p>
                                            </div>
                                        ) : (
                                            foodUser.foodEntries.map((log: any) => (
                                                <FoodLogItem
                                                    key={log.id}
                                                    name={log.name}
                                                    calories={log.calories}
                                                    mealType={log.mealType}
                                                    proteinas={log.proteinas}
                                                    carbs={log.carbs}
                                                    fats={log.fats}
                                                    portion={log.portion}
                                                    onEdit={() => {
                                                        onEdit(log);
                                                    }}
                                                    onDelete={() => {
                                                        onDelete(log.id);
                                                    }}
                                                />
                                            ))
                                        )}
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
                                        <CardTitle>Progreso de calorías</CardTitle>
                                        <span className="px-3 py-1 bg-[#00ff66] bg-opacity-20 text-slate-800 rounded-full text-xs font-semibold">
                                            {user?.goal}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-1">Basado en tu nivel de actividad</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-center mb-6">
                                        <CircularProgress
                                            value={totalCalories}
                                            max={dailyCalories}
                                            size={200}
                                            strokeWidth={14}
                                            color="#00ff66"
                                            label={totalCalories.toString()}
                                            sublabel={`DE ${dailyCalories} KCAL`}
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
                                        Ajustar metas diarias
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Hydration */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <BiDroplet className="w-5 h-5 text-blue-400" />
                                        <CardTitle>Hidratación</CardTitle>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-1">Meta: {hidratation.agua} Litros</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-white text-2xl font-bold">{hidratation.agua}L</span>
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