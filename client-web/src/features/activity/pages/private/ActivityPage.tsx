import { BiCalendar, BiTrendingUp } from 'react-icons/bi';
import { Sidebar } from '../../../../shared/ui/Sidebar';
import moment from 'moment';
import { useActivity } from '../../hooks/queries/useActivity';
import { useAuthStore } from '../../../auth/store/useAuthStore';
import StatsActivity from '../../components/StatsActivity';
import LogActivity from '../../components/FormActivity/LogActivity';
import ChartActivity from '../../components/ChartActivity';
import RecentActivity from '../../components/RecentActivity';
import DayliGoal from '../../components/DailyGoal';

const ActivityPage = () => {
    const { user } = useAuthStore();
    const { data: activities } = useActivity();

    const durationTime = activities?.filter((activity) => moment(activity.createdAt).isSame(moment(), 'day')).reduce((sum, current) => sum + current.duration, 0);
    const totalSteps = (durationTime || 0) * 100;

    const caloriesBurned = activities?.filter((activity) => moment(activity.createdAt).isSame(moment(), 'day')).reduce((sum, current) => sum + current.calories, 0) || 0;

    return (
        <div className='flex flex-row' style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
            <Sidebar />
            <div className='w-full px-4! relative' style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="p-10 max-w-7xl mx-auto animate-fade-up">
                    {/* Header */}
                    <div className="w-full h-fit mb-12!">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="accent-line"></span>
                            <p className="font-display font-bold text-[0.72rem] tracking-[0.2em] uppercase text-[var(--accent)]">
                                Sistemas de Rendimiento
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="p-2! font-display font-extrabold text-[3.2rem] text-[var(--text)] tracking-tighter leading-[1.1]">
                                    Buenos días, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-white">{user?.name}</span>
                                </h1>
                                <p className="text-[var(--text-muted)] text-[1.05rem] mt-2 max-w-xl">
                                    Tu biometría indica niveles óptimos para entrenamiento de alta intensidad hoy.
                                </p>
                            </div>

                            <div className="flex items-center gap-4 px-5 py-3 glass rounded-2xl border-[var(--border-mid)]">
                                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                                    <BiCalendar className="w-5 h-5 text-[var(--accent)]" />
                                </div>
                                <div>
                                    <span className="block text-[0.6rem] font-bold text-[var(--text-muted)] uppercase tracking-widest">Protocolo Actual</span>
                                    <span className="font-display font-bold text-[var(--text)]">{moment().format('DD [DE] MMMM, YYYY')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <StatsActivity
                        activities={activities!}
                        totalSteps={totalSteps}
                        caloriesBurned={caloriesBurned}
                        durationTime={durationTime!}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Log Activity */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="h-fit! glass rounded-[32px] border-[var(--border-mid)] p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-[0.03] blur-3xl"></div>
                                <LogActivity />
                            </div>

                            {/* Weekly Activity Chart */}
                            <ChartActivity activities={activities!} />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Recent Activities */}
                            <RecentActivity
                                activities={activities!}
                            />

                            {/* Daily Goal Progress */}
                            <DayliGoal
                                user={user!}
                                caloriesBurned={caloriesBurned}
                                totalSteps={totalSteps}
                            />

                            {/* Motivational Insight */}
                            <div className="p-6! rounded-[24px] bg-gradient-to-br from-[var(--accent)]/20 to-black border border-[var(--accent)]/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <BiTrendingUp className="text-[var(--accent)] w-6 h-6" />
                                    <span className="font-display font-bold text-sm text-[var(--accent)] uppercase tracking-wider">Bio-Insight</span>
                                </div>
                                <p className="text-sm text-[var(--text)] leading-relaxed italic">
                                    "La consistencia supera a la intensidad en el largo plazo. Mantén el ritmo de hoy para optimizar la quema calórica semanal."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityPage;