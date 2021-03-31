import { createStore} from "vuex";
import {getField, updateField} from "vuex-map-fields"

export default createStore({
  state: {
      form: {
        vorname:"",
        nachname: "",
        geburtsdatum:"",
        geschlecht: "",
        herkunft:"",
        muttersprache:"",
        schulischeBildung:"",
        beruflicheBildung:"",
        beruf:"",
        getraenke:""
    }
  },
  getters: {
    getField
  },
  mutations: {
    updateField
  },
  actions: {
  },
  modules: {
  }
});