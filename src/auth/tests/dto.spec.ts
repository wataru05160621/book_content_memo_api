import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginDto } from '../dto/auth.dto';
import { SignupDto } from '../dto/signup.dto';

describe('AuthDTOs', () => {
  describe('LoginDto', () => {
    it('should validate a valid login dto', async () => {
      const dto = plainToInstance(LoginDto, {
        email: 'test@example.com',
        password: 'password123',
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail with invalid email', async () => {
      const dto = plainToInstance(LoginDto, {
        email: 'invalid-email',
        password: 'password123',
      });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('SignupDto', () => {
    it('should validate a valid signup dto', async () => {
      const dto = plainToInstance(SignupDto, {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });
});
