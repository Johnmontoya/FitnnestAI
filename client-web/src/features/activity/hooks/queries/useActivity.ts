import { useQuery } from "@tanstack/react-query"
import { activityService } from "../../services/activityService"
import { queryKeys } from "../../../../shared/lib/queryClient"

export const useActivity = () => {
    return useQuery({
        queryKey: queryKeys.activity.get(),
        queryFn: () => activityService.allActivity(),
        select: (data) => data,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    })
}
