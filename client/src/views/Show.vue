<template>
  <!--<p>{{patient}}</p>
  <p>hallo {{patient.Recall.table[0][0].mahlzeit}}</p>-->
  <h3> {{ patient.Nachname }}, {{ patient.Vorname }} </h3>
  <h5> Geburtsdatum: {{  changeDate(patient.Geburtsdatum) }}</h5>
  <p class="assessmentAspekt">Patient*innenhistorie/Krankengeschichte</p>
 <ul v-for="(value, key) in patient.assessment1" :key="key">
      <li>{{key.match(/(\d+|[a-z]+|[A-Z][a-z]*)/g).join(' ')}} : {{value}}</li>
  </ul>
  <p class="assessmentAspekt">Ernährungsgewohnheiten</p>
  <!--
  <p>24-h-Recall</p>
  <div  v-for="(recallMahlzeiten, index) in patient.Recall.table" :key="index">
    {{patient.Recall[0]['table'][index][0].datum}}
    <table class="mb-3 table table-striped table-bordered">
      <thead>
        <th>Mahlzeit</th>
        <th>Uhrzeit</th>
        <th>Wo wurde gegessen</th>
        <th>Mit wem wurde gegessen</th>
        <th>Lebensmittel und Getänke</th>
        <th>Menge</th>
      </thead>
      <tbody>
        <tr v-for="(recallMahlzeit, index) in recallMahlzeiten" :key="index">
          <td>{{recallMahlzeit.mahlzeit}}</td>
          <td>{{recallMahlzeit.uhrzeit}}</td>
          <td>{{recallMahlzeit.wo}}</td>
          <td>{{recallMahlzeit.wer}}</td>
          <td>{{recallMahlzeit.lebensmittelGetraenke}}</td>
          <td>{{recallMahlzeit.menge}}</td>
        </tr>
      </tbody>
    </table>
  </div>  
  {{patient.Recall.table}}-->
 <ul v-for="(value, key) in patient.assessment2" :key="key">
      <li>{{key.match(/(\d+|[a-z]+|[A-Z][a-z]*)/g).join(' ')}} : {{value}}</li>
  </ul>
  <div>
    <p>Bilanzierung</p>
    <ul v-for="(value, key) in patient.bilanzierung" :key="key">
      <li>{{key.match(/(\d+|[a-z]+|[A-Z][a-z]*)/g).join(' ')}} : {{value}}</li>
    </ul>
  </div>  
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