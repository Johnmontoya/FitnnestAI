import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { sanitizedUser } from '../test-utils/test-utils';

// ─── Mock AuthService ─────────────────────────────────────────────────────────

const mockAuthService = {
  login: jest.fn(),
  register: jest.fn(),
  validateUser: jest.fn(),
};

// ─── Auth Controller Security Tests ──────────────────────────────────────────

describe('AuthController - Security Tests', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  // ─── Phase 2: POST /auth/register ────────────────────────────────────────

  describe('POST /auth/register', () => {
    const validPayload = {
      email: 'new@example.com',
      username: 'newuser',
      password: 'password123',
    };

    it('should call authService.register with the provided DTO', async () => {
      const expectedResult = {
        user: sanitizedUser(),
        accessToken: 'token',
        refreshToken: 'rtoken',
      };
      mockAuthService.register.mockResolvedValue(expectedResult);

      await controller.register(validPayload as any);

      expect(mockAuthService.register).toHaveBeenCalledWith(validPayload);
    });

    it('should NOT expose password in the registration response', async () => {
      const expectedResult = {
        user: sanitizedUser(),
        accessToken: 'token',
        refreshToken: 'rtoken',
      };
      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(validPayload as any);

      expect(result.user).not.toHaveProperty('password');
    });

    it('should propagate ConflictException for duplicate email', async () => {
      const { ConflictException } = await import('@nestjs/common');
      mockAuthService.register.mockRejectedValue(
        new ConflictException('El email ya está registrado'),
      );

      await expect(controller.register(validPayload as any)).rejects.toThrow(ConflictException);
    });

    it('should propagate ConflictException for duplicate username', async () => {
      const { ConflictException } = await import('@nestjs/common');
      mockAuthService.register.mockRejectedValue(
        new ConflictException('El username ya está en uso'),
      );

      await expect(controller.register(validPayload as any)).rejects.toThrow(ConflictException);
    });
  });

  // ─── Phase 2: POST /auth/login ────────────────────────────────────────────

  describe('POST /auth/login', () => {
    const validCredentials = { email: 'test@example.com', password: 'password123' };

    it('should return user data and tokens on valid credentials', async () => {
      const expectedResult = {
        user: sanitizedUser(),
        accessToken: 'token',
        refreshToken: 'rtoken',
      };
      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(validCredentials as any);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user).not.toHaveProperty('password');
    });

    it('should propagate UnauthorizedException for wrong credentials (generic error)', async () => {
      mockAuthService.login.mockRejectedValue(new UnauthorizedException('Credenciales inválidas'));

      await expect(controller.login(validCredentials as any)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should propagate UnauthorizedException for non-existent user (same generic error)', async () => {
      mockAuthService.login.mockRejectedValue(new UnauthorizedException('Credenciales inválidas'));

      await expect(
        controller.login({ email: 'nobody@example.com', password: 'anypass' } as any),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  // ─── Phase 2: GET /auth/me ────────────────────────────────────────────────

  describe('GET /auth/me - JWT Protected Route', () => {
    it('should return the authenticated user profile without password', async () => {
      const profile = sanitizedUser();
      mockAuthService.validateUser.mockResolvedValue(profile);

      const result = await controller.getProfile('user-uuid-001');

      expect(mockAuthService.validateUser).toHaveBeenCalledWith('user-uuid-001');
      expect(result).not.toHaveProperty('password');
    });

    it('should propagate UnauthorizedException when userId from JWT does not exist', async () => {
      mockAuthService.validateUser.mockRejectedValue(
        new UnauthorizedException('Usuario no encontrado'),
      );

      await expect(controller.getProfile('deleted-uuid')).rejects.toThrow(UnauthorizedException);
    });
  });

  // ─── Phase 7: Security Header / Guard Verification ───────────────────────

  describe('SECURITY: Route Guard Configuration', () => {
    it('GET /auth/me should be protected by JwtAuthGuard', () => {
      // If JwtAuthGuard is applied as decorator, metadata should reference it
      // Since we override the guard in tests, we verify the real module has the guard via reflection
      const classGuards = Reflect.getMetadata('__guards__', AuthController);
      const methodGuards = Reflect.getMetadata('__guards__', AuthController.prototype.getProfile);
      const hasGuard =
        (classGuards &&
          classGuards.some((g: any) => g === JwtAuthGuard || g?.name === 'JwtAuthGuard')) ||
        (methodGuards &&
          methodGuards.some((g: any) => g === JwtAuthGuard || g?.name === 'JwtAuthGuard'));
      expect(hasGuard).toBe(true);
    });

    it('POST /auth/login should NOT require authentication (public endpoint)', () => {
      const guards = Reflect.getMetadata('__guards__', AuthController.prototype.login);
      // Login should not have JwtAuthGuard
      const hasJwtGuard =
        guards && guards.some((g: any) => g === JwtAuthGuard || g?.name === 'JwtAuthGuard');
      expect(hasJwtGuard).toBeFalsy();
    });

    it('POST /auth/register should NOT require authentication (public endpoint)', () => {
      const guards = Reflect.getMetadata('__guards__', AuthController.prototype.register);
      const hasJwtGuard =
        guards && guards.some((g: any) => g === JwtAuthGuard || g?.name === 'JwtAuthGuard');
      expect(hasJwtGuard).toBeFalsy();
    });
  });
});
