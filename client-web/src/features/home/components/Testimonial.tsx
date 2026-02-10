import { BiStar } from "react-icons/bi";
import { FiShare2, FiThumbsUp } from "react-icons/fi";
import testimonialImage from "../../../assets/testimonio1.png";

const Testimonial = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Success Story Card */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-4 text-white">
                            <div className="mb-4">
                                <p className="text-sm font-semibold mb-2 opacity-60">HISTORIA DE EXITO</p>
                            </div>

                            <img src={testimonialImage} alt="" className="w-full h-full object-cover" />

                            <div className="absolute bottom-8 left-8">
                                <div className="bg-emerald-500 text-black font-bold text-2xl px-6 py-3 rounded-xl inline-block">
                                    -35lb
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Testimonial */}
                    <div>
                        <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <BiStar key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                            ))}
                        </div>

                        <blockquote className="text-3xl font-medium text-gray-200 mb-8 leading-relaxed italic">
                            "Esta app cambió por completo mi forma de ver mis hábitos diarios. El registro de comidas es tan rápido que realmente lo sigo por primera vez en años."
                        </blockquote>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                            <div>
                                <p className="text-gray-200 font-semibold">Sarah Jenkins</p>
                                <p className="text-gray-400 text-sm">Miembro desde Marzo 2024</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
                                <FiThumbsUp className="w-4 h-4" />
                                <span>156 Me gusta</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 font-medium transition-colors">
                                <FiShare2 className="w-4 h-4" />
                                <span>Compartir historia</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;