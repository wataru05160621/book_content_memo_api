import axios from 'axios';

const baseURL = 'http://localhost:3000';

interface HealthCheckResponse {
  status: string;
  message: string;
}

export const checkHealth = async (): Promise<HealthCheckResponse> => {
  try {
    const response = await axios.get<HealthCheckResponse>(`${baseURL}/health`);
    console.log('ヘルスチェック結果:', response.data);
    return response.data;
  } catch (error) {
    console.error('ヘルスチェックエラー:', error);
    throw error;
  }
};
