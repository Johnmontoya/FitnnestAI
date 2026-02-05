import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateBiometricsRequest } from "../../../auth/types/auth.types";
import { profileService } from "../../services/profileService";
import { toast } from "sonner";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import { queryKeys } from "../../../../shared/lib/queryClient";

export const useProfileMutation = (id: string) => {
    const queryClient = useQueryClient();
    const { setUser } = useAuthStore();

    return useMutation({
        mutationFn: (biometrics: UpdateBiometricsRequest) =>
            profileService.updateBiometrics(id, biometrics),
        onSuccess: (response) => {
            // Actualizar el usuario en el store
            if (response) {
                setUser(response);
            }

            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ queryKey: queryKeys.profile.get() });
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.get() });

            toast.success("Perfil actualizado exitosamente");
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message ||
                error.message ||
                "Error al actualizar el perfil";
            toast.error(errorMessage);
            console.error('Error updating profile:', error);
        }
    });
}