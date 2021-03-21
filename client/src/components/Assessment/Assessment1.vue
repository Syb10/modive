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
      <Checkboxgeschlecht />
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
import InputForm from "../InputForm.vue";
import Checkboxgeschlecht from "../CheckboxGeschlecht.vue";
import {mapFields} from "vuex-map-fields";

export default {
  name: 'assessment1',
  components: {
    InputForm,
    Checkboxgeschlecht
  },
  computed: {
    ...mapFields([
      "vorname",
      "nachname",
      "geburtsdatum",
      "herkunft",
      "muttersprache",
    ]),
  }
};
</script>
