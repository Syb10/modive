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
      assessment2: {
        Recall: String
      },
      assessment3: {
        WerPlantDieMahlzeiten: String,
        WerBereitetDieMahlzeitenZu: String,
        WerTätigtDenLebensmitteleinkauf: String,
        selbstversorgen: String,
        SelbstversorgungIstEingeschränkt: String,
        SelbstversorgungIstNichtMöglich: String,
        EinfachheitMahlzeitZuzubereiten: String,
        WichtigkeitDerEmpfehlung: String,
        WichtigkeitDerFrische: String
      },
      assessment4: { 
        Körpergröße: Number,
        Körpergewicht: Number,
        bmi: Number,
      }  
    },
    {timestamps:true},
);

module.exports = model ('patienten', patientSchema);