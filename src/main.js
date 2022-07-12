import { createApp } from 'vue'
import TypeaheadInput from './components/TypeaheadInput.vue'
import App from './demo/App.vue'
const app = createApp(App)
app.component('TypeaheadInput', TypeaheadInput)
app.mount('#app')
