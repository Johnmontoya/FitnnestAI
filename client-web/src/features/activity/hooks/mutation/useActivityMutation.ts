import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityService } from "../../services/activityService";
import type { ActivityFormData } from "../../types/activity.types";
import { queryKeys } from "../../../../shared/lib/queryClient";
import { toast } from "sonner";

export const useActivityMutation = () => {
    const queryClient = useQueryClient();

    const createActivity = useMutation({
        mutationFn: (data: ActivityFormData) => activityService.createActivity(data),
        onSuccess: (response: unknown) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.activity.get() });
            toast.success((response as { message?: string }).message || "Actividad creada exitosamente");
        },
        onError: (error: unknown) => {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message || 'Error al crear la actividad');
        }
    });

    const updateActivity = useMutation({
        mutationFn: ({ id, data }: { id: string, data: ActivityFormData }) => activityService.updateActivity(id, data),
        onSuccess: (response: unknown) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.activity.get() });
            toast.success((response as { message?: string }).message || "Actividad actualizada exitosamente");
        },
        onError: (error: unknown) => {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message || 'Error al actualizar la actividad');
        }
    });

    const deleteActivity = useMutation({
        mutationFn: (id: string) => activityService.deleteActivity(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.activity.get() });
            toast.success("Actividad eliminada exitosamente");
        },
        onError: (error: unknown) => {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message || 'Error al eliminar la actividad');
        }
    });

    return {
        createActivity,
        updateActivity,
        deleteActivity,
    };
}