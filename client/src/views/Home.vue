<template>
  <div class="home">
    <form>
      <InputForm
        v-model="patient.vorname"
        :content="{ title: 'Vorname', id: 'vorname', type: 'text' }"        
      />
      <div> Name: {{ patient.vorname}}</div>
      <InputForm
        v-model="patient.nachname"
        :content="{ title: 'Nachname', id: 'nachname', type: 'text' }"        
      />
      <InputForm
        v-model="patient.geburtsdatum"
        :content="{ title: 'Geburtsdatum', id: 'geburtsdatum', type:'date' }"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'weiblich', id:'weiblich'},
          {title:'männlich', id:'maennlich'},
          {title:'divers', id:'divers'}
        ]"
        v-model="patient.geschlecht"
      />
      <InputForm
        v-model="patient.herkunft"
        :content="{ title: 'Herkunft', id: 'herkunft', type:'text' }"
      />
      <InputForm
        v-model="patient.muttersprache"
        :content="{ title: 'Muttersprache', id: 'muttersprache', type:'text' }"
      />
      <div class="form-group">
        <button
          type="submit"
          @click.prevent="addPatient"
          class="btn btn-primary"
        >
          Daten senden
        </button>
      </div>
      <Test v-model="test.ersterteil" :ersterteil="test.ersterteil"/>
      <div> Name: {{ test.ersterteil.vorname}}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import InputForm from "../components/InputForm.vue";
import CheckboxForm from "../components/CheckboxForm.vue";
import Test from "../components/Test.vue";

export default {
  name: 'Home',
  components: {
    InputForm,
    CheckboxForm,
    Test
  },
  data:() => ({
    patient:{
      vorname: "",
      nachname: "",
      geburtsdatum: "",
      geschlecht: [],
      herkunft: "",
      muttersprache: "",
    },
    test: {
      ersterteil: {
        vorname: ""
      }
    }
  }),
  methods: {
    addPatient() {
      const apiURL = "http://localhost:9000/api";
      axios
        .post(apiURL, this.patient)
        .then(response => {
          console.log(response);
          this.patient = {
            vorname: "",
            nachname: "",
            geburtsdatum: "",
            geschlecht: [],
            herkunft: "",
            muttersprache: "",
          };
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
