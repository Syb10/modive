import {mapGetters, mapState} from "vuex";

export const navMixin = {
  computed: {
    ...mapState([
      "vorname",
      "nachname",
      "geburtsdatum"
    ]),
    ...mapState("a1",[
      "adresse",
      "telefonnummer",
      "email",
      "krankenkasse",
      "hausarzt",
      "geschlecht",
      "herkunft",
      "muttersprache",
      "schulischeBildung",
      "beruflicheBildung",
      "beruf",
      "artarbeit",
      "familienstand",
      "wohnsituation",
      "wohnsituationAndere",
      "personenImHaushalt",
      "weitereAnmerkungenZurWohnsituation",
      "aktuellGeraucht",
      "jemalsGeraucht",
      "anzahlZigaretten",
      "anzahlTabakprodukte",
      "anzahlJahreRauchen",
      "beeintraechtigungen",
      "beeintraechtigungenVorhanden",
      "beeintraechtigungenVorhandenAndere",
      "mobil",
      "mobileingeschraenkt",
      "mobileingeschraenktAndere",
      "unterstuetzungMedizinischerVersorgung",
      "jaUnterstuetzungMedizinischerVersorgung",
      "jaUnterstuetzungMedizinischerVersorgungAndere",
      "kontakAktivitaet",
      "hobbies",
      "medizinischeDiagnose",
      "weitereDiagnosen",
      "weitereDiagnosenAndere",
      "vergangeneDiagnosen",
      "psychischeGesundheit",
      "psychischeGesundheitAndere",
      "gesundheitszustandDerFamilie",
      "gesundheitszustandDerFamilieAndere",
      "weitereAnmerkungenZumGesundheitszustandDerFamilie",
      "schwangerschaft",
      "stillzeit",
      "uploadAssessment1",
    ]),
    ...mapState("a2",[
      "uploadErnahrungsprotokoll",
      "anzahlRecall",
      "recall",
      "weitereGetraenke",
      "anzahlMahlzeitenRecall",
      "mahlzeitenNormalerweise",
      "mahlzeitenWeggelassen",
      "mahlzeitenZusaetzlich",
      "mahlzeitenZusaetzlichAndere",
      "weitereAnmerkungenRecall",
      "getraenke",
      "gemuese",
      "obst",
      "getreideprodukte",
      "milch",
      "fleisch",
      "fisch",
      "ei",
      "fette",
      "suessigkeiten",
      "pikanteSnacks",
      "energie",
      "wasser",
      "eiweiss",
      "kohlenhydrate",
      "zucker",
      "ballaststoffe",
      "gesamtfett",
      "gesaettigteFettsaeuren",
      "einfachUngesaettigte",
      "mehrfachUngesaettigte",
      "cholesterin",
      "vitamine",
      "counterVitamine",
      "mineralstoffe",
      "counterMineralstoffe",
      "dynamicBilanzierung",
      "vorlieben",
      "abneigungen",
      "eigenstaendigeDiaet",
      "eigenstaendigeDiaetJa",
      "mahlzeitenAusserHaus",
      "mahlzeitenAusserHausJa",
      "diaetischeKostform",
      "diaetischeKostformJa",
      "diaetischeKostformJaAndere",
      "enteraleErnaehrung",
      "enteraleErnaehrungJa",
      "medikamente",
      "medikamenteJa",
      "uploadAssessment2",
    ]),
    ...mapState("a3",[
      "plantMahlzeiten",
      "plantMahlzeitenAndere",
      "bereitetMahlzeiten",
      "bereitetMahlzeitenAndere",
      "weitereAnmerkungenMahlzeiten",
      "lebensmitteleinkauf",
      "lebensmitteleinkaufAndere",
      "selbstversorgen",
      "selbstversorgenEingeschraenkt",
      "selbstversorgenNein",
      "einfachheitMahlzeitZuzubereiten",
      "begruendungMahlzeitZuzubereiten",
      "informationErnaehrung",
      "informationErnaehrungAndere",
      "weitereAnmerkungenInformationsquellen",
      "orientierungErnaehrung",
      "wichtigkeitDerEmpfehlung",
      "wichtigkeitDerFrische",
      "wichtigkeitDesGeschmacks",
      "wichtigkeitDerGesundheit",
      "wichtigkeitEinesGeringenPreises",
      "wichtigkeitDerRegionalitaet",
      "wichtigkeitDerSaisonalitaet",
      "wichtigkeitAndere",
      "counterAndere",
      "ernaehrungsgewohnheitenVeraendern",
      "begruendungErnaehrungsgewohnheitenVeraendern",
      "physicalActivityLevel",
      "weitereAnmerkungenAktivitaet",
      "whoLaune",
      "whoRuhig",
      "whoAktiv",
      "whoAusgeruht",
      "whoInteressieren",
      "uploadLebensqualitaet",
      "uploadAssessment3",
    ]),
    ...mapGetters("a3",[
      "whoWert",
      "whoProzent",
      "whoAuswertung",
    ]),
    ...mapState("a4",[
      "koerpergroesse",
      "koerpergewicht",
      "taillenumfang",
      "hautfaltendicke",
      "fettfreieMasse",
      "fettmasse",
      "ruheenergieumsatz",
      "chemieMetabolischeParameter",
      "vitalzeichen",
      "weitereMessungen",
      "schlucken",
      "schluckenJaAber",
      "schluckenNein",
      "erbrechen",
      "erbrechenJa",
      "mundgesundheit",
      "mundgesundheitAndere",
      "problemeNahrungsaufnahme",
      "appetitBeeintraechtigung",
      "weitereKoerperlicheBefunde",
      "uploadAssessment4",
    ]),
    ...mapGetters("a4",[
      "bmi"
    ]),
    ...mapState("d",[
      "diagnosestellung",
      "pasr",
      "counter",
      "error",
      "errorList",
    ]),
    ...mapState("p", [
      "priorisierung",  
      "leitlinien",
      "uebergeordetesZiel",
      "counterUebergeordetesZiel",
      "verlaufsziel",
      "counterVerlaufsziel",
      "ernaehrungsempfehlung",
      "interventionsform",
      "interventionsformAndere",
      "weitereAnmerkungenInterventionform",
      "zeitraumIntervention",
      "frequenzInterventionen",
      "planungEinzelberatung",
      "planungGruppenschulung",
      "planungEinkaufstraining",
      "planungLehrkueche",
      "planungAndereInterventionsform",
      "weitereBerufsgruppen",
      "weitereBerufsgruppenAndere",
      "angehoerige",
      "weitereAnmerkungenInterventionNochmal",
      "monitoring",
      "einzelberatung",
      "gruppenschulung",
      "einkaufstraining",
      "lehrkueche",
      "andereInterventionsform",
      "entwicklungMonitoring",
    ]),
    ...mapGetters("p",[
      "joinMonitoring",
    ]),
    ...mapState("u",[
      "zusatznahrung",
      "zusatznahrungJa",
      "sonstigesUmsetung",
    ]),
    ...mapState("e", [
      "evaluationEntwicklungMonitoring",
      "zielerreichungUebergeordetesZiel",
      "begruendungZielerreichungUebergeordetesZiel",
      "zielerreichungVerlaufsziel",
      "begruendungZielerreichungVerlaufsziel",
      "evaluationWeitersVorgehen",
    ]),
    ...mapGetters("e", [
      "evaluationUebergeordetesZiel",
      "evaluationVerlaufsziel",
    ]),
    klient() {
      return {
        "Vorname": this.vorname,
        "Nachname": this.nachname,
        "Geburtsdatum": this.geburtsdatum,
        assessment1:{
          "Adresse":this.adresse,
          "Telefonnummer": this.telefonnummer,
          "Email": this.email,
          "Krankenkasse": this.krankenkasse,
          "Hausarzt": this.hausarzt,
          "Geschlecht" : this.geschlecht,
          "Herkunft": this.herkunft,
          "Muttersprache": this.muttersprache,
          "SchulischeBildung": this.schulischeBildung,
          "BeruflicheBildung": this.beruflicheBildung,
          "Beruf": this.beruf, 
          "weitereAngabenBeruf": this.artarbeit,
          "Familienstand": this.familienstand,
          "Wohnsituation": [this.wohnsituation, this.wohnsituationAndere],
          "PersonenImHaushalt": this.personenImHaushalt,
          "WeitereAnmerkungenZurWohnsituation": this.weitereAnmerkungenZurWohnsituation,
          "aktuellGeraucht": this.aktuellGeraucht,
          "jemalsGeraucht" : this.jemalsGeraucht,
          "AnzahlZigaretten": this.anzahlZigaretten,
          "AnzahlTabakprodukte": this.anzahlTabakprodukte,
          "AnzahlJahreRauchen": this.anzahlJahreRauchen,
          "Beeintraechtigungen": [this.beeintraechtigungen, this.beeintraechtigungenVorhanden, this.beeintraechtigungenVorhandenAndere],
          "mobil":[this.mobil, this.mobileingeschraenkt, this.mobileingeschraenktAndere],
          "UnterstuetzungMedizinischerVersorgung": [this.unterstuetzungMedizinischerVersorgung, this.jaUnterstuetzungMedizinischerVersorgung, this.jaUnterstuetzungMedizinischerVersorgungAndere],
          "KontakAktivitaet": this.kontakAktivitaet,
          "Hobbies" : this.hobbies,
          "MedizinischeDiagnose": this.medizinischeDiagnose,
          "weitereDiagnosen": [this.weitereDiagnosen, this.weitereDiagnosenAndere],
          "vergangeneDiagnosen": this.vergangeneDiagnosen,
          "PsychischeGesundheit": [this.psychischeGesundheit, this.psychischeGesundheitAndere],
          "GesundheitszustandDerFamilie": [this.gesundheitszustandDerFamilie, this.gesundheitszustandDerFamilieAndere],
          "WeitereAnmerkungenZumGesundheitszustandDerFamilie": this.weitereAnmerkungenZumGesundheitszustandDerFamilie,
          "Schwangerschaft": this.schwangerschaft,
          "Stillzeit": this.stillzeit,
          "UploadAssessment1" : this.uploadAssessment1,
        },
        "Recall": this.recall,
        "anzahlRecall": this.anzahlRecall,
        assessment2: {
          "UploadErnahrungsprotokoll": this.uploadErnahrungsprotokoll,
          "weitereGetraenke": this.weitereGetraenke,
          "AnzahlMahlzeitenRecall": this.anzahlMahlzeitenRecall,
          "MahlzeitenNormalerweise": this.mahlzeitenNormalerweise,
          "MahlzeitenWeggelassen": this.mahlzeitenWeggelassen,
          "MahlzeitenZusaetzlich": [this.mahlzeitenZusaetzlich, this.mahlzeitenZusaetzlichAndere],
          "weitereAnmerkungenRecall": this.weitereAnmerkungenRecall,
          "Vorlieben": this.vorlieben,
          "Abneigungen": this.abneigungen,
          "EigenstaendigeDiaet": [this.eigenstaendigeDiaet, this.eigenstaendigeDiaetJa],
          "MahlzeitenAusserHaus": [this.mahlzeitenAusserHaus, this.mahlzeitenAusserHausJa],
          "DiaetischeKostform": [this.diaetischeKostform, this.diaetischeKostformJa],
          "EnteraleErnaehrung": [this.enteraleErnaehrung, this.enteraleErnaehrungJa],
          "Medikamente": [this.medikamente, this.medikamenteJa],
          "UploadAssessment2": this.uploadAssessment2,
        },
        bilanzierung:{
          "Getraenke": this.getraenke,
          "Gemuese": this.gemuese,
          "Obst": this.obst,
          "Getreideprodukte": this.getreideprodukte,
          "Milch": this.milch,
          "Fleisch": this.fleisch,
          "Fisch" : this.fisch,
          "Ei": this.ei,
          "Fette": this.fette,
          "Suessigkeiten": this.suessigkeiten,
          "PikanteSnacks": this.pikanteSnacks,
          "Energie": this.energie,
          "Wasser": this.wasser,
          "Eiweiss": this.eiweiss,
          "Kohlenhydrate": this.kohlenhydrate,
          "Zucker": this.zucker,
          "Ballaststoffe": this.ballaststoffe,
          "Gesamtfett": this.gesamtfett,
          "GesaettigteFettsaeuren": this.gesaettigteFettsaeuren,
          "EinfachUngesaettigte": this.einfachUngesaettigte,
          "MehrfachUngesaettigte": this.mehrfachUngesaettigte,
          "Cholesterin": this.cholesterin,
          "CounterVitamine": this.counterVitamine,
          "CounterMineralstoffe": this.counterMineralstoffe,
        },
        "Vitamine": this.vitamine,
        "Mineralstoffe": this.mineralstoffe,
        assessment3: {
          "PlantMahlzeiten": [this.plantMahlzeiten, this.plantMahlzeitenAndere],
          "BereitetMahlzeiten": [this.bereitetMahlzeiten, this.bereitetMahlzeitenAndere],
          "weitereAnmerkungenMahlzeiten": this.weitereAnmerkungenMahlzeiten,
          "Lebensmitteleinkauf": [this.lebensmitteleinkauf, this.lebensmitteleinkaufAndere],
          "Selbstversorgen": [this.selbstversorgen, this.selbstversorgenEingeschraenkt, this.selbstversorgenNein],
          "EinfachheitMahlzeitZuzubereiten" : [this.einfachheitMahlzeitZuzubereiten, this.begruendungMahlzeitZuzubereiten],
          "InformationErnaehrung": [this.informationErnaehrung, this.informationErnaehrungAndere],
          "weitereAnmerkungenInformationsquellen": this.weitereAnmerkungenInformationsquellen,
          "OrientierungErnaehrung": this.orientierungErnaehrung,
          "WichtigkeitDerEmpfehlung": this.wichtigkeitDerEmpfehlung,
          "ErnaehrungsgewohnheitenVeraendern": [ this.ernaehrungsgewohnheitenVeraendern, this.begruendungErnaehrungsgewohnheitenVeraendern],
          "PhysicalActivityLevel":  this.physicalActivityLevel,
          "WeitereAnmerkungenAktivitaet":  this.weitereAnmerkungenAktivitaet,
          "WhoLaune": this.whoLaune,
          "WhoRuhig": this.whoRuhig,
          "WhoAktiv": this.whoAktiv,
          "WhoAusgeruht": this.whoAusgeruht,
          "WhoInteressieren": this.whoInteressieren,
          "WhoWert": this.whoWert,
          "WhoProzent": this.whoProzent,
          "WhoAuswertung": this.whoAuswertung,
          "UploadLebensqualitaet": this.uploadLebensqualitaet,
          "UploadAssessment3": this.uploadAssessment3,
        },
        wichtigkeit: {
          "WichtigkeitDerFrische" : this.wichtigkeitDerFrische,
          "WichtigkeitDesGeschmacks": this.wichtigkeitDesGeschmacks,
          "WichtigkeitDerGesundheit": this.wichtigkeitDerGesundheit,
          "WichtigkeitEinesGeringenPreises": this.wichtigkeitEinesGeringenPreises,
          "WichtigkeitDerRegionalitaet": this.wichtigkeitDerRegionalitaet,
          "WichtigkeitDerSaisonalitaet": this.wichtigkeitDerSaisonalitaet,
          "CounterAndere": this.counterAndere,
        },
        "WichtigkeitAndere": this.wichtigkeitAndere,
        assessment4:{
          "Koerpergroesse": this.koerpergroesse,
          "Koerpergewicht": this.koerpergewicht,
          "Bmi": this.bmi,
          "Taillenumfang": this.taillenumfang,
          "Hautfaltendicke": this.hautfaltendicke,
          "FettfreieMasse": this.fettfreieMasse,
          "Fettmasse": this.fettmasse,
          "Ruheenergieumsatz": this.ruheenergieumsatz,
          "ChemieMetabolischeParameter": this.chemieMetabolischeParameter,
          "Vitalzeichen": this.vitalzeichen,
          "WeitereMessungen": this.weitereMessungen,
          "Schlucken": [this.schlucken, this.schluckenJaAber, this.schluckenNein],
          "Erbrechen": [this.erbrechen, this.erbrechenJa],
          "Mundgesundheit": [this.mundgesundheit, this.mundgesundheitAndere],
          "ProblemeNahrungsaufnahme": this.problemeNahrungsaufnahme,
          "AppetitBeeintraechtigung": this.appetitBeeintraechtigung,
          "WeitereKoerperlicheBefunde": this.weitereKoerperlicheBefunde,
          "UploadAssessment4": this.uploadAssessment4,
        },
        "Diagnosestellung": this.diagnosestellung,
        "PASR": this.pasr,
        "Counter": this.counter,
        "Error": this.error,
        "ErrorList": this.errorList,
        "Priorisierung": this.priorisierung,
        "UebergeordetesZiel": this.uebergeordetesZiel,
        "Verlaufsziel": this.verlaufsziel,
        planung: { 
          "Leitlinien": this.leitlinien,    
          "CounterUebergeordetesZiel": this.counterUebergeordetesZiel,
          "CounterVerlaufsziel": this.counterVerlaufsziel,
          "Ernaehrungsempfehlung": this.ernaehrungsempfehlung,
          "Interventionsform": [this.interventionsform, this.interventionsformAndere],
          "WeitereAnmerkungenInterventionform": this.weitereAnmerkungenInterventionform,
          "ZeitraumIntervention": this.zeitraumIntervention,
          "FrequenzInterventionen": this.frequenzInterventionen,
          "PlanungEinzelberatung": this.planungEinzelberatung,
          "PlanungGruppenschulung": this.planungGruppenschulung,
          "PlanungEinkaufstraining": this.planungEinkaufstraining,
          "PlanungLehrkueche": this.planungLehrkueche,
          "PlanungAndereInterventionsform": this.planungAndereInterventionsform,
          "WeitereBerufsgruppen": [this.weitereBerufsgruppen, this.weitereBerufsgruppenAndere],
          "Angehoerige": this.angehoerige,
          "WeitereAnmerkungenInterventionNochmal": this.weitereAnmerkungenInterventionNochmal,
          "Monitoring": this.monitoring,
          "JoinMonitoring": this.joinMonitoring,
        },
        "UmsetzungEinzelberatung": this.einzelberatung,
        "UmsetzungGruppenschulung": this.gruppenschulung,
        "UmsetzungEinkaufstraining": this.einkaufstraining,
        "UmsetzungLehrkueche": this.lehrkueche,
        "UmsetzungAndereInterventionsform": this.andereInterventionsform,
        "Zusatznahrung": this.zusatznahrung,
        "EntwicklungZusatznahrung": this.zusatznahrungJa,
        "SonstigesUmsetung": this.sonstigesUmsetung,        
        "EntwicklungMonitoring": this.entwicklungMonitoring,
        evaluation: {
          "EvaluationEntwicklungMonitoring": this.evaluationEntwicklungMonitoring,
          "ZielerreichungUebergeordetesZiel": this.zielerreichungUebergeordetesZiel,
          "BegruendungZielerreichungUebergeordetesZiel": this.begruendungZielerreichungUebergeordetesZiel,
          "ZielerreichungVerlaufsziel": this.zielerreichungVerlaufsziel,
          "BegruendungZielerreichungVerlaufsziel": this.begruendungZielerreichungVerlaufsziel,
          "EvaluationUebergeordetesZiel": this.evaluationUebergeordetesZiel,
          "EvaluationVerlaufsziel": this.evaluationVerlaufsziel,
          "EvaluationWeitersVorgehen": this.evaluationWeitersVorgehen,
        }
      } 
    },
  },
  methods: {
    resetKlient() {
      this.$router.push('/List');

      this.$store.state.vorname = "";
      this.$store.state.nachname = "";
      this.$store.state.geburtsdatum = "";
      this.$store.state.a1.adresse = "";
      this.$store.state.a1.telefonnummer = "";
      this.$store.state.a1.email = "";
      this.$store.state.a1.krankenkasse = "";
      this.$store.state.a1.hausarzt = "";
      this.$store.state.a1.geschlecht = "";
      this.$store.state.a1.herkunft = "";
      this.$store.state.a1.muttersprache = "";
      this.$store.state.a1.schulischeBildung = "";
      this.$store.state.a1.beruflicheBildung = "";
      this.$store.state.a1.beruf = "";
      this.$store.state.a1.artarbeit = [];
      this.$store.state.a1.familienstand = [];
      this.$store.state.a1.wohnsituation = [];
      this.$store.state.a1.wohnsituationAndere = "";
      this.$store.state.a1.personenImHaushalt = "";
      this.$store.state.a1.weitereAnmerkungenZurWohnsituation = "";
      this.$store.state.a1.aktuellGeraucht = "";
      this.$store.state.a1.jemalsGeraucht = "";
      this.$store.state.a1.anzahlZigaretten = "";
      this.$store.state.a1.anzahlTabakprodukte = "";
      this.$store.state.a1.anzahlJahreRauchen = "";
      this.$store.state.a1.beeintraechtigungen = "";
      this.$store.state.a1.beeintraechtigungenVorhanden = [];
      this.$store.state.a1.beeintraechtigungenVorhandenAndere = "";
      this.$store.state.a1.mobil = "";
      this.$store.state.a1.mobileingeschraenkt = [];
      this.$store.state.a1.mobileingeschraenktAndere = "";
      this.$store.state.a1.unterstuetzungMedizinischerVersorgung = "";
      this.$store.state.a1.jaUnterstuetzungMedizinischerVersorgung = [];
      this.$store.state.a1.jaUnterstuetzungMedizinischerVersorgungAndere = "";
      this.$store.state.a1.kontakAktivitaet = "";
      this.$store.state.a1.hobbies = "";
      this.$store.state.a1.medizinischeDiagnose = "";
      this.$store.state.a1.weitereDiagnosen = [];
      this.$store.state.a1.weitereDiagnosenAndere = "";
      this.$store.state.a1.vergangeneDiagnosen = "";
      this.$store.state.a1.psychischeGesundheit = [];
      this.$store.state.a1.psychischeGesundheitAndere = "";
      this.$store.state.a1.gesundheitszustandDerFamilie = [];
      this.$store.state.a1.gesundheitszustandDerFamilieAndere = "";
      this.$store.state.a1.weitereAnmerkungenZumGesundheitszustandDerFamilie = "";
      this.$store.state.a1.schwangerschaft = "";
      this.$store.state.a1.stillzeit = "";
      this.$store.state.a1.uploadAssessment1 = [];
      this.$store.state.a2.uploadErnahrungsprotokoll = [];
      this.$store.state.a2.anzahlRecall = 0;
      this.$store.state.a2.recall = [];
      this.$store.state.a2.weitereGetraenke= "";
      this.$store.state.a2.anzahlMahlzeitenRecall = "";
      this.$store.state.a2.mahlzeitenNormalerweise = "";
      this.$store.state.a2.mahlzeitenWeggelassen = [];
      this.$store.state.a2.mahlzeitenZusaetzlich = [];
      this.$store.state.a2.mahlzeitenZusaetzlichAndere = "";
      this.$store.state.a2.weitereAnmerkungenRecall = "";
      this.$store.state.a2.getraenke = "";
      this.$store.state.a2.gemuese = "";
      this.$store.state.a2.obst = "";
      this.$store.state.a2.getreideprodukte = "";
      this.$store.state.a2.milch = "";
      this.$store.state.a2.fleisch = "";
      this.$store.state.a2.fisch = "";
      this.$store.state.a2.ei = "";
      this.$store.state.a2.fette = "";
      this.$store.state.a2.suessigkeiten = "";
      this.$store.state.a2.pikanteSnacks = "";
      this.$store.state.a2.energie = "";
      this.$store.state.a2.wasser = "";
      this.$store.state.a2.eiweiss = "";
      this.$store.state.a2.kohlenhydrate = "";
      this.$store.state.a2.zucker = "";
      this.$store.state.a2.ballaststoffe = "";
      this.$store.state.a2.gesamtfett = "";
      this.$store.state.a2.gesaettigteFettsaeuren = "";
      this.$store.state.a2.einfachUngesaettigte = "";
      this.$store.state.a2.mehrfachUngesaettigte = "";
      this.$store.state.a2.cholesterin = "";
      this.$store.state.a2.vitamine = [[{title: "", vmodel:"", input:true, button:true},{value: "weniger",id:"Vitamine0Weniger",name:"Vitamine0"},{value: "entsprechend der Ernährungsempfehlung",id:"VitamineWeniger",name:"Vitamine0"},{value: "mehr",id:"Vitamine0Mehr",name:"Vitamine0"},]];
      this.$store.state.a2.counterVitamine = 1;
      this.$store.state.a2.mineralstoffe =  [[{title: "", vmodel:"", input:true, button:true},{value: "weniger",id:"Mineralstoffe0Weniger",name:"Mineralstoffe0"},{value: "entsprechend der Ernährungsempfehlung",id:"MineralstoffeWeniger",name:"Mineralstoffe0"},{value: "mehr",id:"Mineralstoffe0Mehr",name:"Mineralstoffe0"}, ]];
      this.$store.state.a2.counterMineralstoffe = 1;
      this.$store.state.a2.vorlieben = "";
      this.$store.state.a2.abneigungen = "";
      this.$store.state.a2.eigenstaendigeDiaet = "";
      this.$store.state.a2.eigenstaendigeDiaetJa = "";
      this.$store.state.a2.mahlzeitenAusserHaus = "";
      this.$store.state.a2.mahlzeitenAusserHausJa = "";
      this.$store.state.a2.diaetischeKostform = "";
      this.$store.state.a2.diaetischeKostformJa = [];
      this.$store.state.a2.diaetischeKostformJaAndere = "";
      this.$store.state.a2.enteraleErnaehrung = "";
      this.$store.state.a2.enteraleErnaehrungJa = "";
      this.$store.state.a2.medikamente = "";
      this.$store.state.a2.medikamenteJa = "";
      this.$store.state.a2.uploadAssessment2 = [];
      this.$store.state.a3.plantMahlzeiten = [];
      this.$store.state.a3.plantMahlzeitenAndere = "";
      this.$store.state.a3.bereitetMahlzeiten = [];
      this.$store.state.a3.bereitetMahlzeitenAndere = "";
      this.$store.state.a3.weitereAnmerkungenMahlzeiten = "";
      this.$store.state.a3.lebensmitteleinkauf = [];
      this.$store.state.a3.lebensmitteleinkaufAndere = "";
      this.$store.state.a3.selbstversorgen = "";
      this.$store.state.a3.selbstversorgenEingeschraenkt = "";
      this.$store.state.a3.selbstversorgenNein = "";
      this.$store.state.a3.einfachheitMahlzeitZuzubereiten = "";
      this.$store.state.a3.begruendungMahlzeitZuzubereiten = "";
      this.$store.state.a3.informationErnaehrung = [];
      this.$store.state.a3.informationErnaehrungAndere = "";
      this.$store.state.a3.weitereAnmerkungenInformationsquellen = "";
      this.$store.state.a3.orientierungErnaehrung = "";
      this.$store.state.a3.wichtigkeitDerEmpfehlung = "";
      this.$store.state.a3.wichtigkeitDerFrische = "";
      this.$store.state.a3.wichtigkeitDesGeschmacks = "";
      this.$store.state.a3.wichtigkeitDerGesundheit = "";
      this.$store.state.a3.wichtigkeitEinesGeringenPreises = "";
      this.$store.state.a3.wichtigkeitDerRegionalitaet = "";
      this.$store.state.a3.wichtigkeitDerSaisonalitaet = "";
      this.$store.state.a3.wichtigkeitAndere = [[{title:"", vmodel:"", input:true, button:true},{value:"sehr wichtig", id:"andere0sehrWichtig", name:"andere0"},{value:"wichtig", id:"andere0wichtig", name:"andere0"},{value:"eher wichtig", id:"andere0eherWichtig", name:"andere0"},{value:"eher unwichtig", id:"andere0eherUnwichtig", name:"andere0"},{value:"unwichtig", id:"andere0unwichtig", name:"andere0"},{value:"sehr unwichtig", id:"andere0sehrUnwichtig", name:"andere0"},]];
      this.$store.state.a3.counterAndere = 1;
      this.$store.state.a3.ernaehrungsgewohnheitenVeraendern = "";
      this.$store.state.a3.begruendungErnaehrungsgewohnheitenVeraendern = "";
      this.$store.state.a3.physicalActivityLevel = "";
      this.$store.state.a3.weitereAnmerkungenAktivitaet = "";
      this.$store.state.a3.whoLaune = 0;
      this.$store.state.a3.whoRuhig = 0;
      this.$store.state.a3.whoAktiv = 0;
      this.$store.state.a3.whoAusgeruht = 0;
      this.$store.state.a3.whoInteressieren = 0;
      this.$store.state.a3.uploadLebensqualitaet = [];
      this.$store.state.a3.uploadAssessment3 = [];
      this.$store.state.a4.koerpergroesse = "";
      this.$store.state.a4.koerpergewicht = "";
      this.$store.state.a4.taillenumfang = "";
      this.$store.state.a4.hautfaltendicke = "";
      this.$store.state.a4.fettfreieMasse = "";
      this.$store.state.a4.fettmasse = "";
      this.$store.state.a4.ruheenergieumsatz = "";
      this.$store.state.a4.chemieMetabolischeParameter = "";
      this.$store.state.a4.vitalzeichen = "";
      this.$store.state.a4.weitereMessungen = "";
      this.$store.state.a4.schlucken = "";
      this.$store.state.a4.schluckenJaAber = "";
      this.$store.state.a4.schluckenNein = "";
      this.$store.state.a4.erbrechen = "";
      this.$store.state.a4.erbrechenJa = "";
      this.$store.state.a4.mundgesundheit = [];
      this.$store.state.a4.mundgesundheitAndere = "";
      this.$store.state.a4.problemeNahrungsaufnahme = "";
      this.$store.state.a4.appetitBeeintraechtigung = "";
      this.$store.state.a4.weitereKoerperlicheBefunde = "";
      this.$store.state.a3.uploadAssessment4 = [];
      this.$store.state.d.diagnosestellung = [[{title: "Diätetisches Problem", vmodel:"", id:"diaetetischesProblem0", myTipp:"Informationen hierzu finden Sie im Assessment in der Kategorie Ernährungsgewohnheiten."},{title: "Ätiologie/Ursache", vmodel:"", id:"ursache0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie  Verhalten & Umfeld, aber auch in Klient*innengeschichte, Ernährungsgewohnheiten."},{title: "Zeichen und Symptome", vmodel:"",id:"symptome0", myTipp:"Informationen hierzu finden Sie im Assessment, in den Kategorien Klinischer Status und Ernährungsgewohnheiten."},{title: "Positive Ressourcen", vmodel:"", id:"positiveRessourcen0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie  Verhalten & Umfeld, aber auch in Klient*innengeschichte, Ernährungsgewohnheiten."},{title: "Negative Ressourcen", vmodel:"", id:"negativeRessourcen0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie  Verhalten & Umfeld, aber auch in Klient*innengeschichte, Ernährungsgewohnheiten."},]];
      this.$store.state.d.pasr = [];
      this.$store.state.d.counter = 1;
      this.$store.state.d.error = [];
      this.$store.state.d.errorList = [[]];
      this.$store.state.p.priorisierung = [];
      this.$store.state.p.leitlinien = "";
      this.$store.state.p.uebergeordetesZiel = [{title: "Übergeordnetes Ziel (diätetisches Outcome)", vmodel:"", id:"uebergeordetesZiel0"}];
      this.$store.state.p.counterUebergeordetesZiel = 1;
      this.$store.state.p.verlaufsziel = [{title: "Verlaufsziel", vmodel:"", id:"verlaufsziel0"}];
      this.$store.state.p.counterVerlaufsziel = 1;
      this.$store.state.p.ernaehrungsempfehlung = "";
      this.$store.state.p.interventionsform = [];
      this.$store.state.p.interventionsformAndere = "";
      this.$store.state.p.weitereAnmerkungenInterventionform = "";
      this.$store.state.p.zeitraumIntervention = "";
      this.$store.state.p.frequenzInterventionen = "";
      this.$store.state.p.planungEinzelberatung = [{dauer: "",inhalt: "",materialien: "",weitereAnmerkungen: "",}];
      this.$store.state.p.planungGruppenschulung = [{dauer: "",inhalt: "",materialien: "",weitereAnmerkungen: "",}];
      this.$store.state.p.planungEinkaufstraining = [{dauer: "",inhalt: "",materialien: "",weitereAnmerkungen: "",}];
      this.$store.state.p.planungLehrkueche = [{dauer: "",inhalt: "",materialien: "",weitereAnmerkungen: "",}];
      this.$store.state.p.planungAndereInterventionsform = [{dauer: "",inhalt: "",materialien: "",weitereAnmerkungen: "",}];
      this.$store.state.p.weitereBerufsgruppen = [];
      this.$store.state.p.weitereBerufsgruppenAndere = "";
      this.$store.state.p.angehoerige = "";
      this.$store.state.p.weitereAnmerkungenInterventionNochmal = "";
      this.$store.state.p.monitoring = [[{title:"", input:true},{title:"", input:true},{button:true}]];
      this.$store.state.p.einzelberatung = [{datum: "",dauer:"",inhalt: "",materialien: "",ergebnis:"",probleme:"",anmerkungen:"",}];
      this.$store.state.p.gruppenschulung = [{datum: "",dauer:"",inhalt: "",materialien: "",ergebnis:"",probleme:"",anmerkungen:"",}];
      this.$store.state.p.einkaufstraining = [{datum: "",dauer:"",inhalt: "",materialien: "",ergebnis:"",probleme:"",anmerkungen:"",}];
      this.$store.state.p.lehrkueche = [{datum: "",dauer:"",inhalt: "",materialien: "",ergebnis:"",probleme:"",anmerkungen:"",}];
      this.$store.state.p.andereInterventionsform = [{datum: "",dauer:"",inhalt: "",materialien: "",ergebnis:"",probleme:"",anmerkungen:"",}];
      this.$store.state.u.zusatznahrung = "";
      this.$store.state.u.zusatznahrungJa = [{datum: "",produktbezeichnung:"",verzehrshaeufigkeit:"",menge:""}];
      this.$store.state.u.sonstigesUmsetung = "";
      this.$store.state.p.entwicklungMonitoring = [[{datum: "",ergebnisse:"", }]];
      this.$store.state.e.evaluationEntwicklungMonitoring = [];
      this.$store.state.e.zielerreichungUebergeordetesZiel = [];
      this.$store.state.e.begruendungZielerreichungUebergeordetesZiel = [];
      this.$store.state.e.zielerreichungVerlaufsziel = [];
      this.$store.state.e.begruendungZielerreichungVerlaufsziel = [];
      this.$store.state.e.evaluationWeitersVorgehen = "";
    },       
  }
}