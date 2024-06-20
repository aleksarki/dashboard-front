<template>
        <apexchart
            type="bar"
            :options="options"
            :series="series"
        />
</template>

<script>
import TitledPanel from '@/components/TitledPanel.vue'

export default {
    name: 'ApexBarChart',
    components: { TitledPanel },
    props: {
        options: {
            type: Object,
            default: {}
        },
        series: {
            type: Object,
            default: {}
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>