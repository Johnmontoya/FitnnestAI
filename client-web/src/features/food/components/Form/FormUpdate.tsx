import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiX } from 'react-icons/bi';
import { Button } from '../../../../shared/ui/Button';
import { Input, Select } from '../../../../shared/ui/Input';
import { foodUpdateSchema, type FoodFormData, type FoodUpdateData } from '../../types/food.types';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../shared/ui/Card';
import { useFoodUpdateMutation } from '../../hooks/mutation/useFoodMutation';

interface FoodUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: FoodFormData & { id: string };
}

const mealTypeOptions = [
    { value: "BREAKFAST", label: "🌅 Breakfast" },
    { value: "LUNCH", label: "☀️ Lunch" },
    { value: "DINNER", label: "🌙 Dinner" },
    { value: "SNACK", label: "🍪 Snack" },
];

const FormUpdate = ({
    isOpen,
    onClose,
    initialData,
}: FoodUpdateModalProps) => {
    const updateFoodMutation = useFoodUpdateMutation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FoodUpdateData>({
        resolver: zodResolver(foodUpdateSchema),
        defaultValues: {
            name: initialData.name,
            calories: initialData.calories,
            portion: initialData.portion,
            proteinas: initialData.proteinas,
            carbs: initialData.carbs,
            fats: initialData.fats,
            mealType: initialData.mealType,
        },
        mode: 'onChange',
    });

    // Reset form when initialData changes
    useEffect(() => {
        reset(initialData);
    }, [initialData, reset]);

    const handleFormSubmit: SubmitHandler<FoodUpdateData> = async (data) => {
        console.log(data);
        try {
            await updateFoodMutation.mutateAsync({
                id: initialData.id,
                data
            });
            onClose();
        } catch (error) {
            console.error('Error updating food:', error);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Editar Comida</CardTitle>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <BiX className="w-6 h-6" />
                            </button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Nombre de la comida */}
                                <div className="md:col-span-2">
                                    <Input
                                        type='text'
                                        label="Nombre de la comida"
                                        placeholder="e.g. Chicken Salad"
                                        {...register('name')}
                                        error={errors.name?.message}
                                    />
                                </div>

                                {/* Calorías */}
                                <Input
                                    label="Calorías (kcal)"
                                    type="number"
                                    placeholder="e.g. 200"
                                    {...register('calories', { valueAsNumber: true })}
                                    error={errors.calories?.message}
                                />

                                {/* Porción */}
                                <Input
                                    label="Porción (gramos)"
                                    type="number"
                                    placeholder="e.g. 150"
                                    {...register('portion', { valueAsNumber: true })}
                                    error={errors.portion?.message}
                                />

                                {/* Proteínas */}
                                <Input
                                    label="Proteínas (g)"
                                    type="number"
                                    placeholder="e.g. 20"
                                    {...register('proteinas', { valueAsNumber: true })}
                                    error={errors.proteinas?.message}
                                />

                                {/* Carbohidratos */}
                                <Input
                                    label="Carbohidratos (g)"
                                    type="number"
                                    placeholder="e.g. 30"
                                    {...register('carbs', { valueAsNumber: true })}
                                    error={errors.carbs?.message}
                                />

                                {/* Grasas */}
                                <Input
                                    label="Grasas (g)"
                                    type="number"
                                    placeholder="e.g. 10"
                                    {...register('fats', { valueAsNumber: true })}
                                    error={errors.fats?.message}
                                />

                                {/* Tipo de comida */}
                                <Select
                                    label="Tipo de comida"
                                    options={mealTypeOptions}
                                    {...register('mealType')}
                                    placeholder="Selecciona el tipo"
                                    error={errors.mealType?.message}
                                />
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">💡</span>
                                    <div className="flex-1">
                                        <h4 className="text-blue-400 font-semibold mb-1">Tip</h4>
                                        <p className="text-blue-300 text-sm opacity-90">
                                            Asegúrate de que los macronutrientes sumen correctamente con las calorías.
                                            Proteínas y carbohidratos: 4 kcal/g, Grasas: 9 kcal/g
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="flex-1"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                            Actualizando...
                                        </div>
                                    ) : (
                                        'Guardar Cambios'
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FormUpdate;