export default {
  namespaced: true,
  state: {
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
    artarbeit:[],
    familienstand: [],
    wohnsituation: [],
    wohnsituationAndere: "",
    personenImHaushalt: "",
    weitereAnmerkungenZurWohnsituation: "",
    aktuellGeraucht: "",
    jemalsGeraucht: "",
    anzahlZigaretten: "",
    anzahlTabakprodukte: "",
    anzahlJahreRauchen: "",
    beeintraechtigungen: "",
    beeintraechtigungenVorhanden: [],
    beeintraechtigungenVorhandenAndere:"",
    mobil: "",
    mobileingeschraenkt: [],
    mobileingeschraenktAndere: "",
    unterstuetzungMedizinischerVersorgung: "",
    jaUnterstuetzungMedizinischerVersorgung: [],
    jaUnterstuetzungMedizinischerVersorgungAndere: "",
    kontakAktivitaet: "",
    hobbies: "",
    medizinischeDiagnose: "",
    weitereDiagnosen: [],
    weitereDiagnosenAndere: "",
    vergangeneDiagnosen: "",
    psychischeGesundheit: [],
    psychischeGesundheitAndere: "",
    gesundheitszustandDerFamilie: [],
    gesundheitszustandDerFamilieAndere: "",
    weitereAnmerkungenZumGesundheitszustandDerFamilie: "",
    schwangerschaft: "",
    stillzeit: "",   
    uploadAssessment1:[],
  },
  mutations: {
    adresse(state, value) {
      state.adresse = value
    },
    telefonnummer(state, value) {
      state.telefonnummer = value
    },
    email(state, value) {
      state.email = value
    },
    krankenkasse(state, value) {
      state.krankenkasse = value
    },
    hausarzt(state, value) {
      state.hausarzt = value
    },
    geschlecht(state, value) {
      state.geschlecht = value
    },
    herkunft(state, value) {
      state.herkunft = value
    },
    muttersprache(state, value) {
      state.muttersprache = value
    },
    schulischeBildung(state, value) {
      state.schulischeBildung= value
    },
    beruflicheBildung(state, value) {
      state.beruflicheBildung = value
    },
    beruf(state, value) {
      state.beruf = value
    },
    artarbeit(state, value) {
      state.artarbeit = value
    },
    familienstand(state, value) {
      state.familienstand = value
    },
    wohnsituation(state, value) {
      state.wohnsituation = value
    },
    wohnsituationAndere(state, value) {
      state.wohnsituationAndere = value
    },
    personenImHaushalt(state, value) {
      state.personenImHaushalt = value
    },
    weitereAnmerkungenZurWohnsituation(state, value) {
      state.weitereAnmerkungenZurWohnsituation = value
    },
    aktuellGeraucht(state, value) {
      state.aktuellGeraucht = value
    },
    jemalsGeraucht(state, value) {
      state.jemalsGeraucht = value
    },
    anzahlZigaretten(state, value) {
      state.anzahlZigaretten = value
    },
    anzahlTabakprodukte(state, value) {
      state.anzahlTabakprodukte = value
    },
    anzahlJahreRauchen(state, value) {
      state.anzahlJahreRauchen = value
    },
    beeintraechtigungen(state, value) {
      state.beeintraechtigungen = value
    },
    beeintraechtigungenVorhanden(state, value) {
      state.beeintraechtigungenVorhanden = value
    },
    beeintraechtigungenVorhandenAndere(state, value) {
      state.beeintraechtigungenVorhandenAndere = value
    },
    mobil(state, value) {
      state.mobil = value
    },
    mobileingeschraenkt(state, value) {
      state.mobileingeschraenkt = value
    },
    mobileingeschraenktAndere(state, value) {
      state.mobileingeschraenktAndere = value
    },
    unterstuetzungMedizinischerVersorgung(state, value) {
      state.unterstuetzungMedizinischerVersorgung = value
    },
    jaUnterstuetzungMedizinischerVersorgung(state, value) {
      state.jaUnterstuetzungMedizinischerVersorgung = value
    },
    jaUnterstuetzungMedizinischerVersorgungAndere(state, value) {
      state.jaUnterstuetzungMedizinischerVersorgungAndere = value
    },
    kontakAktivitaet(state, value) {
      state.kontakAktivitaet = value
    },
    hobbies(state, value) {
      state.hobbies = value
    },
    medizinischeDiagnose(state, value) {
      state.medizinischeDiagnose = value
    },
    weitereDiagnosen(state, value) {
      state.weitereDiagnosen = value
    },
    weitereDiagnosenAndere(state, value) {
      state.weitereDiagnosenAndere = value
    },
    vergangeneDiagnosen(state, value) {
      state.vergangeneDiagnosen = value
    },
    psychischeGesundheit(state, value) {
      state.psychischeGesundheit = value
    },
    psychischeGesundheitAndere(state, value) {
      state.psychischeGesundheitAndere = value
    },
    gesundheitszustandDerFamilie(state, value) {
      state.gesundheitszustandDerFamilie = value
    },
    gesundheitszustandDerFamilieAndere(state, value) {
      state.gesundheitszustandDerFamilieAndere = value
    },
    weitereAnmerkungenZumGesundheitszustandDerFamilie(state, value) {
      state.weitereAnmerkungenZumGesundheitszustandDerFamilie = value
    },
    schwangerschaft(state, value) {
      state.schwangerschaft = value
    },
    stillzeit(state, value) {
      state.stillzeit = value
    },
    uploadAssessment1(state, value) {
      state.uploadAssessment1 = value
    },
  }
}