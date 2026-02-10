import { Card, CardContent, CardHeader, CardTitle } from "../../../../shared/ui/Card";
import { Button } from "../../../../shared/ui/Button";
import { QuickActivitiesGrid } from "../../../../shared/ui/ActivityButton";
import { useState } from "react";
import { useActivityMutation } from "../../hooks/mutation/useActivityMutation";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { activitySchema, type ActivityFormData } from '../../types/activity.types';

const quickActivities = [
    { name: "Caminata", emoji: "🚶", rate: 5 },
    { name: "Correr", emoji: "🏃", rate: 11 },
    { name: "Ciclismo", emoji: "🚴", rate: 8 },
    { name: "Natacion", emoji: "🏊", rate: 10 },
    { name: "Yoga", emoji: "🧘", rate: 4 },
    { name: "Fuerza", emoji: "💪", rate: 7 },
    { name: "Baile", emoji: "💃", rate: 6 },
    { name: "Senderismo", emoji: "🏞️", rate: 9 },
    { name: "Baloncesto", emoji: "🏀", rate: 8 },
    { name: "Fútbol", emoji: "⚽", rate: 7 },
    { name: "Tenis", emoji: "🎾", rate: 6 },
    { name: "Voleibol", emoji: "🏐", rate: 5 },
    { name: "Boxeo", emoji: "🥊", rate: 9 },
    { name: "Artes Marciales", emoji: "🥋", rate: 8 },
    { name: "Escalada", emoji: "🧗", rate: 10 },
    { name: "Patinaje", emoji: "⛸️", rate: 6 },
    { name: "Remo", emoji: "🚣", rate: 7 },
    { name: "Elíptica", emoji: "🏋️", rate: 6 },
    { name: "Spinning", emoji: "🚴", rate: 8 },
    { name: "Zumba", emoji: "💃", rate: 7 },
    { name: "Pilates", emoji: "🧘", rate: 4 },
    { name: "CrossFit", emoji: "🏋️", rate: 9 },
    { name: "HIIT", emoji: "⚡", rate: 10 },
    { name: "Boxeo", emoji: "🥊", rate: 9 },
    { name: "Artes Marciales", emoji: "🥋", rate: 8 },
    { name: "Escalada", emoji: "🧗", rate: 10 },
    { name: "Patinaje", emoji: "⛸️", rate: 6 },
    { name: "Remo", emoji: "🚣", rate: 7 },
    { name: "Elíptica", emoji: "🏋️", rate: 6 },
    { name: "Spinning", emoji: "🚴", rate: 8 },
    { name: "Zumba", emoji: "💃", rate: 7 },
    { name: "Pilates", emoji: "🧘", rate: 4 },
    { name: "CrossFit", emoji: "🏋️", rate: 9 },
    { name: "HIIT", emoji: "⚡", rate: 10 },
];

interface Activity {
    name: string;
    rate: number;
}

const LogActivity = () => {
    const { createActivity } = useActivityMutation();
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset
    } = useForm<ActivityFormData>({
        resolver: zodResolver(activitySchema),
        values: {
            name: selectedActivity?.name!,
            duration: 0,
            calories: 0,
            date: moment(new Date()).format('YYYY-MM-DD'),
        },
        mode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<ActivityFormData> = async (data) => {
        try {
            data.calories = selectedActivity?.rate! * data.duration;
            await createActivity.mutateAsync(data);
            reset();
        } catch (error) {
            console.error(error);
        } finally {
            isSubmitting
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Registrar actividad</CardTitle>
                    <Button variant="secondary" size="sm">Registro rápido</Button>
                </div>
            </CardHeader>
            <CardContent>
                <QuickActivitiesGrid
                    activities={quickActivities}
                    selectedActivity={selectedActivity}
                    onActivityClick={setSelectedActivity}
                />

                {selectedActivity && (
                    <div className="mt-6 p-4 bg-[#0f1f0f] rounded-xl border border-[#2a4a2a]">
                        <h4 className="text-white font-semibold mb-3">
                            Registrar {selectedActivity.name}
                        </h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Duración (min)</label>
                                    <input
                                        type="number"
                                        {...register('duration', { valueAsNumber: true })}
                                        placeholder="30"
                                        className="w-full bg-[#1a2f1a] text-white rounded-lg px-4 py-2 border border-emerald-500 focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>
                                <div className="flex items-center justify-center mt-6">
                                    <Button variant="primary" type='submit' size="sm" className="w-full">
                                        Registro de actividad
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default LogActivity;