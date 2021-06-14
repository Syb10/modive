const {Schema, model} = require('mongoose');

const patientSchema = new Schema(
    {
      Vorname: {
        type: String,
        required: [true, 'Vorname ist ein Pflichtfeld'],   
      },
      Nachname: {
        type: String,
        required: [true, 'Nachname ist ein Pflichtfeld'],   
      },
      Geburtsdatum: {
        type: Date,
        required: [true, 'Geburtsdatum ist ein Pflichtfeld'],
      },
      assessment1: {
        Adresse: String,
        Telefonnummer: String,
        Email: String,
        Krankenkasse: String,
        Hausarzt: String,
        Geschlecht: String,
        Herkunft: String,
        Muttersprache: String,
        SchulischeBildung: String,
        BeruflicheBildung: String,
        Beruf: String,
        ArtDerArbeit: String,
        Familienstand: String,
        Wohnsituation: String,
        PersonenImHaushalt: Number,
        aktuellGeraucht: String,
        jemalsGeraucht: String,
        AnzahlZigaretten: Number,
        AnzahlTabakprodukte: Number,
        AnzahlJahreRauchen: Number,
        Beeinträchtigungen: String,
        mobil: String,
        KontakAktivitaetInSozialenStrukturen: String,
        HobbiesFreizeitbeschäftigungen: String,
        UnterstützungMedizinischerPflegerischerVersorgung: String,
        MedizinischeDiagnose: String,
        weitereDiagnosen: String,
        vergangeneDiagnosen: String,
        PsychischeGesundheit: String,
        GesundheitszustandDerFamilie: String,
        Schwangerschaft: String,
        Stillzeit: String
      },
      Recall: {},
      assessment2: {
        weitereAnmerkungenZumRecall: String,
        VorliebenFürLebensmittelSpeisenUndGetränke:String,
        AbneigungenFürLebensmittelSpeisenUndGetränke: String,
        IstDieImRecallAngegebeneAnzahlAnMahlzeitenGewöhnlich: String,
        WieVieleMahlzeitenWerdenNormalerweiseVerzehrt: String,
        DieseMahlzeitenWerdenWeggelassen: String,
        DieseMahlzeitenWerdenZusätzlichGegessen: String,
        EigenständigeDiätOderErnährungsweiseDurchgeführt: String,
        WerdenMahlzeitenAußerHausVerzehrt: String,
        WirdWurdeEineDiätischeKostformAngewendet: String,
        WirdEineEnteraleParenteraleErnährungOderZusatznahrungEingesetzt: String,
        Medikamente: String,
      },
      bilanzierung:{
        isBilanzierung: Boolean,
        Getränke : String,
        Gemüse: String,
        Obst: String,
        GetreideprodukteKartoffeln: String,
        MilchUndMilchprodukte: String,
        FleischUndWurtswaren: String,
        Fisch: String,
        Ei: String,
        Fette: String,
        Süßigkeiten: String,
        PikanteSnacks: String,
        Energie: String,
        Eiweiß: String,
        Kohlenhydrate: String,
        Ballaststoffe: String,
        Zucker: String,
        Gesamtfett: String,
        GesättigteFettsäuren: String,
        EinfachUngesättigteFettsäuren: String,
        MehrfachUngesättigteFettsäuren: String,
        Cholesterin: String,
        Vitamine: String,
        Mineralstoffe: String,
      },
      assessment3: {
        WerPlantDieMahlzeiten: String,
        WerBereitetDieMahlzeitenZu: String,
        WerTätigtDenLebensmitteleinkauf: String,
        Selbstversorgung: String,
        EinfachheitMahlzeitZuzubereiten: String,
        WoherInformationUeberErnaehrung: String,
        OrientierungErnaehrung: String,
        WichtigkeitDerEmpfehlung: String,
        WichtigkeitDerFrische: String,
        WichtigkeitDesGeschmacks: String,
        WichtigkeitDerGesundheit: String,
        WichtigkeitEinesGeringenPreises: String,
        WichtigkeitDerRegionalitaet: String,
        WichtigkeitDerSaisonalitaet: String,
        WichtigkeitAndere: String,
        ErnaehrungsgewohnheitenVeraendern: String,
        PhysicalActivityLevel: String,
        WeitereAnmerkungenAktivitaet: String,
      },
      assessment4: { 
        Körpergröße: Number,
        Körpergewicht: Number,
        bmi: Number,
        taillenumfang: Number,
        hautfaltendicke: String,
        fettfreieMasse: String,
        ruheenergieumsatz: String,
        chemieMetabolischeParameter: String,
        vitalzeichen: String,
        weitereMessungen: String,
        schlucken: String,
        erbrechen: String,
        mundgesundheit: String,
        problemeNahrungsaufnahme: String,
        appetitBeeintraechtigung: String,
        weitereKoerperlicheBefunde: String,
      }  
    },
    {timestamps:true},
);

module.exports = model ('patienten', patientSchema);