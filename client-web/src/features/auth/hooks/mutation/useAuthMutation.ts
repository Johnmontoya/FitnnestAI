import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { LoginRequest, RegisterRequest } from "../../types/auth.types";
import { authService } from "../../services/authService";
import { toast } from "sonner";
import { queryKeys } from "../../../../shared/lib/queryClient";

export const useAuthRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (auth: RegisterRequest) => authService.register(auth),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.get() });
            toast.success(response.message || "Usuario creado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al crear el usuario");
        }
    })
}

export const useAuthLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (auth: LoginRequest) => authService.login(auth),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.get() });
            toast.success(response.message || "Bienvenido");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al iniciar sesión");
        }
    })
}