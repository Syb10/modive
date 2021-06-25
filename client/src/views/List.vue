<template>
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
          <tr v-for="patient in patienten" :key="patient._id">
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
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return{
      patienten: []
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

      if(window.confirm("Patient wirklich löschen?")) {
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
