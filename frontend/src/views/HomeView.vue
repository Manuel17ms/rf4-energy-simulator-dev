<template>
  <div>
    <SimulationForm />
  </div>
</template>

<script>
import SimulationForm from '../components/SimulationForm.vue';
import { useSimulationStore } from '../store/simulationStore';

export default {
  name: 'HomeView',
  components: { SimulationForm },
  setup() {
    const store = useSimulationStore();
    store.loadLocations();

    return {};
  }
};
</script>


