export const API_CONFIG = {
  BASE_URL: "http://localhost:4000"
};

export const API_ENDPOINTS = {
  // 배달 관련
  READY_ORDER: () => "/api/rider/request",
  ORDER_DETAILS: (orderId) => `/api/rider/${orderId}/details`,
  ACCEPT_ORDER: (orderId) => `/api/rider/${orderId}/accept`,
  REJECT_ORDER: (orderId) => `/api/rider/${orderId}/reject`,
  ARRIVED_STORE: (orderId) => `/api/rider/${orderId}/arrived`,
  PICKUP_ORDER: (orderId) => `/api/rider/${orderId}/pickup`,
  COMPLETE_ORDER: (orderId) => `/api/rider/${orderId}/done`,
  UPLOAD_PHOTO: (orderId) => `/api/rider/${orderId}/picture`,
  WORKING_STATUS: () => "/api/rider/working",
};
