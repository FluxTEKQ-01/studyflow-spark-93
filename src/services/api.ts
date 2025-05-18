
import axios from 'axios';

// Create an axios instance
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication token to requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth API
export const authAPI = {
  register: async (token: string, displayName: string) => {
    return await api.post('/auth/register', { token, displayName });
  },
  getCurrentUser: async () => {
    return await api.get('/auth/me');
  }
};

// User API
export const userAPI = {
  getProfile: async () => {
    return await api.get('/users/profile');
  },
  updateProfile: async (data: any) => {
    return await api.put('/users/profile', data);
  },
  addCredits: async (amount: number) => {
    return await api.post('/users/credits', { amount });
  }
};

// Email Generator API
export const emailAPI = {
  generateEmail: async (data: {
    subject: string;
    recipient: string;
    purpose: string;
    content: string;
    toolCost: number;
  }) => {
    return await api.post('/tools/email-generator', data);
  },
  getUserEmails: async () => {
    return await api.get('/tools/emails');
  }
};

// More tool APIs will be added here

export default api;
