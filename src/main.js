import { createApp } from "vue";
import TypeaheadInput from "./components/TypeaheadInput.vue";
import App from "./demo/App.vue";
import VueHighlightJS from "vue3-highlightjs";
import "vue3-highlightjs/styles/solarized-light.css";
const app = createApp(App);
app.component("TypeaheadInput", TypeaheadInput);
app.use(VueHighlightJS);
app.mount("#app");
