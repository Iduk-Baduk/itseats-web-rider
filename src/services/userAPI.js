import apiClient from './apiClient';

export const userAPI = {
  // 회원가입
  register: async (form) => {
    try {
      const response = await apiClient.post('/rider/members/sign-up', form);
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
}
