
<template>
  <div v-if="data" style="border:1px solid #ccc; padding:1rem; border-radius:8px;">
    <h2>Risultato simulazione</h2>

    <p>
      <strong>Consumo stimato:</strong>
      {{ data.estimatedConsumptionKWh }} kWh
    </p>

    <p>
      <strong>CO₂ equivalente:</strong>
      {{ data.co2EquivalentKg }} kg
    </p>
  </div>

  <div v-else>
    <p>Nessun risultato disponibile.</p>
  </div>
</template>



