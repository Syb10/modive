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
      "geschlecht",
      "herkunft",
      "muttersprache",
      "schulischeBildung",
      "beruflicheBildung",
      "beruf",
      "artarbeit",
      "familienstand",
      "wohnsituation",
      "personenImHaushalt",
      "aktuellGeraucht",
      "jemalsGeraucht",
      "anzahlZigaretten",
      "anzahlTabakprodukte",
      "anzahlJahreRauchen",
      "beeintraechtigungen",
      "beeintraechtigungenVorhanden",
      "mobil",
      "mobileingeschraenkt",
      "koerpergroesse",
      "koerpergewicht",
      "bmi"
    ])
  },
  methods: {
    addPatient() {
      const apiURL = "http://localhost:9000/api";
      axios
        .post(apiURL, {
          "vorname": this.vorname,
          "nachname": this.nachname,
          "geburtsdatum": this.geburtsdatum,
          assessment1:{
            "geschlecht" : this.geschlecht,
            "herkunft": this.herkunft,
            "muttersprache": this.muttersprache,
            "schulischeBildung": this.schulischeBildung,
            "beruflicheBildung": this.beruflicheBildung,
            "beruf": this.beruf,
            "artarbeit": this.artarbeit,
            "familienstand": this.familienstand,
            "wohnsituation": this.wohnsituation,
            "personenImHaushalt": this.personenImHaushalt,
            "aktuellGeraucht": this.aktuellGeraucht,
            "jemalsGeraucht" : this.jemalsGeraucht,
            "anzahlZigaretten": this.anzahlZigaretten,
            "anzahlTabakprodukte": this.anzahlTabakprodukte,
            "anzahlJahreRauchen": this.anzahlJahreRauchen,
            "beeintraechtigungen": this.beeintraechtigungen,
            "beeintraechtigungenVorhanden": this.beeintraechtigungenVorhanden,
            "mobil": this.mobil,
            "mobileingeschraenkt": this.mobileingeschraenkt
          },
          assessment3:{
            "koerpergroesse": this.koerpergroesse,
            "koerpergewicht": this.koerpergewicht,
            "bmi": this.bmi,
          }  
        })
        .then(response => {
          console.log(response);
          this.$router.push('/List');
          this.vorname = "";
          this.nachname = "";
          this.geburtsdatum = "";
          this.geschlecht = "";
          this.herkunft = "";
          this.muttersprache = "";
          this.schulischeBildung = "";
          this.beruflicheBildung = "";
          this.beruf = "";
          this.artarbeit = "";
          this.familienstand = "";
          this.wohnsituation = "";
          this.personenImHaushalt = null;
          this.aktuellGeraucht = "";
          this.jemalsGeraucht = "";
          this.anzahlZigaretten = null;
          this.anzahlTabakprodukte = null;
          this.anzahlJahreRauchen = null;
          this.beeintraechtigungen = "";
          this.beeintraechtigungenVorhanden = "";
          this.mobil = "";
          this.mobileingeschraenkt = "";
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
