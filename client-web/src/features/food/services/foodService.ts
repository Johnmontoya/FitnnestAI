import { apiClient } from "../../../shared/api/client"
import type { FoodFormData, FoodResponse, FoodUpdateData } from "../types/food.types";
import { endpoints } from "../api/endpoints";

export const foodService = {
    createFood: async (data: FoodFormData): Promise<FoodFormData> => {
        const response = await apiClient.post(endpoints.food.createFood, data);
        return response.data;
    },
    allFood: async (): Promise<FoodFormData[]> => {
        const response = await apiClient.get(endpoints.food.allFood);
        return response.data;
    },
    allFoodUser: async ({ startOfDay, endOfDay }: { startOfDay: string, endOfDay: string }): Promise<FoodResponse> => {
        const response = await apiClient.get(endpoints.food.allFoodUser(startOfDay, endOfDay));
        return response.data;
    },
    statsFood: async (date: string): Promise<FoodFormData> => {
        const response = await apiClient.get(endpoints.food.statsFood(date));
        return response.data;
    },
    getFood: async (id: string): Promise<FoodFormData> => {
        const response = await apiClient.get(endpoints.food.getFood(id));
        return response.data;
    },
    updateFood: async (id: string, data: FoodUpdateData): Promise<FoodUpdateData> => {
        const response = await apiClient.put(endpoints.food.updateFood(id), data);
        return response.data;
    },
    deleteFood: async (id: string): Promise<void> => {
        await apiClient.delete(endpoints.food.deleteFood(id));
    }
}