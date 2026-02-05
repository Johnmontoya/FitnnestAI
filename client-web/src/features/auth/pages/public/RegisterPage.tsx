import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuActivity, LuEye, LuEyeOff, LuMail } from 'react-icons/lu';
import { BiLock, BiUser } from 'react-icons/bi';
import { Button } from '../../../../shared/ui/Button';
import { useAuthRegisterMutation } from '../../hooks/mutation/useAuthMutation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { accountSchema, type SignupFormData } from '../../types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../store/useAuthStore';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const authRegisterMutation = useAuthRegisterMutation();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const { isAuthenticated } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignupFormData>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onChange',
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
        setServerError(null);
        try {
            const { confirmPassword, ...rest } = data;
            authRegisterMutation.mutateAsync(rest);
            reset();
            navigate('/login');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Error al crear la cuenta';
            setServerError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a150a] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-[#00ff66] rounded-xl flex items-center justify-center">
                        <LuActivity className="w-7 h-7 text-black" />
                    </div>
                    <span className="text-white text-2xl font-bold">FitTrack Pro</span>
                </div>

                {/* Tarjeta del formulario */}
                <div className="bg-[#0f1f0f] rounded-2xl border border-[#2a4a2a] p-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <h2 className="text-white text-2xl font-bold mb-2">
                                Crea tu cuenta
                            </h2>
                            <p className="text-gray-400">
                                Comencemos tu viaje fitness
                            </p>
                        </div>

                        {/* Username */}
                        <div className="mb-5">
                            <label className="block text-white text-sm font-medium mb-2">
                                👤 Nombre de usuario
                            </label>
                            <div className="relative">
                                <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    {...register('username')}
                                    placeholder="john_doe"
                                    className={`
                                        w-full bg-[#0a150a] text-white rounded-xl px-4 py-3.5 pl-12
                                        border ${errors.username ? 'border-red-500' : 'border-[#2a4a2a]'}
                                        focus:border-[#00ff66] focus:outline-none
                                        placeholder:text-gray-500 transition-colors
                                    `}
                                />
                            </div>
                            {errors.username && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="mb-5">
                            <label className="block text-white text-sm font-medium mb-2">
                                📧 Correo electrónico
                            </label>
                            <div className="relative">
                                <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    {...register('email')}
                                    placeholder="john@example.com"
                                    className={`
                                        w-full bg-[#0a150a] text-white rounded-xl px-4 py-3.5 pl-12
                                        border ${errors.email ? 'border-red-500' : 'border-[#2a4a2a]'}
                                        focus:border-[#00ff66] focus:outline-none
                                        placeholder:text-gray-500 transition-colors
                                    `}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-5">
                            <label className="block text-white text-sm font-medium mb-2">
                                🔒 Contraseña
                            </label>
                            <div className="relative">
                                <BiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    placeholder="••••••••"
                                    className={`
                                        w-full bg-[#0a150a] text-white rounded-xl px-4 py-3.5 pl-12 pr-12
                                        border ${errors.password ? 'border-red-500' : 'border-[#2a4a2a]'}
                                        focus:border-[#00ff66] focus:outline-none
                                        placeholder:text-gray-500 transition-colors
                                    `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label className="block text-white text-sm font-medium mb-2">
                                🔒 Confirmar contraseña
                            </label>
                            <div className="relative">
                                <BiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register('confirmPassword')}
                                    placeholder="••••••••"
                                    className={`
                                        w-full bg-[#0a150a] text-white rounded-xl px-4 py-3.5 pl-12 pr-12
                                        border ${errors.confirmPassword ? 'border-red-500' : 'border-[#2a4a2a]'}
                                        focus:border-[#00ff66] focus:outline-none
                                        placeholder:text-gray-500 transition-colors
                                    `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Error del servidor */}
                        {serverError && (
                            <div className="mb-6 bg-red-500 bg-opacity-10 border border-red-500 rounded-xl p-3">
                                <p className="text-red-400 text-sm">{serverError}</p>
                            </div>
                        )}

                        {/* Botón de envío */}
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={isSubmitting || authRegisterMutation.isPending}
                        >
                            {isSubmitting || authRegisterMutation.isPending ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    <span>Creando cuenta...</span>
                                </div>
                            ) : (
                                <>
                                    Finalizar registro
                                    <span className="ml-2">✓</span>
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Link a login */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        ¿Ya tienes cuenta?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-[#00ff66] font-semibold hover:underline transition-all"
                        >
                            Inicia sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;