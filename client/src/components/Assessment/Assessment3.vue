<template>
    <div>
        <InputForm
          v-model="koerpergroesse"
          :content="{title:'Körpergröße (in m)', id:'koerpergroesse', type:'number', step: '0.01'}"
        />
        <InputForm
          v-model="koerpergewicht"
          :content="{title:'Körpergewicht (in kg)', id:'koerpergewicht', type:'number', step: '0.01'}"
        />
        <InputForm
          v-model="bmi"
          :content="{title:'Body Mass Index (in kg/m&sup2;)', id:'bmi', type:'number', step: '0.01'}"
        />
    </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import {mapFields} from "vuex-map-fields";
export default {
    name: "assessment3",
    components: {
        InputForm
    },
    computed: {
        ...mapFields([
            "koerpergroesse",
            "koerpergewicht",
            "bmi"
        ])
    }
};
</script>