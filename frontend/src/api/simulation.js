import axios from 'axios';

const API = axios.create({
  baseURL: 'http://172.30.133.154:4000/api',
  headers: { 'Content-Type': 'application/json' }
});

// ✅ SIMULAZIONE
export function postSimulation(data) {
  return API.post('/simulation', data);
}

// ✅ LOCALITÀ (NON /localita!)
export function getLocations() {
  return API.get('/locations');
}

// ✅ CONFRONTO
export function getCompare(locationId) {
  return API.get(`/simulation/compare/${locationId}`).then(res => res.data);
}










