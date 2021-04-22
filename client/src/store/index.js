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
        wohnsituation: [],
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
        myData: [],
        koerpergroesse: null,
        koerpergewicht: null,
        bmi:null
    }
  },
  getters: {
    getField,
    myData(state) {
      return state.form.myData;
    },
    wohnsituation(state) {
      return state.form.wohnsituation
    },
    bmi(state) {
      return (state.form.koerpergewicht/ (state.form.koerpergroesse * state.form.koerpergroesse)).toFixed(2)
    }
  },
  mutations: {
    updateField,
    changeMyData(state, value) {
      state.form.myData = value
    },
    changeWohnsituation(state, value) {
      state.form.wohnsituation = value
    }
  },
  actions: {
    changeMyData({commit}, value) {
      commit("changeMyData", value);
    },
    changeWohnsituation({commit}, value) {
      commit("changeWohnsituation", value);
    }
  },
  modules: {
  }
});