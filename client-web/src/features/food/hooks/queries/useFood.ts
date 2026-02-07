import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../shared/lib/queryClient";
import { foodService } from "../../services/foodService";

export const useFoodUser = ({ startOfDay, endOfDay }: { startOfDay: string, endOfDay: string }) => {
    return useQuery({
        queryKey: queryKeys.food.get(),
        queryFn: () => foodService.allFoodUser({ startOfDay, endOfDay }),
        select: (data) => data,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    })
}