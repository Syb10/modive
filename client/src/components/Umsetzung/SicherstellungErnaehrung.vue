<template>
  <div>
    <div v-for="(item, index) in sicherstellung" :key="index" :class="[(index == sicherstellung.length-1) ? 'mb-3' : 'mb-5']">
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
     </div>
     <button class="btn btn-umsetzung mb-5" @click.prevent="addNewRowSicherstellungErnaehrung()"><i class="fa fa-plus-circle"></i> Datum hinzufügen</button>    
  </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import moment from 'moment';
  export default {
    name: "sicherstellungErnaehrung",
    data() {
      return {
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        },
        sicherstellung:[{
          datum: "",
          produktbezeichnung:"",
          verzehrshaeufigkeit:"",
          menge:"", 
        }],
      }
    },
    props:{
      modelValue:[],
    },
    emits:["update:modelValue"],
    components:{
      InputForm,
    },
    watch:{
      sicherstellung:{
        handler(value) {
          // aus dem Array ein String der dem v-model uebergeben wird und dann mit v-html angezeigt
          var item=[]
          for(var i=0; i < value.length; i++){
            item.push(
              "<div>"+this.changeDate(value[i].datum)+"</div>"
              +"<ul>"
              +"<li>Produktbezeichnung: "+value[i].produktbezeichnung+"</li>"
              +"<li>empfohlende Verzehrshäufigkeit pro Tag: "+value[i].verzehrshaeufigkeit+"</li>"
              +"<li>empfohlende Menge pro Tag: "+value[i].menge+"</li>"
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
      addNewRowSicherstellungErnaehrung() {
        this.sicherstellung.push({
          datum: "",
          produktbezeichnung:"",
          verzehrshaeufigkeit:"",
          menge:"", 
        });
      },
      changeDate(value){
        return moment(value).locale('de').format('L');
      }
    },
  }
</script>