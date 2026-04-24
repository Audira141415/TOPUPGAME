/**
 * Purpose: Centralized API and Storage configuration for the frontend.
 * Caller: Used by all services and components (Home, GameCard, etc.) to communicate with the backend.
 * Dependencies: axios, import.meta.env (Vite).
 * Main Functions: axios instance (api), STORAGE_URL constant, gameService, authService, cmsService.
 * Side Effects: Performs HTTP calls to the Laravel backend for games, auth, banners, settings, categories, and flash-sales.
 */
import axios from 'axios';

// Default to relative paths to allow Nginx proxy to handle requests correctly
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || '/storage';

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
  getUpcomingFlashSales: async () => {
    const response = await api.get('/upcoming-flash-sales');
    return response.data;
  },
  getVouchers: async () => {
    const response = await api.get('/vouchers');
    return response.data;
  },
  getOrder: async (orderId: string) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },
  getUserOrders: async () => {
    const response = await api.get('/me/orders');
    return response.data;
  },
  getLatestOrders: async () => {
    const response = await api.get('/orders/latest');
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

export const adminService = {
  getStatsOverview: async () => {
    const response = await api.get('/admin/stats/overview');
    return response.data;
  },
  getChartData: async () => {
    const response = await api.get('/admin/stats/charts');
    return response.data;
  },
  getTopProducts: async () => {
    const response = await api.get('/admin/stats/top-products');
    return response.data;
  },

  // Management
  getUsers: async (page = 1) => {
    const response = await api.get(`/admin/users?page=${page}`);
    return response.data;
  },
  updateUser: async (userId: number, data: any) => {
    const response = await api.patch(`/admin/users/${userId}`, data);
    return response.data;
  },
  deleteUser: async (userId: number) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  getOrders: async (page = 1) => {
    const response = await api.get(`/admin/orders?page=${page}`);
    return response.data;
  },
  updateOrderStatus: async (orderId: number, status: string) => {
    const response = await api.patch(`/admin/orders/${orderId}/status`, { status });
    return response.data;
  },

  getGames: async () => {
    const response = await api.get('/admin/games');
    return response.data;
  },
  createGame: async (data: any) => {
    const response = await api.post('/admin/games', data);
    return response.data;
  },
  updateGame: async (gameId: number, data: any) => {
    const response = await api.patch(`/admin/games/${gameId}`, data);
    return response.data;
  },
  deleteGame: async (gameId: number) => {
    const response = await api.delete(`/admin/games/${gameId}`);
    return response.data;
  },

  getProducts: async (gameId: number) => {
    const response = await api.get(`/admin/games/${gameId}/products`);
    return response.data;
  },
  createProduct: async (data: any) => {
    const response = await api.post('/admin/products', data);
    return response.data;
  },
  updateProduct: async (productId: number, data: any) => {
    const response = await api.patch(`/admin/products/${productId}`, data);
    return response.data;
  },
  deleteProduct: async (productId: number) => {
    const response = await api.delete(`/admin/products/${productId}`);
    return response.data;
  },
};

export default api;
