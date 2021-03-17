<template>
    <div>
      <InputForm
        v-model="vorname"
        :content="{ title: 'Vorname', id: 'vorname', type: 'text' }"        
      />
      <div> Name: {{vorname}}</div>
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
          {title:'weiblich', id:'weiblich'},
          {title:'männlich', id:'maennlich'},
          {title:'divers', id:'divers'}
        ]"
        v-model="geschlecht"
      />
      <div>geschlecht: {{geschlecht}}</div>
      <InputForm
        v-model="herkunft"
        :content="{ title: 'Herkunft', id: 'herkunft', type:'text' }"
      />
      <InputForm
        v-model="muttersprache"
        :content="{ title: 'Muttersprache', id: 'muttersprache', type:'text' }"
      />
    </div>
</template>

<script>
import InputForm from "./InputForm.vue";
import CheckboxForm from "./CheckboxForm.vue";
import {mapFields} from "vuex-map-fields";

export default {
  name: 'Test',
  components: {
    InputForm,
    CheckboxForm
  },
  computed: {
    ...mapFields([
      "vorname",
      "nachname",
      "geburtsdatum",
      "geschlecht",
      "herkunft",
      "muttersprache"
    ])
  }
};
</script>