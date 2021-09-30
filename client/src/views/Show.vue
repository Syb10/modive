<template>
  <p @click.prevent="back" class="mb-5"><i class="fa fa-arrow-left"></i> zurück</p>
  <p class="float-right"> erstellt am: {{changeDate(patient.createdAt)}} {{changeTime(patient.createdAt)}} / zuletzt bearbeitet am: {{changeDate(patient.updatedAt)}} {{changeTime(patient.updatedAt)}}</p>
  <h3> {{ patient.Nachname }}, {{ patient.Vorname }} </h3>
  <h5> Geburtsdatum: {{  changeDate(patient.Geburtsdatum) }}</h5>
  <p class="assessmentAspekt">Patient*innenhistorie/Krankengeschichte</p>
  <ul>
    <div v-for="(mykey, myIndex) in assessment1" :key="myIndex">
      <div v-for="(value, key, index) in myAssessment1" :key="index">
        <li v-if="key === mykey.key && value != ''">
          {{assessment1[myIndex].title}}: {{value}}
        </li>
      </div>
    </div>  
  </ul>
  <p class="assessmentAspekt">Ernährungsgewohnheiten</p>
  <ul>
    <li v-if="!isObjectEmpty(myRecall)">24-h-Recall:</li>
    <div  v-for="(item, indexI) in myRecall" :key="indexI">
      {{changeDate(item[0].datum)}}
      <table class="mb-3 table table-striped table-bordered">
        <thead>
          <th>Mahlzeit</th>
          <th>Uhrzeit</th>
          <th>Wo wurde gegessen?</th>
          <th>Mit wem wurde gegessen?</th>
          <th>Lebensmittel und Getänke mit Mengenangaben</th>
        </thead>
        <tbody>
          <tr v-for="(i, index) in item" :key="index">
            <td>{{i.mahlzeit}}</td>
            <td>{{i.uhrzeit}}</td>
            <td>{{i.wo}}</td>
            <td>{{i.wer}}</td>
            <td>{{i.lebensmittelGetraenke}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-for="(mykey, myIndex) in assessment21" :key="myIndex">
      <div v-for="(value, key, index) in myAssessment2" :key="index">
        <li v-if="key === mykey.key">{{assessment21[myIndex].title}}: {{value}}</li>
      </div>
    </div>
    <li v-if="!isObjectEmpty(myBilanzierung)">Bilanzierung:</li>
    <ul>
      <div v-for="(mykey, myIndex) in bilanzierung" :key="myIndex">
        <div v-for="(value, key, index) in myBilanzierung" :key="index">
          <li v-show="key === mykey.key && value != ''">{{bilanzierung[myIndex].title}}: {{value}}</li>
        </div>
      </div>
      <li v-if="!isObjectEmpty(myVitamine)">Vitamine:</li>
      <ul>
        <div v-for="(i, indexV) in myVitamine" :key="indexV">
          <li>{{i[0]}}: {{i[1]}}</li>
        </div>
      </ul>
      <li v-if="!isObjectEmpty(myMineralstoffe)">Mineralstoffe:</li>
      <ul>
        <div v-for="(i, indexM) in myMineralstoffe" :key="indexM">
          <li>{{i[0]}}: {{i[1]}}</li>
        </div>
      </ul>
    </ul>
    <div v-for="(mykey, myIndex) in assessment22" :key="myIndex">
      <div v-for="(value, key, index) in myAssessment2" :key="index">
        <li v-if="key === mykey.key">{{assessment22[myIndex].title}}: {{value}}</li>
      </div>
    </div>  
  </ul>
  <p class="assessmentAspekt">Verhalten und Umfeld</p>
  <ul>
    <div v-for="(mykey, myIndex) in assessment31" :key="myIndex">
      <div v-for="(value, key, index) in myAssessment3" :key="index">
        <li v-show="key === mykey.key">{{assessment31[myIndex].title}}: {{value}}</li>
      </div>
    </div>
    <li v-if="!isObjectEmpty(myWichtigkeit)">Wie wichtig sind dem/der Klient*in die folgenden Punkte beim Lebensmitteleinkauf?</li>
    <ul>
      <div v-for="(mykey, myIndex) in wichtigkeit" :key="myIndex">
        <div v-for="(value, key, index) in myWichtigkeit" :key="index">
          <li v-show="key === mykey.key">{{wichtigkeit[myIndex].title}}: {{value}}</li>
        </div>
      </div>
      <li v-if="!isObjectEmpty(myWichtigkeitAndere)">...andere:</li>
      <ul>
        <div v-for="(i, index) in myWichtigkeitAndere" :key="index">
          <li>{{i[0]}}: {{i[1]}}</li>
        </div>
      </ul>
    </ul>
    <div v-for="(mykey, myIndex) in assessment32" :key="myIndex">
      <div v-for="(value, key, index) in myAssessment3" :key="index">
        <li v-show="key === mykey.key">{{assessment32[myIndex].title}}: {{value}}</li>
      </div>
    </div>
    <li v-if="myAssessment3.WhoProzent">WHO Wellbeing Index:</li>
    <ul v-if="myAssessment3.WhoProzent">
      <li>In den letzten zwei Wochen...</li>
      <div v-for="(mykey, myIndex) in wellbeing" :key="myIndex">
        <div v-for="(value, key, index) in myAssessment3" :key="index">
          <li v-show="key === mykey.key">
            {{wellbeing[myIndex].title}}: 
            {{getWellbeingSatz(value)}} <span v-if="value != 10">({{value}})</span><span v-if="value == 10">(0)</span>
          </li>
        </div>
      </div>
      <li>Lebensqualität: {{myAssessment3.WhoWert}} Punkte ({{myAssessment3.WhoProzent}}%) <i class="fa fa-arrow-right"></i> {{myAssessment3.WhoAuswertung}}</li>
    </ul>  
  </ul>
  <p class="assessmentAspekt">Klinischer Status</p>
  <ul>
    <div v-for="(mykey, myIndex) in assessment4" :key="myIndex">
      <div v-for="(value, key) in myAssessment4" :key="key">
        <li v-show="key === mykey.key">{{assessment4[myIndex].title}}: {{value}}</li>
      </div>
    </div>  
  </ul>
  <p class="diagnosestellungAspekt">Diagnosestellung</p>
  <ul>
    <li v-if="patient.PASR != ''">PASR-Statements</li>
    <ol>
      <div v-for="(i, index) in patient.PASR" :key="index">
        <li v-html="i"></li>
      </div>
    </ol>
  </ul>  
  <p class="planungAspekt">Planung der Intervention</p>
  <ul>
    <li v-if="patient.Priorisierung != ''">Priorisierung der PASR-Statements</li>
    <ol>
      <div v-for="(i, index) in patient.Priorisierung" :key="index">
        <li>Diagnosestellung <i class="fa fa-arrow-right"></i> Priorisierung: {{i}}</li>
      </div>
    </ol>
    <li v-if="!isObjectEmpty(myZieleKlient)">Ziel(e) der/des Klient*in</li>
    <ol>
      <div v-for="(i, index) in myZieleKlient" :key="index">
        <li>{{i.vmodel}}</li>
      </div>
    </ol>
    <li v-if="myPlanung.Leitlinien">verwendete Leitlinien oder Literatur: {{myPlanung.Leitlinien}}</li> 
    <li v-if="!isObjectEmpty(myZieleIntervention)">Ziel(e) der Intervention</li>
    <ol>
      <div v-for="(i, index) in myZieleIntervention" :key="index">
        <li>{{i.vmodel}}</li>
      </div>
    </ol>
    <div v-for="(mykey, myIndex) in planung1" :key="myIndex">
      <div v-for="(value, key) in myPlanung" :key="key">
        <li v-if="key === mykey.key">{{planung1[myIndex].title}}: {{value}}</li>
      </div>
    </div> 
    <li v-if="!isObjectEmpty(myZeitplanung)">Zeitplanung:</li>
      <div v-for="(item, indexI) in myZeitplanung" :key="indexI">
        {{indexI+1}}. Termin:
        <ul>
          <div v-for="(mykey,myIndex) in zeitplanung" :key="myIndex">
            <div v-for="(i, key) in item" :key="key">
              <li v-if="key === mykey.key">{{zeitplanung[myIndex].title}}: {{i}}</li>
            </div>
          </div> 
        </ul>  
      </div>
    <div v-for="(mykey, myIndex) in planung2" :key="myIndex">
      <div v-for="(value, key) in myPlanung" :key="key">
        <li v-if="key === mykey.key">{{planung2[myIndex].title}}: {{value}}</li>
      </div>
    </div>
    <li v-if="!isObjectEmpty(myMonitoring)">Monitoring- und Outcome Parameter / Frequenz der Überprüfung:</li>
    <ul> 
      <div v-for="(item, index) in myMonitoring" :key="index">
        <li>{{item[0]}} / {{item[1]}}</li>
      </div>
    </ul>  
  </ul>
  <p class="umsetzungAspekt">Umsetzung der Intervention</p>
  <ul>
    <li v-if="!isObjectEmpty(myEntwicklungEinzelberatung)">Einzelberatung mit Klient*in</li>
    <div v-for="(item, indexI) in myEntwicklungEinzelberatung" :key="indexI">
      {{indexI+1}}. Termin:
      <ul>
        <div v-for="(mykey,myIndex) in einzelberatung" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{einzelberatung[myIndex].title}}: <span v-if="einzelberatung[myIndex].title == 'Datum der Intervention'">{{changeDate(i)}}</span><span v-if="einzelberatung[myIndex].title != 'Datum der Intervention'">{{i}}</span></li>
          </div>
        </div> 
      </ul>  
    </div>
    <li v-if="patient.Zusatznahrung">Zusatznahrung: {{patient.Zusatznahrung}}</li>
    <div v-for="(item, indexI) in myZusatznahrung" :key="indexI">
      {{indexI+1}}. Zusatznahrung:
      <ul>
        <div v-for="(mykey,myIndex) in zusatznahrung" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{zusatznahrung[myIndex].title}}: <span v-if="zusatznahrung[myIndex].title == 'Datum'">{{changeDate(i)}}</span><span v-if="zusatznahrung[myIndex].title != 'Datum'">{{i}}</span></li>
          </div>
        </div> 
      </ul>  
    </div>
    <li v-if="patient.SonstigesUmsetung">Sonstiges: {{patient.SonstigesUmsetung}}</li>
    <li v-if="!isObjectEmpty(myEntwicklungMonitoring)">Entwicklung der Monitoring-Parameter:</li>
    <div v-for="(item, indexI) in myEntwicklungMonitoring" :key="indexI">
      {{item[0][0]}} / {{item[0][1]}}
      <ul v-for="(i, index) in item[1]" :key="index">
        <li v-if="i.datum != '' && i.ergebnisse != ''">{{changeDate(i.datum)}}: {{i.ergebnisse}}</li>
      </ul>  
    </div>
  </ul>
  <p class="evaluationAspekt">Outcome Evaluation</p>
  <ul>
    <li v-if="!isObjectEmpty(myEvaluationEntwicklungMonitoring)">Entwicklung der Monitoring- und Outcome Parameter</li>
    <ul>
      <div v-for="(item, indexI) in myEvaluationEntwicklungMonitoring" :key="indexI">
        <li>{{item[0][0]}} / {{item[0][1]}} <i class="fa fa-arrow-right"></i> {{item[1]}}</li>
      </div>
    </ul>
    <li v-if="!isObjectEmpty(myEvaluationZieleKlient)">Zielerreichung Klient*in</li>
    <ul v-for="(i, index) in myEvaluationZieleKlient" :key="index">
      <li v-html="i"></li>
    </ul>
    <li v-if="!isObjectEmpty(myEvaluationZieleIntervention)">Zielerreichung Intervention</li>
    <ul v-for="(i, index) in myEvaluationZieleIntervention" :key="index">
      <li v-html="i"></li>
    </ul>
    <li v-if="myEvaluationWeitersVorgehen != ''">Weiteres Vorgehen: {{myEvaluationWeitersVorgehen}}</li>
  </ul>
</template>

<script>
  import axios from "axios"
  import moment from 'moment';
  import {navMixin} from "../mixins/navMixin.js";

  export default {
    name: "Show",
    mixins:[navMixin],
    data () {
      return {
        patient: [],
        myAssessment1: [],
        myAssessment2: [],
        myRecall: [],
        myBilanzierung: [],
        myVitamine: [],
        myMineralstoffe: [],
        myAssessment3: [],
        myWichtigkeit: [],
        myWichtigkeitAndere:[],
        myAssessment4: [],
        myPlanung:[],
        myZieleKlient: [],
        myZieleIntervention: [],
        myZeitplanung:[],
        myMonitoring: [],
        myEntwicklungEinzelberatung: [],
        myZusatznahrung: [],
        myEntwicklungMonitoring: [],
        myEvaluationEntwicklungMonitoring: [],
        myEvaluationZieleKlient: [],
        myEvaluationZieleIntervention: [],
        myEvaluationWeitersVorgehen: [],
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
          {key: "weitereAngabenBeruf", title:"weitere Angaben zum ausgeübten Beruf"},
          {key: "Familienstand", title:"Familienstand"},
          {key: "Wohnsituation", title:"Wohnsituation"},
          {key: "PersonenImHaushalt", title:"Personen im Haushalt"},
          {key: "WeitereAnmerkungenZurWohnsituation", title:"weitere Anmerkungen zur Wohnsituation"},
          {key: "aktuellGeraucht", title:"Wird zum aktuellen Zeitpunkt geraucht"},
          {key: "jemalsGeraucht", title:"Wurde jemals geraucht"},
          {key: "AnzahlZigaretten", title:"Anzahl der Zigaretten/Tag"},
          {key: "AnzahlTabakprodukte", title:"Anzahl der Tabakprodukte/Tag"},
          {key: "AnzahlJahreRauchen", title:"Anzahl an Jahren, in denen bisher geraucht wurde"},
          {key: "Beeintraechtigungen", title:"Körperliche Beeinträchtigungen"},
          {key: "mobil", title:"Mobilität"},
          {key: "UnterstuetzungMedizinischerVersorgung", title:"Ist Unterstützung bei medizinischer/pflegerischer Versorgung notwendig"},
          {key: "KontakAktivitaet", title:"Kontakt/Aktivität in sozialen Strukturen"},
          {key: "Hobbies", title:"Hobbies/Freizeitbeschäftigungen"},
          {key: "MedizinischeDiagnose", title:"Medizinische Diagnose"},
          {key: "weitereDiagnosen", title:"weitere Diagnosen"},
          {key: "vergangeneDiagnosen", title:"vergangene Diagnosen"},
          {key: "PsychischeGesundheit", title:"Psychische Gesundheit"},
          {key: "GesundheitszustandDerFamilie", title:"Gesundheitszustand der Familie"},
          {key: "WeitereAnmerkungenZumGesundheitszustandDerFamilie", title: "weitere Anmerkungen zum Gesundheitszustand der Familie"},
          {key: "Schwangerschaft", title:"Schwangerschaft"},
          {key: "Stillzeit", title:"Stillzeit"},
        ],
        assessment21:[
          {key: "weitereGetraenke", title: "weitere Getränke"},
          {key: "AnzahlMahlzeitenRecall", title:"Ist die im 24-h-Recall angegebene Anzahl an Mahlzeiten gewöhnlich"},
          {key: "MahlzeitenNormalerweise", title:"Wie viele Mahlzeiten werden normalerweise verzehrt"},
          {key: "MahlzeitenWeggelassen", title:"Diese Mahlzeiten werden weggelassen"},
          {key: "MahlzeitenZusaetzlich", title:"Diese Mahlzeiten werden zusätzlich gegessen"},
          {key: "weitereAnmerkungenRecall", title:"weitere Anmerkungen zur durchgeführten Ernährungsmethode"},
        ],
        bilanzierung:[
          {key: "Getraenke", title:"Getränke"},
          {key: "Gemuese", title:"Gemüse"},
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
          {key: "Wasser", title:"Wasser (ml)"},
          {key: "Eiweiss", title:"Eiweiß"},
          {key: "Kohlenhydrate", title:"Kohlenhydrate"},
          {key: "Ballaststoffe", title:"Ballaststoffe"},
          {key: "Zucker", title:"Zucker"},
          {key: "Gesamtfett", title:"Gesamtfett"},
          {key: "GesaettigteFettsaeuren", title:"Gesättigte Fettsäuren"},
          {key: "EinfachUngesaettigte", title:"Einfach ungesättigte Fettsäuren"},
          {key: "MehrfachUngesaettigte", title:"Mehrfach ungesättigte Fettsäuren"},
          {key: "Cholesterin", title:"Cholesterin"},
        ],
        assessment22:[
          {key: "Vorlieben", title:"Vorlieben für Lebensmittel, Speisen und Getränke"},
          {key: "Abneigungen", title:"Abneigungen für Lebensmittel, Speisen und Getränke"},
          {key: "EigenstaendigeDiaet", title:"Wird eigenständig eine bestimmte Diät oder Ernährungsweise durchgeführt"},
          {key: "MahlzeitenAusserHaus", title:"Werden Mahlzeiten außer Haus verzehrt"},
          {key: "DiaetischeKostform", title:"Wird/wurde eine diätische Kostform angewendet"},
          {key: "EnteraleErnaehrung", title:"Wird eine enterale, parenterale Ernährung oder Zusatznahrung eingesetzt"},
          {key: "Medikamente", title:"Medikamente"},
        ],
        assessment31:[
          {key: "PlantMahlzeiten", title:"Wer plant die Mahlzeiten"},
          {key: "BereitetMahlzeiten", title:"Wer bereitet die Mahlzeiten zu"},
          {key: "weitereAnmerkungenMahlzeiten", title: "Weitere Anmerkungen zur Planung und Zubereitung von Mahlzeiten"},
          {key: "Lebensmitteleinkauf", title:"Wer tätigt den Lebensmitteleinkauf"},
          {key: "Selbstversorgen", title:"Ist der/die Klient*in psychisch und physisch in der Lage, sich selbst zu versorgen"},
          {key: "EinfachheitMahlzeitZuzubereiten", title:"Für wie einfach beurteilt der/die Klient*in es, an einem normalen Tag eine ausgewogene Mahlzeit zu Hause zuzubereiten"},   
          {key: "InformationErnaehrung", title:"Wo informiert sich der/die Klient*in über Ernährung?"},
          {key: "weitereAnmerkungenInformationsquellen", title: "Weitere Anmerkungen zu den Informationsquellen über Ernährung"},
          {key: "OrientierungErnaehrung", title:"Woran orientiert sich der/die Klient*in bei seiner/ihrer Ernährung? "},
          {key: "WichtigkeitDerEmpfehlung", title:"Wie wichtig ist es dem/der Klient*in, diesen Empfehlungen zu folgen"},
        ],
        wichtigkeit: [
          {key: "WichtigkeitDerFrische", title:"...Frische"},
          {key: "WichtigkeitDesGeschmacks", title:"...Geschmacks"},
          {key: "WichtigkeitDerGesundheit", title:"...Gesundheit"},
          {key: "WichtigkeitEinesGeringenPreises", title:"...Preis"},
          {key: "WichtigkeitDerRegionalitaet", title:"...Regionalität"},
          {key: "WichtigkeitDerSaisonalitaet", title:"...Saisonalität"},
        ],
        assessment32:[
          {key: "ErnaehrungsgewohnheitenVeraendern", title:"Kann sich der/die Klient*in vorstellen, begleitet durch die gemeinsamen Treffen, die Ernährungsgewohnheiten zu verändern?"},
          {key: "PhysicalActivityLevel", title:"PhysicalActivityLevel (PAL)"},
          {key: "WeitereAnmerkungenAktivitaet", title:"Weitere Anmerkungen Aktivität"},
        ],
        wellbeing: [
          {key:"WhoLaune", title:"...war der/die Klient*in froh und guter Laune"},
          {key:"WhoRuhig", title:"...hat sich der/die Klient*in ruhig und entspannt gefühlt"},
          {key:"WhoAktiv", title:"...hat sich der/die Klient*in energisch und aktiv gefühlt"},
          {key:"WhoAusgeruht", title:"...hat sich der/die Klient*in beim Aufwachen frisch und ausgeruht gefühlt"},
          {key:"WhoInteressieren", title:"...war der Alltag des/der Klient*in voller Dinge, die er/se interessieren"},
        ],
        assessment4:[
          {key: "Koerpergroesse", title:"Körpergröße"},
          {key: "Koerpergewicht", title:"Körpergewicht"},
          {key: "Bmi", title:"BMI"},
          {key: "Taillenumfang", title:"Taillenumfang"},
          {key: "Hautfaltendicke", title:"Hautfaltendicke"},
          {key: "FettfreieMasse", title:"fettfreie Masse (FFM)"},
          {key: "Fettmasse", title:"Fettmasse (FM)"},
          {key: "Ruheenergieumsatz", title:"Ruheenergieumsatz"},
          {key: "ChemieMetabolischeParameter", title:"Chemie/metabolische Parameter in Blut und Urin"},
          {key: "Vitalzeichen", title:"Vitalzeichen"},
          {key: "WeitereMessungen", title:"weitere Messungen"},
          {key: "Schlucken", title:"Fähigkeit zu schlucken"},
          {key: "Erbrechen", title:"Erbrechen"},
          {key: "Mundgesundheit", title:"Mundgesundheit"},
          {key: "ProblemeNahrungsaufnahme", title:"Bei der Nutzung eines Zahnersatzes: Probleme bei der Nahrungsaufnahme"},
          {key: "AppetitBeeintraechtigung", title:"Appetit und Beeinträchtigung"},
          {key: "WeitereKoerperlicheBefunde", title:"weitere körperliche Befunde"},
        ],
        planung1:[
          {key: "Interventionsform", title:"Interventionsform"},
          {key: "WeitereAnmerkungenInterventionform", title:"weitere Anmerkungen"},
          {key: "ZeitraumIntervention", title:"Zeitraum der gesamten Intervention"},
          {key: "FrequenzInterventionen", title:"Frequenz der Interventionen"},
        ],
        zeitplanung:[
          {key: "dauerEinzelberatung", title: "Dauer der geplanten Einzelberatung (in Minuten)"},
          {key: "inhaltIntervention", title: "Inhalt der geplanten Einzelberatung"},
          {key: "materialien", title: "geplante Materialien"},
          {key: "weitereAnmerkungenInterventionPlanung", title: "weitere Anmerkungen"},
        ],
        planung2:[
          {key: "WeitereBerufsgruppen", title:"Einbezug weiterer Berufsgruppen (Mulitdisziplinarität)"},
          {key: "Angehoerige", title:"Einbezug von Angehörigen"},
          {key: "WeitereAnmerkungenInterventionNochmal", title:"weitere Anmerkungen"},
        ],
        einzelberatung: [
          {key:"datum", title:"Datum der Einzelberatung"},
          {key:"dauer", title:"Dauer der Einzelberatung (in Minuten)"},
          {key:"inhalt", title:"Inhalt der Einzelberatung"},
          {key:"materialien", title:"verwendete Materialien"},
          {key:"ergebnis", title:"Ergebnis der Einzelberatung"},
          {key:"probleme", title:"Probleme in der Umsetzung"},
          {key:"anmerkungen", title:"weitere Anmerkungen"}
        ],
        zusatznahrung: [
          {key:"datum", title:"Datum"},
          {key:"produktbezeichnung", title:"Produktbezeichnung"},
          {key:"verzehrshaeufigkeit", title:"empfohlende Verzehrshäufigkeit pro Tag"},
          {key:"menge", title:"empfohlende Menge pro Tag"}
        ],
      }
    },
    created() {
      let apiURL = `http://localhost:9000/api/${this.$route.params.id}`;

      axios.get(apiURL).then(res => {
        var assessment1 = {};
        for(const i in res.data.assessment1) {
           var val1 = ""
           if(typeof res.data.assessment1[i] == 'object') {
            for(var j=0; j < res.data.assessment1[i].length; j++) {
              if(typeof res.data.assessment1[i][j] == 'object' && res.data.assessment1[i][j] != ''){
                val1 = res.data.assessment1[i].join(' ')
                assessment1[i] = val1
              } else {
                if(res.data.assessment1[i][j] != '') {
                  val1 = res.data.assessment1[i].join(' ')
                  assessment1[i] = val1
                }
              }
            }
           }else {
             if(res.data.assessment1[i] != ''){
               val1 = res.data.assessment1[i]
               assessment1[i] = val1
             }
           }
        }
        var assessment2 = {};
        for(const i in res.data.assessment2) {
           var val2 = ""
           if(typeof res.data.assessment2[i] == 'object') {
            for(var k=0; k < res.data.assessment2[i].length; k++) {
              if(typeof res.data.assessment2[i][k] == 'object' && res.data.assessment2[i][k] != '' ){
                val2 = res.data.assessment2[i].join(' ')
                assessment2[i] = val2
              } else {
                if(res.data.assessment2[i][k] != '') {
                  val2 = res.data.assessment2[i].join(' ')
                  assessment2[i] = val2
                }
              }
            }
           }else {
             if(res.data.assessment2[i] != ''){
               val2 = res.data.assessment2[i]
               assessment2[i] = val2
             }
           }
        }
        var bilanzierung = {}
        for(const i in res.data.bilanzierung) {
          if(res.data.bilanzierung[i] != '' && res.data.bilanzierung[i] != 1){
            bilanzierung = res.data.bilanzierung
          }
        }
        var vitamine = []
        for(const i in res.data.Vitamine) {
          if(res.data.Vitamine[i][0].title != '' || res.data.Vitamine[i][0].vmodel){
            vitamine.push([res.data.Vitamine[i][0].title, res.data.Vitamine[i][0].vmodel])
          }
        }
        var mineralstoffe = []
        for(const i in res.data.Mineralstoffe) {
          if(res.data.Mineralstoffe[i][0].title != '' || res.data.Mineralstoffe[i][0].vmodel != ''){
            mineralstoffe.push([res.data.Mineralstoffe[i][0].title, res.data.Mineralstoffe[i][0].vmodel])
          }
        }
        var assessment3 = {};
        for(const i in res.data.assessment3) {
           var val3 = ""
           if(typeof res.data.assessment3[i] == 'object') {
            for(var l=0; l < res.data.assessment3[i].length; l++) {
              if(typeof res.data.assessment3[i][l] == 'object' && res.data.assessment3[i][l] != ''){
                val3 = res.data.assessment3[i].join(' ')
                assessment3[i] = val3
              } else {
                if(res.data.assessment3[i][l] != '') {
                  val3 = res.data.assessment3[i].join(' ')
                  assessment3[i] = val3
                }
              }
            }
           }else {
             if(res.data.assessment3[i] != ''){
               val3 = res.data.assessment3[i]
               assessment3[i] = val3
             }
           }
        }
        var wichtigkeit = {}
        for(const i in res.data.wichtigkeit) {
          if(res.data.wichtigkeit[i] != '' && res.data.wichtigkeit[i] != 1){
            wichtigkeit = res.data.wichtigkeit
          }
        }
        var wichtigkeitAndere = []
        for(const i in res.data.WichtigkeitAndere) {
          if(res.data.WichtigkeitAndere[i][0].title != '' || res.data.WichtigkeitAndere[i][0].vmodel != ''){
            wichtigkeitAndere.push([res.data.WichtigkeitAndere[i][0].title, res.data.WichtigkeitAndere[i][0].vmodel])
          }
        }
        var assessment4 = {};
        for(const i in res.data.assessment4) {
           var val4 = ""
           if(typeof res.data.assessment4[i] == 'object') {
            for(var m=0; m < res.data.assessment4[i].length; m++) {
              if(typeof res.data.assessment4[i][m] == 'object' && res.data.assessment4[i][m] != ''){
                val4 = res.data.assessment4[i].join(' ')
                assessment4[i] = val4
              } else {
                if(res.data.assessment4[i][m] != '') {
                  val4 = res.data.assessment4[i].join(' ')
                  assessment4[i] = val4
                }
              }
            }
           }else {
             if(res.data.assessment4[i] != ''){
               val4 = res.data.assessment4[i]
               assessment4[i] = val4
             }
           }
        }
        var planung = {};
        for(const i in res.data.planung) {
           var valp = ""
           if(typeof res.data.planung[i] == 'object') {
            for(var n=0; n < res.data.planung[i].length; n++) {
              if(typeof res.data.planung[i][n] == 'object' && res.data.planung[i][n] != ''){
                valp = res.data.planung[i].join(' ')
                planung[i] = valp
              } else {
                if(res.data.planung[i][n] != '') {
                  valp = res.data.planung[i].join(' ')
                  planung[i] = valp
                }
              }
            }
           }else {
             if(res.data.planung[i] != ''){
               valp = res.data.planung[i]
               planung[i] = valp
             }
           }
        }
        var zieleKlient = []
        for(const i in res.data.ZieleKlient) {
          if(res.data.ZieleKlient[i].vmodel != ''){
            zieleKlient.push(res.data.ZieleKlient[i])
          }
        }
        var zieleIntervention = []
        for(const i in res.data.ZieleIntervention) {
          if(res.data.ZieleIntervention[i].vmodel != ''){
            zieleIntervention.push(res.data.ZieleIntervention[i])
          }
        }
        var zeitplanung = []
        for(const i in res.data.planung.Zeitplanung) {
          if(res.data.planung.Zeitplanung[i].dauerEinzelberatung != '' || res.data.planung.Zeitplanung[i].inhaltIntervention != '' || res.data.planung.Zeitplanung[i].materialien != '' || res.data.planung.Zeitplanung[i].weitereAnmerkungenInterventionPlanung != ''){
            zeitplanung.push(res.data.planung.Zeitplanung[i])
          }
        }
        var monitoring = []
        for(const i in res.data.planung.JoinMonitoring) {
          if(res.data.planung.JoinMonitoring[i][0] != '' || res.data.planung.JoinMonitoring[i][1] != ''){
            monitoring.push(res.data.planung.JoinMonitoring[i])
          }
        }
        var einzelberatung = []
        for(const i in res.data.EntwicklungEinzelberatung) {
          if(res.data.EntwicklungEinzelberatung[i].datum != '' || res.data.EntwicklungEinzelberatung[i].dauer != '' || res.data.EntwicklungEinzelberatung[i].inhalt != '' || res.data.EntwicklungEinzelberatung[i].materialien != '' || res.data.EntwicklungEinzelberatung[i].ergebnis != '' || res.data.EntwicklungEinzelberatung[i].probleme != '' || res.data.EntwicklungEinzelberatung[i].anmerkungen != ''){
            einzelberatung.push(res.data.EntwicklungEinzelberatung[i])
          }
        }
        var zusatznahrung = []
        for(const i in res.data.EntwicklungZusatznahrung) {
          if(res.data.EntwicklungZusatznahrung[i].datum != '' || res.data.EntwicklungZusatznahrung[i].produktbezeichnung != '' || res.data.EntwicklungZusatznahrung[i].verzehrshaeufigkeit != '' || res.data.EntwicklungZusatznahrung[i].menge != ''){
            zusatznahrung.push(res.data.EntwicklungZusatznahrung[i])
          }
        }
        var entwicklungMonitoring = []
        for(const i in res.data.EntwicklungMonitoring) {
          if(res.data.EntwicklungMonitoring[i][0].datum != '' || res.data.EntwicklungMonitoring[i][0].ergebnisse != '') {
            entwicklungMonitoring.push([res.data.planung.JoinMonitoring[i], res.data.EntwicklungMonitoring[i]])
          }
        }
        var evaluationEntwicklungMonitoring = []
        for(const i in res.data.evaluation.EvaluationEntwicklungMonitoring) {
          evaluationEntwicklungMonitoring.push([res.data.planung.JoinMonitoring[i], res.data.evaluation.EvaluationEntwicklungMonitoring[i]])
        }
        this.patient = res.data;
        this.myAssessment1 = assessment1;
        this.myAssessment2 = assessment2;
        this.myRecall = res.data.Recall;
        this.myBilanzierung = bilanzierung;
        this.myVitamine = vitamine;
        this.myMineralstoffe = mineralstoffe;
        this.myAssessment3 = assessment3;
        this.myWichtigkeit = wichtigkeit;
        this.myWichtigkeitAndere = wichtigkeitAndere;
        this.myAssessment4 = assessment4;
        this.myPlanung = planung;
        this.myZieleKlient = zieleKlient;
        this.myZieleIntervention = zieleIntervention;
        this.myZeitplanung = zeitplanung;
        this.myMonitoring = monitoring;
        this.myEntwicklungEinzelberatung = einzelberatung;
        this.myZusatznahrung = zusatznahrung;
        this.myEntwicklungMonitoring = entwicklungMonitoring;
        this.myEvaluationEntwicklungMonitoring = evaluationEntwicklungMonitoring;
        this.myEvaluationZieleKlient = res.data.evaluation.EvaluationZieleKlient;
        this.myEvaluationZieleIntervention = res.data.evaluation.EvaluationZieleIntervention;
        this.myEvaluationWeitersVorgehen = res.data.evaluation.EvaluationWeitersVorgehen;
      })
    },
    methods:{
      changeDate(value){
        return moment(value).locale('de').format('L');
      },
      changeTime(value){
        return moment(value).locale('de').format('LTS');
      },
      //see https://forum.vuejs.org/t/check-if-object-is-empty/3014
      isObjectEmpty(someObject){
        return !(Object.keys(someObject).length)
      },
      getWellbeingSatz(value){
        if(value==5) return "die ganze Zeit"
        if(value==4) return "meistens"
        if(value==3) return "etwas mehr als die Hälfte der Zeit"
        if(value==2) return "etwas weniger als die Hälfte der Zeit"
        if(value==1) return "ab und zu"
        if(value==10) return "zu keinem Zeitpunkt"
      }
    }
  }
</script>