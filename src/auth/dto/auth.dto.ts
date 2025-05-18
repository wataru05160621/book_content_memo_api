import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'ユーザーのメールアドレス',
  })
  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'ユーザーのパスワード',
  })
  @IsString()
  @MinLength(6, { message: 'パスワードは6文字以上である必要があります' })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs...',
    description: 'JWT認証トークン',
  })
  access_token: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'ユーザーのメールアドレス',
  })
  email: string;
}
