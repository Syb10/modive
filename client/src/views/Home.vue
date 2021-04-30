<template>
  <div class="home">
    <form>
      <div>
        <div class="stickyoben">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="btn mb-5"
            :id="tab.id"
            :class="['tab-button', {active:currentTab === tab.id}]"
            @click.prevent="currentTab = tab.id"
          >
            {{tab.name}}
          </button>
        </div>
        <keep-alive>
          <component :is="currentTab"></component>
        </keep-alive>
      </div>
      <div class="form-group">
        <button
          type="submit"
          @click.prevent="addPatient"
          class="btn btn-primary"
        >
          Daten senden
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import assessment from "../components/Assessment/Assessment.vue";
import {mapFields} from "vuex-map-fields";

export default {
  name: 'Home',
  data () {
    return{
      currentTab:"assessment",
      tabs: [
        {id:"assessment", name: "Assessment"},
        {id:"diagnosestellung", name: "Diagnosestellung"},
        {id:"planung", name: "Planung Intervention"},
        {id:"umsetzung", name:"Umsetzung der Intervention"},
        {id:"evaluation", name:"Evaluation"}
      ]
    }
  },
  components: {
    assessment
  },
  computed: {
    ...mapFields([
      "vorname",
      "nachname",
      "geburtsdatum",
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
      "artDerArbeit",
      "familienstand",
      "wohnsituation",
      "wohnsituationAndere",
      "personenImHaushalt",
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
      "kontakAktivitaet",
      "hobbies",
      "unterstuetzungMedizinischerVersorgung",
      "jaUnterstuetzungMedizinischerVersorgung",
      "jaUnterstuetzungMedizinischerVersorgungAndere",
      "medizinischeDiagnose",
      "weitereDiagnosen",
      "weitereDiagnosenAndere",
      "vergangeneDiagnosen",
      "psychischeGesundheit",
      "psychischeGesundheitAndere",
      "gesundheitszustandDerFamilie",
      "gesundheitszustandDerFamilieAndere",
      "schwangerschaft",
      "stillzeit",
      "recall",
      "plantMahlzeiten",
      "bereitetMahlzeiten",
      "lebensmitteleinkauf",
      "selbstversorgen",
      "selbstversorgenEingeschraenkt",
      "selbstversorgenNein",
      "wichtigkeitDerEmpfehlung",
      "wichtigkeitDerFrische",
      "koerpergroesse",
      "koerpergewicht",
      "bmi"
    ]),
    ausgeuebterBeruf: {
      get() {
        return this.zweiZusammen(this.beruf, this.artDerArbeit);
      }
    },
    alleWohnsituation: {
      get() {
        return this.zweiZusammen(this.wohnsituation, this.wohnsituationAndere);
      }
    },
    alleBeeintraechtigungen: {
      get() {
        return this.dreiZusammen(this.beeintraechtigungen, this.beeintraechtigungenVorhanden, this.beeintraechtigungenVorhandenAndere);
      }  
    },
    alleMobileingeschraenkt: {
      get() {
        return this.dreiZusammen(this.mobil, this.mobileingeschraenkt, this.mobileingeschraenktAndere);
      } 
    },
    alleUnterstuetzungMedizinischerVersorgung: {
      get() {
        return this.dreiZusammen(this.unterstuetzungMedizinischerVersorgung, this.jaUnterstuetzungMedizinischerVersorgung, this.jaUnterstuetzungMedizinischerVersorgungAndere);
      }
    },
    alleWeitereDiagnosen: {
      get() {
        return this.zweiZusammen(this.weitereDiagnosen, this.weitereDiagnosenAndere);
      }
    },
    allePsychischeGesundheit: {
      get() {
        return this.zweiZusammen(this.psychischeGesundheit, this.psychischeGesundheitAndere);
      }
    },
    alleGesundheitszustandDerFamilie: {
      get() {
        return this.zweiZusammen(this.gesundheitszustandDerFamilie, this.gesundheitszustandDerFamilieAndere);
      }
    }
  },
  methods: {
    zweiZusammen(value1, value2) {
      if(value1 && value2){
        return value1 +  ', ' + value2
      }else if(value1 && !value2){
        return value1
      }else if(!value1 && value2){
        return value2
      }
    },
    dreiZusammen(value1, value2, value3) {
      //alle
      if(value1 && value2 && value3){
        return value1 +  ', ' + value2 + ', ' + value3
      }
      // nur ja/nein
      else if(value1 && !value2 && !value3){
        return value1
      }
      // ja/nein + checkbox
      else if(value1 && value2 && !value3){
        return value1 + ', ' + value2
      }
      // ja/nein + andere
      else if(value1 && !value2 && value3){
        return value1 + ', ' + value3
      }
    },
    addPatient() {
      const apiURL = "http://localhost:9000/api";
      axios
        .post(apiURL, {
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
            "Beruf": this.ausgeuebterBeruf,
            "Familienstand": this.familienstand,
            "Wohnsituation": this.alleWohnsituation,
            "PersonenImHaushalt": this.personenImHaushalt,
            "aktuellGeraucht": this.aktuellGeraucht,
            "jemalsGeraucht" : this.jemalsGeraucht,
            "AnzahlZigaretten": this.anzahlZigaretten,
            "AnzahlTabakprodukte": this.anzahlTabakprodukte,
            "AnzahlJahreRauchen": this.anzahlJahreRauchen,
            "Beeinträchtigungen": this.alleBeeintraechtigungen,
            "mobil": this.alleMobileingeschraenkt,
            "KontakAktivitaetInSozialenStrukturen": this.kontakAktivitaet,
            "HobbiesFreizeitbeschäftigungen" : this.hobbies,
            "UnterstützungMedizinischerPflegerischerVersorgung": this.alleUnterstuetzungMedizinischerVersorgung,
            "MedizinischeDiagnose": this.medizinischeDiagnose,
            "weitereDiagnosen": this.alleWeitereDiagnosen,
            "vergangeneDiagnosen": this.vergangeneDiagnosen,
            "PsychischeGesundheit": this.allePsychischeGesundheit,
            "GesundheitszustandDerFamilie": this.alleGesundheitszustandDerFamilie,
            "Schwangerschaft": this.schwangerschaft,
            "Stillzeit": this.stillzeit
          },
          assessment2: {
            "Recall": this.recall
          },
          assessment3: {
            "WerPlantDieMahlzeiten": this.plantMahlzeiten,
            "WerBereitetDieMahlzeitenZu": this.bereitetMahlzeiten,
            "WerTätigtDenLebensmitteleinkauf": this.lebensmitteleinkauf,
            "selbstversorgen": this.selbstversorgen,
            "SelbstversorgungIstEingeschränkt": this.selbstversorgenEingeschraenkt,
            "SelbstversorgungIstNichtMöglich": this.selbstversorgenNein,
            "EinfachheitMahlzeitZuzubereiten" : this.einfachheitMahlzeitZuzubereiten,
            "WichtigkeitDerEmpfehlung": this.wichtigkeitDerEmpfehlung,
            "WichtigkeitDerFrische" : this.wichtigkeitDerFrische,
          },
          assessment4:{
            "Körpergröße": this.koerpergroesse,
            "Körpergewicht": this.koerpergewicht,
            "bmi": this.bmi,
          }  
        })
        .then(response => {
          console.log(response);
          this.$router.push('/List');
          this.vorname = "";
          this.nachname = "";
          this.geburtsdatum = "";
          this.adresse = "";
          this.telefonnummer = "";
          this.email = "";
          this.krankenkasse = "";
          this.hausarzt = "";
          this.geschlecht = "";
          this.herkunft = "";
          this.muttersprache = "";
          this.schulischeBildung = "";
          this.beruflicheBildung = "";
          this.beruf = "";
          this.artarbeit = "";
          this.familienstand = "";
          this.wohnsituation = "";
          this.wohnsituationAndere = "";
          this.personenImHaushalt = null;
          this.aktuellGeraucht = "";
          this.jemalsGeraucht = "";
          this.anzahlZigaretten = null;
          this.anzahlTabakprodukte = null;
          this.anzahlJahreRauchen = null;
          this.beeintraechtigungen = "";
          this.beeintraechtigungenVorhanden = "";
          this.beeintraechtigungenVorhandenAndere = "";
          this.mobil = "";
          this.mobileingeschraenkt = "";
          this.mobileingeschraenktAndere = "";
          this.kontakAktivitaet = "";
          this.hobbies = "";
          this.unterstützungMedizinischerVersorgung = "";
          this.jaUnterstuetzungMedizinischerVersorgung = "";
          this.jaUnterstuetzungMedizinischerVersorgungAndere = "";
          this.medizinischeDiagnose = "";
          this.weitereDiagnosen = "";
          this.weitereDiagnosenAndere = "";
          this.vergangeneDiagnosen = "";
          this.psychischeGesundheit = "";
          this.psychischeGesundheitAndere = "";
          this.gesundheitszustandDerFamilie = "";
          this.gesundheitszustandDerFamilieAndere = "";
          this.schwangerschaft = "";
          this.stillzeit = "";
          this.recall = "";
          this.plantMahlzeiten = "";
          this.bereitetMahlzeiten = "";
          this.lebensmitteleinkauf = "";
          this.selbstversorgen = "";
          this.selbstversorgenEingeschraenkt = "";
          this.selbstversorgenNein = "";
          this.einfachheitMahlzeitZuzubereiten = "";
          this.wichtigkeitDerEmpfehlung = "";
          this.wichtigkeitDerFrische = "";
          this.koerpergroesse = null;
          this.koerpergewicht = null;
          this.bmi = null;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
 #assessment{
   background-color: #9a884f !important;
   border: 1px solid #9a884f !important;
   color: white !important;
 }
  #diagnosestellung{
   background-color: #6eaead !important;
   border: 1px solid #6eaead !important;
   color: white !important;
 }
 #planung{
   background-color: #376f75 !important;
   border: 1px solid #376f75 !important;
   color: white !important;
 }
 #umsetzung{
   background-color: #00303C !important;
   border: 1px solid #00303C !important;
   color: white !important;
 }
 #evaluation{
   background-color: #72BF44 !important;
   border: 1px solid #72BF44 !important;
   color: white !important;
 }
</style>
