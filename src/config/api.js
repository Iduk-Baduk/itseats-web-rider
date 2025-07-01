const getEnvVar = (key, defaultValue) => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  return defaultValue;
};

export const API_CONFIG = {
  BASE_URL: getEnvVar("VITE_API_URL", "http://localhost:3001"),
  TIMEOUT: parseInt(getEnvVar("VITE_TIMEOUT", "10000")),
};

export const API_ENDPOINTS = {
  DELIVERY: {
    LOCATION: () => "/api/rider/location", // POST (라이더 위치 전송)
  },
};
