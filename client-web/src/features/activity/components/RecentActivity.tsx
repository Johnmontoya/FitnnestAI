import { useActivityMutation } from "../hooks/mutation/useActivityMutation"
import { toast } from "sonner"
import moment from "moment"
import { BiTrash, BiRun, BiCycling, BiDumbbell, BiWalk, BiHistory } from "react-icons/bi"
import { LuActivity } from "react-icons/lu"
import type { ActivityResponse } from "../types/activity.types"

interface RecentActivityProps {
    activities: ActivityResponse[];
}

const getActivityIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('run') || lowerName.includes('correr')) return <BiRun />;
    if (lowerName.includes('cycle') || lowerName.includes('bici')) return <BiCycling />;
    if (lowerName.includes('lift') || lowerName.includes('pesas') || lowerName.includes('gym')) return <BiDumbbell />;
    if (lowerName.includes('walk') || lowerName.includes('caminar')) return <BiWalk />;
    return <LuActivity />;
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
    const { deleteActivity } = useActivityMutation();

    const onDeleteActivity = async (id: string) => {
        try {
            await deleteActivity.mutateAsync(id);
            toast.success('Actividad eliminada');
        } catch (error: unknown) {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message || 'Error al eliminar la actividad');
        }
    }

    return (
        <div className="glass rounded-[32px] border-[var(--border)] p-8! mb-4!">
            <div className="flex items-center justify-between mb-8!">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                        <BiHistory className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Registro de Sesiones</h3>
                </div>
            </div>

            <div className="space-y-4!">
                {!activities || activities.length === 0 ? (
                    <div className="text-center py-12 bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
                        <LuActivity className="w-12 h-12 text-[var(--text-subtle)] mx-auto mb-4 opacity-20" />
                        <p className="font-display font-bold text-[var(--text-muted)] uppercase tracking-widest text-xs">Sistema Inactivo</p>
                        <p className="text-[var(--text-subtle)] text-xs mt-1">Registra tu entrenamiento para activar el registro</p>
                    </div>
                ) : (
                    activities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="group relative bg-[var(--bg-elevated)]/40 border border-white/5 rounded-2xl p-4 transition-all duration-300 hover:border-[var(--accent)]/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center border border-white/5 text-[var(--accent)] group-hover:scale-110 transition-transform">
                                        {getActivityIcon(activity.name)}
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-white text-md tracking-tight">{activity.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[var(--accent)] font-black text-xs tracking-tighter uppercase">{activity.calories} kcal</span>
                                            <span className="text-white/10">•</span>
                                            <span className="text-[var(--text-subtle)] text-[0.7rem] font-bold uppercase tracking-wider">{activity.duration} min</span>
                                            <span className="text-white/10">•</span>
                                            <span className="text-[var(--text-subtle)] text-[0.65rem] font-medium tracking-tight uppercase">{moment(activity.date).format('DD MMM')}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    title='Eliminar'
                                    aria-label='Eliminar'
                                    onClick={() => onDeleteActivity(activity.id)}
                                    className="p-2! mr-2! rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-[var(--text-muted)]"
                                >
                                    <BiTrash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentActivity;