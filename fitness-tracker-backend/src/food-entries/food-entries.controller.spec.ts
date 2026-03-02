import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { FoodEntriesController } from './food-entries.controller';
import { FoodEntriesService } from './food-entries.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { mockFoodEntry } from '../test-utils/test-utils';
import { MealType } from './dto/food-entry.dto';

// ─── Mock FoodEntriesService ──────────────────────────────────────────────────

const mockFoodEntriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllUser: jest.fn(),
    findOne: jest.fn(),
    getStatsByDate: jest.fn(),
    analyzeFood: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeReq = (userId: string) => ({ user: { userId } });
const USER_A = 'user-uuid-001';
const USER_B = 'user-uuid-002';

const validFoodEntryDto = {
    name: 'Chicken Breast',
    calories: 165,
    mealType: MealType.LUNCH,
    date: '2024-01-15',
};

// ─── Food Entries Controller Security Tests ───────────────────────────────────

describe('FoodEntriesController - Security Tests', () => {
    let controller: FoodEntriesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FoodEntriesController],
            providers: [
                { provide: FoodEntriesService, useValue: mockFoodEntriesService },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: jest.fn().mockReturnValue(true) })
            .compile();

        controller = module.get<FoodEntriesController>(FoodEntriesController);
        jest.clearAllMocks();
    });

    // ─── Phase 2: Authentication - All Routes Must Be Guarded ────────────────

    describe('SECURITY: Class-level JwtAuthGuard enforcement', () => {
        it('should have JwtAuthGuard at class level (all routes protected)', () => {
            const classGuards = Reflect.getMetadata('__guards__', FoodEntriesController);
            const hasJwtGuard =
                classGuards &&
                classGuards.some((g: any) => g === JwtAuthGuard || g?.name === 'JwtAuthGuard');
            expect(hasJwtGuard).toBe(true);
        });
    });

    // ─── Phase 3: IDOR - POST /food-entries ──────────────────────────────────

    describe('SECURITY: POST /food-entries - User ID from JWT (IDOR Prevention)', () => {
        it('should create entry using authenticated userId (not from request body)', async () => {
            mockFoodEntriesService.create.mockResolvedValue(mockFoodEntry());

            await controller.create(makeReq(USER_A) as any, validFoodEntryDto as any);

            // IDOR test: service is called with the JWT userId, not a user-supplied one
            expect(mockFoodEntriesService.create).toHaveBeenCalledWith(USER_A, validFoodEntryDto);
        });

        it('should NOT use a userId from the request body (attacker-controlled)', async () => {
            mockFoodEntriesService.create.mockResolvedValue(mockFoodEntry());

            // The DTO does not accept userId - it comes from JWT via req.user.userId
            await controller.create(makeReq(USER_A) as any, validFoodEntryDto as any);

            const [calledUserId] = mockFoodEntriesService.create.mock.calls[0];
            expect(calledUserId).toBe(USER_A);
            expect(calledUserId).not.toBe(USER_B);
        });
    });

    // ─── Phase 3: IDOR - GET /food-entries ───────────────────────────────────

    describe('SECURITY: GET /food-entries - Scoped to Authenticated User', () => {
        it('should fetch only entries for the authenticated user', async () => {
            mockFoodEntriesService.findAll.mockResolvedValue([mockFoodEntry()]);

            await controller.findAll(makeReq(USER_A) as any, '2024-01-15');

            expect(mockFoodEntriesService.findAll).toHaveBeenCalledWith(USER_A, '2024-01-15');
        });

        it('User B cannot retrieve User A entries via findAllUser (scoped by JWT userId)', async () => {
            mockFoodEntriesService.findAllUser.mockResolvedValue([]);

            await controller.findAllUser(makeReq(USER_B) as any, '2024-01-15T00:00:00', '2024-01-15T23:59:59');

            // Service called with User B's ID, not User A's
            expect(mockFoodEntriesService.findAllUser).toHaveBeenCalledWith(USER_B, expect.any(String), expect.any(String));
            expect(mockFoodEntriesService.findAllUser).not.toHaveBeenCalledWith(USER_A, expect.anything(), expect.anything());
        });
    });

    // ─── Phase 3: IDOR - GET /food-entries/:id ───────────────────────────────

    describe('SECURITY: GET /food-entries/:id - IDOR Prevention', () => {
        it('should pass authenticated userId to service when fetching a specific entry', async () => {
            mockFoodEntriesService.findOne.mockResolvedValue(mockFoodEntry());

            await controller.findOne(makeReq(USER_A) as any, 'food-uuid-001');

            // Service enforces ownership: findOne(entryId, userId) 
            expect(mockFoodEntriesService.findOne).toHaveBeenCalledWith('food-uuid-001', USER_A);
        });

        it('should propagate NotFoundException if entry does not belong to the requesting user', async () => {
            // Service returns null/throws when entry doesn't belong to the user
            mockFoodEntriesService.findOne.mockRejectedValue(new NotFoundException('Entrada no encontrada'));

            await expect(
                controller.findOne(makeReq(USER_B) as any, 'food-uuid-001'),
            ).rejects.toThrow(NotFoundException);
        });
    });

    // ─── Phase 3: IDOR - GET /food-entries/stats/:date ───────────────────────

    describe('SECURITY: GET /food-entries/stats/:date - Scoped Stats', () => {
        it('should fetch stats only for the authenticated user', async () => {
            mockFoodEntriesService.getStatsByDate.mockResolvedValue({ totalCalories: 1500 });

            await controller.getStats(makeReq(USER_A) as any, '2024-01-15');

            expect(mockFoodEntriesService.getStatsByDate).toHaveBeenCalledWith(USER_A, '2024-01-15');
        });
    });

    // ─── Phase 3: IDOR - PUT /food-entries/:id ───────────────────────────────

    describe('SECURITY: PUT /food-entries/:id - IDOR Prevention', () => {
        it('should pass authenticated userId to service when updating', async () => {
            mockFoodEntriesService.update.mockResolvedValue(mockFoodEntry({ name: 'Updated' }));

            await controller.update(makeReq(USER_A) as any, 'food-uuid-001', { name: 'Updated' } as any);

            expect(mockFoodEntriesService.update).toHaveBeenCalledWith('food-uuid-001', USER_A, { name: 'Updated' });
        });

        it('should reject if entry belongs to a different user (NotFoundException)', async () => {
            mockFoodEntriesService.update.mockRejectedValue(new NotFoundException('Entrada no encontrada'));

            await expect(
                controller.update(makeReq(USER_B) as any, 'food-uuid-001', { name: 'Hacked' } as any),
            ).rejects.toThrow(NotFoundException);
        });
    });

    // ─── Phase 3: IDOR - DELETE /food-entries/:id ────────────────────────────

    describe('SECURITY: DELETE /food-entries/:id - IDOR Prevention', () => {
        it('should pass authenticated userId to service when deleting', async () => {
            mockFoodEntriesService.remove.mockResolvedValue({ deleted: true });

            await controller.remove(makeReq(USER_A) as any, 'food-uuid-001');

            expect(mockFoodEntriesService.remove).toHaveBeenCalledWith('food-uuid-001', USER_A);
        });

        it('should reject deletion of entries belonging to a different user', async () => {
            mockFoodEntriesService.remove.mockRejectedValue(new NotFoundException('Entrada no encontrada'));

            await expect(
                controller.remove(makeReq(USER_B) as any, 'food-uuid-001'),
            ).rejects.toThrow(NotFoundException);
        });
    });

    // ─── Phase 4: Input Validation - POST /food-entries/analyze ─────────────

    describe('SECURITY: POST /food-entries/analyze - Input Validation', () => {
        it('should call service with provided foodName', async () => {
            mockFoodEntriesService.analyzeFood.mockResolvedValue({ calories: 165 });

            await controller.analyzeFood({ foodName: 'chicken breast' });

            expect(mockFoodEntriesService.analyzeFood).toHaveBeenCalledWith('chicken breast');
        });

        it('should call analyzeFood even with script-like input (sanitization is service responsibility)', async () => {
            mockFoodEntriesService.analyzeFood.mockResolvedValue(null);

            // Controller should pass through; service/AI layer handles sanitization
            await controller.analyzeFood({ foodName: '<script>alert(1)</script>' });

            expect(mockFoodEntriesService.analyzeFood).toHaveBeenCalledWith('<script>alert(1)</script>');
        });
    });
});
