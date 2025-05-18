import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseClient } from '@supabase/supabase-js';
import { InjectSupabaseClient } from '../supabase/supabase.decorator';
import { LoginDto } from './dto/auth.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectSupabaseClient() private readonly supabase: SupabaseClient,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { data: authData, error } =
      await this.supabase.auth.signInWithPassword({
        email: loginDto.email,
        password: loginDto.password,
      });

    if (error) {
      throw new UnauthorizedException(
        'メールアドレスまたはパスワードが正しくありません',
      );
    }

    const payload = {
      sub: authData.user.id,
      email: authData.user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      email: authData.user.email,
    };
  }

  async signup(signupDto: SignupDto) {
    const { data: existingUser } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', signupDto.email)
      .single();

    if (existingUser) {
      throw new UnauthorizedException(
        'このメールアドレスは既に使用されています',
      );
    }

    const { data: authData, error } = await this.supabase.auth.signUp({
      email: signupDto.email,
      password: signupDto.password,
    });

    if (error) {
      throw new UnauthorizedException('ユーザー登録に失敗しました');
    }

    await this.supabase.from('users').insert([
      {
        id: authData.user?.id,
        email: signupDto.email,
        name: signupDto.name,
      },
    ]);

    return {
      success: true,
      message: 'ユーザー登録が完了しました',
    };
  }

  async validateUser(userId: string): Promise<any> {
    const { data: user, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !user) {
      throw new UnauthorizedException('無効なユーザーです');
    }

    return user;
  }
}
