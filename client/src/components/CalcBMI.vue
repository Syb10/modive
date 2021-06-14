<template>
  <div class="form-group">
    <div class="mb-4">
      <div class="input-group-prepend mr-5 mb-3">
        <label for="bmi" class="input-group-text inputForm">
          Body Mass Index (in kg/m&sup2;)
        </label>
        <input
          type="number"
          step="0.01"
          class="form-control inputForm"
          id="bmi"
          v-model="myBMI"
        />
      </div>
    </div>
    <p v-show="show">method calcbmi: {{calcbmi(koerpergewicht, koerpergroesse)}} </p>
  </div>
</template>

<script>
import {mapFields} from "vuex-map-fields";
export default {
  name: "CalcBMI",
  data() {
    return {
      myBMI:"",
      show:false
    }
  },
  props: {
    modelValue: []
  },
  emits: ["update:modelValue"],
  computed: {
    ...mapFields([
        "koerpergroesse",
        "koerpergewicht",
    ]),
  },
  methods: {
    calcbmi(koerpergewicht, koerpergroesse) {
      if(koerpergewicht != undefined && koerpergroesse != undefined) {
        return this.myBMI = (koerpergewicht/ (koerpergroesse * koerpergroesse)).toFixed(2)
      } 
    },
  },
  watch: {
    myBMI (value) {
      this.$emit("update:modelValue", value)
    },
  },
};
</script>
