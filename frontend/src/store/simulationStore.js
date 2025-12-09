import { defineStore } from 'pinia';
import { postSimulation, getLocations, getCompare } from '../api/simulation';

export const useSimulationStore = defineStore('simulation', {
  state: () => ({
    form: {
      squareMeters: 80,
      housingType: 'apartment',
      residents: 1,
      energy: {
        water: 'electricity',
        heating: 'gas',
        cooking: 'electricity'
      },
      locationId: ''
    },

    locations: [],

    result: null,
    compareResult: null,

    history: [],

    loading: false,
    error: null
  }),

  actions: {
    // ✅ CARICAMENTO LOCALITÀ
      async loadLocations() {
      this.loading = true;
      try {
        const res = await getLocations();
        this.locations = res.data;
      } catch (err) {
        this.error = 'Errore caricamento località';
      } finally {
        this.loading = false;
      }
    },
   

    // ✅ INVIO SIMULAZIONE
  async submitSimulation() {
  this.loading = true;
  this.error = null;

  try {
    const res = await postSimulation(this.form);

    console.log('RISPOSTA API:', res);

    // FIX: estrai correttamente i dati dal backend
    this.result = res.data.data;

    // storico corretto
    const entry = {
      date: new Date().toLocaleString(),
      kwh: res.data.data.estimatedConsumptionKWh,
      co2: res.data.data.co2EquivalentKg
    };

    this.history.unshift(entry);

    this.compareResult = null;
  } 
  catch (err) {
    this.error = err.message || 'Errore chiamata API';
  } 
  finally {
    this.loading = false;
  }
},



    // ✅ CONFRONTO TRA LOCALITÀ
    async compareLocation(locationId) {
      if (!locationId) return;

      this.loading = true;
      this.error = null;

      try {
        const data = await getCompare(locationId);
        this.compareResult = data;
      } catch (err) {
        this.error = err.message || 'Errore confronto località';
      } finally {
        this.loading = false;
      }
    }
  }
});







