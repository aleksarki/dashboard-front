<template>
    <TitledPanel :title="title">
        <apexchart
            type="radialBar"
            :options="options"
            :series="series"
        />
    </TitledPanel>
</template>

<script>
import TitledPanel from '@/components/TitledPanel.vue'

export default {
    name: 'ApexRadialChart',
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