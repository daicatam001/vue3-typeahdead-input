<template>
    <div class="container">
        <BasicExample></BasicExample>
        <ObjectItemsExample></ObjectItemsExample>
        <CustomOptionSlotExample></CustomOptionSlotExample>
        <ObjectItemValueExample></ObjectItemValueExample>
    </div>
</template>
<script setup>
import BasicExample from './BasicExample.vue';
import ObjectItemsExample from './ObjectItemsExample.vue';
import CustomOptionSlotExample from './CustomOptionSlotExample.vue';
import ObjectItemValueExample from './ObjectItemValueExample.vue';
</script>
<style>
.container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
}

.example{
    padding: 2rem 0;
}

.row {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(5, 1fr);
}

.col-cmp {
    grid-column: span 3 / span 3;
}

.col-data {
    grid-column: span 2 / span 2;
}

pre {
    margin: 0;
}
h4{
    margin-bottom: 10px;
}

</style>