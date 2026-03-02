import { useEffect } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiX, BiInfoCircle } from 'react-icons/bi';
import { Button } from '../../../../shared/ui/Button';
import { Input, Select } from '../../../../shared/ui/Input';
import { foodUpdateSchema, type FoodFormData, type FoodUpdateData } from '../../types/food.types';
import { useFoodUpdateMutation } from '../../hooks/mutation/useFoodMutation';
import { toast } from 'sonner';

interface FoodUpdateModalProps {
    onCancel: () => void;
    initialData: FoodFormData & { id: string };
}

const mealTypeOptions = [
    { value: "BREAKFAST", label: "🌅 Desayuno" },
    { value: "LUNCH", label: "☀️ Almuerzo" },
    { value: "DINNER", label: "🌙 Cena" },
    { value: "SNACK", label: "🍪 Snack" },
];

const FormUpdate = ({
    onCancel,
    initialData,
}: FoodUpdateModalProps) => {
    const updateFoodMutation = useFoodUpdateMutation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
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

    useEffect(() => {
        reset(initialData);
    }, [initialData, reset]);

    const handleFormSubmit: SubmitHandler<FoodUpdateData> = async (data) => {
        try {
            await updateFoodMutation.mutateAsync({
                id: initialData.id,
                data
            });
            toast.success('Cambios guardados');
            onCancel();
        } catch (error: unknown) {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error al actualizar');
        }
    };

    const proteinas = useWatch({ control, name: 'proteinas' }) || 0;
    const carbs = useWatch({ control, name: 'carbs' }) || 0;
    const fats = useWatch({ control, name: 'fats' }) || 0;
    const calories = useWatch({ control, name: 'calories' }) || 0;

    // El cálculo de las kcal totales
    const totalKcal = Math.round(proteinas * 4 + carbs * 4 + fats * 9);

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'var(--text)',
                    margin: 0
                }}>
                    Editar Registro
                </h3>
                <button
                    onClick={onCancel}
                    style={{
                        background: 'none', border: 'none',
                        color: 'var(--text-subtle)', cursor: 'pointer',
                        padding: '4px', display: 'flex',
                    }}
                >
                    <BiX style={{ width: '24px', height: '24px' }} />
                </button>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Input
                    label="Nombre del Alimento"
                    {...register('name')}
                    error={errors.name?.message}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input
                        label="Calorías (Kcal)"
                        type="number"
                        {...register('calories', { valueAsNumber: true })}
                        error={errors.calories?.message}
                    />
                    <Select
                        label="Tipo de Comida"
                        options={mealTypeOptions}
                        {...register('mealType')}
                        error={errors.mealType?.message}
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
                    background: 'rgba(56,189,248,0.05)',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid rgba(56,189,248,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '32px', height: '32px',
                        borderRadius: '50%', background: 'rgba(56,189,248,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <BiInfoCircle style={{ color: '#38bdf8' }} />
                    </div>
                    <div>
                        <p style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 600 }}>Cálculo verificado</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                            {totalKcal} kcal calc. vs {calories} kcal ingr.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                    <Button
                        variant="primary"
                        type='submit'
                        disabled={isSubmitting}
                        style={{ flex: 1 }}
                    >
                        {isSubmitting ? 'Guardando...' : 'Actualizar Cambios'}
                    </Button>
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Descartar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormUpdate;