import { apiClient } from "../../../shared/api/client";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "../types/auth.types";
import { endpoints } from "../api/endpoints";

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(endpoints.auth.login, credentials);
        return response.data;
    },
    register: async (credentials: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(endpoints.auth.register, credentials);
        return response.data;
    },
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<User>(endpoints.auth.me);
        return response.data;
    },
    logout: async (refreshToken: string): Promise<void> => {
        await apiClient.post(endpoints.auth.logout, { refreshToken });
    }
}