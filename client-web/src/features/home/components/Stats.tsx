import { BiTrendingUp, BiUser } from "react-icons/bi";
import { LuScale } from "react-icons/lu";

const Stats = () => {
    const stats = [
        {
            icon: BiUser,
            label: "USUARIOS",
            value: "50,000+",
            change: "+62% crecimiento este mes",
            color: "#ffffff"
        },
        {
            icon: BiTrendingUp,
            label: "REGISTROS",
            value: "1.2M+",
            change: "+35% crecimiento este mes",
            color: "#ffffff"
        },
        {
            icon: LuScale,
            label: "PESO PERDIDO",
            value: "250k lbs",
            change: "+5% crecimiento este mes",
            color: "#ffffff"
        },
    ];
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-emerald-500 rounded-2xl p-8"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${stat.color}22` }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: stat.color }} />
                                    </div>
                                    <span className="text-gray-200 text-sm font-semibold">{stat.label}</span>
                                </div>
                                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                                <p className="text-green-200 text-sm font-medium">{stat.change}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Stats;