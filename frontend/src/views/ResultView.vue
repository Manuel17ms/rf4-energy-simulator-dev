<template>
  <div>
    <button @click="goBack" style="margin-bottom:1rem;">← Nuova simulazione</button>

    <div v-if="store.result">
      <h2>Risultato Simulazione</h2>

      <p><strong>Consumo:</strong> {{ store.result.estimatedConsumptionKWh }} kWh</p>
      <p><strong>CO₂:</strong> {{ store.result.co2EquivalentKg }} kg</p>

      <LocationCompare />
    </div>

    <div v-else>
      <p>Nessun risultato — esegui prima una simulazione.</p>
    </div>
  </div>
</template>

<script>
import { useSimulationStore } from '../store/simulationStore';
import LocationCompare from '../components/LocationCompare.vue';

export default {
  components: { LocationCompare },

  setup() {
    const store = useSimulationStore();

    function goBack() {
      window.location.href = '/';
    }

    return { store, goBack };
  }
};
</script>

