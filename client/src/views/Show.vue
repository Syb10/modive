<template>
  <h3> {{ patient.nachname }}, {{ patient.vorname }} </h3>
  <h5> Geburtsdatum: {{  changeDate(patient.geburtsdatum) }}</h5>
  <p>Patient*innenhistorie/Krankengeschichte</p>
  <ul v-for="(value, key) in patient.assessment1" :key="key">
      <li>{{key}} : {{value}}</li>
  </ul>
  <p>Klinischer Status</p>
  <ul v-for="(value, key) in patient.assessment3" :key="key">
      <li>{{key}} : {{value}}</li>
  </ul>

</template>

<script>
  import axios from "axios"
  import moment from 'moment';

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
    },
    methods:{
      changeDate(value){
        return moment(value).format('L');
      }
    }
  }
</script>