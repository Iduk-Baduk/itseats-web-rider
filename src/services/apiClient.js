import axios from 'axios';
import { API_CONFIG } from '../config/api';

// 공통 axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer RIDER_TOKEN' // Mock server용 인증 토큰
  }
});

// 요청 인터셉터 (필요시 토큰 갱신 등)
apiClient.interceptors.request.use(
  (config) => {
    console.log('API 요청:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API 에러:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default apiClient;
