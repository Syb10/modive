<template>
  <h3> {{ patient.nachname }}, {{ patient.vorname }} </h3>
  <p>{{ patient.geburtsdatum }} </p>
  <p v-if="patient.geschlecht !== undefind"> Geschlecht: {{ patient.geschlecht}}</p>
  <p v-if="patient.schulischeBildung !== undefind "> Schulische Bildung: {{ patient.schulischeBildung}}</p>
  <p v-if="patient.beruflicheBildung !== undefind"> berufliche Bildung: {{ patient.beruflicheBildung}}</p>

  <ul v-for="(value, key) in patient" :key="key">
      <li>{{key}} : {{value}}</li>
  </ul>

</template>

<script>
  import axios from "axios"

  export default {
    name: "Show",
    data () {
      return {
        patient: []
      }
    },
    created() {
      let apiURL = `http://localhost:9000/api/${this.$route.params.id}`;

      axios.get(apiURL).then(res => {
        this.patient = res.data;
      })
    }
  }
</script>