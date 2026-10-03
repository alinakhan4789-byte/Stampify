import api from './api';
export default {
  list: () => api.get('/businesses').then((r) => r.data),
  get: (id) => api.get(`/businesses/${id}`).then((r) => r.data),
  dashboard: () => api.get('/businesses/me/dashboard').then((r) => r.data),
  branches: () => api.get('/businesses/me/branches').then((r) => r.data),
  addBranch: (body) => api.post('/businesses/me/branches', body).then((r) => r.data),
  deleteBranch: (id) => api.delete(`/businesses/me/branches/${id}`).then((r) => r.data),
  updateMe: (body) => api.put('/businesses/me', body).then((r) => r.data),
};
