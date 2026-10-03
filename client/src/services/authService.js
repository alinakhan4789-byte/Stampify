import api from './api';
export default {
  register: (body) => api.post('/auth/register', body).then((r) => r.data),
  login: (body) => api.post('/auth/login', body).then((r) => r.data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then((r) => r.data),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
};
