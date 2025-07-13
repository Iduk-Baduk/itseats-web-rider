export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
};

export const API_ENDPOINTS = {
  // 인증 관련
  LOGIN: () => "/auth/login",
  LOGOUT: () => "/auth/logout",

  // 배달 관련
  READY_ORDER: () => "/rider/request",
  ORDER_DETAILS: (orderId) => `/rider/${orderId}/details`,
  ACCEPT_ORDER: (orderId) => `/rider/${orderId}/accept`,
  REJECT_ORDER: (orderId) => `/rider/${orderId}/reject`,
  ARRIVED_STORE: (orderId) => `/rider/${orderId}/arrived`,
  PICKUP_ORDER: (orderId) => `/rider/${orderId}/pickup`,
  COMPLETE_ORDER: (orderId) => `/rider/${orderId}/done`,
  UPLOAD_PHOTO: (orderId) => `/rider/${orderId}/picture`,
  WORKING_STATUS: () => "/rider/working",
};
