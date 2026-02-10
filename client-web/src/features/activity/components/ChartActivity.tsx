import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card";
import type { ActivityResponse } from "../types/activity.types";
import moment from "moment";

interface ChartActivityProps {
    activities: ActivityResponse[];
}

const ChartActivity: React.FC<ChartActivityProps> = ({ activities }) => {
    const last7Days = [...Array(7)].map((_, i) => moment().subtract(i, 'days').format('ddd')).reverse();

    const weeklyData = last7Days.map(dayName => {
        const dailySum = activities?.filter(activity => moment(activity.createdAt).format('ddd') === dayName).reduce((sum, current) => sum + current.calories, 0);

        return {
            day: dayName,
            value: dailySum
        };
    });
    const maxWeeklyValue = Math.max(...weeklyData.map(d => d.value!));
    return (
        <Card className="mt-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Actividad semanal</CardTitle>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="w-3 h-3 bg-[#BA3211] rounded-full"></span>
                        <span className="text-gray-400">Calorias</span>
                        <span className="text-white font-semibold ml-2">Meta</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between gap-2 h-48">
                    {weeklyData.map((item) => (
                        <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                            <div className="relative w-full h-[100px] flex items-end justify-center h-full">
                                <div
                                    className="w-full flex justify-center items-center bg-[#BA3211] rounded-t-lg transition-all duration-500 hover:bg-amber-400"
                                    style={{
                                        height: `${(item.value! / maxWeeklyValue) * 100}px`,
                                        minHeight: '20px'
                                    }}
                                >
                                    {item.value}
                                </div>
                            </div>
                            <span className={`text-sm font-medium ${item.day === 'Thu' ? 'text-gray-400' : 'text-gray-400'
                                }`}>
                                {item.day}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ChartActivity;