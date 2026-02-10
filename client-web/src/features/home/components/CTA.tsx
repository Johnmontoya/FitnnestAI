import { useNavigate } from "react-router-dom"

const CTA = () => {
    const navigate = useNavigate()
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-emerald-500 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">
                        Listo para comenzar tu<br />viaje hoy?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Únete a miles de personas que han simplificado su fitness y logrado el cuerpo que siempre quisieron.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-lg transition-all"
                        >
                            Empezar gratis
                        </button>
                        <button className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-lg transition-all">
                            Ver precios
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA