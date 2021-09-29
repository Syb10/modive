<template>
  <div>
    <button @click.prevent="scrollMeTo('priorisierung')" class="btn mt-1 mr-1 tab-button tab-button-planung">Priorisierung der PASR-Statements</button>
    <button @click.prevent="scrollMeTo('zieleKlient')" class="btn mt-1 mr-1 tab-button tab-button-planung">Ziel(e) der/des Klient*in</button>
    <button @click.prevent="scrollMeTo('interventionsplan')" class="btn mt-1 mr-1 tab-button tab-button-planung">Interventionsplan</button> 
    <p class="planungAspekt mt-5" ref="priorisierung">Priorisierung der PASR-Statements</p>
    <Prio/>
    <p class="planungAspekt" ref="zieleKlient">Ziel(e) der/des Klient*in</p>
    <div class="form-group mb-5 position-relative">
      <div class="mb-3" v-for="(ziel, index) in zieleKlient" :key="index">
        <label :for="ziel.id" class="input-group-text textareaForm normal-white-space planungColor">
          {{index+1}}. {{ziel.title }}
          <i class="fa fa-trash trash-right" @click.prevent="deleteZielKlient(index)"></i>
        </label>
        <textarea
          class="form-control textareaForm planungBorder"
          :id="ziel.id"
          v-model="ziel.vmodel"
        />
      </div>
      <button class="btn btn-darkblue mt-3" @click.prevent="addNewZielKlient"><i class="fa fa-plus-circle"></i> Ziel hinzufügen</button> 
    </div>
    <TextareaForm
      v-model="leitlinien"
      :content="{ title: 'verwendete Leitlinien oder Literatur', id: 'leitlinien', color:'planungColor', border:'planungBorder'}"
    />
    <p class="planungAspekt" ref="interventionsplan">Interventionsplan</p>
    <label>
      Ziel(e) der gesamten Intervention
      <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
        <span class="tipptext">Die Ziele leiten sich aus den PASR-Statements unter Einbezug der Ziele der/des Klient*in ab. Es können ernährungsbezogene Ziele (z.B. aus den Bereichen Wissenszuwachs, Verhaltensänderung) und/oder gesundheitsbezogene Ziele (medizinische Ziele, gesundheitsökonomische Ziele, subjekt-orientierte Ziele) festgelegt werden.</span>
      </div>
    </label>
    <div class="form-group mb-5 position-relative">
      <div class="mb-3" v-for="(ziel, index) in zieleIntervention" :key="index">
        <label :for="ziel.id" class="input-group-text textareaForm normal-white-space planungColor">
          {{index+1}}. {{ziel.title }}
          <i class="fa fa-trash trash-right" @click.prevent="deleteZielIntervention(index)"></i>
        </label>
        <textarea
          class="form-control textareaForm planungBorder"
          :id="ziel.id"
          v-model="ziel.vmodel"
        /> 
      </div>
      <button class="btn btn-darkblue mt-3" @click.prevent="addNewZielIntervention"><i class="fa fa-plus-circle"></i> Ziel hinzufügen</button>
    </div>
    <CheckboxForm
      :checkboxs="[
        {title:'Einzelberatung', id:'einzelberatung'},
        {title:'Gruppenschulung', id:'gruppenschulung'},
        {title:'Einkaufstraining', id:'einkaufstraining'},
        {title:'Lehrküche', id:'lehrkueche'},
      ]"
      :title="'Interventionsform'"
      :color ="'planungColor'"
      v-model="interventionsform"
    />
    <InputForm
      v-model="interventionsformAndere"
      :content="{ title: 'andere', id: 'interventionsformAndere', type:'text', color:'planungColor', border:'planungBorder' }"
      :style="marginSmall"
    />
    <TextareaForm
      v-model="weitereAnmerkungenInterventionform"
      :content="{ title: 'weitere Anmerkungen zur Interventionsform', id: 'weitereAnmerkungenIntervention', color:'planungColor', border:'planungBorder'}"
      :isTipp="true"
      :myTipp="'z.B. Durchführung online oder in Präsenz'"
    />
    <p>Zeitplanung</p>
    <InputForm
      v-model="zeitraumIntervention"
      :content="{ title: 'Zeitraum der gesamten Intervention', id: 'zeitraumIntervention', type:'text', color:'planungColor', border:'planungBorder' }"
      
    />
    <InputForm
      v-model="frequenzInterventionen"
      :content="{ title: 'Frequenz der Interventionen', id: 'frequenzInterventionen', type:'text', color:'planungColor', border:'planungBorder' }"
      :style="marginSmaller"
    /> 
    <PlanungTermine v-if="/\bEinzelberatung\b/.test(interventionsform)"/>
    <CheckboxForm
      :checkboxs="[
        {title:'Ärzt*innen', id:'arzt'},
        {title:'Psycholog*innen', id:'psychologe'},
        {title:'Physiotherapeut*innen', id:'physiotherapeut'},
        {title:'Logopäd*innen', id:'logopaede'},
      ]"
      :title="'Einbezug weiterer Berufsgruppen (Multidisziplinarität)'"
      :color ="'planungColor'"
      v-model="weitereBerufsgruppen"
    />
    <InputForm
      v-model="weitereBerufsgruppenAndere"
      :content="{ title: 'andere', id: 'weitereBerufsgruppenAndere', type:'text', color:'planungColor', border:'planungBorder' }"
      :style="marginSmall"
    />
    <RadioForm
      :items="[
        {title:'ja', id:'jaAngehoerige', name:'angehoerige'},
        {title:'nein', id:'neinAngehoerige', name:'angehoerige'},
      ]"
      :title="'Einbezug von Angehörigen'"
      :color="'planungColor'"
      v-model="angehoerige"
    />
    <TextareaForm
      v-model="weitereAnmerkungenInterventionNochmal"
      :content="{ title: 'weitere Anmerkungen', id: 'weitereAnmerkungenInterventionNochmal', color:'planungColor', border:'planungBorder'}"
    />
    <table class="table table-striped table-bordered mb-4">
      <thead>
        <th>Monitoring- und Outcome Parameter</th>
        <th>Frequenz der Überprüfung</th>
      </thead>
      <tbody>
        <RadioTableDynamic
          :isMonitoring="true"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import TextareaForm from "../TextareaForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import InputForm from "../InputForm.vue";
import RadioTableDynamic from "../RadioTableDynamic.vue";
import RadioForm from "../RadioForm.vue";
import Prio from "./Prio.vue";
import PlanungTermine from "./PlanungTermine.vue";
import {mapMutations} from "vuex";

  export default {
    name:"planung",
    components: {
        TextareaForm,
        CheckboxForm,
        InputForm,
        RadioTableDynamic,
        RadioForm,
        Prio,
        PlanungTermine,
    },
    data() {
      return{
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        }
      }
    },
    computed: {
      zieleKlient(){
        return this.$store.state.p.zieleKlient
      },
      leitlinien:{
        get() {
          return this.$store.state.p.leitlinien
        },
        set(value) {
          this.$store.commit("p/leitlinien", value)
        }
      },
      zieleIntervention(){
        return this.$store.state.p.zieleIntervention
      },
      interventionsform:{
        get() {
          return this.$store.state.p.interventionsform
        },
        set(value) {
          this.$store.commit("p/interventionsform", value)
        }
      },
      interventionsformAndere: {
       get() {
          return this.$store.state.p.interventionsformAndere
        },
        set(value) {
          this.$store.commit("p/interventionsformAndere", value)
        } 
      },
      weitereAnmerkungenInterventionform: {
        get() {
          return this.$store.state.p.weitereAnmerkungenInterventionform
        },
        set(value) {
          this.$store.commit("p/weitereAnmerkungenInterventionform", value)
        } 
      },
      zeitraumIntervention: {
        get() {
          return this.$store.state.p.zeitraumIntervention
        },
        set(value) {
          this.$store.commit("p/zeitraumIntervention", value)
        }
      },
      frequenzInterventionen: {
        get() {
          return this.$store.state.p.frequenzInterventionen
        },
        set(value) {
          this.$store.commit("p/frequenzInterventionen", value)
        }
      },
      weitereBerufsgruppen: {
        get() {
          return this.$store.state.p.weitereBerufsgruppen
        },
        set(value) {
          this.$store.commit("p/weitereBerufsgruppen", value)
        }
      },
      weitereBerufsgruppenAndere: {
        get() {
          return this.$store.state.p.weitereBerufsgruppenAndere
        },
        set(value) {
          this.$store.commit("p/weitereBerufsgruppenAndere", value)
        }
      },
      angehoerige: {
        get() {
          return this.$store.state.p.angehoerige
        },
        set(value) {
          this.$store.commit("p/angehoerige", value)
        }
      },
      weitereAnmerkungenInterventionNochmal: {
        get() {
          return this.$store.state.p.weitereAnmerkungenInterventionNochmal
        },
        set(value) {
          this.$store.commit("p/weitereAnmerkungenInterventionNochmal", value)
        }
      },
      monitoring() {
        return this.$store.state.p.monitoring
      },
      entwicklungMonitoring() {
        return this.$store.state.p.entwicklungMonitoring
      }
    },
    methods: {
      //https://stackoverflow.com/questions/42645964/vue-js-anchor-to-div-within-the-same-component
      scrollMeTo(refName) {
        var element = this.$refs[refName];
        element.scrollIntoView({behavior: 'smooth'});
      },
      ...mapMutations("p", [
        "addNewZielKlient",
        "deleteZielKlient",
        "addNewZielIntervention",
        "deleteZielIntervention",
      ]),
    },
  }
</script>
