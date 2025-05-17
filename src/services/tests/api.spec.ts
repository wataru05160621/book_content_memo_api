import axios, { AxiosResponse } from 'axios';
import { sum, checkHealth } from '../api';

// axiosのモックを作成
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Tests', () => {
  // コンソール出力を抑制
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // テスト後にモックをリセット
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // sum関数のテスト
  describe('sum', () => {
    it('should perform sum operation correctly', () => {
      expect(sum(1, 2)).toBe(3);
      expect(sum(-1, 1)).toBe(0);
      expect(sum(0, 0)).toBe(0);
    });
  });

  // checkHealthのテスト
  describe('checkHealth', () => {
    it('should return health check response when successful', async () => {
      const mockResponse: AxiosResponse = {
        data: {
          status: 'ok',
          message: 'Service is healthy',
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await checkHealth();
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw error when request fails', async () => {
      const mockError = new Error('Network error');
      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(checkHealth()).rejects.toThrow('Network error');
    });
  });
});
