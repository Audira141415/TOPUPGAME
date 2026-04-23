/**
 * Purpose: Centralized API and Storage configuration for the frontend.
 * Caller: Used by all services and components (Home, GameCard, etc.) to communicate with the backend.
 * Dependencies: axios, import.meta.env (Vite).
 * Main Functions: axios instance (api), STORAGE_URL constant, gameService, authService, cmsService.
 * Side Effects: Performs HTTP calls to the Laravel backend for games, auth, banners, settings, categories, and flash-sales.
 */
import axios from 'axios';

// Dynamic host detection for production environments
const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const protocol = typeof window !== 'undefined' ? window.location.protocol : 'http:';

// If we are on port 3000 (production deploy), we expect backend on 8080
const baseHost = host === 'localhost' ? 'http://localhost:8080' : `${protocol}//${host}:8080`;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || `${baseHost}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || `${baseHost}/storage`;

export const gameService = {
  getGames: async () => {
    const response = await api.get('/games');
    return response.data;
  },
  getGameBySlug: async (slug: string) => {
    const response = await api.get(`/games/${slug}`);
    return response.data;
  },
  getFlashSales: async () => {
    const response = await api.get('/flash-sales');
    return response.data;
  },
  getOrder: async (orderId: string) => {
    const response = await api.get(`/orders/${orderId}`);
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
  updateProfile: async (data: any) => {
    const response = await api.patch('/profile/update', data);
    return response.data;
  },
  updatePassword: async (data: any) => {
    const response = await api.post('/password/update', data);
    return response.data;
  },
  updateAvatar: async (formData: FormData) => {
    const response = await api.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  getNews: async () => {
    const response = await api.get('/news');
    return response.data;
  },
  getNewsBySlug: async (slug: string) => {
    const response = await api.get(`/news/${slug}`);
    return response.data;
  },
};

export default api;
