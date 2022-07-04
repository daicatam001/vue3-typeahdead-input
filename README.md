# vue3-typeahead-input

A simple Vue 3 type-ahead input component that shows a list of suggested items based on the user input

## Table of contents

  - [Installation](#installation)
  - [Usage](#usage)

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