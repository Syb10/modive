<template>
  <h3> {{ patient.Nachname }}, {{ patient.Vorname }} </h3>
  <h5> Geburtsdatum: {{  changeDate(patient.Geburtsdatum) }}</h5>
  <p class="assessmentAspekt">Patient*innenhistorie/Krankengeschichte</p>
  <ul v-for="(value, key) in patient.assessment1" :key="key">
      <li>{{key.match(/(\d+|[a-z]+|[A-Z][a-z]*)/g).join(' ')}} : {{value}}</li>
  </ul>
  <p class="assessmentAspekt">Ernährungsgewohnheiten</p>
  <ul v-for="(value, key) in patient.assessment2" :key="key">
      <li>{{key.match(/(\d+|[a-z]+|[A-Z][a-z]*)/g).join(' ')}} : {{value}}</li>
  </ul>
  <p class="assessmentAspekt">Verhalten und Umfeld</p>
  <ul v-for="(value, key) in patient.assessment3" :key="key">
      <li>{{key.match(/(\d+|[a-z]+|[A-Z][a-z]*)/g).join(' ')}} : {{value}}</li>
  </ul>
  <p class="assessmentAspekt">Klinischer Status</p>
  <ul v-for="(value, key) in patient.assessment4" :key="key">
      <li>{{key.match(/(\d+|[a-z]+|[A-Z][a-z]*)/g).join(' ')}} : {{value}}</li>
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
        return moment(value).locale('de').format('L');
      }
    }
  }
</script>