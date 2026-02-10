import { BiCheck } from "react-icons/bi";
import { LuActivity } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/hero.jpg";

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-emerald-500 bg-opacity-10 text-[#00ff66] px-4 py-2 rounded-full mb-8">
                    <BiCheck className="w-4 h-4" />
                    <span className="text-black text-sm font-semibold">TU AI GYM GURU PERSONAL</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text */}
                    <div>
                        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                            Transforma<br />
                            Tu Vida,<br />
                            <span className="text-emerald-500">Un Calor</span> a la vez
                        </h1>

                        <p className="text-gray-300 text-lg mb-8 max-w-md">
                            Registra tus actividades y alcanza tus metas de fitness con nuestro compañero intuitivo.
                            Diseñado para claridad, velocidad y resultados reales.
                        </p>

                        <div className="flex items-center gap-4 mb-6">
                            <button
                                onClick={() => navigate('/signup')}
                                className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-4 rounded-lg transition-all text-lg"
                            >
                                Vamos a empezar
                            </button>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
                            </div>
                            <span className="text-white text-sm font-medium">Unete a 50,000+ otros hoy</span>
                        </div>
                    </div>

                    {/* Right Column - Hero Image */}
                    <div className="relative">
                        <div className="bg-emerald-500 rounded-3xl p-8 aspect-[4/3] flex items-end justify-between overflow-hidden"
                        style={{backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
                            {/* Placeholder for workout image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-black opacity-20">
                                    <LuActivity className="w-32 h-32 mx-auto mb-4" />
                                    <p className="text-xl font-bold">Workout Image</p>
                                </div>
                            </div>

                            <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-6 py-4">
                                <p className="text-black font-bold text-lg">Full Body HIIT</p>
                            </div>

                            <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-6 py-4">
                                <p className="text-black font-bold text-4xl">450</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;