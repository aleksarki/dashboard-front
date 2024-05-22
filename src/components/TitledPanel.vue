<template>
    <div class="panel">
        <span class="panel-title">{{ title }}</span>
        <div class="panel-slot">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TitledPanel',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
.panel {
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    overflow: hidden;
}

.panel-title {
    font-weight: 500;
    margin-left: 5%;
}

.panel-slot {
    height: 90%;
}
</style>