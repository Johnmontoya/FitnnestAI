import { JwtService } from '@nestjs/jwt';

// ─── Fixture Factories ────────────────────────────────────────────────────────

export const mockUser = (overrides: Partial<MockUser> = {}): MockUser => ({
    id: 'user-uuid-001',
    email: 'test@example.com',
    username: 'testuser',
    password: '$2b$10$hashedpassword',
    name: 'Test User',
    age: 25,
    gender: 'MALE',
    weight: 70,
    height: 1.75,
    goal: 'MAINTAIN',
    dailyCalorieIntake: 2000,
    dailyCalorieBurn: 500,
    dailyWaterIntake: 2000,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    ...overrides,
});

export type MockUser = {
    id: string;
    email: string;
    username: string;
    password: string;
    name: string | null;
    age: number | null;
    gender: string | null;
    weight: number | null;
    height: number | null;
    goal: string | null;
    dailyCalorieIntake: number | null;
    dailyCalorieBurn: number | null;
    dailyWaterIntake: number | null;
    createdAt: Date;
    updatedAt: Date;
};

export const mockFoodEntry = (overrides: Partial<MockFoodEntry> = {}): MockFoodEntry => ({
    id: 'food-uuid-001',
    userId: 'user-uuid-001',
    name: 'Chicken Breast',
    calories: 165,
    mealType: 'LUNCH',
    proteinas: 31,
    carbs: 0,
    fats: 4,
    portion: 100,
    date: '2024-01-15',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    ...overrides,
});

export type MockFoodEntry = {
    id: string;
    userId: string;
    name: string;
    calories: number;
    mealType: string;
    proteinas: number | null;
    carbs: number | null;
    fats: number | null;
    portion: number | null;
    date: string;
    createdAt: Date;
    updatedAt: Date;
};

export const mockActivityEntry = (overrides: Partial<MockActivityEntry> = {}): MockActivityEntry => ({
    id: 'activity-uuid-001',
    userId: 'user-uuid-001',
    name: 'Running',
    duration: 30,
    calories: 300,
    date: '2024-01-15',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    ...overrides,
});

export type MockActivityEntry = {
    id: string;
    userId: string;
    name: string;
    duration: number;
    calories: number;
    date: string;
    createdAt: Date;
    updatedAt: Date;
};

// ─── Sanitized User (no password) ────────────────────────────────────────────

export const sanitizedUser = (overrides: Partial<MockUser> = {}) => {
    const { password: _p, ...rest } = mockUser(overrides);
    return rest;
};

// ─── JWT helpers ──────────────────────────────────────────────────────────────

export const TEST_JWT_SECRET = 'test-secret-key-for-testing-only';

export const generateTestToken = (payload: { sub: string; email: string }): string => {
    const jwtService = new JwtService({ secret: TEST_JWT_SECRET });
    return jwtService.sign(payload, { expiresIn: '1h' });
};

export const validTestToken = () =>
    generateTestToken({ sub: mockUser().id, email: mockUser().email });

export const secondUserTestToken = () =>
    generateTestToken({ sub: 'user-uuid-002', email: 'other@example.com' });

// ─── Common Mock Providers ────────────────────────────────────────────────────

export const mockPrismaService = {
    user: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn(),
    },
    foodEntry: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
    activityEntry: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

export const mockConfigService = {
    get: jest.fn((key: string, defaultValue?: string) => {
        const config: Record<string, string> = {
            JWT_SECRET: TEST_JWT_SECRET,
            JWT_EXPIRES_IN: '24h',
            JWT_REFRESH_SECRET: TEST_JWT_SECRET,
            JWT_REFRESH_EXPIRES_IN: '7d',
        };
        return config[key] ?? defaultValue;
    }),
};
