import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'El email es requerido')
        .email('Formato de email inválido'),
    password: z
        .string()
        .min(1, 'La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const accountSchema = z.object({
    username: z
        .string()
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
        .max(20, 'Máximo 20 caracteres'),
    email: z.string().min(1, 'El email es requerido').email('Email inválido'),
    password: z
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
});

export const biometricsSchema = z.object({
    age: z
        .number({ error: 'Edad requerida' })
        .int('Debe ser un número entero')
        .min(13, 'Edad mínima 13 años')
        .max(120, 'Edad máxima 120 años'),
    weight: z
        .number({ error: 'Peso requerido' })
        .min(30, 'Peso mínimo 30 kg')
        .max(300, 'Peso máximo 300 kg'),
    height: z
        .number({ error: 'Altura requerida' })
        .min(100, 'Altura mínima 100 cm')
        .max(250, 'Altura máxima 250 cm'),
    goal: z.enum(['LOSE', 'MAINTAIN', 'GAIN'], {
        error: () => ({ message: 'Selecciona tu objetivo principal' }),
    }),
    dailyCalorieIntake: z.number().optional(),
    dailyCalorieBurn: z.number().optional(),
});

export type SignupFormData = z.infer<typeof accountSchema>;
export type RegisterRequest = Omit<z.infer<typeof accountSchema>, 'confirmPassword'>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type UpdateBiometricsRequest = z.infer<typeof biometricsSchema>;

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: User
}

export interface User {
    id: string,
    email: string,
    username: string,
    name: string,
    age: number,
    weight: number,
    height: number,
    goal: string,
    dailyCalorieIntake: number,
    dailyCalorieBurn: number,
    createdAt: string,
    updatedAt: string
}