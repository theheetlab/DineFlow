import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dineflow_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('dineflow_token');
      localStorage.removeItem('dineflow_admin');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    if (error.response?.status === 429 && error.config) {
      const retryCount = error.config.__retryCount || 0;
      if (retryCount < 3) {
        error.config.__retryCount = retryCount + 1;
        const delay = Math.pow(2, retryCount) * 1000 + Math.random() * 1000;
        await new Promise((r) => setTimeout(r, delay));
        return api(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const menuAPI = {
  getAll: (params) => api.get('/menu', { params }),
  getOne: (id) => api.get(`/menu/${id}`),
  create: (data) => api.post('/menu', data),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
};

export const reservationAPI = {
  getAll: (params) => api.get('/reservations', { params }),
  getOne: (id) => api.get(`/reservations/${id}`),
  create: (data) => api.post('/reservations', data),
  update: (id, data) => api.put(`/reservations/${id}`, data),
  delete: (id) => api.delete(`/reservations/${id}`),
  getStats: () => api.get('/reservations/stats'),
};

export const customerAPI = {
  getAll: (params) => api.get('/customers', { params }),
  getOne: (id) => api.get(`/customers/${id}`),
  getStats: () => api.get('/customers/stats'),
};

export const testimonialAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  getOne: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

export const contactAPI = {
  send: (data) => api.post('/contacts', data),
  getAll: (params) => api.get('/contacts', { params }),
  updateStatus: (id, status) => api.put(`/contacts/${id}/status`, { status }),
  delete: (id) => api.delete(`/contacts/${id}`),
  getStats: () => api.get('/contacts/stats'),
};

export const availabilityAPI = {
  check: (params) => api.get('/availability/check', { params }),
  getTrends: (params) => api.get('/availability/trends', { params }),
  getPopularDishes: () => api.get('/availability/popular-dishes'),
  getRevenue: () => api.get('/availability/revenue'),
};

export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000,
    });
  },
  deleteImage: (publicId) => api.delete('/upload', { data: { publicId } }),
};

export const searchAPI = {
  global: (params) => api.get('/search', { params }),
};

export const exportAPI = {
  reservations: (params) => api.get('/exports/reservations', { params, responseType: 'blob' }),
  customers: () => api.get('/exports/customers', { responseType: 'blob' }),
  contacts: () => api.get('/exports/contacts', { responseType: 'blob' }),
};

export const activityAPI = {
  getAll: (params) => api.get('/activity', { params }),
};

export default api;
