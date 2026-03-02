import { useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { foodCreateSchema, type FoodFormData } from "../../types/food.types";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useFoodAnalyzeMutation, useFoodMutation } from "../../hooks/mutation/useFoodMutation";
import { toast } from "sonner";
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
        control,
        getValues,
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
        const name = getValues('name');
        if (!name || name.length < 3) {
            toast.error('Escribe el nombre del alimento primero');
            return;
        }

        setIsAnalyzing(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await analyzeFoodMutation.mutateAsync(name) as { success: boolean, data: any };
            if (result.success) {
                setValue('calories', result.data.calorias);
                setValue('proteinas', result.data.proteinas);
                setValue('carbs', result.data.carbohidratos);
                setValue('fats', result.data.grasas);
                setValue('portion', parseInt(result.data.porcion) || 100);

                toast.success('✨ Información nutricional cargada automáticamente');
            } else {
                toast.info('No se pudo analizar el alimento. Ingresa los valores manualmente.');
            }
        } catch (error: unknown) {
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
        } catch (error: unknown) {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message || 'Error al agregar la comida');
        }
    };

    const name = useWatch({ control, name: 'name' });
    const calories = useWatch({ control, name: 'calories' });
    const proteinas = useWatch({ control, name: 'proteinas' });
    const carbs = useWatch({ control, name: 'carbs' });
    const fats = useWatch({ control, name: 'fats' });

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showAddForm ? '1.5rem' : '0' }}>
                <h3 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'var(--text)',
                    margin: 0
                }}>
                    Agregar Registro
                </h3>
                {!showAddForm && (
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setShowAddForm(true)}
                        style={{ padding: '0.6rem 1.2rem' }}
                    >
                        <BiPlus style={{ marginRight: '6px' }} />
                        Nueva Comida
                    </Button>
                )}
            </div>

            {showAddForm && (
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Alimento + IA Analyze */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                        <div style={{ flex: 1 }}>
                            <Input
                                label="Plato de comida o snack"
                                placeholder="Ej: Huevo cocinado con verduras y jugo de naranja"
                                {...register('name')}
                            />
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleManualAnalyze}
                            disabled={isAnalyzing || !name || name.length < 3}
                            style={{
                                padding: '0.6rem 1.2rem',
                                height: '45px',
                                border: '1px solid var(--accent-glow)',
                                color: 'var(--accent)',
                                background: 'rgba(198,241,53,0.05)'
                            }}
                        >
                            {isAnalyzing ? (
                                <AiOutlineLoading3Quarters style={{ animation: 'spin 1s linear infinite' }} />
                            ) : (
                                <BiSearch style={{ width: '20px', height: '20px' }} />
                            )}
                        </Button>
                    </div>

                    {isAnalyzing && (
                        <p style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '-8px', fontWeight: 600 }}>
                            <AiOutlineLoading3Quarters style={{ animation: 'spin 1s linear infinite', marginRight: '6px', display: 'inline' }} />
                            Consultando a la IA...
                        </p>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input
                            label="Calorías (Kcal)"
                            type="number"
                            {...register('calories', { valueAsNumber: true })}
                        />
                        <Select
                            label="Tipo de Comida"
                            options={mealTypeOptions}
                            {...register('mealType')}
                        />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '0.75rem',
                        background: 'var(--bg-card)',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border)'
                    }}>
                        <Input
                            label="Proteína"
                            type="number"
                            {...register('proteinas', { valueAsNumber: true })}
                        />
                        <Input
                            label="Carbos"
                            type="number"
                            {...register('carbs', { valueAsNumber: true })}
                        />
                        <Input
                            label="Grasas"
                            type="number"
                            {...register('fats', { valueAsNumber: true })}
                        />
                        <Input
                            label="Porción"
                            type="number"
                            {...register('portion', { valueAsNumber: true })}
                        />
                    </div>

                    {/* Resumen Visual */}
                    <div style={{
                        background: 'var(--bg-elevated)',
                        borderRadius: '12px',
                        padding: '1rem',
                        border: '1px solid var(--accent-glow)',
                    }}>
                        <h4 style={{
                            fontFamily: 'Syne, sans-serif',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: 'var(--text-muted)',
                            marginBottom: '0.75rem'
                        }}>
                            Resumen Nutricional
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                            {[
                                { label: 'Kcal', value: calories, color: 'var(--accent)' },
                                { label: 'Prot', value: proteinas, color: 'var(--accent)' },
                                { label: 'Carbs', value: carbs, color: '#38bdf8' },
                                { label: 'Grasas', value: fats, color: '#fbbf24' },
                            ].map(item => (
                                <div key={item.label} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: item.color, fontFamily: 'Syne, sans-serif' }}>
                                        {item.value || 0}
                                    </div>
                                    <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                        <Button
                            variant="primary"
                            type='submit'
                            disabled={isSubmitting || isAnalyzing}
                            style={{ flex: 1 }}
                        >
                            {isSubmitting ? 'Guardando...' : 'Confirmar Registro'}
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
            )}
        </div>
    );
};

export default FormCreate;