import { createStore} from "vuex";
import {getField, updateField} from "vuex-map-fields"

export default createStore({
  state: {
      form: {
        vorname:"",
        nachname: "",
        geburtsdatum:"",
        adresse:"",
        telefonnummer:"",
        email:"",
        krankenkasse:"",
        hausarzt:"",
        geschlecht: "",
        herkunft:"",
        muttersprache:"",
        schulischeBildung:"",
        beruflicheBildung:"",
        beruf:"",
        artarbeit:"",
        familienstand: "",
        wohnsituation: "",
        wohnsituationAndere: "",
        personenImHaushalt: null,
        aktuellGeraucht: "",
        jemalsGeraucht: "",
        anzahlZigaretten: null,
        anzahlTabakprodukte: null,
        anzahlJahreRauchen: null,
        beeintraechtigungen: "",
        beeintraechtigungenVorhanden: "",
        beeintraechtigungenVorhandenAndere:"",
        mobil: "",
        mobileingeschraenkt: "",
        mobileingeschraenktAndere: "",
        kontakAktivitaet: "",
        hobbies: "",
        unterstuetzungMedizinischerVersorgung: "",
        jaUnterstuetzungMedizinischerVersorgung: "",
        jaUnterstuetzungMedizinischerVersorgungAndere: "",
        medizinischeDiagnose: "",
        weitereDiagnosen: "",
        weitereDiagnosenAndere: "",
        vergangeneDiagnosen: "",
        psychischeGesundheit: "",
        psychischeGesundheitAndere: "",
        gesundheitszustandDerFamilie: "",
        gesundheitszustandDerFamilieAndere: "",
        schwangerschaft: "",
        stillzeit: "",
        getraenke:"",
        gemuese:"",
        recall:"",
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