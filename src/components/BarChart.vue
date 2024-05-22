<template>
  <TitledPanel :title="title">
    <Bar :options="options" :data="chartData"/>
  </TitledPanel>
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import TitledPanel from '@/components/TitledPanel.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar, TitledPanel },
  props: {
    data: {
      type: Object,
      required: true,
      default: []
    },
    options: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    chartData() {
      return this.data
    }
  }
}
</script>