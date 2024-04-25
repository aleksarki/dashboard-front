<template>
    <BasicChart :title="title">
        <Pie :options="options" :data="chartData"/>
    </BasicChart>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import BasicChart from '@/components/BasicChart.vue'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'PieChart',
    components: { Pie, BasicChart },
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