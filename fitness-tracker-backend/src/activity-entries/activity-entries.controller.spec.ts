import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { ActivityEntriesController } from './activity-entries.controller';
import { ActivityEntriesService } from './activity-entries.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { mockActivityEntry } from '../test-utils/test-utils';

// ─── Mock ActivityEntriesService ──────────────────────────────────────────────

const mockActivityEntriesService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  getStatsByDate: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeReq = (userId: string) => ({ user: { userId } });
const USER_A = 'user-uuid-001';
const USER_B = 'user-uuid-002';

const validActivityDto = {
  name: 'Running',
  duration: 30,
  calories: 300,
  date: '2024-01-15',
};

// ─── Activity Entries Controller Security Tests ───────────────────────────────

describe('ActivityEntriesController - Security Tests', () => {
  let controller: ActivityEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityEntriesController],
      providers: [{ provide: ActivityEntriesService, useValue: mockActivityEntriesService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<ActivityEntriesController>(ActivityEntriesController);
    jest.clearAllMocks();
  });

  // ─── Phase 2: Authentication - All Routes Must Be Guarded ────────────────

  describe('SECURITY: Class-level JwtAuthGuard enforcement', () => {
    it('should have JwtAuthGuard at class level (all activity routes protected)', () => {
      const classGuards = Reflect.getMetadata('__guards__', ActivityEntriesController);
      const hasJwtGuard =
        classGuards &&
        classGuards.some((g: any) => g === JwtAuthGuard || g?.name === 'JwtAuthGuard');
      expect(hasJwtGuard).toBe(true);
    });
  });

  // ─── Phase 3: IDOR - POST /activity-entries ───────────────────────────────

  describe('SECURITY: POST /activity-entries - User ID from JWT (IDOR Prevention)', () => {
    it('should create entry using authenticated userId (from JWT, not from body)', async () => {
      mockActivityEntriesService.create.mockResolvedValue(mockActivityEntry());

      await controller.create(makeReq(USER_A) as any, validActivityDto as any);

      expect(mockActivityEntriesService.create).toHaveBeenCalledWith(USER_A, validActivityDto);
    });

    it('should NOT associate entry with User B when User A is authenticated', async () => {
      mockActivityEntriesService.create.mockResolvedValue(mockActivityEntry());

      await controller.create(makeReq(USER_A) as any, validActivityDto as any);

      const [calledUserId] = mockActivityEntriesService.create.mock.calls[0];
      expect(calledUserId).toBe(USER_A);
      expect(calledUserId).not.toBe(USER_B);
    });
  });

  // ─── Phase 3: IDOR - GET /activity-entries ────────────────────────────────

  describe('SECURITY: GET /activity-entries - Scoped to Authenticated User', () => {
    it('should fetch only activity entries for the authenticated user', async () => {
      mockActivityEntriesService.findAll.mockResolvedValue([mockActivityEntry()]);

      await controller.findAll(makeReq(USER_A) as any, '2024-01-15');

      expect(mockActivityEntriesService.findAll).toHaveBeenCalledWith(USER_A, '2024-01-15');
    });

    it('should NOT return entries from other users', async () => {
      mockActivityEntriesService.findAll.mockResolvedValue([]);

      await controller.findAll(makeReq(USER_A) as any);

      // Service called with USER_A, so even if USER_B entries exist, they won't be returned
      expect(mockActivityEntriesService.findAll).toHaveBeenCalledWith(USER_A, undefined);
    });
  });

  // ─── Phase 3: IDOR - GET /activity-entries/stats/:date ───────────────────

  describe('SECURITY: GET /activity-entries/stats/:date - Scoped Stats', () => {
    it('should fetch stats only for the authenticated user', async () => {
      mockActivityEntriesService.getStatsByDate.mockResolvedValue({ totalCalories: 500 });

      await controller.getStats(makeReq(USER_A) as any, '2024-01-15');

      expect(mockActivityEntriesService.getStatsByDate).toHaveBeenCalledWith(USER_A, '2024-01-15');
    });
  });

  // ─── Phase 3: IDOR - GET /activity-entries/:id ───────────────────────────

  describe('SECURITY: GET /activity-entries/:id - IDOR Prevention', () => {
    it('should pass authenticated userId to service when fetching a specific entry', async () => {
      mockActivityEntriesService.findOne.mockResolvedValue(mockActivityEntry());

      await controller.findOne(makeReq(USER_A) as any, 'activity-uuid-001');

      expect(mockActivityEntriesService.findOne).toHaveBeenCalledWith('activity-uuid-001', USER_A);
    });

    it('should reject access to entries not belonging to the requesting user', async () => {
      mockActivityEntriesService.findOne.mockRejectedValue(
        new NotFoundException('Actividad no encontrada'),
      );

      await expect(controller.findOne(makeReq(USER_B) as any, 'activity-uuid-001')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ─── Phase 3: IDOR - PATCH /activity-entries/:id ─────────────────────────

  describe('SECURITY: PATCH /activity-entries/:id - IDOR Prevention', () => {
    it('should pass authenticated userId to service when updating', async () => {
      mockActivityEntriesService.update.mockResolvedValue(mockActivityEntry({ name: 'Cycling' }));

      await controller.update(makeReq(USER_A) as any, 'activity-uuid-001', {
        name: 'Cycling',
      } as any);

      expect(mockActivityEntriesService.update).toHaveBeenCalledWith('activity-uuid-001', USER_A, {
        name: 'Cycling',
      });
    });

    it('should reject updating entries belonging to a different user', async () => {
      mockActivityEntriesService.update.mockRejectedValue(
        new NotFoundException('Actividad no encontrada'),
      );

      await expect(
        controller.update(makeReq(USER_B) as any, 'activity-uuid-001', { name: 'Hacked' } as any),
      ).rejects.toThrow(NotFoundException);
    });

    it('PATCH /activity-entries/:id should be protected by JwtAuthGuard class-level decorator', () => {
      // The class-level guard covers all methods - verify controller-level guard presence
      const classGuards = Reflect.getMetadata('__guards__', ActivityEntriesController);
      expect(classGuards).toBeTruthy();
      expect(classGuards.length).toBeGreaterThan(0);
    });
  });

  // ─── Phase 3: IDOR - DELETE /activity-entries/:id ────────────────────────

  describe('SECURITY: DELETE /activity-entries/:id - IDOR Prevention', () => {
    it('should pass authenticated userId to service when deleting', async () => {
      mockActivityEntriesService.remove.mockResolvedValue({ deleted: true });

      await controller.remove(makeReq(USER_A) as any, 'activity-uuid-001');

      expect(mockActivityEntriesService.remove).toHaveBeenCalledWith('activity-uuid-001', USER_A);
    });

    it('should reject deletion of entries belonging to a different user', async () => {
      mockActivityEntriesService.remove.mockRejectedValue(
        new NotFoundException('Actividad no encontrada'),
      );

      await expect(controller.remove(makeReq(USER_B) as any, 'activity-uuid-001')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ─── Phase 4: Input Validation (DTO-level guard verification) ────────────

  describe('SECURITY: Input Validation via DTO', () => {
    it('should forward valid data to the service without modification', async () => {
      mockActivityEntriesService.create.mockResolvedValue(mockActivityEntry());

      await controller.create(makeReq(USER_A) as any, validActivityDto as any);

      expect(mockActivityEntriesService.create).toHaveBeenCalledWith(USER_A, validActivityDto);
    });

    it('should use date from DTO (YYYY-MM-DD format enforced by @Matches validator)', async () => {
      mockActivityEntriesService.create.mockResolvedValue(mockActivityEntry());

      await controller.create(
        makeReq(USER_A) as any,
        { ...validActivityDto, date: '2024-01-15' } as any,
      );

      const [, dto] = mockActivityEntriesService.create.mock.calls[0];
      expect(dto.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
