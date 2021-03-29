<template>
    <div>
      <InputForm
        v-model="vorname"
        :content="{ title: 'Vorname', id: 'vorname', type: 'text' }"        
      />
      <InputForm
        v-model="nachname"
        :content="{ title: 'Nachname', id: 'nachname', type: 'text' }"        
      />
      <InputForm
        v-model="geburtsdatum"
        :content="{ title: 'Geburtsdatum', id: 'geburtsdatum', type:'date' }"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'weiblich', value:'weiblich', id:'weiblich', name:'geschlecht'},
          {title:'männlich', value:'maennlich', id:'maennlich', name:'geschlecht'},
          {title:'divers', value:'divers', id:'divers', name:'geschlecht'}
        ]"
        :title="'Geschlecht'"
        v-model="geschlecht"
      />
      <InputForm
        v-model="herkunft"
        :content="{ title: 'Herkunft', id: 'herkunft', type:'text' }"
      />
      <InputForm
        v-model="muttersprache"
        :content="{ title: 'Muttersprache', id: 'muttersprache', type:'text' }"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'kein schulischer Abschluss', value:'keinAbschluss', id:'keinAbschluss', name:'schulischeBildung'},
          {title:'Hauptschulabschluss/vergleichbarer Abschluss', value:'hauptschule', id:'hauptschule', name:'schulischeBildung'},
          {title:'Realschulabschluss/vergleichbarer Abschluss', value:'realschule', id:'realschule', name:'schulischeBildung'},
          {title:'Fachhochschulreife/Abitur', value:'abitur', id:'abitur', name:'schulischeBildung'},
          {title:'keine Angaben', value:'keineAngaben', id:'keineAngaben', name:'schulischeBildung'}
        ]"
        :title="'Schulische Bildung'"
        v-model="schulischeBildung"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'kein beruflicher Abschluss', value:'keinAbschluss', id:'keinAbschluss', name:'beruflicheBildung'},
          {title:'Ausbildung/Lehre/Fachschule', value:'ausbildung', id:'ausbildung', name:'beruflicheBildung'},
          {title:'Bachelor/Diplom', value:'bachelor', id:'bachelor', name:'beruflicheBildung'},
          {title:'Master', value:'master', id:'master', name:'beruflicheBildung'},
          {title:'Promotion', value:'promotion', id:'promotion', name:'beruflicheBildung'},
          {title:'keine Angaben', value:'keineAngaben', id:'keineAngaben', name:'beruflicheBildung'}
        ]"
        :title="'Berufliche Bildung'"
        v-model="beruflicheBildung"
      />
      <InputForm
        v-model="beruf"
        :content="{ title: 'Ausgeübter Beruf', id: 'beruf', type:'text' }"
      />
    </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import {mapFields} from "vuex-map-fields";

export default {
  name: 'assessment1',
  components: {
    InputForm,
    CheckboxForm,
  },
  computed: {
    ...mapFields([
      "vorname",
      "nachname",
      "geburtsdatum",
      "geschlecht",
      "herkunft",
      "muttersprache",
      "schulischeBildung",
      "beruflicheBildung",
      "beruf"
    ]),
  }
};
</script>
