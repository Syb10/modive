<template>
  <div>
    <div v-for="(item, index) in zusatznahrung" :key="index" class="mb-3">
      <p @click.prevent="show(index)"> {{index+1}}. Zusatznahrung <i v-if="isShow[index]" class="fa fa-chevron-up"></i><i v-if="!isShow[index]" class="fa fa-chevron-down"></i></p>
      <div v-if="isShow[index]">
        <InputForm
          v-model="item.datum"
          :content="{ title: 'Datum', id: 'datumSicherstellung'+index, type:'date', color:'umsetzungColor', border:'umsetzungBorder' }"
        />
        <InputForm
          v-model="item.produktbezeichnung"
          :content="{ title: 'Produktbezeichnung', id: 'produktbezeichnung'+index, type:'text', color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller" 
        />
        <InputForm
          v-model="item.verzehrshaeufigkeit"
          :content="{ title: 'empfohlende Verzehrshäufigkeit pro Tag', id: 'empfohlendeVerzehrshaeufigkeitProTag'+index, type:'text', color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller"        
        />
        <InputForm
          v-model="item.menge"
          :content="{ title: 'empfohlende Menge pro Tag', id: 'empfohlendeMengeProTag'+index, type:'text', color:'umsetzungColor', border:'umsetzungBorder'}"
          :style="marginSmaller" 
        />
        <button class=" btn btn-redlight mb-3" @click.prevent="deleteRow(index)"><i class="fa fa-trash"></i> {{index+1}}. Zusatznahrung löschen</button> 
      </div>
      <button v-if="index == zusatznahrung.length-1" class="btn btn-umsetzung mb-5" @click.prevent="addNewRow()"><i class="fa fa-plus-circle"></i> {{index+2}}. Zusatznahrung hinzufügen</button>    
    </div>
    <button v-if="zusatznahrung.length == 0" class="btn btn-umsetzung mb-5" @click.prevent="addNewRow()"><i class="fa fa-plus-circle"></i> 1. Zusatznahrung hinzufügen</button>    
  </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import {mapMutations} from "vuex";
  export default {
    name: "zusatznahrung",
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
    },
    computed: {
      zusatznahrung() {
        return this.$store.state.u.zusatznahrungJa
      }
    },
    methods: {
      ...mapMutations("u", {
        addNewRow: "addNewRowZusatznahrung",
        deleteRow: "deleteRowZusatznahrung",
      }),
      show(index) {
        this.isShow[index] = !this.isShow[index];
      },
    },
  }
</script>