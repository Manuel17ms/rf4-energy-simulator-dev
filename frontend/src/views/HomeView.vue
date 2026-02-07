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

    <!-- LOGO -->
    <div class="logo">TnEnergy</div>

    <!-- BACK -->
    <div class="back" @click="router.push('/')">←</div>

    <!-- FORM -->
    <div class="card">
      <h1>Simulator</h1>

      <div class="row">
        <label>Square footage (m²)</label>
        <input type="number" v-model="simulation.form.squareMeters" />
      </div>

      <div class="row">
        <label>Type of dwelling</label>
        <select v-model="simulation.form.housingType">
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select>
      </div>

      <div class="row">
        <label>Number of residents</label>
        <input type="number" v-model="simulation.form.residents" />
      </div>

      <div class="row">
        <label>Energy for water</label>
        <select v-model="simulation.form.energy.water">
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
        </select>
      </div>

      <div class="row">
        <label>Heating</label>
        <select v-model="simulation.form.energy.heating">
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
        </select>
      </div>

      <div class="row">
        <label>Kitchen</label>
        <select v-model="simulation.form.energy.kitchen">
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
        </select>
      </div>

      <div class="row">
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
      </div>

      <button class="submit" @click="submit">
        Calculate simulation
      </button>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  background: #3a9d23;

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

  background: #eaffd8;
  padding: 15px 25px;
  border-radius: 40px;

  font-weight: bold;
  color: #2f7c1d;
}


.back {
  position: absolute;
  top: 30px;
  right: 30px;

  font-size: 28px;
  color: #eaffd8;
  cursor: pointer;
}

.card {
  width: 420px;
  padding: 40px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.4);

  background: rgba(0,0,0,0.05);
  backdrop-filter: blur(4px);

  color: #eaffd8;
}


h1 {
  text-align: center;
  margin-bottom: 30px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

label {
  font-size: 14px;
}

input,
select {
  width: 160px;
  padding: 6px;
  border-radius: 4px;
  border: none;
  background: #eaffd8;
}

.submit {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background: #eaffd8;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: #2f7c1d;
}
</style>









