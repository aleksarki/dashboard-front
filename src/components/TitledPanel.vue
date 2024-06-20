<template>
    <div class="panel" :style="style">
        <span v-if="title" class="panel-title">{{ title }}</span>
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
        },
        padding: {
            type: Number,
            default: 20
        },
        height: {
            type: String,
            default: '100%'
        },
        width: {
            type: String,
            default: '100%'
        }
    },
    computed: {
        style() {
            return {
                '--padding': this.padding + 'px',
                '--height': this.height,
                '--width': this.width
            }
        }
    }
}
</script>

<style scoped>
.panel {
    background-color: white;
    padding: var(--padding);
    border-radius: 15px;
    overflow: hidden;
    height: var(--height);
    width: var(--width);
}

.panel-title {
    font-weight: 500;
    margin-left: 5%;
}

.panel-slot {
    height: 90%;
    min-height: 90%;
}
</style>