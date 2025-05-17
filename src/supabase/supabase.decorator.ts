import { Inject } from '@nestjs/common';

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';

export const InjectSupabaseClient = () => Inject(SUPABASE_CLIENT);
