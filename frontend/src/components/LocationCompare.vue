<template>
  <div style="margin-top:2rem; border-top:1px solid #ccc; padding-top:1rem;">
    <h3>Confronto con la località</h3>

    <button @click="compare" :disabled="!store.form.locationId">
      Confronta con questa località
    </button>

    <div v-if="store.compareResult" style="margin-top:1rem;">
      <p><strong>Consumo medio:</strong> {{ store.compareResult.estimatedConsumptionKWh }} kWh</p>
      <p><strong>CO₂ medio:</strong> {{ store.compareResult.co2EquivalentKg }} kg</p>
    </div>
  </div>
</template>

<script>
import { useSimulationStore } from '../store/simulationStore';

export default {
  name: 'LocationCompare',
  setup() {
    const store = useSimulationStore();

    function compare() {
      store.compareLocation(store.form.locationId);
    }

    return { store, compare };
  }
};
</script>

