import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityService } from "../../services/activityService";
import type { ActivityFormData } from "../../types/activity.types";
import { queryKeys } from "../../../../shared/lib/queryClient";
import { toast } from "sonner";

export const useActivityMutation = () => {
    const queryClient = useQueryClient();

    const createActivity = useMutation({
        mutationFn: (data: ActivityFormData) => activityService.createActivity(data),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.activity.get() });
            toast.success(response.message || "Actividad creada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || error.message || 'Error al crear la actividad');
        }
    });

    const updateActivity = useMutation({
        mutationFn: ({ id, data }: { id: string, data: ActivityFormData }) => activityService.updateActivity(id, data),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.activity.get() });
            toast.success(response.message || "Actividad actualizada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || error.message || 'Error al actualizar la actividad');
        }
    });

    const deleteActivity = useMutation({
        mutationFn: (id: string) => activityService.deleteActivity(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.activity.get() });
            toast.success("Actividad eliminada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || error.message || 'Error al eliminar la actividad');
        }
    });

    return {
        createActivity,
        updateActivity,
        deleteActivity,
    };
}