import { Test } from '@nestjs/testing';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

describe('AuthModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
        }),
      ],
    }).compile();

    expect(module).toBeDefined();
    const authService = module.get<AuthService>(AuthService);
    expect(authService).toBeDefined();
  });
});
