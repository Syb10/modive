<template>
  <div>
    <p class="umsetzungAspekt">Verlaufsdokumentation</p>
    <div v-if="/\bEinzelberatung\b/.test(interventionsform)">
      <p>Einzelberatung mit Klient*in</p>
      <Einzelberatung/>
    </div>
    <RadioForm
      :items="[
        {title:'ja', id:'jaSicherstellungErnaehrung', name:'sicherstellungErnaehrung'},
        {title:'nein', id:'neinSicherstellungErnaehrung', name:'sicherstellungErnaehrung'},
      ]"
      :title="'Zusatznahrung'"
      :color ="'umsetzungColor'"
      v-model="zusatznahrung"
    />
    <div v-if="zusatznahrung == 'ja'">
      <Zusatznahrung />        
    </div>
    <InputForm
      v-model="sonstigesUmsetung"
      :content="{ title: 'Sonstiges', id: 'sonstigesUmsetung', type:'text', color:'umsetzungColor', border:'umsetzungBorder'}"
    />
    <p class="umsetzungAspekt">Monitoring-Parameter</p>
    <EntwicklungMonitoring/>
  </div>    
</template>

<script>
import InputForm from "../InputForm.vue";
import RadioForm from "../RadioForm.vue";
import Einzelberatung from "./Einzelberatung.vue";
import Zusatznahrung from "./Zusatznahrung.vue";
import EntwicklungMonitoring from "./EntwicklungMonitoring.vue";

  export default {
    name:"umsetzung",
    data () {
      return {
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        },
      }
    },
    components:{
      InputForm,
      RadioForm,
      Einzelberatung,
      Zusatznahrung,
      EntwicklungMonitoring,
    },
    computed: {
      interventionsform(){
        return this.$store.state.p.interventionsform
      },
      zusatznahrung: {
        get() {
          return this.$store.state.u.zusatznahrung
        },
        set(value) {
          this.$store.commit("u/zusatznahrung", value)
        }
      },
      sonstigesUmsetung: {
        get() {
          return this.$store.state.u.sonstigesUmsetung
        },
        set(value) {
          this.$store.commit("u/sonstigesUmsetung", value)
        }
      },
    },
  };
</script>