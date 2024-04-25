<template>
  <BasicChart :title="title">
    <Bar :options="options" :data="chartData"/>
  </BasicChart>
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import BasicChart from '@/components/BasicChart.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar, BasicChart },
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