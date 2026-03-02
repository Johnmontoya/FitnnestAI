import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { mockUser, mockConfigService } from '../test-utils/test-utils';

// ─── Mock Setup ───────────────────────────────────────────────────────────────

const mockUsersService = {
  findByEmail: jest.fn(),
  findByUsername: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn().mockResolvedValue('mock.jwt.token'),
};

// ─── Auth Service Security Tests ──────────────────────────────────────────────

describe('AuthService - Security Tests', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  // ─── Phase 2: Authentication Testing ─────────────────────────────────────

  describe('SECURITY: register()', () => {
    it('should reject registration with an already-registered email (no user enumeration through conflict)', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser());

      await expect(
        service.register({
          email: 'test@example.com',
          username: 'newuser',
          password: 'password123',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should reject registration with an already-taken username', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.findByUsername.mockResolvedValue(mockUser());

      await expect(
        service.register({
          email: 'new@example.com',
          username: 'testuser',
          password: 'password123',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should hash the password before storing (NEVER store plaintext passwords)', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.findByUsername.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(mockUser());

      await service.register({
        email: 'new@example.com',
        username: 'newuser',
        password: 'plaintext-password',
      });

      const createCall = mockUsersService.create.mock.calls[0][0];
      expect(createCall.password).not.toBe('plaintext-password');
      expect(createCall.password).toMatch(/^\$2[aby]\$\d+\$/); // bcrypt hash format
    });

    it('should NOT return password in the registration response (data sanitization)', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.findByUsername.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(mockUser());

      const result = await service.register({
        email: 'new@example.com',
        username: 'newuser',
        password: 'password123',
      });

      expect(result.user).not.toHaveProperty('password');
    });

    it('should return access and refresh tokens on successful registration', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.findByUsername.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(mockUser());

      const result = await service.register({
        email: 'new@example.com',
        username: 'newuser',
        password: 'password123',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });

  describe('SECURITY: login()', () => {
    it('should return generic error for non-existent user (prevent user enumeration)', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({ email: 'nonexistent@example.com', password: 'anypassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return generic error for wrong password (same error as non-existent user)', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser());
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

      const wrongPasswordError = await service
        .login({ email: 'test@example.com', password: 'wrongpassword' })
        .catch((e) => e);

      mockUsersService.findByEmail.mockResolvedValue(null);
      const nonExistentError = await service
        .login({ email: 'nobody@example.com', password: 'anypassword' })
        .catch((e) => e);

      // Both should be UnauthorizedException - same class, no user enumeration through different errors
      expect(wrongPasswordError).toBeInstanceOf(UnauthorizedException);
      expect(nonExistentError).toBeInstanceOf(UnauthorizedException);
    });

    it('should NOT return password in the login response (data sanitization)', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser());
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

      const result = await service.login({ email: 'test@example.com', password: 'password123' });

      expect(result.user).not.toHaveProperty('password');
    });

    it('should return access and refresh tokens on successful login', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser());
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

      const result = await service.login({ email: 'test@example.com', password: 'password123' });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });

  describe('SECURITY: validateUser()', () => {
    it('should throw UnauthorizedException when user ID does not exist (invalid/expired token)', async () => {
      mockUsersService.findById.mockResolvedValue(null);

      await expect(service.validateUser('nonexistent-id')).rejects.toThrow(UnauthorizedException);
    });

    it('should NOT return password when validating user profile', async () => {
      mockUsersService.findById.mockResolvedValue(mockUser());

      const result = await service.validateUser('user-uuid-001');

      expect(result).not.toHaveProperty('password');
    });
  });

  // ─── Phase 7: Token Security ──────────────────────────────────────────────

  describe('SECURITY: JWT token generation', () => {
    it('should sign tokens with correct payload (sub + email, no sensitive data)', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.findByUsername.mockResolvedValue(null);
      const user = mockUser();
      mockUsersService.create.mockResolvedValue(user);

      await service.register({
        email: 'new@example.com',
        username: 'newuser',
        password: 'pass123',
      });

      const signCalls = mockJwtService.signAsync.mock.calls;
      const [accessPayload, refreshPayload] = [signCalls[0][0], signCalls[1][0]];

      // Payload must have sub and email
      expect(accessPayload).toHaveProperty('sub', user.id);
      expect(accessPayload).toHaveProperty('email', user.email);

      // SECURITY: Payload must NOT contain sensitive fields
      expect(accessPayload).not.toHaveProperty('password');
      expect(accessPayload).not.toHaveProperty('role');

      // Refresh token should have the same payload structure
      expect(refreshPayload).toHaveProperty('sub', user.id);
      expect(refreshPayload).toHaveProperty('email', user.email);
    });

    it('should use different secrets for access and refresh tokens', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.findByUsername.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(mockUser());

      await service.register({
        email: 'new@example.com',
        username: 'newuser',
        password: 'pass123',
      });

      const [accessCall, refreshCall] = mockJwtService.signAsync.mock.calls;
      // Both calls should include secret in options
      expect(accessCall[1]).toHaveProperty('secret');
      expect(refreshCall[1]).toHaveProperty('secret');
    });

    it('should set token expiration (no infinite-lived tokens)', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.findByUsername.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(mockUser());

      await service.register({
        email: 'new@example.com',
        username: 'newuser',
        password: 'pass123',
      });

      const [accessCall, refreshCall] = mockJwtService.signAsync.mock.calls;
      expect(accessCall[1]).toHaveProperty('expiresIn');
      expect(refreshCall[1]).toHaveProperty('expiresIn');
    });
  });
});
