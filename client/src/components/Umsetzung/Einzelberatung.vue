<template>
  <div>
    <div v-for="(item, index) in einzelberatung" :key="index" :class="[(index == einzelberatung.length-1) ? 'mb-3' : 'mb-5']">
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
     </div>
     <button class="btn btn-umsetzung mb-5 " @click.prevent="addNewRowEinzelberatung()"><i class="fa fa-plus-circle"></i> Datum hinzufügen</button>    
  </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import TextareaForm from "../TextareaForm.vue";
import {mapFields} from "vuex-map-fields";
import moment from 'moment';
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
        einzelberatung:[],
      }
    },
    props:{
      modelValue:[],
    },
    emits:["update:modelValue"],
    components:{
      InputForm,
      TextareaForm,
    },
    computed: {
      ...mapFields([
        "inhaltIntervention",
        "materialien",
      ]),
    },
    watch:{
      einzelberatung:{
        handler(value) {
          // aus dem Array ein String der dem v-model uebergeben wird und dann mit v-html angezeigt
          var item=[]
          for(var i=0; i < value.length; i++){
            item.push(
              "<div>"+this.changeDate(value[i].datum)+" "+value[i].dauer+"</div>"
              +"<ul>"
              +"<li>Inhalt: "+value[i].inhalt+"</li>"
              +"<li>Materialien: "+value[i].materialien+"</li>"
              +"<li>Ergebnis: "+value[i].ergebnis+"</li>"
              +"<li>Probleme: "+value[i].probleme+"</li>"
              +"<li>weitere Anmerkungen: "+value[i].anmerkungen+"</li>"
              +"</ul>"
            );
          }
          var newValue = item.join('')
          this.$emit("update:modelValue", newValue)
        },
        deep: true
      },
    },
    methods: {
      addNewRowEinzelberatung() {
        this.einzelberatung.push({
          datum: "",
          dauer:"",
          inhalt: this.inhaltIntervention+"",
          materialien:this.materialien+"",
          ergebnis:"",
          probleme:"",
          anmerkungen:"",  
        });
      },
      changeDate(value){
        return moment(value).locale('de').format('L');
      }
    },
  }
</script>