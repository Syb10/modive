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
        plantMahlzeiten: "",
        bereitetMahlzeiten: "",
        lebensmitteleinkauf: "",
        selbstversorgen: "",
        selbstversorgenEingeschraenkt: "",
        selbstversorgenNein: "",
        einfachheitMahlzeitZuzubereiten: "",
        wichtigkeitDerEmpfehlung: "",
        wichtigkeitDerFrische: "",
        koerpergroesse: null,
        koerpergewicht: null,
        bmi:null
    }
  },
  getters: {
    getField,
    bmi(state) {
      return (state.form.koerpergewicht/ (state.form.koerpergroesse * state.form.koerpergroesse)).toFixed(2)
    }
  },
  mutations: {
    updateField,
  },
  actions: {
  },
  modules: {
  }
});