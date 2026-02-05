import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4">
            <div className="text-center max-w-2xl">
                {/* Vinyl Record Animation */}
                <div className="relative inline-block mb-8">
                    {/* Outer glow rings */}
                    <div className="absolute inset-0 animate-pulse">
                        <div className="w-80 h-80 rounded-full bg-green-500/10 blur-2xl"></div>
                    </div>

                    {/* Vinyl record */}
                    <div className="relative w-80 h-80 mx-auto">
                        {/* Outer ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
                            {/* Grooves effect */}
                            <div className="absolute inset-4 rounded-full border-2 border-gray-700/30"></div>
                            <div className="absolute inset-8 rounded-full border-2 border-gray-700/30"></div>
                            <div className="absolute inset-12 rounded-full border-2 border-gray-700/30"></div>
                            <div className="absolute inset-16 rounded-full border-2 border-gray-700/30"></div>

                            {/* Label in center */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-700 to-green-900 shadow-lg flex items-center justify-center border-4 border-gray-800">
                                    {/* Center hole with broken link icon */}
                                    <div className="w-16 h-16 rounded-full bg-green-900 flex items-center justify-center border-2 border-green-600">
                                        <svg
                                            className="w-8 h-8 text-green-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                            />
                                            <line x1="6" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <line x1="14" y1="14" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 404 Badge */}
                    <div className="absolute -top-2 -right-4 bg-emerald-400 text-gray-900 font-black text-4xl px-6 py-3 rounded-full shadow-lg transform rotate-12 border-4 border-emerald-300">
                        404
                    </div>
                </div>

                {/* Text Content */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Página no encontrada
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
                        Parece que esta canción se ha salido de la lista o el enlace está roto.
                        <span className="block mt-2 font-semibold">¡No dejes que la música se detenga!</span>
                    </p>
                </div>

                {/* Buttons */}
                <div className="space-y-4">
                    <button
                        onClick={handleGoHome}
                        className="inline-block bg-emerald-400 hover:bg-emerald-300 text-gray-900 font-bold text-lg px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-400/50"
                    >
                        Ir al Inicio
                    </button>

                    <div>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-emerald-400 text-sm font-medium transition-colors"
                        >
                            Contactar con soporte
                        </a>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="fixed top-10 left-10 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl"></div>
                <div className="fixed bottom-10 right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
                <div className="fixed top-1/2 left-1/4 w-16 h-16 bg-teal-500/10 rounded-full blur-xl"></div>
            </div>
        </div>
    );
};

export default NotFoundPage;