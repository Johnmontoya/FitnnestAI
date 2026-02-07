import z from "zod";

export const foodCreateSchema = z.object({
    name: z.string().min(2, 'Ingresa una comida'),
    calories: z.number({ error: 'Ingresa las calorias' })
        .int('Debe ser un número entero'),
    mealType: z.string(),
    proteinas: z.number().optional(),
    carbs: z.number().optional(),
    fats: z.number().optional(),
    portion: z.number().optional(),
    date: z.string()
})

export const foodUpdateSchema = foodCreateSchema.partial();

export type FoodFormData = z.infer<typeof foodCreateSchema>;
export type FoodUpdateData = z.infer<typeof foodUpdateSchema>;

export interface FoodResponse {
    foodEntries: Food[]
    stats: {
        _sum: {
            calories: number,
            proteinas: number,
            carbs: number,
            fats: number
        }
    }
}

export interface Food {
    id: string,
    documentId: string,
    name: string,
    calories: number,
    mealType: string,
    proteinas: number,
    carbs: number,
    fats: number,
    portion: number,
    date: string,
    userId: string,
    createdAt: string,
    updatedAt: string
}