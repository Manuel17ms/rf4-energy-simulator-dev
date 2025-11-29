<template>
  <div v-if="data" style="border:1px solid #eee; padding:1rem; border-radius:8px; margin-top:1rem;">
    <h2>Risultato Simulazione</h2>
    <p><strong>Consumo stimato:</strong> {{ data.estimatedConsumptionKWh }} kWh/anno</p>
    <p><strong>Emissioni CO₂:</strong> {{ data.co2EquivalentKg }} kgCO₂/anno</p>

    <hr />

    <h3>Confronto locale</h3>
    <p><strong>Media locale (kWh):</strong> {{ data.locationAverage.estimatedConsumptionKWh }}</p>
    <p><strong>Media locale (CO₂):</strong> {{ data.locationAverage.co2EquivalentKg }}</p>

    <p style="margin-top:1rem; font-weight:600;" v-if="better">
      📉 Sei sotto la media — ottimo!
    </p>
    <p style="margin-top:1rem; font-weight:600; color: #c0392b;" v-else>
      📈 Sei sopra la media — considera interventi per migliorare l'efficienza.
    </p>
  </div>
</template>

<script>
export default {
  name: 'SimulationResult',
  props: {
    data: { type: Object, default: null }
  },
  computed: {
    better() {
      if (!this.data || !this.data.locationAverage) return true;
      return this.data.estimatedConsumptionKWh <= this.data.locationAverage.estimatedConsumptionKWh;
    }
  }
};
</script>
