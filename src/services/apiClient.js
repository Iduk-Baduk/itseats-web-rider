import axios from "axios";
import { API_CONFIG } from "../config/api";

// 공통 axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (토큰 자동 추가)
apiClient.interceptors.request.use(
  (config) => {
    console.log("API 요청:", config.method?.toUpperCase(), config.url);

    // 로그인 API는 토큰이 필요 없음
    const isLoginRequest = config.url?.includes('/auth/login');
    
    if (!isLoginRequest) {
      // localStorage에서 토큰 가져오기
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        // 토큰이 없으면 에러
        console.error("토큰이 없습니다. 인증이 필요합니다.");
        throw new Error("인증이 필요합니다.");
      }
    }

    // multipart/form-data 요청일 때는 Content-Type을 삭제하여 브라우저가 자동 설정하도록 함
    if (config.headers["Content-Type"] === "multipart/form-data") {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리 및 토큰 갱신)
apiClient.interceptors.response.use(
  (response) => {
    console.log("API 응답:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API 에러:", error.response?.status, error.response?.data);

    // 401 에러 시 토큰 제거 및 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // 로그인 페이지로 리다이렉트
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
