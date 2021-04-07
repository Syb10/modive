const {Schema, model} = require('mongoose');

const patientSchema = new Schema(
    {
      vorname: {
        type: String,
        required: [true, 'Name ist ein Pflichtfeld'],   
      },
      nachname: {
        type: String,
        required: [true, 'Name ist ein Pflichtfeld'],   
      },
      geburtsdatum: {
        type: Date,
        required: [true, 'Geburtsdatum ist ein Pflichtfeld'],
      },
      assessment1:{
        geschlecht: String,
        herkunft: String,
        muttersprache: String,
        schulischeBildung: String,
        beruflicheBildung: String,
        beruf: String,
        artarbeit: String,
        familienstand: String,
        wohnsituation: String,
        personenImHaushalt: Number,
        aktuellGeraucht: String,
        jemalsGeraucht: String,
        anzahlZigaretten: Number,
        anzahlTabakprodukte: Number,
        anzahlJahreRauchen: Number,
        beeintraechtigungen: String,
        beeintraechtigungenVorhanden: String,
        mobil: String,
        mobileingeschraenkt: String
      },
      assessment3:{ 
        koerpergroesse: Number,
        koerpergewicht: Number,
        bmi: Number,
      }  
    },
    {timestamps:true},
);

module.exports = model ('patienten', patientSchema);