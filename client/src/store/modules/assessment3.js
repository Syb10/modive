export default {
  namespaced: true,
  state: {
    plantMahlzeiten: [],
    plantMahlzeitenAndere: "",
    bereitetMahlzeiten: [],
    bereitetMahlzeitenAndere: "",
    weitereAnmerkungenMahlzeiten: "",
    lebensmitteleinkauf: [],
    lebensmitteleinkaufAndere: "",
    selbstversorgen: "",
    selbstversorgenEingeschraenkt: "",
    selbstversorgenNein: "",
    einfachheitMahlzeitZuzubereiten: "",
    begruendungMahlzeitZuzubereiten: "",
    informationErnaehrung: [],
    informationErnaehrungAndere: "",
    weitereAnmerkungenInformationsquellen: "",
    orientierungErnaehrung: "",
    wichtigkeitDerEmpfehlung: "",
    wichtigkeitDerFrische: "",
    wichtigkeitDesGeschmacks: "",
    wichtigkeitDerGesundheit: "",
    wichtigkeitEinesGeringenPreises: "",
    wichtigkeitDerRegionalitaet: "",
    wichtigkeitDerSaisonalitaet: "",
    wichtigkeitAndere: [[
        {title:"", vmodel:"", input:true, button:true},
        {value:"sehr wichtig", id:"andere0sehrWichtig", name:"andere0"},
        {value:"wichtig", id:"andere0wichtig", name:"andere0"},
        {value:"eher wichtig", id:"andere0eherWichtig", name:"andere0"},
        {value:"eher unwichtig", id:"andere0eherUnwichtig", name:"andere0"},
        {value:"unwichtig", id:"andere0unwichtig", name:"andere0"},
        {value:"sehr unwichtig", id:"andere0sehrUnwichtig", name:"andere0"},
      ]],
    counterAndere:1,
    ernaehrungsgewohnheitenVeraendern: "",
    begruendungErnaehrungsgewohnheitenVeraendern: "",
    physicalActivityLevel: "",
    weitereAnmerkungenAktivitaet: "",
    whoLaune: 0,
    whoRuhig: 0,
    whoAktiv: 0,
    whoAusgeruht: 0,
    whoInteressieren: 0,
    uploadLebensqualitaet: [],
    uploadAssessment3: [], 
  },
  getters: {
    whoWert(state) {
      var value=0
        value += state.whoLaune == 10 ? 0 : state.whoLaune
        value += state.whoRuhig == 10 ? 0: state.whoRuhig
        value += state.whoAktiv == 10 ? 0: state.whoAktiv
        value += state.whoAusgeruht == 10 ? 0: state.whoAusgeruht
        value += state.whoInteressieren == 10 ? 0: state.whoInteressieren
        return value
    },
    whoProzent(state, getters) {
      return getters.whoWert*4
    },
    whoAuswertung(state, getters) {
      var value=""
      if(getters.whoWert < 7) value = "Vorhandensein einer klinischen Depression sehr wahrscheinlich"
      if(getters.whoWert >= 7 && getters.whoWert < 10) value = "deutlich eingeschränktes Wohlbefinden"
      if(getters.whoWert >= 10 && getters.whoWert < 13) value = "reduziertes Wohlbefinden"
      if(getters.whoWert >=13 && getters.whoWert < 19) value = "zufriedenstellendes Wohlbefinden"
      if(getters.whoWert >= 19) value = "sehr gutes Wohlbefinden"
      return value
    },
  },
  mutations: {
    plantMahlzeiten(state, value) {
      state.plantMahlzeiten = value
    },
    plantMahlzeitenAndere(state, value) {
      state.plantMahlzeitenAndere = value
    },
    bereitetMahlzeiten(state, value) {
      state.bereitetMahlzeiten = value
    },
    bereitetMahlzeitenAndere(state, value) {
      state.bereitetMahlzeitenAndere = value
    },
    weitereAnmerkungenMahlzeiten(state, value) {
      state.weitereAnmerkungenMahlzeiten = value
    },
    lebensmitteleinkauf(state, value) {
      state.lebensmitteleinkauf = value
    },
    lebensmitteleinkaufAndere(state, value) {
      state.lebensmitteleinkaufAndere = value
    },
    selbstversorgen(state, value) {
      state.selbstversorgen = value
    },
    selbstversorgenEingeschraenkt(state, value) {
      state.selbstversorgenEingeschraenkt = value
    },
    selbstversorgenNein(state, value) {
      state.selbstversorgenNein = value
    },
    einfachheitMahlzeitZuzubereiten(state, value) {
      state.einfachheitMahlzeitZuzubereiten = value
    },
    begruendungMahlzeitZuzubereiten(state, value) {
      state.begruendungMahlzeitZuzubereiten = value
    },
    informationErnaehrung(state, value) {
      state.informationErnaehrung = value
    },
    informationErnaehrungAndere(state, value) {
      state.informationErnaehrungAndere = value
    },
    weitereAnmerkungenInformationsquellen(state, value) {
      state.weitereAnmerkungenInformationsquellen = value
    },
    orientierungErnaehrung(state, value) {
      state.orientierungErnaehrung = value
    },
    wichtigkeitDerEmpfehlung(state, value) {
      state.wichtigkeitDerEmpfehlung = value
    },
    wichtigkeitDerFrische(state, value) {
      state.wichtigkeitDerFrische = value
    },
    wichtigkeitDesGeschmacks(state, value) {
      state.wichtigkeitDesGeschmacks = value
    },
    wichtigkeitDerGesundheit(state, value) {
      state.wichtigkeitDerGesundheit = value
    },
    wichtigkeitEinesGeringenPreises(state, value) {
      state.wichtigkeitEinesGeringenPreises = value
    },
    wichtigkeitDerRegionalitaet(state, value) {
      state.wichtigkeitDerRegionalitaet = value
    },
    wichtigkeitDerSaisonalitaet(state, value) {
      state.wichtigkeitDerSaisonalitaet = value
    },
    addNewRowAndere(state) {
      state.wichtigkeitAndere.push([
        {title: "", vmodel:"", input:true, button:true},
        {value:"sehr wichtig", id:"andere"+state.counterAndere+"sehrWichtig", name:"andere"+state.counterAndere},
        {value:"wichtig", id:"andere"+state.counterAndere+"wichtig", name:"andere"+state.counterAndere},
        {value:"eher wichtig", id:"andere"+state.counterAndere+"eherWichtig", name:"andere"+state.counterAndere},
        {value:"eher unwichtig", id:"andere"+state.counterAndere+"eherUnwichtig", name:"andere"+state.counterAndere},
        {value:"unwichtig", id:"andere"+state.counterAndere+"unwichtig", name:"andere"+state.counterAndere},
        {value:"sehr unwichtig", id:"andere"+state.counterAndere+"sehrUnwichtig", name:"andere"+state.counterAndere},
      ]);
      state.counterAndere++;
    },
    deleteRowAndere(state,index) {
      state.wichtigkeitAndere.splice(index, 1);
    },
    ernaehrungsgewohnheitenVeraendern(state, value) {
      state.ernaehrungsgewohnheitenVeraendern = value
    },
    begruendungErnaehrungsgewohnheitenVeraendern(state, value) {
      state.begruendungErnaehrungsgewohnheitenVeraendern = value
    },
    physicalActivityLevel(state, value) {
      state.physicalActivityLevel = value
    },
    weitereAnmerkungenAktivitaet(state, value) {
      state.weitereAnmerkungenAktivitaet = value
    },
    whoLaune(state, value) {
      state.whoLaune = value
    },
    whoRuhig(state, value) {
      state.whoRuhig = value
    },
    whoAktiv(state, value) {
      state.whoAktiv = value
    },
    whoAusgeruht(state, value) {
      state.whoAusgeruht = value
    },
    whoInteressieren(state, value) {
      state.whoInteressieren = value
    },
    uploadLebensqualitaet(state, value){
      state.uploadLebensqualitaet = value
    },
    uploadAssessment3(state, value) {
      state.uploadAssessment3 = value
    },
  }
}