import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });
// Send the JWT automatically on every request
api.interceptors.request.use((c) => { const t = sessionStorage.getItem('token'); if (t) c.headers.Authorization = `Bearer ${t}`; return c; });
// Expired or invalid token: clear the session and go back to login
api.interceptors.response.use((r) => r, (e) => {
  const url = e.config?.url || '';
  if (e.response?.status === 401 && !url.startsWith('/auth/login') && !url.startsWith('/auth/register')) { sessionStorage.clear(); window.location.assign('/login'); }
  return Promise.reject(e);
});
export const errMsg = (e) => e.response?.data?.message || (e.request ? 'Network error: cannot reach the server' : 'Something went wrong');
export default api;
