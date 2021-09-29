export default {
  namespaced: true,
  state: {
    koerpergroesse: "",
    koerpergewicht: "",
    taillenumfang: "",
    hautfaltendicke: "",
    fettfreieMasse: "",
    fettmasse: "",
    ruheenergieumsatz: "",
    chemieMetabolischeParameter: "",
    vitalzeichen: "",
    weitereMessungen: "",
    schlucken: "",
    schluckenJaAber: "",
    schluckenNein: "",
    erbrechen: "",
    erbrechenJa: "",
    mundgesundheit: [],
    mundgesundheitAndere: "",
    problemeNahrungsaufnahme: "",
    appetitBeeintraechtigung: "",
    weitereKoerperlicheBefunde: "",
  },
  getters:{
    bmi(state) {
      if(state.koerpergewicht != "" && state.koerpergroesse != "") {
        return (state.koerpergewicht/ (state.koerpergroesse * state.koerpergroesse)).toFixed(2)
      }
    }
  },
  mutations: {
    koerpergroesse(state, value) {
      state.koerpergroesse = value
    },
    koerpergewicht(state, value) {
      state.koerpergewicht = value
    },
    taillenumfang(state, value) {
      state.taillenumfang = value
    },
    hautfaltendicke(state, value) {
      state.hautfaltendicke = value
    },
    fettfreieMasse(state, value) {
      state.fettfreieMasse = value
    },
    fettmasse(state, value) {
      state.fettmasse = value
    },
    ruheenergieumsatz(state, value) {
      state.ruheenergieumsatz = value
    },
    chemieMetabolischeParameter(state, value) {
      state.chemieMetabolischeParameter = value
    },
    vitalzeichen(state, value) {
      state.vitalzeichen = value
    },
    weitereMessungen(state, value) {
      state.weitereMessungen = value
    },
    schlucken(state, value) {
      state.schlucken = value
    },
    schluckenJaAber(state, value) {
      state.schluckenJaAber = value
    },
    schluckenNein(state, value) {
      state.schluckenNein = value
    },
    erbrechen(state, value) {
      state.erbrechen = value
    },
    erbrechenJa(state, value) {
      state.erbrechenJa = value
    },
    mundgesundheit(state, value) {
      state.mundgesundheit = value
    },
    mundgesundheitAndere(state, value) {
      state.mundgesundheitAndere = value
    },
    problemeNahrungsaufnahme(state, value) {
      state.problemeNahrungsaufnahme = value
    },
    appetitBeeintraechtigung(state, value) {
      state.appetitBeeintraechtigung = value
    },
    weitereKoerperlicheBefunde(state, value) {
      state.weitereKoerperlicheBefunde = value
    },
  }
}