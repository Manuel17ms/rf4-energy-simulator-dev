<template>
  <div style="padding:1rem; max-width:700px; margin:auto;">
    
    <button @click="goBack" style="margin-bottom:1rem;">
      ← Nuova simulazione
    </button>

    <!-- ✅ RISULTATO PRINCIPALE -->
    <SimulationResult v-if="store.result" :data="store.result" />

    <!-- ❌ SE NON C'è RISULTATO -->
    <div v-else style="margin-top:1rem;">
      <p>Nessun risultato — esegui prima una simulazione.</p>
      <button @click="goBack">Vai al form</button>
    </div>

    <hr style="margin:2rem 0;" />

    <!-- ✅ STORICO -->
    <SimulationHistory />

    <hr style="margin:2rem 0;" />

    <!-- ✅ CONFRONTO LOCALITÀ -->
    <LocationCompare />

  </div>
</template>

<script>
import SimulationResult from '../components/SimulationResult.vue';
import SimulationHistory from '../components/SimulationHistory.vue';
import LocationCompare from '../components/LocationCompare.vue';
import { useSimulationStore } from '../store/simulationStore';

export default {
  name: 'ResultView',
  components: {
    SimulationResult,
    SimulationHistory,
    LocationCompare
  },
  setup() {
    const store = useSimulationStore();

    function goBack() {
      window.location.href = '/';
    }

    return { store, goBack };
  }
};
</script>
