declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
