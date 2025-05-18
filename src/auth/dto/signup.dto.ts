import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
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

  @ApiProperty({
    example: 'John Doe',
    description: 'ユーザーの表示名',
  })
  @IsString()
  @MinLength(2, { message: '名前は2文字以上である必要があります' })
  name: string;
}

export class SignupResponseDto {
  @ApiProperty({
    example: true,
    description: '登録成功フラグ',
  })
  success: boolean;

  @ApiProperty({
    example: 'ユーザー登録が完了しました',
    description: '登録結果メッセージ',
  })
  message: string;
}
