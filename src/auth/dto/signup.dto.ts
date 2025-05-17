import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'you@example.com', description: 'ユーザーの E-mail' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'secret123', description: 'パスワード（最低6文字）' })
  @IsString()
  @MinLength(6)
  password: string;
}
