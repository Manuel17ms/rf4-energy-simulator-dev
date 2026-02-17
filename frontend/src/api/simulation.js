import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Simulazione
export function postSimulation(data) {
  return API.post('/simulation', data).then(res => res.data);
}

// Località
export function getLocations() { 
  return API.get('/locations'); 
}

// Confronto
export function getCompare(locationId) {
  return API.get(`/simulation/compare/${locationId}`).then(r => r.data);
}



export function getHistory() {
  return API.get('/simulation/history/${sessionId}').then(res => res.data);
}



















