import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card"
import { Button } from "../../../shared/ui/Button"
import type { ActivityResponse } from "../types/activity.types"
import moment from "moment"
import { BiX } from "react-icons/bi"
import { LuActivity } from "react-icons/lu"
import { useActivityMutation } from "../hooks/mutation/useActivityMutation"
import { toast } from "sonner"

interface RecentActivityProps {
    activities: ActivityResponse[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
    const { deleteActivity } = useActivityMutation();
    const onDeleteActivity = (id: string) => {
        try {
            deleteActivity.mutateAsync(id);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Actividades recientes</CardTitle>
                    <Button variant="secondary" size="sm">Ver todas</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {activities?.slice(0, 3).map((activity) => (
                        <div
                            key={activity.id}
                            className="relative p-4 bg-[#0f1f0f] rounded-xl border border-[#2a4a2a] hover:border-[#00ff66] transition-all"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                                onClick={() => onDeleteActivity(activity.id)}
                            >
                                <BiX size={16} />
                            </Button>
                            <div className="flex items-start gap-3">
                                <div className="text-3xl"><LuActivity size={24} /></div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-semibold">{activity.name}</h4>
                                    <p className="text-gray-400 text-sm">Duración: {activity.duration} minutos</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-[#00ff66] text-sm font-medium">
                                            Calorias: {activity.calories} kcal
                                        </span>
                                        <span className="text-white text-sm font-medium">
                                            Fecha: {moment(activity.date).format('DD-MM-YYYY')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentActivity;