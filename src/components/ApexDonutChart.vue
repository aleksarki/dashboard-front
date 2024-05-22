<template>
    <TitledPanel :title="title">
        <apexchart
            type="donut"
            :options="options"
            :series="series"
        />
    </TitledPanel>
</template>

<script>
import TitledPanel from '@/components/TitledPanel.vue'

export default {
    name: 'ApexDonutChart',
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