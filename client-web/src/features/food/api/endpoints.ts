export const endpoints = {
    food: {
        createFood: '/food-entries',
        allFood: '/food-entries',
        allFoodUser: (startOfDay: string, endOfDay: string) => `/food-entries/user?startOfDay=${startOfDay}&endOfDay=${endOfDay}`,
        statsFood: (date: string) => `/food-entries/stats/${date}`,
        getFood: (id: string) => `/food-entries/${id}`,
        updateFood: (id: string) => `/food-entries/${id}`,
        deleteFood: (id: string) => `/food-entries/${id}`,
        analyzeFood: '/food-entries/analyze',
    }
}