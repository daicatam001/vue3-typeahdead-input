<template>
    <div class="example">
        <h3>Using a strings array</h3>
        <div class="row">
            <div class="col-cmp">
                <pre v-highlightjs><code class="javascript">
    &lt;template&gt;
        &lt;div class=&quot;example&quot;&gt;
            &lt;TypeaheadInput 
                v-model=&quot;model&quot;
                label=&quot;Country&quot;
                placeholder=&quot;Choose a country&quot;
                :items=&quot;items&quot;&gt;
            &lt;/TypeaheadInput&gt;
        &lt;/div&gt;
    &lt;/template&gt;
    &lt;script setup&gt;
    import { ref } from &#39;vue&#39;;

    const items = [
        &quot;Afghanistan&quot;,
        &quot;Algeria&quot;,
        &quot;American Samoa&quot;,
        &quot;Andorra&quot;,
        &quot;Aruba&quot;,
        &quot;Ascension Island&quot;,
        &quot;Australia&quot;,
        &quot;Barbados&quot;,
        &quot;Belarus&quot;,
        &quot;Belgium&quot;,
        &quot;Belize&quot;,
        &quot;Comoros&quot;,
        &quot;Congo - Brazzaville&quot;,
        &quot;Congo - Kinshasa&quot;,
        &quot;Slovakia&quot;,
        &quot;Slovenia&quot;,
        &quot;Solomon Islands&quot;,
        &quot;Somalia&quot;,
        &quot;South Africa&quot;,
        &quot;Taiwan&quot;,
        &quot;Tajikistan&quot;,
        &quot;Zambia&quot;,
        &quot;Zimbabwe&quot;,
    ];
    const model = ref(null)
    &lt;/script&gt; 
                </code>
                </pre>
            </div>
            <div class="col-data">
                 <TypeaheadInput v-model="model"
                    label="Country"
                    placeholder="Choose a country"
                    :items="items"></TypeaheadInput>
                <h4>Model:</h4>
                <pre v-highlightjs><code class="javascript">{{ model }}</code></pre>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const items = [
    "Afghanistan",
    "Algeria",
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