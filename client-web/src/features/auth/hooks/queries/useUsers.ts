import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../shared/lib/queryClient";
import { authService } from "../../services/authService";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: queryKeys.profile.get(),
        queryFn: () => authService.getCurrentUser(),
        select: (data) => data,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
}