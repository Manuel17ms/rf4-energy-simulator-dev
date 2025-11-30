import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' }
});

/**
 * POST /simulation
 * Esegue la simulazione dei consumi energetici personali
 * @param {Object} data - Oggetto contenente:
 *  - squareMeters: numero
 *  - housingType: 'apartment' | 'house'
 *  - residents: numero
 *  - energy: { water, heating, cooking }
 *  - locationId: string
 * @returns {Promise<Object>} - risultato della simulazione con consumi e CO2
 */
export function postSimulation(data) {
  return API.post('/simulation', data).then(res => res.data);
}

/**
 * GET /locations
 * Restituisce la lista delle location disponibili per la simulazione
 * @returns {Promise<Array>} - array di oggetti { id, name, climateFactor }
 */
export function getLocations() {
  return API.get('/locations').then(res => res.data);
}

/**
 * GET /simulation/compare/:locationId
 * Restituisce il confronto della simulazione con la media locale
 * @param {string} locationId - ID della località
 * @returns {Promise<Object>} - { estimatedConsumptionKWh, co2EquivalentKg }
 */
export function getCompare(locationId) {
  return API.get(`/simulation/compare/${locationId}`).then(res => res.data);
}

/**
 * Esempio di chiamata futura: GET /simulation/history
 * Potrebbe restituire la cronologia delle simulazioni per un utente
 */
// export function getSimulationHistory(userId) {
//   return API.get(`/simulation/history/${userId}`).then(res => res.data);
// }

