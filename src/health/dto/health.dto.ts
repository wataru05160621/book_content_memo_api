import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
  @ApiProperty({
    example: 'ok',
    description: 'サーバーの状態',
  })
  status: string;

  @ApiProperty({
    example: '2025-05-16T21:48:27.148Z',
    description: '現在のタイムスタンプ',
  })
  timestamp: string;

  @ApiProperty({
    example: '1.0.0',
    description: 'APIバージョン',
  })
  version: string;
}
