<template>
    <div>
        <InputForm
          v-model.number="koerpergroesse"
          :content="{title:'Körpergröße (in m)', id:'koerpergroesse', type:'number', step: '0.01'}"
        />
        <InputForm
          v-model="koerpergewicht"
          :content="{title:'Körpergewicht (in kg)', id:'koerpergewicht', type:'number', step: '0.01'}"
        />
        <InputForm
          v-model.number="calcbmi"
          :content="{title:'Body Mass Index (in kg/m&sup2;)', id:'bmi', type:'number', step: '0.01'}"
        />
        <div class="form-group">
        <div class="mb-4">
          <div class="input-group-prepend mr-5 mb-3">
            <label for="bmi" class="input-group-text inputForm">
              Body Mass Index (in kg/m&sup2;)
            </label>
            <input
              type=number
              step="0.01"
              class="form-control inputForm"
              id="bmi"
              v-model.number="bmi"
            />
          </div>
        </div>
      </div>
      <div>bmi {{bmi}}</div>
    </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import {mapFields} from "vuex-map-fields";
import {mapGetters} from "vuex";
export default {
    name: "assessment4",
    components: {
        InputForm
    },
    computed: {
        ...mapFields([
            "koerpergroesse",
            "koerpergewicht"
        ]),
        calcbmi() {
          return (this.koerpergewicht/ (this.koerpergroesse * this.koerpergroesse)).toFixed(2)
        },
        ...mapGetters([
          "bmi"
        ])
    }
};
</script>