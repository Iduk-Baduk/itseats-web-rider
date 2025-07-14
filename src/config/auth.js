import apiClient from "../services/apiClient";
import { API_ENDPOINTS } from "./api";

// 로그인 함수
export const login = async (username, password) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN(), {
      username,
      password,
    });

    const data = response.data;

    // 🔍 디버깅: 서버 응답 전체 구조 확인
    console.log("서버 응답 전체 데이터:", data);
    console.log("서버 응답 헤더:", response.headers);

    // 🔑 Response Headers에서 토큰 추출
    const tokenFromHeaders = response.headers["access-token"] || response.headers["Access-Token"];

    console.log("Headers에서 추출한 토큰:", tokenFromHeaders);

    // 토큰 저장 - Headers 우선, 없으면 Body에서 찾기
    let token = null;

    if (tokenFromHeaders) {
      token = tokenFromHeaders;
      console.log("✅ Response Headers에서 토큰 발견:", token);
    } else {
      console.log("❌ 토큰을 찾을 수 없습니다. 응답 구조를 확인하세요.");
    }

    if (token) {
      localStorage.setItem("token", token);
      console.log("✅ 토큰이 localStorage에 저장되었습니다:", token);

      // 저장 확인
      const savedToken = localStorage.getItem("token");
      console.log("✅ localStorage에서 확인한 토큰:", savedToken);
    } else {
      console.error("❌ 토큰을 저장할 수 없습니다.");
    }

    return data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

// 로그아웃 함수
export const logout = () => {
  localStorage.removeItem("token");
  // 필요시 추가 정리 작업
};

// 토큰 확인 함수
export const getToken = () => {
  return localStorage.getItem("token");
};

// 로그인 상태 확인 함수
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// 인증이 필요한 API 호출 (이제 apiClient가 자동으로 토큰을 추가하므로 단순화)
export const authFetch = async (url, options = {}) => {
  // apiClient를 사용하면 자동으로 토큰이 추가됩니다
  const method = options.method || "GET";
  const data = options.body ? JSON.parse(options.body) : undefined;

  switch (method.toUpperCase()) {
    case "GET":
      return apiClient.get(url);
    case "POST":
      return apiClient.post(url, data);
    case "PUT":
      return apiClient.put(url, data);
    case "DELETE":
      return apiClient.delete(url);
    default:
      return apiClient.request({ url, method, data });
  }
};
