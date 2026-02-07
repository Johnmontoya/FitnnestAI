import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../api/endpoints";
import type { ActivityFormData, ActivityResponse } from "../types/activity.types";

export const activityService = {
    createActivity: async (data: ActivityFormData): Promise<ActivityResponse> => {
        const response = await apiClient.post(endpoints.activity.createActivity, data);
        return response.data;
    },
    allActivity: async (): Promise<ActivityResponse[]> => {
        const response = await apiClient.get(endpoints.activity.allActivity);
        return response.data;
    },
    statsActivity: async (date: string): Promise<ActivityFormData> => {
        const response = await apiClient.get(endpoints.activity.statsActivity(date));
        return response.data;
    },
    getActivity: async (id: string): Promise<ActivityFormData> => {
        const response = await apiClient.get(endpoints.activity.getActivity(id));
        return response.data;
    },
    updateActivity: async (id: string, data: ActivityFormData): Promise<ActivityFormData> => {
        const response = await apiClient.put(endpoints.activity.updateActivity(id), data);
        return response.data;
    },
    deleteActivity: async (id: string): Promise<void> => {
        await apiClient.delete(endpoints.activity.deleteActivity(id));
    }
}