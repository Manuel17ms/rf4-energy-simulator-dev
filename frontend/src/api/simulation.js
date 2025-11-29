import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' }
});

export function postSimulation(data) {
  return API.post('/simulation', data).then(res => res.data);
}

export function getLocations() {
  return API.get('/locations').then(res => res.data);
}

export function getCompare(locationId) {
  return API.get(`/simulation/compare/${locationId}`).then(res => res.data);
}
