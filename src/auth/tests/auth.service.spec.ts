import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { SupabaseClient } from '@supabase/supabase-js';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let supabaseClient: SupabaseClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test-token'),
            verify: jest.fn(),
          },
        },
        {
          provide: 'SUPABASE_CLIENT',
          useValue: {
            auth: {
              signInWithPassword: jest.fn(),
              signUp: jest.fn(),
            },
            from: jest.fn(() => ({
              select: jest.fn().mockReturnThis(),
              insert: jest.fn().mockReturnThis(),
              eq: jest.fn().mockReturnThis(),
              single: jest.fn().mockResolvedValue({ data: null, error: null }),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    supabaseClient = module.get<SupabaseClient>('SUPABASE_CLIENT');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return token when login is successful', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(supabaseClient.auth, 'signInWithPassword').mockResolvedValue({
        data: {
          user: { id: '1', email: loginDto.email },
          session: { access_token: 'test-token' },
        },
        error: null,
      } as any);

      const result = await service.login(loginDto);

      expect(result.access_token).toBeDefined();
      expect(result.email).toBe(loginDto.email);
    });
  });

  describe('signup', () => {
    it('should register a new user successfully', async () => {
      const signupDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      jest.spyOn(supabaseClient.auth, 'signUp').mockResolvedValue({
        data: {
          user: { id: '1', email: signupDto.email },
        },
        error: null,
      } as any);

      const result = await service.signup(signupDto);

      expect(result.success).toBe(true);
    });
  });
});
