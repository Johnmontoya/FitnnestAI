import { useAuthStore } from "../features/auth/store/useAuthStore";
import { apiClient } from "../shared/api/client"

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
}

export const axiosInterceptor = () => {
    apiClient.interceptors.request.use(
        (config) => {
            const token = useAuthStore.getState().accessToken;
            console.log(token);
            if (token && config.headers) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    apiClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    }).catch(error => {
                        return Promise.reject(error);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const newToken = useAuthStore.getState().accessToken;

                    processQueue(newToken);

                    if (newToken) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    }
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);

                    const { logout } = useAuthStore.getState();
                    await logout();

                    window.location.href = "/login";

                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
}