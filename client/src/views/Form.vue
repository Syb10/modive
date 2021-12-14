<template>
  <div>
    <form enctype="multipart/form-data">
      <div>
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
        </div>
        <keep-alive>
          <component :is="currentTab"></component>
        </keep-alive>
      </div>
      <p>* Pflichtfeld</p>
      <div v-if="error" class="alert alert-danger">
          Es müssen folgende Felder ausgefüllt werden! 
          <ul v-for="(error, index) in errorList" :key="index">
            <li v-if="error != ''">{{error}}</li>
          </ul>
        </div>
      <div class="form-group">
        <button
          type="submit"
          @click.prevent="addPatient"
          class="btn btn-grey mb-3 mr-3"
        >
        speichern und beenden
        </button>
        <button
          type="submit"
          @click.prevent="savePatient"
          class="btn btn-grey mb-3"
        >
        speichern
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import assessment from "../components/Assessment/Assessment.vue";
import diagnosestellung from "../components/Diagnosestellung/Diagnosestellung.vue";
import planung from "../components/Planung/Planung.vue";
import umsetzung from "../components/Umsetzung/Umsetzung.vue";
import evaluation from "../components/Evaluation/Evaluation.vue";
import {navMixin} from "../mixins/navMixin.js";

export default {
  name: 'Form',
  mixins:[navMixin],
  data () {
    return{
      currentTab:"assessment",
      tabs: [
        {id:"assessment", name: "Assessment"},
        {id:"diagnosestellung", name: "Diagnosestellung"},
        {id:"planung", name: "Planung der Intervention"},
        {id:"umsetzung", name:"Umsetzung der Intervention"},
        {id:"evaluation", name:"Outcome Evaluation"}
      ],
      error: false,
      errorList: [],
    }
  },
  components: {
    assessment,
    diagnosestellung,
    planung,
    umsetzung,
    evaluation,
  },
  methods: {
    addPatient() {
      const apiURL = "http://localhost:9000/api";
      axios
        .post(apiURL, this.klient )
        .then(response => {
          console.log(response);
          this.error = false;
          this.errorList = [];
          //window.location.reload(true);
          this.resetKlient();
        })
        .catch(error => {
          this.error = true;
          console.log(error);
          if(this.vorname == "" && this.nachname == "" && this.geburtstag == ""){
            this.errorList[3] = "Es ist ein unbekannter Fehler aufgetreten.";
          } else {
            this.vorname ? this.errorList[0] = "" : this.errorList[0] = "Vorname"
            this.nachname ? this.errorList[1] = "" : this.errorList[1] = "Nachname"
            this.geburtstag ? this.errorList[2] = "" : this.errorList[2] = "Geburtsdatum"
          }
        });
    },
    savePatient() {
      const apiURL = "http://localhost:9000/api";
      axios
        .post(apiURL, this.klient)
        .then(response => {
          console.log(response);
          this.error = false;
          this.errorList = [];
          this.$router.push(`/Edit/${response.data._id}`);
        })
        .catch(error => {
          this.error = true;
          console.log(error);
          if(this.vorname == "" && this.nachname == "" && this.geburtstag == ""){
            this.errorList[3] = "Es ist ein unbekannter Fehler aufgetreten.";
          } else {
            this.vorname ? this.errorList[0] = "" : this.errorList[0] = "Vorname"
            this.nachname ? this.errorList[1] = "" : this.errorList[1] = "Nachname"
            this.geburtstag ? this.errorList[2] = "" : this.errorList[2] = "Geburtsdatum"
          }
        });
    }
  },
};
</script>

