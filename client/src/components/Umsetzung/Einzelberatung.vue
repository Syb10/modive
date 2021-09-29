<template>
  <div>
    <div v-for="(item, index) in einzelberatung" :key="index" class="mb-3">
      <p @click.prevent="show(index)"> {{index+1}}. Termin <i v-if="isShow[index]" class="fa fa-chevron-up"></i><i v-if="!isShow[index]" class="fa fa-chevron-down"></i></p>
      <div v-if="isShow[index]">
        <InputForm
          v-model="item.datum"
          :content="{ title: 'Datum der Intervention', id: 'datumIntervention'+index, type:'date', color:'umsetzungColor', border:'umsetzungBorder' }"
        />
        <InputForm
          v-model="item.dauer"
          :content="{ title: 'Dauer der Intervention', id: 'dauerIntervention'+index, type:'text', color:'umsetzungColor', border:'umsetzungBorder' }"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.inhalt"
          :content="{ title: 'Inhalt der Intervention', id: 'inhaltIntervention'+index, color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.materialien"
          :content="{ title: 'verwendete Materialien', id: 'materialien'+index, color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.ergebnis"
          :content="{ title: 'Ergebnis der Intervention', id: 'ergebnisIntervention'+index, color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.probleme"
          :content="{ title: 'Probleme in der Umsetzung', id: 'problemeUmsetzung'+index, color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.anmerkungen"
          :content="{ title: 'weitere Anmerkungen', id: 'weitereAnmerkungenUmsetzung'+index, color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"
        />
        <button class=" btn btn-redlight mb-3" @click.prevent="deleteRow(index)"><i class="fa fa-trash"></i> {{index+1}}. Termin löschen</button>
      </div>
      <button v-if="index == einzelberatung.length-1" class="btn btn-umsetzung mb-5 " @click.prevent="addNewRow()"><i class="fa fa-plus-circle"></i> {{index+2}}. Termin hinzufügen</button>
     </div>
     <button v-if="einzelberatung.length == 0" class="btn btn-umsetzung mb-5 " @click.prevent="addNewRow()"><i class="fa fa-plus-circle"></i> 1. Termin hinzufügen</button>    
  </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import TextareaForm from "../TextareaForm.vue";
import {mapState, mapMutations} from "vuex";
  export default {
    name: "einzelberatung",
    data() {
      return {
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        },
        isShow:[],
      }
    },
    components:{
      InputForm,
      TextareaForm,
    },
    computed: {
      ...mapState("p",[
        "einzelberatung",
      ]),
    },
    methods: {
      ...mapMutations("p",{
        addNewRow: "addNewRowEinzelberatung",
        deleteRow: "deleteRowEinzelberatung",
      }),
      show(index) {
        this.isShow[index] = !this.isShow[index];
      },
    },
  }
</script>