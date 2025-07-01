import { API_ENDPOINTS } from "../config/api";
import apiClient from "./apiClient";

export const locationAPI = {
  sendLocation: async (locationData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.DELIVERY.LOCATION(), locationData);
      return response.data;
    } catch (error) {
      console.error("Error sending location:", error);
      throw error;
    }
  },
};
