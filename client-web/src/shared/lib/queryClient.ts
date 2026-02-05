import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 1 minuto
            gcTime: 10 * 60 * 1000, // 1 minuto
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        },
        mutations: {
            retry: 1,
        },
    },
});

export const queryKeys = {
    auth: {
        all: ['auth'] as const,
        lists: () => [...queryKeys.auth.all, 'list'] as const,
        list: (filters?: Record<string, any>) =>
            [...queryKeys.auth.lists(), filters] as const,
        get: () => [...queryKeys.auth.all, 'get'] as const,
    },
    profile: {
        all: ['profile'] as const,
        get: () => [...queryKeys.profile.all, 'get'] as const,
    }
};