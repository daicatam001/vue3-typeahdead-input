<template>
    <div style="padding:2rem">
        <TypeaheadInput label="Name" :items="items">
        </TypeaheadInput>
    </div>
</template>
<script setup>
import TypeaheadInput from '../components/TypeaheadInput.vue';

const items = [
    { text: 'text-1', value: 'value-1' }
]
</script>