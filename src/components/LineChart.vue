<template>
    <TitledPanel :title="title">
        <Line :options="options" :data="chartData"/>
    </TitledPanel>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import TitledPanel from '@/components/TitledPanel.vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
    name: 'LineChart',
    components: { Line, TitledPanel },
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