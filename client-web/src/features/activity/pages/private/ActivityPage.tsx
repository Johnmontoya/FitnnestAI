import { BiCalendar } from 'react-icons/bi';
import { Sidebar } from '../../../../shared/ui/Sidebar';
import moment from 'moment';
import { useActivity } from '../../hooks/queries/useActivity';
import { useAuthStore } from '../../../auth/store/useAuthStore';
import StatsActivity from '../../components/StatsActivity';
import LogActivity from '../../components/FormActivity/LogActivity';
import ChartActivity from '../../components/ChartActivity';
import DayliGoal from '../../components/DayliGoal';
import RecentActivity from '../../components/RecentActivity';

const ActivityPage = () => {
    const { user } = useAuthStore();
    const { data: activities } = useActivity();

    const durationTime = activities?.filter((activity) => moment(activity.createdAt).isSame(moment(), 'day')).reduce((sum, current) => sum + current.duration, 0);
    const totalSteps = durationTime! * 100;

    const caloriesBurned = activities?.filter((activity) => moment(activity.createdAt).isSame(moment(), 'day')).reduce((sum, current) => sum + current.calories, 0) || 0;

    return (
        <div className="min-h-screen bg-[#0a150a] text-white ml-64">
            <Sidebar />
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Buenos días, {user?.name}</h1>
                    <p className="text-gray-400">¿Listo para alcanzar tus metas hoy?</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                        <BiCalendar className="w-4 h-4" />
                        <span>{moment().format('MMMM DD, YYYY')}</span>
                    </div>
                </div>

                {/* Stats Overview */}
                <StatsActivity
                    activities={activities!}
                    totalSteps={totalSteps}
                    caloriesBurned={caloriesBurned}
                    durationTime={durationTime!}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Log Activity */}
                    <div className="lg:col-span-2">
                        <LogActivity />

                        {/* Weekly Activity Chart */}
                        <ChartActivity activities={activities!} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityPage;