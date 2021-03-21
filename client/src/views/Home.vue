<template>
  <div class="home">
    <form>
      <div>
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
      "herkunft",
      "muttersprache",
      "koerpergroesse",
      "koerpergewicht",
      "bmi"
    ]),
    geschlecht(){
      return this.$store.state.form.geschlecht;
    }
  },
  methods: {
    addPatient() {
      const apiURL = "http://localhost:9000/api";
      axios
        .post(apiURL, {
          "vorname": this.vorname,
          "nachname": this.nachname,
          "geburtsdatum": this.geburtsdatum,
          "geschlecht" : this.geschlecht,
          "herkunft": this.herkunft,
          "muttersprache": this.muttersprache,
          "koerpergroesse": this.koerpergroesse,
          "koerpergewicht": this.koerpergewicht,
          "bmi": this.bmi,
        })
        .then(response => {
          console.log(response);
          this.vorname = "";
          this.nachname = "";
          this.geburtsdatum = "";
          this.geschlecht = [];
          this.herkunft = "";
          this.muttersprache = "";
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
