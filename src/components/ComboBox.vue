<template>
    <select :value="modelValue" @change="optionChanged">
        <!--<option disabled value="">Выберите из списка</option>-->
        <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.name }}
        </option>
    </select>
</template>

<script>
export default {
    name: 'ComboBox',
    props: {
        modelValue: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            defalt: () => []
        }
    },
    methods: {
        optionChanged(event) {
            console.log(event)
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>
select {
    border: 2px solid #124c94;
    border-radius: 15px;
    background-color: white;
    padding-left: 15px;
    padding-right: 15px;
    text-decoration: none;
    box-shadow: 2px 2px 5px lightgray;
    height: min-content;
    width: 100%;
}
</style>