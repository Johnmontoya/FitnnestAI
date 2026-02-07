import z from "zod";

export const activitySchema = z.object({
    name: z.string().min(2, 'Ingresa una actividad'),
    duration: z.number({ error: 'Ingresa la duración' })
        .int('Debe ser un número entero'),
    calories: z.number({ error: 'Ingresa las calorias' })
        .int('Debe ser un número entero'),
    date: z.string()
})

export type ActivityFormData = z.infer<typeof activitySchema>;