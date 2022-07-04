<script setup>
import TAutocomplete from './components/TAutocomplete.vue';

const data = [
  {
    text: 'text 1',
    value: 1
  },
  {
    text: 'text 2',
    value: 2
  },
  {
    text: 'text 3',
    value: 3
  },
  {
    text: 'text 4',
    value: 4
  },
  {
    text: 'text 5',
    value: 5
  },
  {
    text: 'text 6',
    value: 6
  },
  {
    text: 'text 7',
    value: 7
  },
  {
    text: 'text 8',
    value: 8
  },
  {
    text: 'text 9',
    value: 9
  },
  {
    text: 'text 10',
    value: 10
  },
  {
    text: 'text 11',
    value: 11
  },
  {
    text: 'text 12',
    value: 12
  },
  {
    text: 'text 13',
    value: 13
  },
  {
    text: 'text 14',
    value: 14
  },
  {
    text: 'text 15',
    value: 15
  },
  {
    text: 'text 16',
    value: 16
  },
  {
    text: 'text 17',
    value: 17
  },

]
</script>

<template>
  <div class="p-4">
     <TAutocomplete label="hello" :items="data" :value="5" />
  </div>
 
</template>

