import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const orderService = {
  getOrders: async () => {
    const response = await axios.get(`${API_URL}/orders/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },

  createOrder: async (orderData) => {
    return axios.post(`${API_URL}/orders/`, orderData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
};
