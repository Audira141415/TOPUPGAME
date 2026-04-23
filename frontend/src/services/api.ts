import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8080/storage';

export const gameService = {
  getGames: async () => {
    const response = await api.get('/games');
    return response.data;
  },
  getGameBySlug: async (slug: string) => {
    const response = await api.get(`/games/${slug}`);
    return response.data;
  },
};

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/register', data);
    return response.data;
  },
  me: async () => {
    const response = await api.get('/me');
    return response.data;
  },
};

export const cmsService = {
  getBanners: async () => {
    const response = await api.get('/banners');
    return response.data;
  },
  getSettings: async () => {
    const response = await api.get('/settings');
    return response.data;
  },
};

export default api;
