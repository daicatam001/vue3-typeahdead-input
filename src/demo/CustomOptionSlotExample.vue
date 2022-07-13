<template>
    <div class="example">
        <h3>Custom item layout with slot</h3>
        <div class="row">
            <div class="col-cmp">
                <pre v-highlightjs><code class="javascript">
    &lt;template&gt;
        &lt;div class=&quot;example&quot;&gt;
            &lt;TypeaheadInput 
                v-model=&quot;model&quot;
                :items=&quot;items&quot;
                itemText=&quot;name&quot;
                itemValue=&quot;id&quot;
                label=&quot;Country&quot;
                placeholder=&quot;Choose a country&quot;&gt;
                &lt;template v-slot:option-item=&quot;{ item, value }&quot;&gt;
                    &lt;span&gt;{ { item.iso2 } }&lt;/span&gt; - &lt;span&gt;{ { item.name } }&lt;/span&gt;
                &lt;/template&gt;
            &lt;/TypeaheadInput&gt;
        &lt;/div&gt;
    &lt;/template&gt;
    &lt;script setup&gt;
    import { ref } from &#39;vue&#39;;

    const items = [
        { id: &quot;JE0VrzVq31&quot;, name: &quot;Afghanistan&quot;, iso2: &quot;AF&quot; },
        { id: &quot;X6NVG5m71M&quot;, name: &quot;Algeria&quot;, iso2: &quot;DZ&quot; },
        { id: &quot;yjvZMlmO9B&quot;, name: &quot;American Samoa&quot;, iso2: &quot;AS&quot; },
        { id: &quot;abGmOrw5pj&quot;, name: &quot;Andorra&quot;, iso2: &quot;AD&quot; },
        { id: &quot;dkpZ1gw8a4&quot;, name: &quot;Aruba&quot;, iso2: &quot;AW&quot; },
        { id: &quot;ed5wnAVrRv&quot;, name: &quot;Ascension Island&quot;, iso2: &quot;AC&quot; },
        { id: &quot;Md0V0jmqlb&quot;, name: &quot;Australia&quot;, iso2: &quot;AU&quot; },
        { id: &quot;7E1mbEwaj0&quot;, name: &quot;Belgium&quot;, iso2: &quot;BE&quot; },
        { id: &quot;7oPw89mbBK&quot;, name: &quot;Belize&quot;, iso2: &quot;BZ&quot; },
        { id: &quot;NOkZKK1Z0y&quot;, name: &quot;Comoros&quot;, iso2: &quot;KM&quot; },
        { id: &quot;XO0Voo9VJ1&quot;, name: &quot;Congo - Brazzaville&quot;, iso2: &quot;CG&quot; },
        { id: &quot;dkpZ17gw8a&quot;, name: &quot;Congo - Kinshasa&quot;, iso2: &quot;CD&quot; },
        { id: &quot;bXvVLxYV7y&quot;, name: &quot;Falkland Islands&quot;, iso2: &quot;FK&quot; },
        { id: &quot;5O7ZXRnw12&quot;, name: &quot;Finland&quot;, iso2: &quot;FI&quot; },
        { id: &quot;gk4waaewD5&quot;, name: &quot;Palau&quot;, iso2: &quot;PW&quot; },
        { id: &quot;2KdmAzOZEg&quot;, name: &quot;Palestinian Territories&quot;, iso2: &quot;PS&quot; },
        { id: &quot;JE0VrxJmq3&quot;, name: &quot;Slovakia&quot;, iso2: &quot;SK&quot; },
        { id: &quot;WbYZ9NNVr9&quot;, name: &quot;Tajikistan&quot;, iso2: &quot;TJ&quot; },
        { id: &quot;NOkZKO0Z0y&quot;, name: &quot;Zambia&quot;, iso2: &quot;ZM&quot; },
        { id: &quot;XO0VoGPVJ1&quot;, name: &quot;Zimbabwe&quot;, iso2: &quot;ZW&quot; },
        { id: &quot;OXKwRMVJDR&quot;, name: &quot;land Islands&quot;, iso2: &quot;AX&quot; },
    ];
    const model = ref(null)
    &lt;/script&gt; 
                </code></pre>
            </div>
            <div class="col-data">
                <TypeaheadInput v-model="model"
                    :items="items"
                    itemText="name"
                    itemValue="id"
                    label="Country"
                    placeholder="Choose a country">
                    <template v-slot:option-item="{ item, value }">
                        <span>{{ item.iso2 }}</span> - <span>{{ item.name }}</span>
                    </template>
                </TypeaheadInput>
                <h4>Model:</h4>
                <pre v-highlightjs><code class="javascript">{{ model }}</code></pre>
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
    { id: "JE0VrxJmq3", name: "Slovakia", iso2: "SK" },
    { id: "WbYZ9NNVr9", name: "Tajikistan", iso2: "TJ" },
    { id: "NOkZKO0Z0y", name: "Zambia", iso2: "ZM" },
    { id: "XO0VoGPVJ1", name: "Zimbabwe", iso2: "ZW" },
    { id: "OXKwRMVJDR", name: "land Islands", iso2: "AX" },
];
const model = ref(null)
</script>