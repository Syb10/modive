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
        artarbeit:"",
        familienstand: "",
        wohnsituation: "",
        personenImHaushalt: null,
        aktuellGeraucht: "",
        jemalsGeraucht: "",
        anzahlZigaretten: null,
        anzahlTabakprodukte: null,
        anzahlJahreRauchen: null,
        beeintraechtigungen: "",
        beeintraechtigungenVorhanden: "",
        mobil: "",
        mobileingeschraenkt: "",
        getraenke:"",
        gemuese:"",
        test:[],
        myData: []
    }
  },
  getters: {
    getField,
    myData(state) {
      return state.form.myData;
    }
  },
  mutations: {
    updateField,
    changeMyData(state, value) {
      state.form.myData = value
    }
  },
  actions: {
    changeMyData({commit}, value) {
      commit("changeMyData", value);
    }
  },
  modules: {
  }
});