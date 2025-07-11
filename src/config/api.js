export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
};

export const API_ENDPOINTS = {
  // 배달 관련
  READY_ORDER: (lat, lng) => ` /rider/ready-order?latitude=${lat}&longitude=${lng}`,
};
