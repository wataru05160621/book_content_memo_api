export interface HealthCheckResponse {
  status: 'ok' | 'error';
  message: string;
  timestamp?: string;
  details?: {
    latency?: number;
    dbLatency?: number;
    lastCheck?: string;
    dbVersion?: string;
  };
}

export interface DatabasePingResult {
  status: boolean;
  latency: number;
  last_check: string;
  db_version: string;
}
