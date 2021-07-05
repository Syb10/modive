<template>
  <!--<p>{{patient}}</p>
  <p>hallo {{patient.Recall.table[0][0].mahlzeit}}</p>-->
  <h3> {{ patient.Nachname }}, {{ patient.Vorname }} </h3>
  <h5> Geburtsdatum: {{  changeDate(patient.Geburtsdatum) }}</h5>
  <p class="assessmentAspekt">Patient*innenhistorie/Krankengeschichte</p>
 <ul v-for="(value, key, index) in patient.assessment1" :key="index">
      <div v-for="(mykey, myIndex) in assessment1" :key="myIndex">
        <li v-show="key === mykey.key">{{assessment1[myIndex].title}} : {{value}}</li>
      </div>
  </ul>
  <p class="assessmentAspekt">Ernährungsgewohnheiten</p>
<!--
  <p>24-h-Recall</p>
  <div  v-for="(recallMahlzeiten, index) in patient.Recall.table" :key="index">
    {{patient.Recall[0]['table'][index][0].datum}}
    <table class="mb-3 table table-striped table-bordered">
      <thead>
        <th>Mahlzeit</th>
        <th>Uhrzeit</th>
        <th>Wo wurde gegessen</th>
        <th>Mit wem wurde gegessen</th>
        <th>Lebensmittel und Getänke</th>
        <th>Menge</th>
      </thead>
      <tbody>
        <tr v-for="(recallMahlzeit, index) in recallMahlzeiten" :key="index">
          <td>{{recallMahlzeit.mahlzeit}}</td>
          <td>{{recallMahlzeit.uhrzeit}}</td>
          <td>{{recallMahlzeit.wo}}</td>
          <td>{{recallMahlzeit.wer}}</td>
          <td>{{recallMahlzeit.lebensmittelGetraenke}}</td>
          <td>{{recallMahlzeit.menge}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  {{patient.Recall.table}}-->
 <ul v-for="(value, key, index) in patient.assessment2" :key="index">
      <div v-for="(mykey, myIndex) in assessment2" :key="myIndex">
        <li v-show="key === mykey.key">{{assessment2[myIndex].title}} : {{value}}</li>
      </div>
  </ul>
  <div>
    <p v-if="patient.bilanzierung">Bilanzierung</p>
    <ul v-for="(value, key) in patient.bilanzierung" :key="key">
      <div v-for="(mykey, myIndex) in bilanzierung" :key="myIndex">
        <li v-show="key === mykey.key">{{bilanzierung[myIndex].title}} : {{value}}</li>
      </div>
    </ul>
  </div>  
  <p class="assessmentAspekt">Verhalten und Umfeld</p>
  <ul v-for="(value, key, index) in patient.assessment3" :key="index">
      <div v-for="(mykey, myIndex) in assessment3" :key="myIndex">
        <li v-show="key === mykey.key">{{assessment3[myIndex].title}} : {{value}}</li>
      </div>
  </ul>
  <p class="assessmentAspekt">Klinischer Status</p>
  <ul v-for="(value, key) in patient.assessment4" :key="key">
      <div v-for="(mykey, myIndex) in assessment4" :key="myIndex">
        <li v-show="key === mykey.key">{{assessment4[myIndex].title}} : {{value}}</li>
      </div>
  </ul>
  <p class="diagnosestellungAspekt">Diagnosestellung</p>
  <p v-html="patient.diagnosestellung"></p>
  <p class="planungAspekt">Planung der Intervention</p>
  <ul>
    <li v-if="patient.priorisierung">Priorisierung der PASR-Statements</li>
    <div v-html="patient.priorisierung"></div>
  </ul>
  <ul v-for="(value, key) in patient.planung" :key="key">
      <div v-for="(mykey, myIndex) in planung" :key="myIndex">
        <li v-show="key === mykey.key">{{planung[myIndex].title}} : {{value}}</li>
      </div>
  </ul>
</template>

<script>
  import axios from "axios"
  import moment from 'moment';

  export default {
    name: "Show",
    data () {
      return {
        patient: [],
        assessment1:[
          {key: "Adresse", title:"Adresse"},
          {key: "Telefonnummer", title:"Telefonnummer"},
          {key: "Email", title:"E-Mail"},
          {key: "Krankenkasse", title:"Krankenkasse"},
          {key: "Hausarzt", title:"Hausarzt*in"},
          {key: "Geschlecht", title:"Geschlecht"},
          {key: "Herkunft", title:"Herkunft"},
          {key: "Muttersprache", title:"Muttersprache"},
          {key: "SchulischeBildung", title:"Höchster schulischer Abschluss"},
          {key: "BeruflicheBildung", title:"Höchster berufliche Abschluss"},
          {key: "Beruf", title:"ausgeübter Beruf"},
          {key: "Familienstand", title:"Familienstand"},
          {key: "Wohnsituation", title:"Wohnsituation"},
          {key: "PersonenImHaushalt", title:"Personen im Haushalt"},
          {key: "aktuellGeraucht", title:"Wird zum aktuellen Zeitpunkt geraucht"},
          {key: "jemalsGeraucht", title:"Wurde jemals geraucht"},
          {key: "AnzahlZigaretten", title:"Anzahl der Zigaretten/Tag"},
          {key: "AnzahlTabakprodukte", title:"Anzahl der Tabakprodukte/Tag"},
          {key: "AnzahlJahreRauchen", title:"Anzahl an Jahren, in denen bisher geraucht wurde"},
          {key: "Beeintraechtigungen", title:"Körperliche Beeinträchtigungen"},
          {key: "mobil", title:"mobil"},
          {key: "KontakAktivitaet", title:"Kontakt/Aktivität in sozialen Strukturen"},
          {key: "Hobbies", title:"Hobbies/Freizeitbeschäftigungen"},
          {key: "UnterstuetzungMedizinischerVersorgung", title:"Ist Unterstützung bei medizinischer/pflegerischer Versorgung notwendig"},
          {key: "MedizinischeDiagnose", title:"Medizinische Diagnose"},
          {key: "weitereDiagnosen", title:"weitere Diagnosen"},
          {key: "vergangeneDiagnosen", title:"vergangene Diagnosen"},
          {key: "PsychischeGesundheit", title:"Psychische Gesundheit"},
          {key: "GesundheitszustandDerFamilie", title:"Gesundheitszustand der Familie"},
          {key: "Schwangerschaft", title:"Schwangerschaft"},
          {key: "Stillzeit", title:"Stillzeit"},
        ],
        assessment2:[
          {key: "weitereAnmerkungenZumRecall", title:"weitere Anmerkungen zum 24-h-Recall"},
          {key: "Vorlieben", title:"Vorlieben für Lebensmittel, Speisen und Getränke"},
          {key: "Abneigungen", title:"Abneigungen für Lebensmittel, Speisen und Getränke"},
          {key: "AnzahlMahlzeitenRecall", title:"Ist die im 24-h-Recall angegebene Anzahl an Mahlzeiten gewöhnlich"},
          {key: "MahlzeitenNormalerweise", title:"Wie viele Mahlzeiten werden normalerweise verzehrt"},
          {key: "MahlzeitenWeggelassen", title:"Diese Mahlzeiten werden weggelassen"},
          {key: "MahlzeitenZusaetzlich", title:"Diese Mahlzeiten werden zusätzlich gegessen"},
          {key: "EigenstaendigeDiaet", title:"Wird eigenständig eine bestimmte Diät oder Ernährungsweise durchgeführt"},
          {key: "MahlzeitenAusserHaus", title:"Werden Mahlzeiten außer Haus verzehrt"},
          {key: "DiaetischeKostform", title:"Wird/wurde eine diätische Kostform angewendet"},
          {key: "EnteraleErnaehrung", title:"Wird eine enterale, parenterale Ernährung oder Zusatznahrung eingesetzt"},
          {key: "Medikamente", title:"Medikamente"},
        ],
        bilanzierung:[
          {key: "Getränke", title:"Getränke"},
          {key: "Gemüse", title:"Gemüse"},
          {key: "Obst", title:"Obst"},
          {key: "Getreideprodukte", title:"Getreideprodukte/Kartoffeln"},
          {key: "Milch", title:"Milch und Milchprodukte"},
          {key: "Fleisch", title:"Fleisch/-waren, Wurst/-waren"}, 
          {key: "Fisch", title:"Fisch"},
          {key: "Ei", title:"Ei"},
          {key: "Fette", title:"Fette/Öle"},
          {key: "Suessigkeiten", title:"Süßigkeiten"},
          {key: "PikanteSnacks", title:"Pikante Snacks"},
          {key: "Energie", title:"Energie (kcal)"},
          {key: "Eiweiss", title:"Eiweiß"},
          {key: "Kohlenhydrate", title:"Kohlenhydrate"},
          {key: "Ballaststoffe", title:"Ballaststoffe"},
          {key: "Zucker", title:"Zucker"},
          {key: "Gesamtfett", title:"Gesamtfett"},
          {key: "GesaettigteFettsaeuren", title:"Gesättigte Fettsäuren"},
          {key: "EinfachUngesaettigte", title:"Einfach ungesättigte Fettsäuren"},
          {key: "MehrfachUngesaettigte", title:"Mehrfach ungesättigte Fettsäuren"},
          {key: "Cholesterin", title:"Cholesterin"},
          {key: "Vitamine", title:"Vitamine"},
          {key: "Mineralstoffe", title:"Mineralstoffe"},
        ],
        assessment3:[
          {key: "PlantMahlzeiten", title:"Wer plant die Mahlzeiten"},
          {key: "BereitetMahlzeiten", title:"Wer bereitet die Mahlzeiten zu"},
          {key: "Lebensmitteleinkauf", title:"Wer tätigt den Lebensmitteleinkauf"},
          {key: "Selbstversorgung", title:"Ist der/die Klient*in psychisch und physisch in der Lage, sich selbst zu versorgen"},
          {key: "EinfachheitMahlzeitZuzubereiten", title:"Für wie einfach beurteilt der/die Klient*in es, an einem normalen Tag eine ausgewogene Mahlzeit zu Hause zuzubereiten"},   
          {key: "InformationErnaehrung", title:"Wo informiert sich der/die Klient*in über Ernährung?"},
          {key: "OrientierungErnaehrung", title:"Woran orientiert sich der/die Klient*in bei seiner/ihrer Ernährung? "},
          {key: "WichtigkeitDerEmpfehlung", title:"Wie wichtig ist es dem/der Klient*in, diesen Empfehlungen zu folgen"},
          {key: "WichtigkeitDerFrische", title:"Wichtigkeit der Frische"},
          {key: "WichtigkeitDesGeschmacks", title:"Wichtigkeit des Geschmacks"},
          {key: "WichtigkeitDerGesundheit", title:"Wichtigkeit der Gesundheit"},
          {key: "WichtigkeitEinesGeringenPreises", title:"Wichtigkeit eines geringen Preises"},
          {key: "WichtigkeitDerRegionalitaet", title:"Wichtigkeit der Regionalität"},
          {key: "WichtigkeitDerSaisonalitaet", title:"Wichtigkeit der Saisonalität"},
          {key: "WichtigkeitAndere", title:"Wichtigkeit von anderen Aspekten"},
          {key: "ErnaehrungsgewohnheitenVeraendern", title:"Kann sich der/die Klient*in vorstellen, begleitet durch die gemeinsamen Treffen, die Ernährungsgewohnheiten zu verändern?"},
          {key: "PhysicalActivityLevel", title:"PhysicalActivityLevel (PAL)"},
          {key: "WeitereAnmerkungenAktivitaet", title:"Weitere Anmerkungen Aktivität"},
        ],
        assessment4:[
          {key: "Koerpergroesse", title:"Körpergröße"},
          {key: "Koerpergewicht", title:"Körpergewicht"},
          {key: "bmi", title:"bmi"},
          {key: "taillenumfang", title:"Taillenumfang"},
          {key: "hautfaltendicke", title:"Hautfaltendicke"},
          {key: "fettfreieMasse", title:"fettfreie Masse (FFM)"},
          {key: "fettmasse", title:"Fettmasse (FM)"},
          {key: "ruheenergieumsatz", title:"Ruheenergieumsatz"},
          {key: "chemieMetabolischeParameter", title:"Chemie/metabolische Parameter in Blut und Urin"},
          {key: "vitalzeichen", title:"Vitalzeichen"},
          {key: "weitereMessungen", title:"weitere Messungen"},
          {key: "schlucken", title:"Fähigkeit zu schlucken"},
          {key: "erbrechen", title:"Erbrechen"},
          {key: "mundgesundheit", title:"Mundgesundheit"},
          {key: "problemeNahrungsaufnahme", title:"Bei der Nutzung eines Zahnersatzes: Probleme bei der Nahrungsaufnahme"},
          {key: "appetitBeeintraechtigung", title:"Appetit und Beeinträchtigung"},
          {key: "weitereKoerperlicheBefunde", title:"weitere körperliche Befunde"},
        ],
        planung:[
          {key: "zieleKlient", title:"Ziel(e) der/des Klient*in"},
          {key: "leitlinien", title:"verwendete Leitlinien oder Literatur"},
          {key: "zieleIntervention", title:"Ziel(e) der Intervention"},
          {key: "interventionsform", title:"Interventionsform"},
          {key: "weitereAnmerkungenIntervention", title:"weitere Anmerkungen"},
          {key: "monitoring", title:"Monitoring- und Outcome Parameter/Frequenz der Überprüfung"},
          {key: "dauerEinzelberatung", title:"Dauer der Einzelberatung in Minuten"},
          {key: "frequenzInterventionen", title:"Frequenz der Interventionen"},
          {key: "zeitraumIntervention", title:"Zeitraum der gesamten Intervention"},
          {key: "inhaltIntervention", title:"Inhalt der Intervention"},
          {key: "materialien", title:"verwendete Materialien"},
          {key: "weitereBerufsgruppen", title:"Einbezug weiterer Berufsgruppen (Mulitdisziplinarität)"},
          {key: "angehoerige", title:"Einbezug von Angehörigen"},
          {key: "weitereAnmerkungenInterventionNochmal", title:"weitere Anmerkungen"},
        ],
      }
    },
    created() {
      let apiURL = `http://localhost:9000/api/${this.$route.params.id}`;

      axios.get(apiURL).then(res => {
        this.patient = res.data;
      })
    },
    methods:{
      changeDate(value){
        return moment(value).locale('de').format('L');
      }
    }
  }
</script>