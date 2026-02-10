import { BiBarChart } from "react-icons/bi";
import { LuActivity, LuUtensils } from "react-icons/lu";

const Feature = () => {
    const features = [
        {
            icon: LuUtensils,
            title: "Registro de comidas inteligente",
            description: "Toma fotos, inicia sesión y listo. Uso simple para catalogar tu nutrición instantáneamente y mantenerse en el camino con tu plan de dieta personalizado.",
            color: "#ffffff"
        },
        {
            icon: LuActivity,
            title: "Rastreo de actividad",
            description: "Registra tus entrenamientos en segundos. Desde HIIT hasta Yoga, tenemos cubierto con presets de registro rápido para más de 500 ejercicios.",
            color: "#ffffff"
        },
        {
            icon: BiBarChart,
            title: "Insights de progreso",
            description: "Visualiza tu trayectoria con gráficos detallados y tendencias de salud que te mantienen motivado a través de cada hito.",
            color: "#ffffff"
        },
    ];
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8" id="features">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-300 mb-4">
                        Todo lo que necesitas para<br />
                        <span className="text-emerald-500">suceder</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Nuestros herramientas completas hacen que el monitoreo de la salud sea eficiente, atractivo y realmente divertido.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-emerald-500 rounded-2xl p-8"
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                                    style={{ backgroundColor: `${feature.color}22` }}
                                >
                                    <Icon className="w-7 h-7" style={{ color: feature.color }} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-200 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Feature;