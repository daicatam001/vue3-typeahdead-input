import TaAutocomplete from "./components/TaAutocomplete.vue";

export default {
  install: (app, options) => {
    app.component("TaAutocomplete", TaAutocomplete);
  },
};
