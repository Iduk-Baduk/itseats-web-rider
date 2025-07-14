import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export const userAPI = {
  // 회원가입
  register: async (form) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REGISTER(), form);
      if (response.status !== 201) {
        throw new Error(response.data.message || '회원가입에 실패했습니다.');
      }
      return { success: true };
    } catch (error) {
      if (error.response) {
        error.message = JSON.stringify(error.response.data) || '회원가입에 실패했습니다.';
      }
      throw error;
    }
  },
  // 라이더 등록
  riderRegister: async (form) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CREATE_RIDER(), form);
      if (response.status !== 201) {
        throw new Error(response.data.message || '라이더 등록에 실패했습니다.');
      }
      return { success: true };
    } catch (error) {
      if (error.response) {
        error.message = JSON.stringify(error.response.data) || '라이더 등록에 실패했습니다.';
      }
      throw error;
    }
  },
}
