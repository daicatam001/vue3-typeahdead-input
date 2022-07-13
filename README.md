
# vue3-typeahead-input

A simple Vue 3 type-ahead input component that shows a list of suggested items based on the user input

## Demo

  - [Example page](https://vue3-typeahdead-input.vercel.app/)
  - [Source code](https://github.com/daicatam001/vue3-typeahdead-input/tree/master/src/demo)



## Installation

Using npm
```
npm install vue3-typeahead-input
```

Using yarn
```
yarn add vue3-typeahead-input
```

## Usage
Import vue3-typeahead-input component globally. You can import default CSS of the component if you want.

```ts
import App from './App.vue';
import TypeaheadInput from 'vue3-typeahead-input';
import 'vue-typeahead-input/dist/style.css'; //Optional default CSS

let app = createApp(App)
app.component('TypeaheadInput', TypeaheadInput)
app.mount('#app')
```

...Or import vue3-typeahead-input component locally in component you want. 

```ts
import TypeaheadInput from 'vue3-typeahead-input'
import 'vue-typeahead-input/dist/style.css'; //Optional default CSS

export default {
    name: 'YourComponentName',
    components: {
        TypeaheadInput
    }
}
```
Use component in template
```html
<template>
    <div>
        <TypeaheadInput
            :items="items"
            v-model="selectedItem">
        </TypeaheadInput>    
    </div>
</template>

<script setup>
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

```

## Properties

| Property  | Type | Description | Default |
|---|---|---|---|
| items | Array | An array of objects or array of primary types like string or number. It will look for a text and value keys. This can be changed using the item-text, item-value | [] |
| item-text | string | Set property of items’s text value | text |
| item-value | string | Set property of items’s value. In case `skip-item-value` is `true` the value will be used to set option item key | value |
| skip-item-value | boolean | Get whole object item as a value |
| label | string | Label of typeahead input | undefined |
| placeholder | string | Placeholder of typeahead input | undefined |
| maxLength | number | max length of typeahead input | undefined |
| value | any | Value of typeahead input | undefined |
| emptyMessage| string | Display message when there is no data | No data available |

## Events

| Name | Description |
| ---- | ----------- |
| @change | Emitted when the input is changed by user interaction |
| @update:modelValue | The updated bound model |

## Slot

| Name | Description |
| ---- | ----------- |
| option-item | Define a custom option item appearance `v-slot:option-item={item, value}` |
