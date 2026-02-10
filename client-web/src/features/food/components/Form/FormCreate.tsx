import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { foodCreateSchema, type FoodFormData } from "../../types/food.types";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useFoodAnalyzeMutation, useFoodMutation } from "../../hooks/mutation/useFoodMutation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../shared/ui/Card";
import { Button } from "../../../../shared/ui/Button";
import { BiPlus, BiSearch } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Input, Select } from "../../../../shared/ui/Input";

const mealTypeOptions = [
    { value: "BREAKFAST", label: "🌅 Desayuno" },
    { value: "LUNCH", label: "☀️ Almuerzo" },
    { value: "DINNER", label: "🌙 Cena" },
    { value: "SNACK", label: "🍪 Snack" },
];

const FormCreate = () => {
    const createFoodMutation = useFoodMutation();
    const analyzeFoodMutation = useFoodAnalyzeMutation();
    const [showAddForm, setShowAddForm] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
        setValue,
        watch,
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

    const handleManualAnalyze = async () => {
        const name = watch('name');
        if (!name || name.length < 3) {
            toast.error('Escribe el nombre del alimento primero');
            return;
        }

        setIsAnalyzing(true);
        try {
            const result = await analyzeFoodMutation.mutateAsync(name);
            
            if (result.success) {
                // Prellenar los campos con los datos de Gemini
                setValue('calories', result.data.calorias);
                setValue('proteinas', result.data.proteinas);
                setValue('carbs', result.data.carbohidratos);
                setValue('fats', result.data.grasas);
                setValue('portion', parseInt(result.data.porcion) || 100);
                
                toast.success('✨ Información nutricional cargada automáticamente');
            } else {
                toast.info('No se pudo analizar el alimento. Ingresa los valores manualmente.');
            }
        } catch (error: any) {
            console.error('Error al analizar:', error);
            toast.info('Ingresa los valores nutricionales manualmente');
        } finally {
            setIsAnalyzing(false);
        }
    };

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

    return (
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
                            {/* Nombre del alimento con botón de análisis */}
                            <div className="mb-4">
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <Input
                                            label="Nombre del Alimento"
                                            placeholder="Ej: Pizza Margherita, Ensalada César..."
                                            {...register('name')}
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={handleManualAnalyze}
                                            disabled={isAnalyzing || !watch('name') || watch('name').length < 3}
                                            className="flex items-center gap-2"
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                                                    Analizando...
                                                </>
                                            ) : (
                                                <>
                                                    <BiSearch className="w-4 h-4" />
                                                    Analizar IA
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                
                                {/* Indicador de análisis automático */}
                                {isAnalyzing && (
                                    <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                                        <AiOutlineLoading3Quarters className="w-3 h-3 animate-spin" />
                                        <span>Analizando información nutricional con IA...</span>
                                    </div>
                                )}
                            </div>

                            {/* Información nutricional */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <Input
                                    label="Calorías (Kcal)"
                                    placeholder="Ej: 200"
                                    type="number"
                                    step="0.1"
                                    {...register('calories', { valueAsNumber: true })}
                                />
                                <Input
                                    label="Proteínas (g)"
                                    placeholder="Ej: 20"
                                    type="number"
                                    step="0.1"
                                    {...register('proteinas', { valueAsNumber: true })}
                                />
                                <Input
                                    label="Carbohidratos (g)"
                                    placeholder="Ej: 30"
                                    type="number"
                                    step="0.1"
                                    {...register('carbs', { valueAsNumber: true })}
                                />
                                <Input
                                    label="Grasas (g)"
                                    placeholder="Ej: 10"
                                    type="number"
                                    step="0.1"
                                    {...register('fats', { valueAsNumber: true })}
                                />
                                <Input
                                    label="Porción (g)"
                                    placeholder="Ej: 100"
                                    type="number"
                                    step="0.1"
                                    {...register('portion', { valueAsNumber: true })}
                                />
                                <Select
                                    label="Tipo de Comida"
                                    options={mealTypeOptions}
                                    {...register('mealType')}
                                    placeholder="Selecciona el tipo"
                                />
                            </div>

                            {/* Resumen visual de macros */}
                            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-sm font-semibold mb-2 text-gray-700">Resumen Nutricional</h3>
                                <div className="grid grid-cols-4 gap-2 text-center">
                                    <div className="bg-white p-2 rounded">
                                        <div className="text-xs text-gray-500">Calorías</div>
                                        <div className="text-lg font-bold text-orange-600">
                                            {watch('calories') || 0}
                                        </div>
                                        <div className="text-xs text-gray-400">kcal</div>
                                    </div>
                                    <div className="bg-white p-2 rounded">
                                        <div className="text-xs text-gray-500">Proteínas</div>
                                        <div className="text-lg font-bold text-red-600">
                                            {watch('proteinas') || 0}
                                        </div>
                                        <div className="text-xs text-gray-400">g</div>
                                    </div>
                                    <div className="bg-white p-2 rounded">
                                        <div className="text-xs text-gray-500">Carbos</div>
                                        <div className="text-lg font-bold text-blue-600">
                                            {watch('carbs') || 0}
                                        </div>
                                        <div className="text-xs text-gray-400">g</div>
                                    </div>
                                    <div className="bg-white p-2 rounded">
                                        <div className="text-xs text-gray-500">Grasas</div>
                                        <div className="text-lg font-bold text-yellow-600">
                                            {watch('fats') || 0}
                                        </div>
                                        <div className="text-xs text-gray-400">g</div>
                                    </div>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex gap-3">
                                <Button
                                    variant="primary"
                                    type='submit'
                                    className="flex-1"
                                    disabled={isSubmitting || isAnalyzing}
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
                                    variant="secondary"
                                    type="button"
                                    onClick={() => {
                                        setShowAddForm(false);
                                        reset();
                                    }}
                                    disabled={isSubmitting}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

export default FormCreate;