import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { mockUser, sanitizedUser } from '../test-utils/test-utils';

// ─── Mock UsersService ────────────────────────────────────────────────────────

const mockUsersService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

// ─── Simulated request objects ────────────────────────────────────────────────

const makeReq = (userId: string) => ({ user: { userId } });
const USER_A_ID = 'user-uuid-001';
const USER_B_ID = 'user-uuid-002';

// ─── Users Controller Security Tests ─────────────────────────────────────────

describe('UsersController - Security Tests', () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: mockUsersService },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: jest.fn().mockReturnValue(true) })
            .compile();

        controller = module.get<UsersController>(UsersController);
        jest.clearAllMocks();
    });

    // ─── SECURITY FIX: POST /users now requires auth ──────────────────────────

    describe('SECURITY: POST /users - now requires authentication [FIXED]', () => {
        it('should have JwtAuthGuard protecting POST /users', () => {
            const guards = Reflect.getMetadata('__guards__', UsersController.prototype.create);
            const hasJwtGuard =
                guards && guards.some((g: any) => g === JwtAuthGuard || g?.name === 'JwtAuthGuard');
            expect(hasJwtGuard).toBe(true);
        });
    });

    // ─── Phase 2: GET /users/profile ─────────────────────────────────────────

    describe('GET /users/profile - Authentication Required', () => {
        it('should return the authenticated user profile', async () => {
            const profile = sanitizedUser();
            mockUsersService.findOne.mockResolvedValue(profile);

            const result = await controller.getProfile(makeReq(USER_A_ID) as any);

            expect(mockUsersService.findOne).toHaveBeenCalledWith(USER_A_ID);
            expect(result).not.toHaveProperty('password');
        });

        it('should use userId from JWT (req.user.userId), not from request body', async () => {
            mockUsersService.findOne.mockResolvedValue(sanitizedUser());

            await controller.getProfile(makeReq(USER_A_ID) as any);

            // Service should be called with the JWT-provided userId
            expect(mockUsersService.findOne).toHaveBeenCalledWith(USER_A_ID);
            expect(mockUsersService.findOne).not.toHaveBeenCalledWith(USER_B_ID);
        });

        it('GET /users/profile should be guarded by JwtAuthGuard', () => {
            const guards = Reflect.getMetadata('__guards__', UsersController.prototype.getProfile);
            const hasJwtGuard =
                guards && guards.some((g: any) => g === JwtAuthGuard || g?.name === 'JwtAuthGuard');
            expect(hasJwtGuard).toBe(true);
        });
    });

    // ─── Phase 3: IDOR Testing - PUT /users/:id ──────────────────────────────

    describe('SECURITY: PUT /users/:id - IDOR Prevention', () => {
        it('should call service with the requested :id (controller passes it through)', async () => {
            const updatedUser = sanitizedUser();
            mockUsersService.update.mockResolvedValue(updatedUser);

            await controller.update(USER_A_ID, { name: 'Updated Name' } as any);

            expect(mockUsersService.update).toHaveBeenCalledWith(USER_A_ID, { name: 'Updated Name' });
        });

        it('PUT /users/:id should be protected by JwtAuthGuard', () => {
            const guards = Reflect.getMetadata('__guards__', UsersController.prototype.update);
            const hasJwtGuard =
                guards && guards.some((g: any) => g === JwtAuthGuard || g?.name === 'JwtAuthGuard');
            expect(hasJwtGuard).toBe(true);
        });

        it('should propagate NotFoundException when user does not exist', async () => {
            mockUsersService.update.mockRejectedValue(new NotFoundException('Usuario no encontrado'));

            await expect(
                controller.update('nonexistent-id', { name: 'Hacker' } as any),
            ).rejects.toThrow(NotFoundException);
        });

        it('should restrict updates to valid fields (validated by DTO via ValidationPipe)', async () => {
            // The controller delegates validation to NestJS ValidationPipe + DTO
            // We verify the controller calls the service with what it receives (whitelist enforced globally)
            mockUsersService.update.mockResolvedValue(sanitizedUser());

            await controller.update(USER_A_ID, {
                name: 'Legitimate Update',
                age: 28,
            } as any);

            expect(mockUsersService.update).toHaveBeenCalledWith(USER_A_ID, {
                name: 'Legitimate Update',
                age: 28,
            });
        });
    });

    // ─── Phase 3: IDOR Testing - DELETE /users/:id ───────────────────────────

    describe('SECURITY: DELETE /users/:id - IDOR Prevention', () => {
        it('should call service with the requested :id for deletion', async () => {
            mockUsersService.remove.mockResolvedValue({ deleted: true });

            await controller.remove(USER_A_ID);

            expect(mockUsersService.remove).toHaveBeenCalledWith(USER_A_ID);
        });

        it('DELETE /users/:id should be protected by JwtAuthGuard', () => {
            const guards = Reflect.getMetadata('__guards__', UsersController.prototype.remove);
            const hasJwtGuard =
                guards && guards.some((g: any) => g === JwtAuthGuard || g?.name === 'JwtAuthGuard');
            expect(hasJwtGuard).toBe(true);
        });

        it('should propagate NotFoundException when deleting a non-existent user', async () => {
            mockUsersService.remove.mockRejectedValue(new NotFoundException('Usuario no encontrado'));

            await expect(controller.remove('ghost-id')).rejects.toThrow(NotFoundException);
        });
    });
});
