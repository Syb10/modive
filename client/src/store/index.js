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
        recallMahlzeiten:
        {
          table:[]
        },
        weitereAnmerkungenRecall: "",
        vorlieben: "",
        abneigungen: "",
        isRecall: "",
        anzahlMahlzeitenRecall: "",
        mahlzeitenNormalerweise: "",
        mahlzeitenWeggelassen: "",
        mahlzeitenZusaetzlich: "",
        mahlzeitenZusaetzlichAndere: "",
        eigenstaendigeDiaet: "",
        eigenstaendigeDiaetJa: "",
        mahlzeitenAusserHaus: "",
        mahlzeitenAusserHausJa: "",
        diaetischeKostform: "",
        diaetischeKostformJa: "",
        diaetischeKostformJaAndere: "",
        enteraleErnaehrung: "",
        enteraleErnaehrungJa: "",
        medikamente: "",
        medikamenteJa: "",
        isBilanzierung: false,
        getraenke:"",
        gemuese:"",
        obst: "",
        getreideprodukte: "",
        milch: "",
        fleisch: "",
        fisch: "",
        ei: "",
        fette: "",
        suessigkeiten: "",
        pikanteSnacks: "",
        energie: "",
        eiwess: "",
        kohlenhydrate: "",
        ballaststoffe: "",
        zucker: "",
        gesamtfett: "",
        gesaettigteFettsaeuren: "",
        einfachGesaettigte: "",
        mehrfachGesaettigte: "",
        cholesterin: "",
        vitamine: "",
        mineralstoffe: "",
        plantMahlzeiten: "",
        plantMahlzeitenAndere: "",
        bereitetMahlzeiten: "",
        bereitetMahlzeitenAndere: "",
        lebensmitteleinkauf: "",
        lebensmitteleinkaufAndere: "",
        selbstversorgen: "",
        selbstversorgenEingeschraenkt: "",
        selbstversorgenNein: "",
        einfachheitMahlzeitZuzubereiten: "",
        begruendungMahlzeitZuzubereiten: "",
        informationErnaehrung: "",
        informationErnaehrungAndere: "",
        orientierungErnaehrung: "",
        wichtigkeitDerEmpfehlung: "",
        wichtigkeitDerFrische: "",
        wichtigkeitDesGeschmacks: "",
        wichtigkeitDerGesundheit: "",
        wichtigkeitEinesGeringenPreises: "",
        wichtigkeitDerRegionalitaet: "",
        wichtigkeitDerSaisonalitaet: "",
        wichtigkeitAndere: "",
        wichtigkeitAndereValue: "",        
        ernaehrungsgewohnheitenVeraendern: "",
        begruendungErnaehrungsgewohnheitenVeraendern: "",
        physicalActivityLevel: "",
        weitereAnmerkungenAktivitaet: "",
        koerpergroesse: null,
        koerpergewicht: null,
        bmi:null,
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
        mundgesundheit: "",
        mundgesundheitAndere: "",
        problemeNahrungsaufnahme: "",
        appetitBeeintraechtigung: "",
        weitereKoerperlicheBefunde: "",
        diagnosestellung:"",
        priorisierung: "",
        zieleKlient:"",
        leitlinien: "",
        zieleIntervention: "",
        interventionsform: "",
        interventionsformAndere: "",
        weitereAnmerkungenIntervention: "",
        monitoring: "",
        dauerEinzelberatung: "",
        frequenzInterventionen: "",
        zeitraumIntervention: "",
        inhaltIntervention: "",
        materialien: "",
        weitereBerufsgruppen: "",
        weitereBerufsgruppenAndere: "",
        angehoerige: "",
        weitereAnmerkungenInterventionNochmal: "",
        entwicklungEinzelberatung: "",
        sicherstellungErnaehrung: "",
        entwicklungSicherstellungErnaehrung: "",
        sonstigesUmsetung: "",
        entwicklungMonitoring: {
          table:[]
        },
        entwicklungMonitoringParameter: "",
    }
  },
  getters: {
    getField,
    bmi(state) {
      return (state.form.koerpergewicht/ (state.form.koerpergroesse * state.form.koerpergroesse)).toFixed(2)
    },
    recallMahlzeiten(state) {
      return state.form.recallMahlzeiten
    },
    entwicklungMonitoring(state) {
      return state.form.entwicklungMonitoring
    }
  },
  mutations: {
    updateField,
    addTable(state) {
      state.form.recallMahlzeiten['table'].push([{
        datum: "",
        mahlzeit:"",
        uhrzeit:"",
        wo:"",
        wer:"",
        lebensmittelGetraenke:"",
        menge:"", 
      }]);
    },
    addNewRow(state, index) {
      state.form.recallMahlzeiten['table'][index].push({
        mahlzeit:"",
        uhrzeit:"",
        wo:"",
        wer:"",
        lebensmittelGetraenke:"",
        menge:"", 
      });
    },
    deleteRow(state,payload) {
      state.form.recallMahlzeiten['table'][payload.tableIndex].splice(payload.rowIndex, 1);
    },
    deleteTable(state,index) {
      console.log("lösche Tabelle index " + index);
      state.form.recallMahlzeiten['table'].splice(index, 1);
    },
    addDatum(state, payload) {
      console.log("hallo Datum?")
      state.form.recallMahlzeiten['table'][payload.tableIndex].datum = payload.datum;
    },
    addTableMonitoring(state) {
      state.form.entwicklungMonitoring['table'].push([{
        datum: "",
        ergebnisse:"", 
      }]);
    },
    addNewRowMonitoring(state, index) {
      state.form.entwicklungMonitoring['table'][index].push({
        datum:"",
        ergebnisse:"", 
      });
    },
    deleteTableMonitoring(state,index) {
      console.log("lösche Tabelle index " + index);
      state.form.entwicklungMonitoring['table'].splice(index, 1);
    },
  },
  actions: {
  },
  modules: {
  }
});