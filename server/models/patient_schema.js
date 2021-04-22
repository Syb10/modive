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
        VorhandendeBeeintraechtigungen: String,
        mobil: String,
        mobilEingeschränktDurch: String
      },
      assessment2: {

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