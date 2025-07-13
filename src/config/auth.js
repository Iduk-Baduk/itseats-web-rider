import apiClient from '../services/apiClient';

// 로그인 함수
export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/api/auth/login', {
      username,
      password
    });

    const data = response.data;

    // 토큰 저장
    if (data.result?.accessToken) {
      localStorage.setItem('token', data.result.accessToken);
    }

    return data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

// 로그아웃 함수
export const logout = () => {
  localStorage.removeItem('token');
  // 필요시 추가 정리 작업
};

// 토큰 확인 함수
export const getToken = () => {
  return localStorage.getItem('token');
};

// 로그인 상태 확인 함수
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// 인증이 필요한 API 호출 (이제 apiClient가 자동으로 토큰을 추가하므로 단순화)
export const authFetch = async (url, options = {}) => {
  // apiClient를 사용하면 자동으로 토큰이 추가됩니다
  const method = options.method || 'GET';
  const data = options.body ? JSON.parse(options.body) : undefined;

  switch (method.toUpperCase()) {
    case 'GET':
      return apiClient.get(url);
    case 'POST':
      return apiClient.post(url, data);
    case 'PUT':
      return apiClient.put(url, data);
    case 'DELETE':
      return apiClient.delete(url);
    default:
      return apiClient.request({ url, method, data });
  }
};
