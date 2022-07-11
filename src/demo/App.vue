<template>
    <div style="padding:2rem">
        <TypeaheadInput label="Name"
            v-model="selectedItem"
            :items="items">
        </TypeaheadInput>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import TypeaheadInput from '../components/TypeaheadInput.vue';
    const items = [
        {
            text:'Item 1',
            value: 'item-1'
        },
        {
            text:'Item 2',
            value: 'item-2'
        },
        {
            text:'Item 3',
            value: 'item-3'
        },
    ]
    const selectedItem = ref('item-3')
</script>