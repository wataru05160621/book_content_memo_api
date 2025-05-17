import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseProvider } from './supabase.provider';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SupabaseProvider],
  exports: [SupabaseProvider],
})
export class SupabaseModule {}
