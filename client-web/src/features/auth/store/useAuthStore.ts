import { toast } from "sonner";
import { authService } from "../services/authService";
import type { AuthResponse, LoginRequest, User } from "../types/auth.types";
import { persist } from "zustand/middleware";
import { create } from "zustand";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AuthActions {
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => Promise<void>;
    getCurrentUser: () => Promise<void>;
    setUser: (user: User | null) => void;
    clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            //Login
            login: async (credentials: LoginRequest) => {
                set({ isLoading: true, error: null });
                try {
                    const { accessToken, refreshToken, user }: AuthResponse = await authService.login(credentials);
                    set({
                        user: user,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    })

                    toast.success('Inicio de sesión exitoso');
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
                    set({ isLoading: false, error: errorMessage, isAuthenticated: false });
                    toast.error(errorMessage);
                    throw error;
                }
            },

            //Logout
            logout: async () => {
                set({ isLoading: true });
                try {
                    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false, isLoading: false, error: null });
                    toast.success('Cierre de sesión exitoso');
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || 'Error al cerrar sesión';
                    set({ isLoading: false });
                    toast.error(errorMessage);
                }
            },

            // Obtener usuario actual
            getCurrentUser: async () => {
                set({ isLoading: true });
                try {
                    const response: User = await authService.getCurrentUser();
                    set({
                        user: response,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Error al obtener usuario',
                        isLoading: false,
                    });
                }
            },

            // Setear usuario manualmente
            setUser: (user: User | null) => {
                set({ user });
            },

            // Limpiar error
            clearError: () => {
                set({ error: null });
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
)