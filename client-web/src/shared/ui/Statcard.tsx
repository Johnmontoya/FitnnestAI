import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";

export const StatCard = ({
    title,
    value,
    unit,
    icon: Icon,
    trend,
    trendValue,
    color = '#00ff66'
}: {
    title: string;
    value: string;
    unit?: string;
    icon: React.ComponentType<{ className?: string }>;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: string;
}) => {
    const isPositive = trend === 'up';

    return (
        <div className="bg-[#1a2f1a] rounded-2xl p-6 border border-[#2a4a2a] hover:border-[#00ff66] transition-all">
            <div className="flex items-start justify-between mb-4">
                <p className="text-gray-400 text-sm font-medium">{title}</p>
                {Icon && (
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${color}22` }}
                    >
                        <Icon className="w-5 h-5" />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                    <span className="text-white text-3xl font-bold">{value}</span>
                    {unit && <span className="text-gray-400 text-lg">{unit}</span>}
                </div>

                {trendValue && (
                    <div className="flex items-center gap-1">
                        {isPositive ? (
                            <BiTrendingUp className="w-4 h-4 text-green-400" />
                        ) : (
                            <BiTrendingDown className="w-4 h-4 text-red-400" />
                        )}
                        <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {trendValue}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};