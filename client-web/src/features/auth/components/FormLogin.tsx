import { BiLock } from "react-icons/bi"
import { LuEye, LuEyeOff, LuMail } from "react-icons/lu"
import { Button } from "../../../shared/ui/Button"
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginRequest } from "../types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

interface FormLoginProps {
    login: (data: LoginRequest) => Promise<void>;
}

const FormLogin: React.FC<FormLoginProps> = ({ login }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });


    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        setServerError(null);
        try {
            await login(data);
            reset();
            navigate('/dashboard');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Error al crear la cuenta';
            setServerError(errorMessage);
        } finally {
            isSubmitting;
        }
    };
    const handleGoogleLogin = () => {
        console.log('Google login clicked');
        // TODO: Implementar OAuth con Google
    };

    const handleAppleLogin = () => {
        console.log('Apple login clicked');
        // TODO: Implementar OAuth con Apple
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
                <label className="block text-white text-sm font-medium mb-2">
                    Correo electrónico
                </label>
                <div className="relative">
                    <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="email"
                        {...register('email')}
                        placeholder="name@example.com"
                        className={`
                    w-full bg-[#0f1f0f] text-white rounded-xl px-4 py-3.5 pl-12
                    border ${errors.email ? 'border-red-500' : 'border-[#2a4a2a]'}
                    focus:border-[#00ff66] focus:outline-none
                    placeholder:text-gray-500 transition-colors
                  `}
                    />
                </div>
                {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="block text-white text-sm font-medium mb-2">
                    Contraseña
                </label>
                <div className="relative">
                    <BiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        placeholder="••••••••"
                        className={`
                    w-full bg-[#0f1f0f] text-white rounded-xl px-4 py-3.5 pl-12 pr-12
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
                        {showPassword ? <LuEyeOff className="w-5 h-5" /> : <LuEye className="w-5 h-5" />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-[#2a4a2a] bg-[#0f1f0f] text-[#00ff66] focus:ring-[#00ff66] focus:ring-offset-0"
                    />
                    <span className="text-gray-400 text-sm">Remember me</span>
                </label>
                <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-emerald-500 text-sm font-medium hover:underline"
                >
                    Olvidaste tu contraseña?
                </button>
            </div>

            {/* Error del servidor */}
            {serverError && (
                <div className="mb-6 bg-red-500 bg-opacity-10 border border-red-500 rounded-xl p-3">
                    <p className="text-red-400 text-sm">{serverError}</p>
                </div>
            )}

            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Iniciando sesión...
                    </div>
                ) : (
                    'Iniciar sesión'
                )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2a4a2a]" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#0a150a] text-gray-400">O CONTINÚA CON</span>
                </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-3 px-4 py-3 bg-[#1a2f1a] hover:bg-[#2a4a2a] border border-[#2a4a2a] rounded-xl transition-all text-white"
                >
                    {/* Google SVG */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Google
                </button>

                <button
                    type="button"
                    onClick={handleAppleLogin}
                    className="flex items-center justify-center gap-3 px-4 py-3 bg-[#1a2f1a] hover:bg-[#2a4a2a] border border-[#2a4a2a] rounded-xl transition-all text-white"
                >
                    {/* Apple SVG */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    Apple
                </button>
            </div>
        </form>
    )
}

export default FormLogin