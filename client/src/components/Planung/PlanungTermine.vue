<template>
  <div>
    <div v-for="(item, index) in zeitplanung" :key="index" :class="[(index == zeitplanung.length-1) ? 'mb-3' : 'mb-5']">
      <p @click.prevent="show(index)"> Planung {{index+1}}. Termin <i v-if="isShow[index]" class="fa fa-chevron-up"></i><i v-if="!isShow[index]" class="fa fa-chevron-down"></i></p>
      <div v-if="isShow[index]">
        <InputForm
          v-model="item.dauerEinzelberatung"
          :content="{ title: 'Dauer der Einzelberatung in Minuten', id: 'dauerEinzelberatung'+index, type:'number', min:0, color:'planungColor', border:'planungBorder' }"
        />
        <TextareaForm
          v-model="item.inhaltIntervention"
          :content="{ title: 'Inhalt der Intervention', id: 'inhaltIntervention'+index, color:'planungColor', border:'planungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.materialien"
          :content="{ title: 'verwendete Materialien', id: 'materialien'+index, color:'planungColor', border:'planungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.weitereAnmerkungenInterventionPlanung"
          :content="{ title: 'weitere Anmerkungen', id: 'weitereAnmerkungenInterventionPlanung'+index, color:'planungColor', border:'planungBorder'}"
          :style="marginSmaller"
        />
        <button class="btn btn-darkbluelight" @click.prevent="updateEinzelberatung({value: item, index: index}), updateshowPopup(index)"><i class="fa fa-check"></i> {{index+1}}. Planung bestätigen</button>
        <div v-if="showPopup[index]" class="popup">
          <span class="popuptext">Die Daten wurden übertragen</span>
        </div>
        <button class=" btn btn-redlight ml-3" @click.prevent="deleteRow(index)"><i class="fa fa-trash"></i> {{index+1}}. Planung löschen</button>
      </div>
      <button v-if="index == zeitplanung.length-1" class="btn btn-darkblue mb-5 mt-3" @click.prevent="addNewRow()"><i class="fa fa-plus-circle"></i> {{index+2}}. Termin planen</button>
    </div>  
    <button v-if="zeitplanung.length == 0" class="btn btn-darkblue mb-5 mt-3" @click.prevent="addNewRow()"><i class="fa fa-plus-circle"></i> 1. Termin planen</button>
  </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import TextareaForm from "../TextareaForm.vue";
import {mapState, mapMutations} from "vuex";

  export default {
    name: "PlanungTermine",
     data() {
      return {
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        },
        showPopup: [],
        isShow:[],
      }
    },
    components: {
      InputForm,
      TextareaForm,
    },
    computed: {
      ...mapState("p",[
        "zeitplanung"
      ])
    },
    methods: {
      ...mapMutations("p",{
        addNewRow: "addNewRowZeitplanung",
        deleteRow: "deleteRowZeitplanung",
        updateEinzelberatung: "updateEinzelberatung"
      }),
      updateshowPopup(index) {
        this.showPopup[index] = true;
      },
      show(index) {
        this.isShow[index] = !this.isShow[index];
      },
    },
    //see https://stackoverflow.com/questions/55788474/changing-the-state-to-true-when-new-item-enters-and-changing-to-false-after-5-se
    watch: {
      showPopup: {
        handler(value) {
          for (var i=0; i<value.length; i++) {
            if(this.showPopup[i]) {
              setTimeout(() => this.showPopup[i-1]=false, 3000);
            }
          }
          
        },
        deep: true
      },
    }
  }
</script>