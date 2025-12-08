<template>
  <div>
    <h2>Storico simulazioni</h2>

    <div v-if="history.length === 0">
      Nessuna simulazione effettuata
    </div>

    <ul v-else>
      <li v-for="(item, i) in history" :key="i">
        📅 {{ item.date }} —
        🔋 {{ item.estimatedConsumptionKWh }} kWh —
        💶 € {{ item.estimatedAnnualCost }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useSimulationStore } from '../store/simulationStore';

export default {
  setup() {
    const store = useSimulationStore();
    return { history: store.history };
  }
};
</script>
