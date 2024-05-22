<template>
    <TitledPanel :title="title">
        <Pie :options="options" :data="chartData"/>
    </TitledPanel>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import TitledPanel from '@/components/TitledPanel.vue'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'PieChart',
    components: { Pie, TitledPanel },
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