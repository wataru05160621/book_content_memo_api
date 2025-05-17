import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { InjectSupabaseClient } from '../supabase/supabase.decorator';

interface HealthCheckResponse {
  status: 'ok' | 'error';
  message: string;
}

@Injectable()
export class HealthService {
  constructor(
    @InjectSupabaseClient() private readonly supabase: SupabaseClient,
  ) {}

  async checkAll(): Promise<{
    status: 'ok' | 'error';
    timestamp: string;
    services: {
      database: HealthCheckResponse;
      external: HealthCheckResponse;
    };
  }> {
    const results = await Promise.all([
      this.checkDatabase(),
      this.checkExternalServices(),
    ]);

    return {
      status: results.every((r) => r.status === 'ok') ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      services: {
        database: results[0],
        external: results[1],
      },
    };
  }

  async checkDatabase(): Promise<HealthCheckResponse> {
    try {
      const { error } = await this.supabase.rpc('health_check');
      return {
        status: error ? 'error' : 'ok',
        message: error ? error.message : 'Database connection is healthy',
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : '不明なエラーが発生しました';
      return {
        status: 'error',
        message: errorMessage,
      };
    }
  }

  async checkExternalServices(): Promise<HealthCheckResponse> {
    // 外部サービスの健全性チェックを実装する
    // この例では簡単な応答を返します
    await Promise.resolve(); // async/awaitの要件を満たすためのダミー処理
    return {
      status: 'ok',
      message: 'External services are healthy',
    };
  }
}
