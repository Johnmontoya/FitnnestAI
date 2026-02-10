import { LuActivity } from 'react-icons/lu';
import { useAuthStore } from '../../../auth/store/useAuthStore';
import FormBoarding from '../../components/FormBoarding';

const OnboardingPage = () => {
    const { user } = useAuthStore();

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
                <div className="bg-emerald-500 rounded-2xl p-6 mb-8 text-center">
                    <h1 className="text-black text-3xl font-bold mb-2">
                        Bienvenido, {user?.username || 'there'}! 👋
                    </h1>
                    <p className="text-black opacity-80">
                        Vamos a configurar tu perfil para personalizar tu viaje fitness
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-[#0f1f0f] rounded-2xl border border-[#2a4a2a] p-8">
                    <FormBoarding user={user!} />
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