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
        geschlecht: [],
        herkunft: String,
        muttersprache: String,
        koerpergroesse: Number,
        koerpergewicht: Number,
        bmi:Number,
    },
    {timestamps:true},
);

module.exports = model ('patienten', patientSchema);