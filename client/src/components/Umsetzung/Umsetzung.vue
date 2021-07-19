<template>
  <div>
    <p class="umsetzungAspekt">Verlaufsdokumentation</p>
    <div v-if="/\bEinzelberatung\b/.test(interventionsform)">
      <p>Einzelberatung mit Klient*in</p>
      <Einzelberatung
        v-model="entwicklungEinzelberatung"
      />
    </div>
    <RadioForm
      :items="[
        {title:'ja', id:'jaSicherstellungErnaehrung', name:'sicherstellungErnaehrung'},
        {title:'nein', id:'neinSicherstellungErnaehrung', name:'sicherstellungErnaehrung'},
      ]"
      :title="'Sicherstellung der Ernährung'"
      :color ="'umsetzungColor'"
      v-model="sicherstellungErnaehrung"
    />
    <div v-if="sicherstellungErnaehrung == 'ja'">
      <p style="margin:-2rem 0 0.5rem 0">Zusatznahrung</p>
      <SicherstellungErnaehrung
        v-model="entwicklungSicherstellungErnaehrung"
      />        
    </div>
    <InputForm
      v-model="sonstigesUmsetung"
      :content="{ title: 'Sonstiges', id: 'sonstigesUmsetung', type:'text', color:'umsetzungColor', border:'umsetzungBorder'}"
    />
    <p class="umsetzungAspekt">Entwicklung der Monitoring-Parameter</p>
    <EntwicklungMonitoring
      v-model="entwicklungMonitoringParameter"
      :anzahl="anzahl"
    />
  </div>    
</template>

<script>
import InputForm from "../InputForm.vue";
import RadioForm from "../RadioForm.vue";
import Einzelberatung from "./Einzelberatung.vue";
import SicherstellungErnaehrung from "./SicherstellungErnaehrung.vue";
import EntwicklungMonitoring from "./EntwicklungMonitoring.vue";
import {mapFields} from "vuex-map-fields";
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
      SicherstellungErnaehrung,
      EntwicklungMonitoring,
    },
    computed: {
      ...mapFields([
        "interventionsform",
        "entwicklungEinzelberatung",
        "sicherstellungErnaehrung",
        "entwicklungSicherstellungErnaehrung",
        "sonstigesUmsetung",
        "monitoring",
        "entwicklungMonitoringParameter",
      ]),
      anzahl() {
        if(this.monitoring != undefined) {
          return this.monitoring.split(',').length;
        }
        return 0
      },
    },
  };
</script>