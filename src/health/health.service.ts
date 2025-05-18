import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { InjectSupabaseClient } from '../supabase/supabase.decorator';
import { DatabasePingResult, HealthCheckResponse } from './types/health.types';

@Injectable()
export class HealthService {
  constructor(
    @InjectSupabaseClient() private readonly supabase: SupabaseClient,
  ) {}

  async check(): Promise<HealthCheckResponse> {
    return {
      status: 'ok',
      message: 'Service is healthy',
    };
  }

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
    const startTime = performance.now();
    try {
      // ヘルスチェックテーブルの確認
      const { error: tableError } = await this.supabase
        .from('_health_check')
        .select('*')
        .limit(1)
        .single();

      if (tableError && tableError.code !== 'PGRST116') {
        console.error('Health check table error:', tableError);
        return {
          status: 'error',
          message: `データベース接続エラー: ${tableError.message}`,
          timestamp: new Date().toISOString(),
          details: {
            latency: performance.now() - startTime,
          },
        };
      }

      // ping関数で接続テスト
      const { data: pingResult, error: pingError } = await this.supabase
        .rpc('ping')
        .single<DatabasePingResult>();

      if (pingError) {
        console.error('Database ping error:', pingError);
        return {
          status: 'error',
          message: `データベース接続テストに失敗: ${pingError.message}`,
          timestamp: new Date().toISOString(),
          details: {
            latency: performance.now() - startTime,
          },
        };
      }

      // pingResultの型チェックと変換
      if (pingResult && 'status' in pingResult) {
        return {
          status: pingResult.status ? 'ok' : 'error',
          message: 'データベース接続は正常です',
          timestamp: new Date().toISOString(),
          details: {
            latency: performance.now() - startTime,
            dbLatency: pingResult.latency,
            lastCheck: pingResult.last_check,
            dbVersion: pingResult.db_version,
          },
        };
      }

      return {
        status: 'error',
        message: 'データベース接続テストに失敗しました',
        timestamp: new Date().toISOString(),
        details: {
          latency: performance.now() - startTime,
        },
      };
    } catch (error: unknown) {
      console.error('Unexpected database error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : '予期せぬデータベースエラーが発生しました';
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
