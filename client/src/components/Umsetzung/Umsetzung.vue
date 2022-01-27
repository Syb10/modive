<template>
  <div>
    <p class="umsetzungAspekt">Verlaufsdokumentation</p>
    <p v-if="isNoInterventionsform" class="alert alert-danger">In der Planung der Intervention wurden noch keine Umsetzungen festgelegt</p>
    <UmsetzungTermine v-if="/\bEinzelberatung\b/.test(interventionsform)"
      :headline="'Einzelberatung mit Klient*in'"
      :title="'Einzelberatung'"
      :value="einzelberatung"
      :addNewRow="addNewRowEinzelberatung"
      :deleteRow="deleteRowEinzelberatung"
    />
    <UmsetzungTermine v-if="/\Gruppenschulung\b/.test(interventionsform)"
      :headline="'Gruppenschulung mit Klient*in'"
      :title="'Gruppenschulung'"
      :value="gruppenschulung"
      :addNewRow="addNewRowGruppenschulung"
      :deleteRow="deleteRowGruppenschulung"
    />
    <UmsetzungTermine v-if="/\bEinkaufstraining\b/.test(interventionsform)"
      :headline="'Einkaufstraining mit Klient*in'"
      :title="'Einkaufstraining'"
      :value="einkaufstraining"
      :addNewRow="addNewRowEinkaufstraining"
      :deleteRow="deleteRowEinkaufstraining"
    />
    <UmsetzungTermine v-if="/\Lehrküche\b/.test(interventionsform)"
      :headline="'Lehrküche mit Klient*in'"
      :title="'Lehrküche'"
      :value="lehrkueche"
      :addNewRow="addNewRowLehrkueche"
      :deleteRow="deleteRowLehrkueche"
    />
    <UmsetzungTermine v-if="interventionsformAndere"
      :headline="interventionsformAndere + ' mit Klient*in'"
      :title="interventionsformAndere"
      :value="andereInterventionsform"
      :addNewRow="addNewRowAndereInterventionsform"
      :deleteRow="deleteRowAndereInterventionsform"
    />
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
      :content="{ title: 'Weitere Anmerkungen zur Umsetzung der Intervention', id: 'sonstigesUmsetung', type:'text', color:'umsetzungColor', border:'umsetzungBorder'}"
    />
    <p class="umsetzungAspekt">Monitoring-Parameter</p>
    <EntwicklungMonitoring/>
  </div>    
</template>

<script>
import InputForm from "../InputForm.vue";
import RadioForm from "../RadioForm.vue";
import UmsetzungTermine from "./UmsetzungTermine.vue";
import Zusatznahrung from "./Zusatznahrung.vue";
import EntwicklungMonitoring from "./EntwicklungMonitoring.vue";
import {mapState, mapMutations} from "vuex";

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
      UmsetzungTermine,
      Zusatznahrung,
      EntwicklungMonitoring,
    },
    computed: {
      ...mapState("p",[
        "interventionsform",
        "interventionsformAndere",
        "einzelberatung",
        "gruppenschulung",
        "einkaufstraining",
        "lehrkueche",
        "andereInterventionsform",
      ]),
      isNoInterventionsform(){
        if(this.interventionsform != '' || this.interventionsformAndere != ''){
          return false
        } else {
          return true
        }
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
    methods: {
      ...mapMutations("p",[
        "addNewRowEinzelberatung",
        "deleteRowEinzelberatung",
        "addNewRowGruppenschulung",
        "deleteRowGruppenschulung",
        "addNewRowEinkaufstraining",
        "deleteRowEinkaufstraining",
        "addNewRowLehrkueche",
        "deleteRowLehrkueche",
        "addNewRowAndereInterventionsform",
        "deleteRowAndereInterventionsform",
      ]),
    }
  };
</script>