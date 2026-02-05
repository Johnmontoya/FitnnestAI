import { useState } from 'react';
import { BiEdit, BiUser } from 'react-icons/bi';
import { FiTarget } from 'react-icons/fi';
import { LuActivity, LuLock } from 'react-icons/lu';
import { Button } from '../../../../shared/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../shared/ui/Card';
import { Sidebar } from '../../../../shared/ui/Sidebar';
import { useCurrentUser } from '../../../auth/hooks/queries/useUsers';
import moment from 'moment';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { biometricsSchema, type UpdateBiometricsRequest } from '../../../auth/types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProfileMutation } from '../../hooks/mutation/useProfileMutation';
import { toast } from 'sonner';
import { Input } from '../../../../shared/ui/Input';

const ProfilePage = () => {
    const { data: user } = useCurrentUser();
    const { mutateAsync: updateProfile, isPending } = useProfileMutation(user?.id || '');
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('details');

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
        watch,
    } = useForm<UpdateBiometricsRequest>({
        resolver: zodResolver(biometricsSchema),
        defaultValues: {
            age: user?.age || 0,
            weight: user?.weight || 0,
            height: user?.height || 0,
            goal: (user?.goal as "LOSE" | "MAINTAIN" | "GAIN") || "MAINTAIN",
        },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<UpdateBiometricsRequest> = async (data) => {
        try {
            await updateProfile(data);
            setEditMode(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message || 'Error al actualizar el perfil');
        } finally {
            isSubmitting
            setEditMode(false);
        }
    };

    const goalOptions: { value: string; label: string }[] = [
        { value: "LOSE", label: "Perder Peso" },
        { value: "MAINTAIN", label: "Mantener Peso" },
        { value: "GAIN", label: "Ganar Masa Muscular" },
    ];

    const tabs = [
        { id: 'details', label: 'Profile Details', icon: BiUser },
        { id: 'goals', label: 'Health Goals', icon: FiTarget },
        { id: 'history', label: 'Activity History', icon: LuActivity },
        { id: 'security', label: 'Privacy & Security', icon: LuLock },
    ];

    const calculateTargets = () => {
        // Simplified BMR calculation (Mifflin-St Jeor)
        const bmr = 10 * (user?.weight || 0) + 6.25 * (user?.height || 0) - 5 * (user?.age || 0) + 5;
        const tdee = bmr * 1.55; // Moderate activity

        let dailyCalories = tdee;
        if (user?.goal === 'LOSE') dailyCalories = tdee - 500;
        if (user?.goal === 'GAIN') dailyCalories = tdee + 500;

        return {
            calories: Math.round(dailyCalories),
            protein: Math.round((dailyCalories * 0.3) / 4), // 30% of calories, 4 cal/g
            carbs: Math.round((dailyCalories * 0.4) / 4),   // 40% of calories
            fats: Math.round((dailyCalories * 0.3) / 9),    // 30% of calories, 9 cal/g
        };
    };

    const targets = calculateTargets();

    return (
        <div className="min-h-screen bg-[#0a150a] text-white ml-64">
            <Sidebar />
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#00ff66] to-[#00dd55] rounded-full flex items-center justify-center">
                                    <BiUser className="w-12 h-12 text-black" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#00ff66] rounded-full border-4 border-[#0a150a]"></div>
                            </div>

                            {/* User Info */}
                            <div>
                                <h1 className="text-3xl font-bold mb-1">{user?.username}</h1>
                                <p className="text-gray-400 mb-2">Miembro desde {moment(user?.createdAt).format("DD/MM/YYYY")} • Última sincronización: {moment(user?.updatedAt).fromNow()}</p>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-emerald-500 bg-opacity-20 text-slate-100 rounded-full text-xs font-semibold">
                                        ATLETA ACTIVO
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="primary"
                            type="submit"
                            onClick={() => {
                                if (editMode) {
                                    handleSubmit(onSubmit)();   // ← dispara el submit manualmente
                                } else {
                                    setEditMode(true);
                                }
                            }}
                            disabled={isSubmitting}
                        >
                            {editMode ? (
                                isSubmitting ? 'Guardando...' : 'Guardar Cambios'
                            ) : (
                                'Editar Perfil'
                            )}
                        </Button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-6 border-b border-[#2a4a2a]">
                    <div className="flex gap-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 font-medium transition-all rounded-t-lg ${activeTab === tab.id
                                        ? 'bg-[#00ff66] text-black'
                                        : 'text-gray-400 hover:text-white hover:bg-[#1a2f1a]'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {activeTab === 'details' && (
                                <>
                                    {/* Personal Metrics */}
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center gap-2">
                                                <BiUser className="w-5 h-5 text-[#00ff66]" />
                                                <CardTitle>Métricas Personales</CardTitle>
                                            </div>
                                            <p className="text-gray-400 text-sm mt-1">
                                                Edita tu información personal y biometrics
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                <Card padding="p-4" className="border border-[#2a4a2a]">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-gray-400 text-sm">Age</span>
                                                        {editMode && <BiEdit className="w-3 h-3 text-gray-400" />}
                                                    </div>
                                                    {editMode ? (
                                                        <input
                                                            type="number"
                                                            {...register('age', { valueAsNumber: true })}
                                                            min="13"
                                                            max="120"
                                                            className="w-full bg-[#0f1f0f] text-white text-2xl font-bold rounded px-2 py-1"
                                                        />
                                                    ) : (
                                                        <p className="text-white text-2xl font-bold">{user?.age}</p>
                                                    )}
                                                    <p className="text-gray-400 text-xs">years</p>
                                                </Card>

                                                <Card padding="p-4" className="border border-[#2a4a2a]">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-gray-400 text-sm">Weight</span>
                                                        {editMode && <BiEdit className="w-3 h-3 text-gray-400" />}
                                                    </div>
                                                    {editMode ? (
                                                        <input
                                                            type="number"
                                                            {...register('weight', { valueAsNumber: true })}
                                                            step="0.1"
                                                            min="30"
                                                            max="300"
                                                            className="w-full bg-[#0f1f0f] text-white text-2xl font-bold rounded px-2 py-1"
                                                        />
                                                    ) : (
                                                        <p className="text-white text-2xl font-bold">{user?.weight}</p>
                                                    )}
                                                    <p className="text-gray-400 text-xs">kg</p>
                                                </Card>

                                                <Card padding="p-4" className="border border-[#2a4a2a]">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-gray-400 text-sm">Height</span>
                                                        {editMode && <BiEdit className="w-3 h-3 text-gray-400" />}
                                                    </div>
                                                    {editMode ? (
                                                        <input
                                                            type="number"
                                                            {...register('height', { valueAsNumber: true })}
                                                            min="100"
                                                            max="250"
                                                            className="w-full bg-[#0f1f0f] text-white text-2xl font-bold rounded px-2 py-1"
                                                        />
                                                    ) : (
                                                        <p className="text-white text-2xl font-bold">{user?.height}</p>
                                                    )}
                                                    <p className="text-gray-400 text-xs">cm</p>
                                                </Card>
                                            </div>

                                            {editMode && (
                                                <div className="flex gap-3">
                                                    <Button variant="primary" type='submit' className="flex-1"
                                                        disabled={isSubmitting || isPending}>
                                                        Guardar cambios
                                                    </Button>
                                                    <Button variant="outline" onClick={() => setEditMode(false)}>
                                                        Cancelar
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Health Goals */}
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center gap-2">
                                                <FiTarget className="w-5 h-5 text-[#00ff66]" />
                                                <CardTitle>Objetivos de Salud</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {goalOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        type="button"           // ← importante
                                                        onClick={() => {
                                                            if (editMode) {
                                                                setValue('goal', option.value as "LOSE" | "MAINTAIN" | "GAIN", {
                                                                    shouldValidate: true,
                                                                    shouldDirty: true,
                                                                });
                                                            }
                                                        }}
                                                        disabled={!editMode}
                                                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${watch('goal') === option.value   // ← usa watch para ver el valor actual
                                                            ? 'border-[#00ff66] bg-[#00ff66] bg-opacity-10'
                                                            : 'border-[#2a4a2a] hover:border-[#3a5a3a]'
                                                            } ${!editMode && 'cursor-default opacity-70'}`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-white font-semibold">{option.label}</span>
                                                            {watch('goal') === option.value && (
                                                                <div className="w-6 h-6 bg-[#00ff66] rounded-full flex items-center justify-center">
                                                                    <span className="text-black text-sm">✓</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Account Settings */}
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center gap-2">
                                                <LuLock className="w-5 h-5 text-[#00ff66]" />
                                                <CardTitle>Configuración de Cuenta</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <Input
                                                    label="Username"
                                                    value={user?.username}
                                                    disabled={!editMode}
                                                />
                                                <Input
                                                    label="Email Address"
                                                    type="email"
                                                    value={user?.email}
                                                    disabled={!editMode}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </>
                            )}

                            {activeTab === 'goals' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Actividad en desarrollo...</CardTitle>
                                    </CardHeader>
                                </Card>
                            )}
                        </div>

                        {/* Right Column - Calculated Targets */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Objetivos Calculados</CardTitle>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Basado en tus métricas actuales
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center mb-6">
                                        <div className="w-20 h-20 bg-[#00ff66] bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                            <FiTarget className="w-10 h-10 text-[#00ff66]" />
                                        </div>
                                        <h3 className="text-white font-semibold mb-1">OBJETIVO DIARIO</h3>
                                        <p className="text-5xl font-bold text-[#00ff66] mb-1">
                                            {targets.calories}
                                        </p>
                                        <p className="text-gray-400 text-sm">Kilocalorías / día</p>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between items-center p-3 bg-[#0f1f0f] rounded-lg">
                                            <span className="text-gray-400">Proteínas</span>
                                            <span className="text-[#00ff66] font-bold">{targets.protein}g</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#0f1f0f] rounded-lg">
                                            <span className="text-gray-400">Carbohidratos</span>
                                            <span className="text-blue-400 font-bold">{targets.carbs}g</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#0f1f0f] rounded-lg">
                                            <span className="text-gray-400">Grasas</span>
                                            <span className="text-amber-400 font-bold">{targets.fats}g</span>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-xl">
                                        <p className="text-blue-400 text-sm">
                                            💡 Tus datos están encriptados y seguros. Usamos estas métricas para calcular tu TMB (Tasa Metabólica Basal) y GET (Gasto Energético Total) para ayudarte a alcanzar tus objetivos más rápido.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;