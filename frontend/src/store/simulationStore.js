import { defineStore } from 'pinia';
import axios from '../axios.js'; // Assicurati che axios sia configurato correttamente

export const useSimulationStore = defineStore('simulation', {
  state: () => ({
    form: {
      squareMeters: null,
      housingType: 'apartment',
      residents: 1,
      energy: {
        water: 'gas',
        heating: 'gas',
        cooking: 'gas'
      },
      locationId: ''
    },
    result: null,
    loading: false,
    error: null,
    locations: [] // eventuali località pre-caricate
  }),

  actions: {
    async submitSimulation() {
      console.log("submitSimulation chiamato con dati:", this.form);

      this.loading = true;
      this.error = null;
      this.result = null;

      try {
        const response = await axios.post('/api/simulate', this.form);
        console.log("Risposta backend:", response.data);

        if (response.data) {
          this.result = response.data;
          console.log("Store.result aggiornato:", this.result);
        } else {
          console.warn("Backend non ha restituito dati validi");
          this.error = "Backend non ha restituito dati validi";
        }

      } catch (err) {
        console.error("Errore durante submitSimulation:", err);
        this.error = "Errore durante il calcolo";
      } finally {
        this.loading = false;
        console.log("submitSimulation terminata. Loading:", this.loading, "Error:", this.error);
      }
    },

    // Facoltativo: caricamento località
    async loadLocations() {
      try {
        const response = await axios.get('/api/locations');
        this.locations = response.data;
        console.log("Locations caricate:", this.locations);
      } catch (err) {
        console.error("Errore caricamento locations:", err);
      }
    }
  }
});
