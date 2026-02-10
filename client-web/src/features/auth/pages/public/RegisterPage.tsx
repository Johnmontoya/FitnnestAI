import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuActivity } from 'react-icons/lu';
import { useAuthStore } from '../../store/useAuthStore';
import FormRegister from '../../components/FormRegister';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen bg-[#0a150a] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <LuActivity className="w-7 h-7 text-black" />
                    </div>
                    <Link to="/" className="text-white text-2xl font-bold">FitTrack Pro</Link>
                </div>

                {/* Tarjeta del formulario */}
                <div className="bg-emerald-500/20 rounded-2xl border border-emerald-500 p-8">
                    <FormRegister />
                </div>

                {/* Link a login */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        ¿Ya tienes cuenta?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-emerald-500 font-semibold hover:underline transition-all"
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