import type { ActivityResponse } from "../types/activity.types";
import moment from "moment";

interface ChartActivityProps {
    activities: ActivityResponse[];
}

const ChartActivity: React.FC<ChartActivityProps> = ({ activities }) => {
    const last7Days = [...Array(7)].map((_, i) => moment().subtract(i, 'days').format('ddd')).reverse();

    const weeklyData = last7Days.map(dayName => {
        const dailySum = activities?.filter(activity => moment(activity.createdAt).format('ddd') === dayName).reduce((sum, current) => sum + current.calories, 0) || 0;

        return {
            day: dayName,
            value: dailySum
        };
    });

    const maxWeeklyValue = Math.max(...weeklyData.map(d => d.value), 500);

    return (
        <div className="glass rounded-[32px] border-[var(--border)] p-8! mt-4!">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                <div>
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Rendimiento Semanal</h3>
                    <p className="text-[var(--text-muted)] text-sm font-medium mt-1">Análisis de carga calórica</p>
                </div>
                <div className="flex items-center gap-4 text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]"></span>
                        <span>Energía (Kcal)</span>
                    </div>
                </div>
            </div>

            <div className="h-[200px] flex items-end justify-between gap-3 px-2">
                {weeklyData.map((item) => {
                    const heightPercent = (item.value / maxWeeklyValue) * 100;
                    const isToday = item.day === moment().format('ddd');

                    return (
                        <div key={item.day} className="flex-1 flex flex-col items-center gap-4 h-full group">
                            <div className="relative w-full flex-1 flex items-end justify-center">
                                {/* Track */}
                                <div className="absolute inset-0 bg-white/[0.02] rounded-xl border border-white/[0.05]"></div>

                                {/* Bar */}
                                <div
                                    className={`relative z-10 w-full rounded-t-lg transition-all duration-1000 ease-out ${isToday ? 'bg-[var(--accent)] shadow-[0_0_30px_var(--accent-glow)]' : 'bg-[var(--bg-elevated)] group-hover:bg-[var(--text-subtle)]'
                                        }`}
                                    style={{
                                        height: `${Math.max(heightPercent, 5)}%`,
                                        borderTop: isToday ? '2px solid white' : 'none'
                                    }}
                                >
                                    {item.value > 0 && (
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-[var(--border-mid)] px-2 py-1 rounded-md z-20">
                                            <span className="text-[0.6rem] font-black text-[var(--accent)] whitespace-nowrap">
                                                {item.value} KCAL
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <span className={`font-display font-bold md:text-[0.65rem] text-[0.45rem] tracking-widest uppercase transition-colors ${isToday ? 'text-[var(--accent)]' : 'text-[var(--text-subtle)] group-hover:text-[var(--text-muted)]'
                                }`}>
                                {item.day}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChartActivity;