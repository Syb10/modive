<template>
  <div>
    <input
      type="text"
      class="form-control mb-4"
      placeholder="Suche"
      id="suche"
      v-model="suche"
    />
    <div class="row justify-content-center">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nachname</th>
              <th>Vorname</th>
              <th>Geburtsdatum</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in resSuche" :key="patient._id">
              <td>{{ patient.Nachname }}</td>
              <td>{{ patient.Vorname }}</td>
              <td>{{ changeDate(patient.Geburtsdatum) }}</td>
              <td>
                <router-link :to="{name:'Show', params: {id: patient._id}}" class="btn btn-gold">
                  <i class="fa fa-bars mr-1" aria-hidden="true"></i> anzeigen
                </router-link>
                <router-link :to="{name:'Edit', params: {id: patient._id}}" class="btn btn-blue">
                  <i class="fa fa-pencil mr-1" aria-hidden="true"></i> bearbeiten
                </router-link>  
                <button @click.prevent="deletePatient(patient._id)" class="btn btn-red">
                  <i class="fa fa-trash mr-1" aria-hidden="true"></i>löschen
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>  
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return{
      patienten: [],
      suche: "",
    }
  },
  computed: {
    // https://thewebdev.info/2020/09/06/create-a-search-filter-with-vue-js/
    resSuche() {
      if(this.suche != "") {
        return this.patienten.filter(item => {
          return this.suche.toLowerCase().split(" ").every(v => item.Nachname.toLowerCase().includes(v) || item.Vorname.toLowerCase().includes(v));
        });	
      } else {
        return this.patienten
      }
    }
  },
  created() {
    let apiURL = "http://localhost:9000/api";

    axios.get(apiURL).then(res => {
        this.patienten = res.data;
    }).catch(error => {
        console.log(error);
    });
  },
  methods: {
    deletePatient(id) {
      let apiURL = `http://localhost:9000/api/${id}`;
      let indexOfArrayItem = this.patienten.findIndex(i => i._id === id);
      let vorname = this.patienten[indexOfArrayItem].Vorname;
      let nachname = this.patienten[indexOfArrayItem].Nachname;

      if(window.confirm(nachname +", " + vorname + " wirklich löschen?")) {
        axios.delete(apiURL).then(() => {
            this.patienten.splice(indexOfArrayItem, 1);
        }).catch(error => {
            console.log(error);
        });
      }
    },
    changeDate(value){
      return moment(value).locale('de').format('L');
    }
  }
}
</script>
