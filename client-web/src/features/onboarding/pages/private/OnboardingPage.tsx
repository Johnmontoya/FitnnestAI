import { BiRuler, BiTrendingUp } from 'react-icons/bi';
import { FiTarget } from 'react-icons/fi';
import { LuActivity, LuScale } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../shared/ui/Button';
import { useAuthStore } from '../../../auth/store/useAuthStore';
import { useProfileMutation } from '../../../profile/hooks/mutation/useProfileMutation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { biometricsSchema, type UpdateBiometricsRequest } from '../../../auth/types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';

const goalOptions = [
    {
        value: "LOSE",
        label: "Perder Peso",
        icon: BiTrendingUp,
        description: "Reduce unas tallas y vuelve hacer la ropa que amas",
        color: "#f59e0b"
    },
    {
        value: "MAINTAIN",
        label: "Mantener Peso",
        icon: FiTarget,
        description: "Mantener tu peso actual y mantener tu salud",
        color: "#00ff66"
    },
    {
        value: "GAIN",
        label: "Ganar Musculo",
        icon: LuActivity,
        description: "Construye musculo y fuerza, y luce como un dios griego",
        color: "#3b82f6"
    },
];

const OnboardingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { mutateAsync: updateProfile } = useProfileMutation(user?.id || '');

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
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

        const bmr = 10 * (data.weight) + 6.25 * (data.height) - 5 * (data.age) + 5;
        const tdee = bmr * 1.55;
        try {
            data.dailyCalorieIntake = Math.round(tdee);
            await updateProfile(data);
            setTimeout(() => {
                navigate('/profile', { replace: true });
            }, 2500);
        } catch (error) {
            console.error('Onboarding error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a150a] flex items-center justify-center p-4">
            <div className="w-full max-w-3xl">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-[#00ff66] rounded-xl flex items-center justify-center">
                        <LuActivity className="w-7 h-7 text-black" />
                    </div>
                    <span className="text-white text-2xl font-bold">FitTrack Pro</span>
                </div>

                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-[#00ff66] to-[#00dd55] rounded-2xl p-6 mb-8 text-center">
                    <h1 className="text-black text-3xl font-bold mb-2">
                        Bienvenido, {user?.username || 'there'}! 👋
                    </h1>
                    <p className="text-black opacity-80">
                        Vamos a configurar tu perfil para personalizar tu viaje fitness
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-[#0f1f0f] rounded-2xl border border-[#2a4a2a] p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="text-center mb-6">
                            <h2 className="text-white text-2xl font-bold mb-2">Completar tu perfil</h2>
                            <p className="text-gray-400">
                                Usaremos esta información para calcular tus objetivos de calorias y actividad
                            </p>
                        </div>

                        {/* Biometric Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {/* Age */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2 flex items-center gap-2">
                                    <LuActivity className="w-4 h-4 text-[#00ff66]" />
                                    Age
                                </label>
                                <input
                                    type="text"
                                    {...register('age', { valueAsNumber: true })}
                                    placeholder="e.g., 30"
                                    min="13"
                                    max="120"
                                    className={`
                    w-full bg-[#0a150a] text-white rounded-xl px-4 py-3.5
                    border ${errors.age ? 'border-red-500' : 'border-[#2a4a2a]'}
                    focus:border-[#00ff66] focus:outline-none
                    placeholder:text-gray-500 transition-colors text-center text-lg
                  `}
                                />
                                <p className="text-gray-400 text-xs mt-1 text-center">years</p>
                                {errors.age && (
                                    <p className="text-red-400 text-sm mt-1 text-center">{errors.age.message}</p>
                                )}
                            </div>

                            {/* Weight */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2 flex items-center gap-2">
                                    <LuScale className="w-4 h-4 text-[#00ff66]" />
                                    Weight
                                </label>
                                <input
                                    type="text"
                                    {...register('weight', { valueAsNumber: true })}
                                    placeholder="e.g., 75.5"
                                    step="0.1"
                                    min="30"
                                    max="300"
                                    className={`
                    w-full bg-[#0a150a] text-white rounded-xl px-4 py-3.5
                    border ${errors.weight ? 'border-red-500' : 'border-[#2a4a2a]'}
                    focus:border-[#00ff66] focus:outline-none
                    placeholder:text-gray-500 transition-colors text-center text-lg
                  `}
                                />
                                <p className="text-gray-400 text-xs mt-1 text-center">kilogramos</p>
                                {errors.weight && (
                                    <p className="text-red-400 text-sm mt-1 text-center">{errors.weight.message}</p>
                                )}
                            </div>

                            {/* Height */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2 flex items-center gap-2">
                                    <BiRuler className="w-4 h-4 text-[#00ff66]" />
                                    Height
                                </label>
                                <input
                                    type="text"
                                    {...register('height', { valueAsNumber: true })}
                                    placeholder="e.g., 175"
                                    min="100"
                                    max="250"
                                    className={`
                    w-full bg-[#0a150a] text-white rounded-xl px-4 py-3.5
                    border ${errors.height ? 'border-red-500' : 'border-[#2a4a2a]'}
                    focus:border-[#00ff66] focus:outline-none
                    placeholder:text-gray-500 transition-colors text-center text-lg
                  `}
                                />
                                <p className="text-gray-400 text-xs mt-1 text-center">centimetros</p>
                                {errors.height && (
                                    <p className="text-red-400 text-sm mt-1 text-center">{errors.height.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Goal Selection */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-3 flex items-center gap-2">
                                <FiTarget className="w-4 h-4 text-[#00ff66]" />
                                Primary Fitness Goal
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {goalOptions.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setValue('goal', option.value as "LOSE" | "MAINTAIN" | "GAIN", {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                            })}
                                            className={`
                        p-5 rounded-xl border-2 transition-all text-left
                        ${watch('goal') === option.value
                                                    ? 'border-[#00ff66] bg-[#00ff66] bg-opacity-10'
                                                    : 'border-[#2a4a2a] hover:border-[#3a5a3a]'
                                                }
                      `}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                                    style={{ backgroundColor: `${option.color}22` }}
                                                >
                                                    <Icon className="w-5 h-5" style={{ color: option.color }} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-white font-semibold mb-1">{option.label}</h3>
                                                    <p className="text-gray-400 text-xs">{option.description}</p>
                                                </div>
                                                {watch('goal') === option.value && (
                                                    <div className="w-6 h-6 bg-[#00ff66] rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-black text-sm font-bold">✓</span>
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.goal && (
                                <p className="text-red-400 text-sm mt-2">{errors.goal.message}</p>
                            )}
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">💡</span>
                                <div className="flex-1">
                                    <h4 className="text-slate-200 font-semibold mb-1">Tu privacidad importa</h4>
                                    <p className="text-slate-300 text-sm opacity-90">
                                        Tu información es encriptada y segura. Usamos estos datos para calcular tu BMR
                                        (Basal Metabolic Rate) y TDEE (Total Daily Energy Expenditure) para ayudarte
                                        a alcanzar tus metas más rápido. Puedes actualizar esta información en cualquier momento en tu perfil.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Error */}
                        {errors.root && (
                            <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-xl p-3">
                                <p className="text-red-400 text-sm">{errors.root.message}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full text-lg py-4"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    Configurando tu perfil...
                                </div>
                            ) : (
                                <>
                                    Configurar & Iniciar
                                    <span className="ml-2">🚀</span>
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Skip Option (optional) */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Puedes completar esto más tarde en tu perfil
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;