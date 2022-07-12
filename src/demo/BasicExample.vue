<template>
    <div class="example">
        <h3>Using a strings array</h3>
        <div class="row">
            <div class="col-cmp">
                <TypeaheadInput v-model="model"
                    :items="items"></TypeaheadInput>
            </div>
            <div class="col-data">
                <pre><code>{{model}}</code></pre>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const items = [
    "Afghanistan",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Aruba",
    "Ascension Island",
    "Australia",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Comoros",
    "Congo - Brazzaville",
    "Congo - Kinshasa",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestinian Territories",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn Islands",
    "Poland",
    "Sint Maarten",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "Taiwan",
    "Tajikistan",
    "Zambia",
    "Zimbabwe",
];
const model = ref(null)
</script>