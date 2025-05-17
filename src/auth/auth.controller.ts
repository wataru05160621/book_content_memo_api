import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto, LoginDto } from './dto/auth.dto';

@ApiTags('認証')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'ユーザー登録 (Email/Password)' })
  @ApiResponse({ status: 201, description: '登録成功' })
  @ApiResponse({ status: 400, description: '入力エラー' })
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  @ApiOperation({ summary: 'ユーザーログイン (Email/Password)' })
  @ApiResponse({ status: 200, description: 'ログイン成功' })
  @ApiResponse({ status: 401, description: '認証エラー' })
  @ApiResponse({ status: 400, description: '入力エラー' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
}
