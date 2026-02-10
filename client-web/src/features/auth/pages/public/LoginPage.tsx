import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { LuActivity } from 'react-icons/lu';
import FormLogin from '../../components/FormLogin';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="w-full min-h-screen bg-[#0a150a] flex">
            {/* Left Side - Hero Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80')`,
                    }}
                />

                <div className="relative z-10 flex flex-col justify-end p-12 text-white">
                    <h1 className="text-5xl font-bold mb-4 leading-tight">
                        Eleva Tu<br />
                        Rendimiento Diario.
                    </h1>
                    <p className="text-lg text-gray-200 max-w-md">
                        Registra cada paso, caloría y hito con nuestro ecosistema de fitness de nivel profesional.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                            <LuActivity className="w-7 h-7 text-black" />
                        </div>
                        <Link to={'/'}><span className="text-white text-2xl font-bold">FitTrack Pro</span></Link>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-white text-3xl font-bold mb-2">Bienvenido de Nuevo</h2>
                        <p className="text-gray-400">
                            ¿Listo para tu próximo entrenamiento? Ingresa tus datos para seguir tu progreso.
                        </p>
                    </div>

                    {/* Form */}
                    <FormLogin login={login} />

                    {/* Sign up link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            No tienes una cuenta?{' '}
                            <button
                                onClick={() => navigate('/register')}
                                className="text-emerald-500 font-semibold hover:underline"
                            >
                                Regístrate ahora
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;