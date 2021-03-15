<template>
    <div>
        <InputForm
        :v-model="ersterteil.vorname"
        :content="{ title: 'Vorname', id: 'vorname', type: 'text' }"        
      />
    </div>
</template>

<script>
import InputForm from "../components/InputForm.vue";

export default {
  name: 'Test',
  components: {
    InputForm
  },
  props: {
      ersterteil: Object
  }
}
</script>