<template>
  <div class="home">
    <form>
      <Assessment />
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
import Assessment from "../components/Assessment.vue";
import {mapFields} from "vuex-map-fields";

export default {
  name: 'Home',
  components: {
    Assessment
  },
  computed: {
    ...mapFields([
      "vorname",
      "nachname",
      "geburtsdatum",
      "geschlecht",
      "herkunft",
      "muttersprache"
    ]),
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
          "muttersprache": this.muttersprache
        })
        .then(response => {
          console.log(response);
          this.vorname = "";
          this.nachname = "";
          this.geburtsdatum = "";
          this.geschlecht = [];
          this.herkunft = "";
          this.muttersprache = "";
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>
