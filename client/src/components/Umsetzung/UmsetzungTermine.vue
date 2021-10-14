<template>
  <div>
    <p>{{headline}}</p>
    <div v-for="(item, index) in value" :key="index" class="mb-3">
      <p @click.prevent="show(index)"> {{index+1}}. {{title}} <i v-if="isShow[index]" class="fa fa-chevron-up"></i><i v-if="!isShow[index]" class="fa fa-chevron-down"></i></p>
      <div v-if="isShow[index]">
        <InputForm
          v-model="item.datum"
          :content="{ title: 'Datum der '+ title, id: 'datum'+title+index, type:'date', color:'umsetzungColor', border:'umsetzungBorder' }"
        />
        <InputForm
          v-model="item.dauer"
          :content="{ title: 'Dauer der '+ title +' (in Minuten)', id: 'dauer'+title+index, type:'text', color:'umsetzungColor', border:'umsetzungBorder' }"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.inhalt"
          :content="{ title: 'Inhalt der '+ title, id: 'inhalt'+title+index, color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.materialien"
          :content="{ title: 'verwendete Materialien', id: 'materialien'+title+index, color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.ergebnis"
          :content="{ title: 'Ergebnis der '+ title, id: 'ergebnis'+title+index, color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.probleme"
          :content="{ title: 'Probleme in der Umsetzung', id: 'probleme'+title+index, color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"
        />
        <TextareaForm
          v-model="item.anmerkungen"
          :content="{ title: 'weitere Anmerkungen', id: 'weitereAnmerkungenUmsetzung'+title+index, color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"
        />
        <button class=" btn btn-redlight mb-3" @click.prevent="deleteRow(index)"><i class="fa fa-trash"></i> {{index+1}}. {{title}} löschen</button>
      </div>
      <button v-if="index == value.length-1" class="btn btn-umsetzung mb-5 " @click.prevent="addNewRow()"><i class="fa fa-plus-circle"></i> {{index+2}}. {{title}} hinzufügen</button>
     </div>
     <button v-if="value.length == 0" class="btn btn-umsetzung mb-5 " @click.prevent="addNewRow()"><i class="fa fa-plus-circle"></i> 1. {{title}} hinzufügen</button>    
  </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import TextareaForm from "../TextareaForm.vue";
import {mapState, mapMutations} from "vuex";
  export default {
    name: "UmsetzungTermine",
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
    props:{
      headline: String,
      title: String,
      value: Object,
      addNewRow: Object,
      deleteRow: Object,
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