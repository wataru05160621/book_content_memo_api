import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'ユーザーのメールアドレス',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'パスワード（8文字以上）',
  })
  @IsString()
  @MinLength(8)
  password: string;
}

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'ユーザーのメールアドレス',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'パスワード',
  })
  @IsString()
  password: string;
}
