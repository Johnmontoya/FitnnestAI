import { apiClient } from "../../../shared/api/client";
import type { UpdateBiometricsRequest, User } from "../../auth/types/auth.types";
import { endpoints } from "../api/endpoints";

export const profileService = {
    updateBiometrics: async (id: string, biometrics: UpdateBiometricsRequest): Promise<User> => {
        const response = await apiClient.put<User>(
            endpoints.profile.updateBiometrics(id),
            biometrics
        );
        return response.data;
    }
}