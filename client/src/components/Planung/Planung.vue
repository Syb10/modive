<template>
  <div>
    <button @click.prevent="scrollMeTo('priorisierung')" class="btn mt-1 mr-1 tab-button tab-button-planung">Priorisierung der PASR-Statements</button>
    <button @click.prevent="scrollMeTo('zieleKlient')" class="btn mt-1 mr-1 tab-button tab-button-planung">Ziel(e) der/des Klient*in</button>
    <button @click.prevent="scrollMeTo('interventionsplan')" class="btn mt-1 mr-1 tab-button tab-button-planung">Interventionsplan</button> 
    <p class="planungAspekt mt-5" ref="priorisierung">Priorisierung der PASR-Statements</p>
    <Prio
      v-model="priorisierung"
    />
    <p class="planungAspekt" ref="zieleKlient">Ziel(e) der/des Klient*in</p>
    <div class="form-group mb-5 position-relative">
      <div class="mb-3" v-for="(ziel, index) in ZieleKlient" :key="index">
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
      Ziel(e) der Intervention
      <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
        <span class="tipptext">Die Ziele leiten sich aus den PASR-Statements unter Einbezug der Ziele der/des Klient*in ab. Es können ernährungsbezogene Ziele (z.B. aus den Bereichen Wissenszuwachs, Verhaltensänderung) und/oder gesundheitsbezogene Ziele (medizinische Ziele, gesundheitsökonomische Ziele, subjekt-orientierte Ziele) festgelegt werden.</span>
      </div>
    </label>
    <div class="form-group mb-5 position-relative">
      <div class="mb-3" v-for="(ziel, index) in ZieleIntervention" :key="index">
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
    v-model="weitereAnmerkungenIntervention"
    :content="{ title: 'weitere Anmerkungen zur Interventionsform', id: 'weitereAnmerkungenIntervention', color:'planungColor', border:'planungBorder'}"
    :isTipp="true"
    :myTipp="'Durchführung online oder in Präsenz'"
  />
  <table class="table table-striped table-bordered mb-4">
    <thead>
      <th>Monitoring- und Outcome Parameter</th>
      <th>Frequenz der Überprüfung</th>
    </thead>
    <tbody>
      <RadioTableDynamic
        v-model="monitoring"
        :isMonitoring="true"
      />
    </tbody>
  </table>
  <p>Zeitplanung</p>
  <InputForm
    v-model="dauerEinzelberatung"
    :content="{ title: 'Dauer der Einzelberatung in Minuten', id: 'dauerEinzelberatung', type:'number', min:0, color:'planungColor', border:'planungBorder' }"
  />
  <InputForm
    v-model="frequenzInterventionen"
    :content="{ title: 'Frequenz der Interventionen', id: 'frequenzInterventionen', type:'text', color:'planungColor', border:'planungBorder' }"
    :style="marginSmaller"
  />
  <InputForm
    v-model="zeitraumIntervention"
    :content="{ title: 'Zeitraum der gesamten Intervention', id: 'zeitraumIntervention', type:'text', color:'planungColor', border:'planungBorder' }"
    :style="marginSmaller"
  />
  <TextareaForm
    v-model="inhaltIntervention"
    :content="{ title: 'Inhalt der Intervention', id: 'inhaltIntervention', color:'planungColor', border:'planungBorder'}"
  />
  <TextareaForm
    v-model="materialien"
    :content="{ title: 'verwendete Materialien', id: 'materialien', color:'planungColor', border:'planungBorder'}"
  />
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
</template>

<script>
import TextareaForm from "../TextareaForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import InputForm from "../InputForm.vue";
import RadioTableDynamic from "../RadioTableDynamic.vue";
import RadioForm from "../RadioForm.vue";
import Prio from "./Prio.vue";
import {mapFields} from "vuex-map-fields";
  export default {
    name:"planung",
    components: {
        TextareaForm,
        CheckboxForm,
        InputForm,
        RadioTableDynamic,
        RadioForm,
        Prio,
    },
    data() {
      return{
        testprio:[],
        ZieleKlient:[
          {title: "Ziel", vmodel:"", id:"ziel0"},
        ],
        counterKlient:0,
        ZieleIntervention:[
          {title: "Ziel", vmodel:"", id:"ziel0"},
        ],
        counterIntervention:0,
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        }
      }
    },
    computed: {
      ...mapFields([
        "priorisierung",
        "zieleKlient",
        "leitlinien",
        "zieleIntervention",
        "interventionsform",
        "interventionsformAndere",
        "weitereAnmerkungenIntervention",
        "monitoring",
        "dauerEinzelberatung",
        "frequenzInterventionen",
        "zeitraumIntervention",
        "inhaltIntervention",
        "materialien",
        "weitereBerufsgruppen",
        "weitereBerufsgruppenAndere",
        "angehoerige",
        "weitereAnmerkungenInterventionNochmal",
      ]),
    },
    methods: {
      //https://stackoverflow.com/questions/42645964/vue-js-anchor-to-div-within-the-same-component
      scrollMeTo(refName) {
        var element = this.$refs[refName];
        element.scrollIntoView({behavior: 'smooth'});
      },
      addNewZielKlient() {
        this.ZieleKlient.push(
          {title: "Ziel", vmodel:"", id:"zielKlient"+this.counter},
        );
        this.counterKlient++;
      },
      deleteZielKlient(index) {
        this.ZieleKlient.splice(index, 1);
      },
      addNewZielIntervention() {
        this.ZieleIntervention.push(
          {title: "Ziel", vmodel:"", id:"zielIntervention"+this.counter},
        );
        this.counterIntervention++;
      },
      deleteZielIntervention(index) {
        this.ZieleIntervention.splice(index, 1);
      },
    },
    watch: {
      // see https://v3.vuejs.org/guide/migration/watch.html#overview
      ZieleKlient:{
        handler(value) {
          var item=[]
          for(var i=0; i < value.length; i++){
            if(i== value.length-1) {
              //wenn es das letzte Paar ist kein Komma hinten
              item.push(i+1+". "+value[i].title,":", value[i].vmodel);
            } else{
              item.push(i+1+". "+value[i].title,":", value[i].vmodel,", ");
            }           
          }
          var newValue = item.join('')
          this.zieleKlient = newValue
        },
        deep: true
      },
      ZieleIntervention:{
        handler(value) {
          var item=[]
          for(var i=0; i < value.length; i++){
            if(i== value.length-1) {
              //wenn es das letzte Paar ist kein Komma hinten
              item.push(i+1+". "+value[i].title,":", value[i].vmodel);
            } else{
              item.push(i+1+". "+value[i].title,":", value[i].vmodel,", ");
            }           
          }
          var newValue = item.join('')
          this.zieleIntervention = newValue
        },
        deep: true
      },
    }
  }
</script>
