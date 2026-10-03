import api from './api';
export default {
  myCards: () => api.get('/loyalty/my-cards').then((r) => r.data),
  createProgram: (body) => api.post('/loyalty/programs', body).then((r) => r.data),
  updateProgram: (id, body) => api.put(`/loyalty/programs/${id}`, body).then((r) => r.data),
  deleteProgram: (id) => api.delete(`/loyalty/programs/${id}`).then((r) => r.data),
  getProgram: (id) => api.get(`/loyalty/programs/${id}`).then((r) => r.data),
  join: (id) => api.post(`/loyalty/programs/${id}/join`).then((r) => r.data),
  stamp: (body) => api.post('/loyalty/stamp', body).then((r) => r.data),
  redeem: (cardId) => api.post(`/loyalty/cards/${cardId}/redeem`).then((r) => r.data),
  redeemReward: (id) => api.post(`/rewards/${id}/redeem`).then((r) => r.data),
  rewards: () => api.get('/rewards').then((r) => r.data),
};
