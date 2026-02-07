import { useMutation, useQueryClient } from "@tanstack/react-query"
import { foodService } from "../../services/foodService"
import type { FoodFormData, FoodUpdateData } from "../../types/food.types"
import { toast } from "sonner"
import { queryKeys } from "../../../../shared/lib/queryClient"

export const useFoodMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FoodFormData) => foodService.createFood(data),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.food.get() })
            toast.success(response.message || "Comida creada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al crear la comida");
        }
    })
}

export const useFoodUpdateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: FoodUpdateData }) => foodService.updateFood(id, data),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.food.get() })
            toast.success(response.message || "Comida actualizada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al actualizar la comida");
        }
    })
}

export const useFoodDeleteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => foodService.deleteFood(id),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.food.get() })
            toast.success(response.message || "Comida eliminada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al eliminar la comida");
        }
    })
}