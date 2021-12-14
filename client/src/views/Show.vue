<template>
  <p @click.prevent="resetKlient" class="mb-5"><i class="fa fa-arrow-left"></i> zurück</p>
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
    <li v-if="!isObjectEmpty(myUploadAssessment1)">weitere Dokumente:</li> 
    <ShowUploadFile
      v-model="myUploadAssessment1"
    />
  </ul>
  <p class="assessmentAspekt">Ernährungsgewohnheiten</p>
  <ul>
    <li v-if="!isObjectEmpty(myUploadErnahrungsprotokoll)">Ernährungsprotokolle und weitere Ernährungserhebungsmethoden:</li> 
    <ShowUploadFile
      v-model="myUploadErnahrungsprotokoll"
    />
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
    <li v-if="!isObjectEmpty(myUploadAssessment2)">weitere Dokumente:</li> 
    <ShowUploadFile
      v-model="myUploadAssessment2"
    />  
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
      <li v-if="!isObjectEmpty(myWichtigkeitAndere)">andere:</li>
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
      <li>In den letzten zwei Wochen</li>
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
    <li v-if="!isObjectEmpty(myUploadLebensqualitaet)">Dokumente zur Lebensqualität:</li> 
    <ShowUploadFile
      v-model="myUploadLebensqualitaet"
    /> 
    <li v-if="!isObjectEmpty(myUploadAssessment3)">weitere Dokumente:</li> 
    <ShowUploadFile
      v-model="myUploadAssessment3"
    />   
  </ul>
  <p class="assessmentAspekt">Klinischer Status</p>
  <ul>
    <div v-for="(mykey, myIndex) in assessment4" :key="myIndex">
      <div v-for="(value, key) in myAssessment4" :key="key">
        <li v-show="key === mykey.key">{{assessment4[myIndex].title}}: {{value}}</li>
      </div>
    </div>
    <li v-if="!isObjectEmpty(myUploadAssessment4)">weitere Dokumente:</li> 
    <ShowUploadFile
      v-model="myUploadAssessment4"
    />  
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
    <li v-if="!isObjectEmpty(myPlanungEinzelberatung)">Planung Einzelberatung:</li>
    <div v-for="(item, indexI) in myPlanungEinzelberatung" :key="indexI">
      {{indexI+1}}. Einzelberatung:
      <ul>
        <div v-for="(mykey,myIndex) in planungEinzelberatung" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{planungEinzelberatung[myIndex].title}}: {{i}}</li>
          </div>
        </div> 
      </ul>  
    </div>
    <li v-if="!isObjectEmpty(myPlanungGruppenschulung)">Planung Gruppenschulung:</li>
    <div v-for="(item, indexI) in myPlanungGruppenschulung" :key="indexI">
      {{indexI+1}}. Gruppenschulung:
      <ul>
        <div v-for="(mykey,myIndex) in planungGruppenschulung" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{planungGruppenschulung[myIndex].title}}: {{i}}</li>
          </div>
        </div> 
      </ul>  
    </div>
    <li v-if="!isObjectEmpty(myPlanungEinkaufstraining)">Planung Einkaufstraining:</li>
    <div v-for="(item, indexI) in myPlanungEinkaufstraining" :key="indexI">
      {{indexI+1}}. Einkaufstraining:
      <ul>
        <div v-for="(mykey,myIndex) in planungEinkaufstraining" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{planungEinkaufstraining[myIndex].title}}: {{i}}</li>
          </div>
        </div> 
      </ul>  
    </div>
    <li v-if="!isObjectEmpty(myPlanungLehrkueche)">Planung Lehrküche:</li>
    <div v-for="(item, indexI) in myPlanungEinzelberatung" :key="indexI">
      {{indexI+1}}. Lehrküche:
      <ul>
        <div v-for="(mykey,myIndex) in planungLehrkueche" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{planungLehrkueche[myIndex].title}}: {{i}}</li>
          </div>
        </div> 
      </ul>  
    </div>
    <li v-if="!isObjectEmpty(myPlanungAndereInterventionsform)">Planung {{myInterventionsformAndere}}:</li>
    <div v-for="(item, indexI) in myPlanungAndereInterventionsform" :key="indexI">
      {{indexI+1}}. {{myInterventionsformAndere}}:
      <ul>
        <div v-for="(mykey,myIndex) in planungAndereInterventionsform" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{planungAndereInterventionsform[myIndex].title}}: {{i}}</li>
          </div>
        </div> 
      </ul>  
    </div>
    <div v-for="(mykey, myIndex) in planung2" :key="myIndex">
      <div v-for="(value, key) in myPlanung" :key="key">
        <li v-if="key === mykey.key">{{planung2[myIndex].title}}: {{value}}</li>
      </div>
    </div>
    <li v-if="!isObjectEmpty(myMonitoring)">Monitoring- und Outcome-Parameter / Frequenz der Überprüfung:</li>
    <ul> 
      <div v-for="(item, index) in myMonitoring" :key="index">
        <li>{{item[0]}} / {{item[1]}}</li>
      </div>
    </ul>  
  </ul>
  <p class="umsetzungAspekt">Umsetzung der Intervention</p>
  <ul>
    <li v-if="!isObjectEmpty(myUmsetzungEinzelberatung)">Einzelberatung mit Klient*in</li>
    <div v-for="(item, indexI) in myUmsetzungEinzelberatung" :key="indexI">
      {{indexI+1}}. Einzelberatung:
      <ul>
        <div v-for="(mykey,myIndex) in einzelberatung" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{einzelberatung[myIndex].title}}: <span v-if="einzelberatung[myIndex].title == 'Datum der Einzelberatung'">{{changeDate(i)}}</span><span v-if="einzelberatung[myIndex].title != 'Datum der Einzelberatung'">{{i}}</span></li>
          </div>
        </div> 
      </ul>  
    </div>
    <li v-if="!isObjectEmpty(myUmsetzungGruppenschulung)">Gruppenschulung mit Klient*in</li>
    <div v-for="(item, indexI) in myUmsetzungGruppenschulung" :key="indexI">
      {{indexI+1}}. Gruppenschulung:
      <ul>
        <div v-for="(mykey,myIndex) in gruppenschulung" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{gruppenschulung[myIndex].title}}: <span v-if="gruppenschulung[myIndex].title == 'Datum der Gruppenschulung'">{{changeDate(i)}}</span><span v-if="gruppenschulung[myIndex].title != 'Datum der Gruppenschulung'">{{i}}</span></li>
          </div>
        </div> 
      </ul>  
    </div>
    <li v-if="!isObjectEmpty(myUmsetzungEinkaufstraining)">Einkaufstraining mit Klient*in</li>
    <div v-for="(item, indexI) in myUmsetzungEinkaufstraining" :key="indexI">
      {{indexI+1}}. Einkaufstraining:
      <ul>
        <div v-for="(mykey,myIndex) in einkaufstraining" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{einkaufstraining[myIndex].title}}: <span v-if="einkaufstraining[myIndex].title == 'Datum des Einkaufstraining'">{{changeDate(i)}}</span><span v-if="einkaufstraining[myIndex].title != 'Datum des Einkaufstraining'">{{i}}</span></li>
          </div>
        </div> 
      </ul>  
    </div>
    <li v-if="!isObjectEmpty(myUmsetzungLehrkueche)">Lehrküche mit Klient*in</li>
    <div v-for="(item, indexI) in myUmsetzungLehrkueche" :key="indexI">
      {{indexI+1}}. Lehrküche:
      <ul>
        <div v-for="(mykey,myIndex) in lehrkueche" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{lehrkueche[myIndex].title}}: <span v-if="lehrkueche[myIndex].title == 'Datum der Lehrküche'">{{changeDate(i)}}</span><span v-if="lehrkueche[myIndex].title != 'Datum der Lehrküche'">{{i}}</span></li>
          </div>
        </div> 
      </ul>  
    </div>
    <li v-if="!isObjectEmpty(myUmsetzungAndereInterventionsform)">{{myInterventionsformAndere}} mit Klient*in</li>
    <div v-for="(item, indexI) in myUmsetzungAndereInterventionsform" :key="indexI">
      {{indexI+1}}. {{myInterventionsformAndere}}:
      <ul>
        <div v-for="(mykey,myIndex) in andereInterventionsform" :key="myIndex">
          <div v-for="(i, key) in item" :key="key">
            <li v-if="key === mykey.key">{{andereInterventionsform[myIndex].title}}: <span v-if="andereInterventionsform[myIndex].title == 'Datum'">{{changeDate(i)}}</span><span v-if="andereInterventionsform[myIndex].title != 'Datum'">{{i}}</span></li>
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
    <li v-if="!isObjectEmpty(myEvaluationEntwicklungMonitoring)">Entwicklung der Monitoring- und Outcome-Parameter</li>
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
  import ShowUploadFile from "../components/ShowUploadFile.vue";

  export default {
    name: "Show",
    mixins:[navMixin],
    components:{
      ShowUploadFile,
    },
    data () {
      return {
        patient: [],
        myAssessment1: [],
        myUploadAssessment1:[],
        myAssessment2: [],
        myUploadErnahrungsprotokoll:[],
        myRecall: [],
        myBilanzierung: [],
        myVitamine: [],
        myMineralstoffe: [],
        myUploadAssessment2:[],
        myAssessment3: [],
        myWichtigkeit: [],
        myWichtigkeitAndere:[],
        myUploadLebensqualitaet:[],
        myUploadAssessment3:[],
        myAssessment4: [],
        myUploadAssessment4:[],
        myPlanung:[],
        myZieleKlient: [],
        myZieleIntervention: [],
        myPlanungEinzelberatung:[],
        myPlanungGruppenschulung:[],
        myPlanungEinkaufstraining:[],
        myPlanungLehrkueche:[],
        myPlanungAndereInterventionsform:[],
        myMonitoring: [],
        myUmsetzungEinzelberatung: [],
        myUmsetzungGruppenschulung: [],
        myUmsetzungEinkaufstraining: [],
        myUmsetzungLehrkueche: [],
        myUmsetzungAndereInterventionsform: [],
        myInterventionsformAndere: "",
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
          {key: "WichtigkeitDerFrische", title:"Frische"},
          {key: "WichtigkeitDesGeschmacks", title:"Geschmacks"},
          {key: "WichtigkeitDerGesundheit", title:"Gesundheit"},
          {key: "WichtigkeitEinesGeringenPreises", title:"Preis"},
          {key: "WichtigkeitDerRegionalitaet", title:"Regionalität"},
          {key: "WichtigkeitDerSaisonalitaet", title:"Saisonalität"},
        ],
        assessment32:[
          {key: "ErnaehrungsgewohnheitenVeraendern", title:"Kann sich der/die Klient*in vorstellen, begleitet durch die gemeinsamen Treffen, die Ernährungsgewohnheiten zu verändern?"},
          {key: "PhysicalActivityLevel", title:"PhysicalActivityLevel (PAL)"},
          {key: "WeitereAnmerkungenAktivitaet", title:"Weitere Anmerkungen Aktivität"},
        ],
        wellbeing: [
          {key:"WhoLaune", title:"war der/die Klient*in froh und guter Laune"},
          {key:"WhoRuhig", title:"hat sich der/die Klient*in ruhig und entspannt gefühlt"},
          {key:"WhoAktiv", title:"hat sich der/die Klient*in energisch und aktiv gefühlt"},
          {key:"WhoAusgeruht", title:"hat sich der/die Klient*in beim Aufwachen frisch und ausgeruht gefühlt"},
          {key:"WhoInteressieren", title:"war der Alltag des/der Klient*in voller Dinge, die ihn/sie interessieren"},
        ],
        assessment4:[
          {key: "Koerpergroesse", title:"Körpergröße (in m)"},
          {key: "Koerpergewicht", title:"Körpergewicht (in kg)"},
          {key: "Bmi", title:"BMI (in kg/m²)"},
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
        planungEinzelberatung:[
          {key: "dauer", title: "Dauer der geplanten Einzelberatung (in Minuten)"},
          {key: "inhalt", title: "Inhalt der geplanten Einzelberatung"},
          {key: "materialien", title: "geplante Materialien"},
          {key: "weitereAnmerkungen", title: "weitere Anmerkungen"},
        ],
        planungGruppenschulung:[
          {key: "dauer", title: "Dauer der geplanten Gruppenschulung (in Minuten)"},
          {key: "inhalt", title: "Inhalt der geplanten Gruppenschulung"},
          {key: "materialien", title: "geplante Materialien"},
          {key: "weitereAnmerkungen", title: "weitere Anmerkungen"},
        ],
        planungEinkaufstraining:[
          {key: "dauer", title: "Dauer des geplanten Einkaufstraining (in Minuten)"},
          {key: "inhalt", title: "Inhalt des geplanten Einkaufstraining"},
          {key: "materialien", title: "geplante Materialien"},
          {key: "weitereAnmerkungen", title: "weitere Anmerkungen"},
        ],
        planungLehrkueche:[
          {key: "dauer", title: "Dauer der geplanten Lehrküche (in Minuten)"},
          {key: "inhalt", title: "Inhalt der geplanten Lehrküche"},
          {key: "materialien", title: "geplante Materialien"},
          {key: "weitereAnmerkungen", title: "weitere Anmerkungen"},
        ],
        planungAndereInterventionsform:[
          {key: "dauer", title: "Dauer (in Minuten)"},
          {key: "inhalt", title: "Inhalt"},
          {key: "materialien", title: "geplante Materialien"},
          {key: "weitereAnmerkungen", title: "weitere Anmerkungen"},
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
        gruppenschulung: [
          {key:"datum", title:"Datum der Gruppenschulung"},
          {key:"dauer", title:"Dauer der Gruppenschulung (in Minuten)"},
          {key:"inhalt", title:"Inhalt der Gruppenschulung"},
          {key:"materialien", title:"verwendete Materialien"},
          {key:"ergebnis", title:"Ergebnis der Gruppenschulung"},
          {key:"probleme", title:"Probleme in der Umsetzung"},
          {key:"anmerkungen", title:"weitere Anmerkungen"}
        ],
        einkaufstraining: [
          {key:"datum", title:"Datum des Einkaufstraining"},
          {key:"dauer", title:"Dauer des Einkaufstraining (in Minuten)"},
          {key:"inhalt", title:"Inhalt des Einkaufstraining"},
          {key:"materialien", title:"verwendete Materialien"},
          {key:"ergebnis", title:"Ergebnis des Einkaufstraining"},
          {key:"probleme", title:"Probleme in der Umsetzung"},
          {key:"anmerkungen", title:"weitere Anmerkungen"}
        ],
        lehrkueche: [
          {key:"datum", title:"Datum der Lehrküche"},
          {key:"dauer", title:"Dauer der Lehrküche (in Minuten)"},
          {key:"inhalt", title:"Inhalt der Lehrküche"},
          {key:"materialien", title:"verwendete Materialien"},
          {key:"ergebnis", title:"Ergebnis der Lehrküche"},
          {key:"probleme", title:"Probleme in der Umsetzung"},
          {key:"anmerkungen", title:"weitere Anmerkungen"}
        ],
        andereInterventionsform: [
          {key:"datum", title:"Datum"},
          {key:"dauer", title:"Dauer (in Minuten)"},
          {key:"inhalt", title:"Inhalt"},
          {key:"materialien", title:"verwendete Materialien"},
          {key:"ergebnis", title:"Ergebnis"},
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
        var planungEinzelberatung = []
        for(const i in res.data.planung.PlanungEinzelberatung) {
          if(res.data.planung.PlanungEinzelberatung[i].dauer != '' || res.data.planung.PlanungEinzelberatung[i].inhalt != '' || res.data.planung.PlanungEinzelberatung[i].materialien != '' || res.data.planung.PlanungEinzelberatung[i].weitereAnmerkungen != ''){
            planungEinzelberatung.push(res.data.planung.PlanungEinzelberatung[i])
          }
        }
        var planungGruppenschulung = []
        for(const i in res.data.planung.PlanungGruppenschulung) {
          if(res.data.planung.PlanungGruppenschulung[i].dauer != '' || res.data.planung.PlanungGruppenschulung[i].inhalt != '' || res.data.planung.PlanungGruppenschulung[i].materialien != '' || res.data.planung.PlanungGruppenschulung[i].weitereAnmerkungen != ''){
            planungGruppenschulung.push(res.data.planung.PlanungGruppenschulung[i])
          }
        }
        var planungEinkaufstraining = []
        for(const i in res.data.planung.PlanungEinkaufstraining) {
          if(res.data.planung.PlanungEinkaufstraining[i].dauer != '' || res.data.planung.PlanungEinkaufstraining[i].inhalt != '' || res.data.planung.PlanungEinkaufstraining[i].materialien != '' || res.data.planung.PlanungEinkaufstraining[i].weitereAnmerkungen != ''){
            planungEinkaufstraining.push(res.data.planung.PlanungEinkaufstraining[i])
          }
        }
        var planungLehrkueche = []
        for(const i in res.data.planung.PlanungLehrkueche) {
          if(res.data.planung.PlanungLehrkueche[i].dauer != '' || res.data.planung.PlanungLehrkueche[i].inhalt != '' || res.data.planung.PlanungLehrkueche[i].materialien != '' || res.data.planung.PlanungLehrkueche[i].weitereAnmerkungen != ''){
            planungLehrkueche.push(res.data.planung.PlanungLehrkueche[i])
          }
        }
        var planungAndereInterventionsform = []
        for(const i in res.data.planung.PlanungAndereInterventionsform) {
          if(res.data.planung.PlanungAndereInterventionsform[i].dauer != '' || res.data.planung.PlanungAndereInterventionsform[i].inhalt != '' || res.data.planung.PlanungAndereInterventionsform[i].materialien != '' || res.data.planung.PlanungAndereInterventionsform[i].weitereAnmerkungen != ''){
            planungAndereInterventionsform.push(res.data.planung.PlanungAndereInterventionsform[i])
          }
        }
        var monitoring = []
        for(const i in res.data.planung.JoinMonitoring) {
          if(res.data.planung.JoinMonitoring[i][0] != '' || res.data.planung.JoinMonitoring[i][1] != ''){
            monitoring.push(res.data.planung.JoinMonitoring[i])
          }
        }
        var einzelberatung = []
        for(const i in res.data.UmsetzungEinzelberatung) {
          if(res.data.UmsetzungEinzelberatung[i].datum != '' || res.data.UmsetzungEinzelberatung[i].dauer != '' || res.data.UmsetzungEinzelberatung[i].inhalt != '' || res.data.UmsetzungEinzelberatung[i].materialien != '' || res.data.UmsetzungEinzelberatung[i].ergebnis != '' || res.data.UmsetzungEinzelberatung[i].probleme != '' || res.data.UmsetzungEinzelberatung[i].anmerkungen != ''){
            einzelberatung.push(res.data.UmsetzungEinzelberatung[i])
          }
        }
        var gruppenschulung = []
        for(const i in res.data.UmsetzungGruppenschulung) {
          if(res.data.UmsetzungGruppenschulung[i].datum != '' || res.data.UmsetzungGruppenschulung[i].dauer != '' || res.data.UmsetzungGruppenschulung[i].inhalt != '' || res.data.UmsetzungGruppenschulung[i].materialien != '' || res.data.UmsetzungGruppenschulung[i].ergebnis != '' || res.data.UmsetzungGruppenschulung[i].probleme != '' || res.data.UmsetzungGruppenschulung[i].anmerkungen != ''){
            gruppenschulung.push(res.data.UmsetzungGruppenschulung[i])
          }
        }
        var einkaufstraining = []
        for(const i in res.data.UmsetzungEinkaufstraining) {
          if(res.data.UmsetzungEinkaufstraining[i].datum != '' || res.data.UmsetzungEinkaufstraining[i].dauer != '' || res.data.UmsetzungEinkaufstraining[i].inhalt != '' || res.data.UmsetzungEinkaufstraining[i].materialien != '' || res.data.UmsetzungEinkaufstraining[i].ergebnis != '' || res.data.UmsetzungEinkaufstraining[i].probleme != '' || res.data.UmsetzungEinkaufstraining[i].anmerkungen != ''){
            einkaufstraining.push(res.data.UmsetzungEinkaufstraining[i])
          }
        }
        var lehrkueche = []
        for(const i in res.data.UmsetzungLehrkueche) {
          if(res.data.UmsetzungLehrkueche[i].datum != '' || res.data.UmsetzungLehrkueche[i].dauer != '' || res.data.UmsetzungLehrkueche[i].inhalt != '' || res.data.UmsetzungLehrkueche[i].materialien != '' || res.data.UmsetzungLehrkueche[i].ergebnis != '' || res.data.UmsetzungLehrkueche[i].probleme != '' || res.data.UmsetzungLehrkueche[i].anmerkungen != ''){
            lehrkueche.push(res.data.UmsetzungLehrkueche[i])
          }
        }
        var andereInterventionsform = []
        for(const i in res.data.UmsetzungAndereInterventionsform) {
          if(res.data.UmsetzungAndereInterventionsform[i].datum != '' || res.data.UmsetzungAndereInterventionsform[i].dauer != '' || res.data.UmsetzungAndereInterventionsform[i].inhalt != '' || res.data.UmsetzungAndereInterventionsform[i].materialien != '' || res.data.UmsetzungAndereInterventionsform[i].ergebnis != '' || res.data.UmsetzungAndereInterventionsform[i].probleme != '' || res.data.UmsetzungAndereInterventionsform[i].anmerkungen != ''){
            andereInterventionsform.push(res.data.UmsetzungAndereInterventionsform[i])
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
        this.myUploadAssessment1 = res.data.assessment1.UploadAssessment1;
        this.myAssessment2 = assessment2;
        this.myUploadErnahrungsprotokoll = res.data.assessment2.UploadErnahrungsprotokoll;
        this.myRecall = res.data.Recall;
        this.myBilanzierung = bilanzierung;
        this.myVitamine = vitamine;
        this.myMineralstoffe = mineralstoffe;
        this.myUploadAssessment2 = res.data.assessment2.UploadAssessment2;
        this.myAssessment3 = assessment3;
        this.myWichtigkeit = wichtigkeit;
        this.myWichtigkeitAndere = wichtigkeitAndere;
        this.myUploadLebensqualitaet = res.data.assessment3.UploadLebensqualitaet;
        this.myUploadAssessment3 = res.data.assessment3.UploadAssessment3;
        this.myAssessment4 = assessment4;
        this.myUploadAssessment4 = res.data.assessment4.UploadAssessment4;
        this.myPlanung = planung;
        this.myZieleKlient = zieleKlient;
        this.myZieleIntervention = zieleIntervention;
        this.myPlanungEinzelberatung = planungEinzelberatung;
        this.myPlanungGruppenschulung = planungGruppenschulung;
        this.myPlanungEinkaufstraining = planungEinkaufstraining;
        this.myPlanungLehrkueche = planungLehrkueche;
        this.myPlanungAndereInterventionsform = planungAndereInterventionsform;
        this.myMonitoring = monitoring;
        this.myUmsetzungEinzelberatung = einzelberatung;
        this.myUmsetzungGruppenschulung = gruppenschulung;
        this.myUmsetzungEinkaufstraining = einkaufstraining;
        this.myUmsetzungLehrkueche = lehrkueche;
        this.myUmsetzungAndereInterventionsform = andereInterventionsform;
        this.myInterventionsformAndere = res.data.planung.Interventionsform[1];
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