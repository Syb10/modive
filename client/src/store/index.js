import { createStore} from "vuex";
import {getField, updateField} from "vuex-map-fields"

export default createStore({
  state: {
      form: {
        vorname:"",
        nachname: "",
        geburtsdatum:"",
        geschlecht: [],
        herkunft:"",
        muttersprache:""
    }
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    updateCheckbox(state, field) {
      updateField(state.form.geschlecht, field);
    },
    changeBox(state, value) {
      state.form.geschlecht = value;
    }
  },
  actions: {
  },
  modules: {
  }
});