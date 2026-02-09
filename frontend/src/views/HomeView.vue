<script setup>
import { onMounted } from 'vue'
import { useSimulationStore } from '../store/simulationStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const simulation = useSimulationStore()

onMounted(() => {
  simulation.loadLocations()
})

const submit = async () => {
  await simulation.submitSimulation()
  router.push('/result')
}
</script>

<template>
  <div class="page">

    <div class="logo">TnEnergy</div>

    <div class="card">

      <h1>Simulator</h1>

      <form @submit.prevent="simulation.submitSimulation">

        <label>Square footage (m²)</label>
        <input type="number" v-model="simulation.form.squareMeters" />

        <label>Type of dwelling</label>
        <select v-model="simulation.form.housingType">
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select>

        <label>Number of residents</label>
        <input type="number" v-model="simulation.form.residents" />

        <label>Energy for water</label>
        <select v-model="simulation.form.energy.water">
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
        </select>

        <label>Heating</label>
        <select v-model="simulation.form.energy.heating">
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
        </select>

        <label>Kitchen</label>
        <select v-model="simulation.form.energy.cooking">
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
        </select>

        <label>Neighborhood</label>
        <select v-model="simulation.form.locationId">
          <option disabled value="">-- Select --</option>
          <option
            v-for="loc in simulation.locations"
            :key="loc.id"
            :value="loc.id"
          >
            {{ loc.name }}
          </option>
        </select>

        <button type="submit">Calculate simulation</button>

      </form>
    </div>
  </div>
</template>


<style scoped>
  .page {
  width: 100vw;
  height: 100vh;
  background: #2f6f2f;  
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}


.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #e7f6e7;
  padding: 18px 28px;
  border-radius: 40px;
  font-weight: bold;
  color: #2f6f2f;
}

.back {
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 28px;
  color: #e7f6e7;
  cursor: pointer;
}


.card {
  width: 520px;             
  padding: 50px;
  border-radius: 18px;

  border: 1px solid rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(6px);

  color: #f4fff4;
}


h1 {
  text-align: center;
  margin-bottom: 35px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

label {
  font-size: 15px;
}

input,
select {
  width: 190px;      
  padding: 8px;
  border-radius: 6px;
  border: none;
  background: #e7f6e7;
}

.submit {
  width: 100%;
  margin-top: 28px;
  padding: 14px;

  background: #e7f6e7;
  border: none;
  border-radius: 6px;

  cursor: pointer;
  font-weight: bold;
  color: #2f6f2f;

  transition: 0.2s ease;
}

.submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

</style>











