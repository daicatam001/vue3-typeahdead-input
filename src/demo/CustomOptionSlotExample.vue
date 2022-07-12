<template>
    <div class="example">
        <h3>Custom item layout with slot</h3>
        <div class="row">
            <div class="col-cmp">
                <TypeaheadInput v-model="model"
                    :items="items"
                    itemText="name"
                    itemValue="id"
                    label="Country"
                    placeholder="Choose a country">
                    <template v-slot:option-item="{ item, value }">
                        <span>{{item.iso2}}</span> - <span>{{item.name}}</span>
                    </template>
                </TypeaheadInput>
            </div>
            <div class="col-data">
                <pre><code>{{ model }}</code></pre>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const items = [
    { id: "JE0VrzVq31", name: "Afghanistan", iso2: "AF" },
    { id: "X6NVG5m71M", name: "Algeria", iso2: "DZ" },
    { id: "yjvZMlmO9B", name: "American Samoa", iso2: "AS" },
    { id: "abGmOrw5pj", name: "Andorra", iso2: "AD" },
    { id: "dkpZ1gw8a4", name: "Aruba", iso2: "AW" },
    { id: "ed5wnAVrRv", name: "Ascension Island", iso2: "AC" },
    { id: "Md0V0jmqlb", name: "Australia", iso2: "AU" },
    { id: "7E1mbEwaj0", name: "Belgium", iso2: "BE" },
    { id: "7oPw89mbBK", name: "Belize", iso2: "BZ" },
    { id: "NOkZKK1Z0y", name: "Comoros", iso2: "KM" },
    { id: "XO0Voo9VJ1", name: "Congo - Brazzaville", iso2: "CG" },
    { id: "dkpZ17gw8a", name: "Congo - Kinshasa", iso2: "CD" },
    { id: "bXvVLxYV7y", name: "Falkland Islands", iso2: "FK" },
    { id: "5O7ZXRnw12", name: "Finland", iso2: "FI" },
    { id: "gk4waaewD5", name: "Palau", iso2: "PW" },
    { id: "2KdmAzOZEg", name: "Palestinian Territories", iso2: "PS" },
    { id: "bXvVLdoV7y", name: "Paraguay", iso2: "PY" },
    { id: "5O7ZXxdZ12", name: "Pitcairn Islands", iso2: "PN" },
    { id: "2anwqOGZ6L", name: "Poland", iso2: "PL" },
    { id: "z8RwlxLwlP", name: "Sint Maarten", iso2: "SX" },
    { id: "JE0VrxJmq3", name: "Slovakia", iso2: "SK" },
    { id: "OXKwRkOmJD", name: "Slovenia", iso2: "SI" },
    { id: "nlxVP0AVW7", name: "Solomon Islands", iso2: "SB" },
    { id: "WbYZ9NNVr9", name: "Tajikistan", iso2: "TJ" },
    { id: "NOkZKO0Z0y", name: "Zambia", iso2: "ZM" },
    { id: "XO0VoGPVJ1", name: "Zimbabwe", iso2: "ZW" },
    { id: "OXKwRMVJDR", name: "land Islands", iso2: "AX" },
];
const model = ref(null)
</script>