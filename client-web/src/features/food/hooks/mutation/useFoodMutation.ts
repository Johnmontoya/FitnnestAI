import { useMutation, useQueryClient } from "@tanstack/react-query"
import { foodService } from "../../services/foodService"
import type { FoodFormData, FoodUpdateData } from "../../types/food.types"
import { toast } from "sonner"
import { queryKeys } from "../../../../shared/lib/queryClient"

export const useFoodMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FoodFormData) => foodService.createFood(data),
        onSuccess: (response: unknown) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.food.get() });
            toast.success((response as { message?: string }).message || "Comida agregada exitosamente");
        },
        onError: (error: unknown) => {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message || 'Error al agregar la comida');
        }
    });
}

export const useFoodUpdateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: FoodUpdateData }) => foodService.updateFood(id, data),
        onSuccess: (response: unknown) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.food.get() });
            toast.success((response as { message?: string }).message || "Comida actualizada exitosamente");
        },
        onError: (error: unknown) => {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message || 'Error al actualizar la comida');
        }
    });
}

export const useFoodDeleteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => foodService.deleteFood(id),
        onSuccess: (response: unknown) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.food.get() });
            toast.success((response as { message?: string }).message || "Comida eliminada exitosamente");
        },
        onError: (error: unknown) => {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message || 'Error al eliminar la comida');
        }
    });
}

export const useFoodAnalyzeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (foodName: string) => foodService.analyzeFood(foodName),
        onSuccess: (response: unknown) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.food.get() });
            toast.success((response as { message?: string }).message || "Verifica la informacion antes de guardar");
        },
        onError: (error: unknown) => {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message || 'Error al analizar la comida');
        }
    });
}