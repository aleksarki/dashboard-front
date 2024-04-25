<template>
    <div class="chart-panel">
        <div class="chart-title">
            <span>{{ title }}</span>
        </div>
        <div class="chart-slot">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BasicChart',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
.chart-panel {
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    overflow: hidden;
}

.chart-title {
    font-weight: 500;
    margin-left: 5%;
}

.chart-slot {
    height: 90%;
}
</style>