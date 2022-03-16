<template>
  <div>
    <button @click.prevent="scrollMeTo('priorisierung')" class="btn mt-1 mr-1 tab-button tab-button-planung">Priorisierung der diätetischen Diagnosen</button>
    <button @click.prevent="scrollMeTo('leitlinien')" class="btn mt-1 mr-1 tab-button tab-button-planung">Leitlinien und Literatur</button>
    <button @click.prevent="scrollMeTo('ziele')" class="btn mt-1 mr-1 tab-button tab-button-planung">Ziele</button>
    <button @click.prevent="scrollMeTo('interventionsplan')" class="btn mt-1 mr-1 tab-button tab-button-planung">Interventionsplan</button> 
    <div>
      <label class="planungAspekt mt-5" ref="priorisierung">Priorisierung der diätetischen Diagnosen
        <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
          <span class="tipptext">Die diätetischen Diagnosen sind die formulierten PASR-Statements</span>
        </div>
      </label>
    </div>
    <Prio/>
    <p class="planungAspekt mt-5" ref="leitlinien">Leitlinien und Literatur</p>
    <TextareaForm
      v-model="leitlinien"
      :content="{ title: 'verwendete Leitlinien oder Literatur', id: 'leitlinien', color:'planungColor', border:'planungBorder'}"
    />
    <div>
      <label class="planungAspekt" ref="ziele">Ziele
        <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
          <span class="tipptext">Orientieren Sie sich bei der Festlegung der Ziele an den SMART-Kriterien. Ziele sollten möglichst Spezifisch, Messbar, Attraktiv, Realistisch und Terminiert sein.</span>
        </div>
      </label>
    </div>
    <label>
      Übergeordnetes Ziel (diätetisches Outcome) 
      <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
        <span class="tipptext">Das diätetische Outcome ist das Ergebnis des gesamten diätetischen Interventionsprozesses, das entsprechend der Verlaufsziele bis zum Ende der diätetischen Intervention erreicht werden soll. Es bezieht sich direkt auf die Lösung des/der diätetischen Problem(e) der Diätetischen Diagnosestellung.</span>
      </div>
    </label>
    <div class="form-group mb-5 position-relative">
      <div class="mb-3" v-for="(ziel, index) in uebergeordetesZiel" :key="index">
        <label :for="ziel.id" class="input-group-text textareaForm normal-white-space planungColor">
          {{index+1}}. {{ziel.title }}
          <i class="fa fa-trash trash-right" @click.prevent="deleteUebergeordetesZiel(index)"></i>
        </label>
        <textarea
          class="form-control textareaForm planungBorder"
          :id="ziel.id"
          v-model="ziel.vmodel"
        />
      </div>
      <button class="btn btn-darkblue mt-3" @click.prevent="addNewUebergeordetesZiel"><i class="fa fa-plus-circle"></i> Übergeordnetes Ziel (diätetisches Outcome) hinzufügen</button> 
    </div>
    
    <label>
      Verlaufsziele
      <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
        <span class="tipptext">Verlaufsziele sind kurzfristige Ziele, die während der diätetischen Intervention, meist von einem zum nächsten Termin, erreicht werden sollen. Sie werden von Ernährungsfachkraft und Klient*in gemeinsam entschieden. Sie sollten partizipativ mit Klient*innen festgelegt werden.</span>
      </div>
    </label>
    <div class="form-group mb-5 position-relative">
      <div class="mb-3" v-for="(ziel, index) in verlaufsziel" :key="index">
        <label :for="ziel.id" class="input-group-text textareaForm normal-white-space planungColor">
          {{index+1}}. {{ziel.title }}
          <i class="fa fa-trash trash-right" @click.prevent="deleteVerlaufsziel(index)"></i>
        </label>
        <textarea
          class="form-control textareaForm planungBorder"
          :id="ziel.id"
          v-model="ziel.vmodel"
        /> 
      </div>
      <button class="btn btn-darkblue mt-3" @click.prevent="addNewVerlaufsziel"><i class="fa fa-plus-circle"></i> Verlaufsziel hinzufügen</button>
    </div>
    <p class="planungAspekt" ref="interventionsplan">Interventionsplan</p>
    <label>
      Ernährungsempfehlung
      <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
        <span class="tipptext">Die Ernährungsempfehlung basiert auf der diätetischen Diagnose, der aktuell verfügbaren Evidenz und dem Gesundheitszustand des/der Klient*in. Zu berücksichtigen sind die individuell empfohlene Energiezufuhr basierend auf den Richtwerten für die Energiezufuhr; der Nährstoffbedarf; Lebensmittel, die gut akzeptiert werden und für die Umsetzung der Empfehlungen geeignet sind.</span>
      </div>
    </label>
    <TextareaForm
      v-model="ernaehrungsempfehlung"
      :content="{ title: 'Ernährungsempfehlung', id: 'ernaehrungsempfehlung', color:'planungColor', border:'planungBorder'}"
    />
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
    <PlanungTermine v-if="/\bEinzelberatung\b/.test(interventionsform)"
      :title="'Einzelberatung'"
      :value="planungEinzelberatung"
      :addNewRow="addNewRowPlanungEinzelberatung"
      :deleteRow="deleteRowPlanungEinzelberatung"
      :update="updateEinzelberatung"
    />
    <PlanungTermine v-if="/\bGruppenschulung\b/.test(interventionsform)"
      :title="'Gruppenschulung'"
      :value="planungGruppenschulung"
      :addNewRow="addNewRowPlanungGruppenschulung"
      :deleteRow="deleteRowPlanungGruppenschulung"
      :update="updateGruppenschulung"
    />
    <PlanungTermine v-if="/\bEinkaufstraining\b/.test(interventionsform)"
      :title="'Einkaufstraining'"
      :value="planungEinkaufstraining"
      :addNewRow="addNewRowPlanungEinkaufstraining"
      :deleteRow="deleteRowPlanungEinkaufstraining"
      :update="updateEinkaufstraining"
    />
    <PlanungTermine v-if="/\bLehrküche\b/.test(interventionsform)"
      :title="'Lehrküche'"
      :value="planungLehrkueche"
      :addNewRow="addNewRowPlanungLehrkueche"
      :deleteRow="deleteRowPlanungLehrkueche"
      :update="updateLehrkueche"
    />
    <PlanungTermine v-if="interventionsformAndere"
      :title="interventionsformAndere"
      :value="planungAndereInterventionsform"
      :addNewRow="addNewRowPlanungAndereInterventionsform"
      :deleteRow="deleteRowPlanungAndereInterventionsform"
      :update="updateAndereInterventionsform"
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
    <label>
      Monitoring- und Outcome-Parameter
      <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
        <span class="tipptext">Monitoring- und Outcome-Parameter sind abhängig von den oben formulierten Zielen. Sie sind Indikatoren, die zur Überprüfung des Verlaufs der diätetischen Intervention und der Zielerreichung dienen. Gewählte Indikatoren sollten in der Lage sein, Veränderungen zu messen, die mit dem Referenzstandards oder einem Ausgangswert verglichen werden können.</span>
      </div>
    </label>
    <table class="table table-striped table-bordered mb-4">
      <thead>
        <th>Monitoring- und Outcome-Parameter</th>
        <th>Frequenz der Überprüfung</th>
      </thead>
      <tbody>
        <tr v-for="(item, indexI) in monitoring" :key="indexI">
          <td v-for="(i, index) in item" :key="index">
            <input v-if="i.input" class="form-control planungBorder" type="text" v-model="i.title"/>
            <i v-if="i.button" class="fa fa-trash btn btn-red ml-3" @click.prevent="deleteRowMonitoring(indexI)"></i>
          </td>
        </tr>
        <button class="btn btn-darkblue mb-3 marginRadioTableDynamic" @click.prevent="addNewRowMonitoring"><i class="fa fa-plus-circle"></i> Zeile hinzufügen</button> 
      </tbody>
    </table>
  </div>
</template>

<script>
import TextareaForm from "../TextareaForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import InputForm from "../InputForm.vue";
import RadioForm from "../RadioForm.vue";
import Prio from "./Prio.vue";
import PlanungTermine from "./PlanungTermine.vue";
import {mapMutations, mapState} from "vuex";

  export default {
    name:"planung",
    components: {
        TextareaForm,
        CheckboxForm,
        InputForm,
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
      ...mapState("p",[
        "planungEinzelberatung",
        "planungGruppenschulung",
        "planungEinkaufstraining",
        "planungLehrkueche",
        "planungAndereInterventionsform",
      ]),
      leitlinien:{
        get() {
          return this.$store.state.p.leitlinien
        },
        set(value) {
          this.$store.commit("p/leitlinien", value)
        }
      },
      uebergeordetesZiel(){
        return this.$store.state.p.uebergeordetesZiel
      },
      verlaufsziel(){
        return this.$store.state.p.verlaufsziel
      },
      ernaehrungsempfehlung:{
        get() {
          return this.$store.state.p.ernaehrungsempfehlung
        },
        set(value) {
          this.$store.commit("p/ernaehrungsempfehlung", value)
        }
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
    },
    methods: {
      //https://stackoverflow.com/questions/42645964/vue-js-anchor-to-div-within-the-same-component
      scrollMeTo(refName) {
        var element = this.$refs[refName];
        element.scrollIntoView({behavior: 'smooth'});
      },
      ...mapMutations("p", [
        "addNewUebergeordetesZiel",
        "deleteUebergeordetesZiel",
        "addNewVerlaufsziel",
        "deleteVerlaufsziel",
        "addNewRowPlanungEinzelberatung",
        "deleteRowPlanungEinzelberatung",
        "updateEinzelberatung",
        "addNewRowPlanungGruppenschulung",
        "deleteRowPlanungGruppenschulung",
        "updateGruppenschulung",
        "addNewRowPlanungEinkaufstraining",
        "deleteRowPlanungEinkaufstraining",
        "updateEinkaufstraining",
        "addNewRowPlanungLehrkueche",
        "deleteRowPlanungLehrkueche",
        "updateLehrkueche",
        "addNewRowPlanungAndereInterventionsform",
        "deleteRowPlanungAndereInterventionsform",
        "updateAndereInterventionsform",
        "addNewRowMonitoring",
        "deleteRowMonitoring"
      ]),
    },
  }
</script>
