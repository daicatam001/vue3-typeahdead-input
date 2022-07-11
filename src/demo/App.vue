<template>
    <div style="padding:2rem">
        <TypeaheadInput label="Name"
            :items="items">
        </TypeaheadInput>
    </div>
</template>
<script setup>
import TypeaheadInput from '../components/TypeaheadInput.vue';

const items = [
    1, 2, 3, 4
]
</script>