import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ヘルスチェック')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'システム全体のヘルスチェック' })
  @ApiResponse({ status: 200, description: '全システムが正常' })
  @ApiResponse({ status: 503, description: 'いずれかのシステムに問題あり' })
  async check() {
    return await this.healthService.checkAll();
  }

  @Get('db')
  @ApiOperation({ summary: 'データベース接続のヘルスチェック' })
  async checkDatabase() {
    return await this.healthService.checkDatabase();
  }
}
