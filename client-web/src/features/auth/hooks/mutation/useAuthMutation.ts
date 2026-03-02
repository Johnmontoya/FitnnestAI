import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { LoginRequest, RegisterRequest } from "../../types/auth.types";
import { authService } from "../../services/authService";
import { toast } from "sonner";
import { queryKeys } from "../../../../shared/lib/queryClient";

export const useAuthRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (auth: RegisterRequest) => authService.register(auth),
        onSuccess: (response: unknown) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.get() });
            toast.success((response as { message?: string }).message || "Usuario creado exitosamente");
        },
        onError: (error: unknown) => {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || "Error al crear el usuario");
        }
    })
}

export const useAuthLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (auth: LoginRequest) => authService.login(auth),
        onSuccess: (response: unknown) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.get() });
            toast.success((response as { message?: string }).message || "Bienvenido");
        },
        onError: (error: unknown) => {
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || "Error al iniciar sesión");
        }
    })
}