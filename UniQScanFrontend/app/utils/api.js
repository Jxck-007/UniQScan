// app/utils/api.js
import axios from 'axios';

// ====== CONFIGURE THIS ======
// For Android emulator use: 'http://10.0.2.2:5000/api'
// For iOS simulator use: 'http://localhost:5000/api'
// For device (phone) use your PC LAN IP: 'http://192.168.x.y:5000/api'
const API_BASE = 'http://192.168.0.100:5000/api'; // <- REPLACE THIS

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// helper to set auth header from stored token
export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
};

export default api;
