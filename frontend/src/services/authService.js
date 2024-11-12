import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login/`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (userData) => {
    return axios.post(`${API_URL}/auth/register/`, userData);
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};
