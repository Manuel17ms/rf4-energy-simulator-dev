<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

const props = defineProps({
  userValue: Number,
  compareValue: Number
})

const chartData = {
  labels: ['Your home', 'Neighborhood average'],
  datasets: [
    {
      label: 'Energy Consumption (kWh)',
      data: [props.userValue, props.compareValue],
      backgroundColor: ['#eaffd8', '#b7e8a5']
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#eaffd8'
      }
    }
  },
  scales: {
    y: {
      ticks: {
        color: '#eaffd8'
      }
    },
    x: {
      ticks: {
        color: '#eaffd8'
      }
    }
  }
}
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
