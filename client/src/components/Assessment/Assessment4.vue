<template>
    <div>
        <button @click.prevent="scrollMeTo('anthropometrischeDaten')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Anthropometrische Daten</button>
        <button @click.prevent="scrollMeTo('koerperzusammensetzung')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Körperzusammensetzung</button>
        <button @click.prevent="scrollMeTo('biochemischeParameter')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Biochemische Parameter, medizinische Tests/Maßnahmen</button>
        <button @click.prevent="scrollMeTo('koerperlicheErscheinungen')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Körperliche Erscheinungen</button>
        <button @click.prevent="scrollMeTo('upload')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Upload-Bereich für weitere Dokumente</button>
        <p class="assessmentAspekt mt-5" ref="anthropometrischeDaten">Anthropometrische Daten</p>
        <InputForm
          v-model="koerpergroesse"
          :content="{title:'Körpergröße (in m)', id:'koerpergroesse', type:'number', min:'0', step: '0.01', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <InputForm
          v-model="koerpergewicht"
          :content="{title:'Körpergewicht (in kg)', id:'koerpergewicht', type:'number', min:'0', step: '0.01', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <InputForm
          v-model="bmi"
          :content="{title:'gBody Mass Index (in kg/m&sup2;)', id:'bmi', type:'number', min:'0', step: '0.01', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <InputForm
          v-model="taillenumfang"
          :content="{title:'Taillenumfang (in cm)', id:'taillenumfang', type:'number', min:'0', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <InputForm
          v-model="hautfaltendicke"
          :content="{title:'Hautfaltendicke', id:'hautfaltendicke', type:'text', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <p class="assessmentAspekt" ref="koerperzusammensetzung">Körperzusammensetzung</p>
        <InputForm
          v-model="fettfreieMasse"
          :content="{title:'fettfreie Masse (FFM)', id:'fettfreieMasse', type:'text', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <InputForm
          v-model="fettmasse"
          :content="{title:'Fettmasse (FM)', id:'fettmasse', type:'text', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <InputForm
          v-model="ruheenergieumsatz"
          :content="{title:'Ruheenergieumsatz', id:'ruheenergieumsatz', type:'text', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <p class="assessmentAspekt" ref="biochemischeParameter">Biochemische Parameter, medizinische Tests/Maßnahmen</p>
        <TextareaForm
          v-model="chemieMetabolischeParameter"
          :content="{ title: 'Chemie/metabolische Parameter in Blut und Urin', id: 'chemieMetabolischeParameter', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <TextareaForm
          v-model="vitalzeichen"
          :content="{ title: 'Vitalzeichen', id: 'vitalzeichen', color:'assessmentColor', border:'assessmentBorder'}"
          :isTipp="true"
          :myTipp="'Blutdruck, Temperatur, Puls, Atmung, Bewusstsein'"
        />
        <TextareaForm
          v-model="weitereMessungen"
          :content="{ title: 'weitere Messungen', id: 'weitereMessungen', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <p class="assessmentAspekt" ref="koerperlicheErscheinungen">Körperliche Erscheinungen</p>
        <RadioForm
          :items="[
            {title:'ja', id:'jaSchlucken', name:'schlucken'},
            {title:'ja, aber eingeschränkt', id:'jaAberSchlucken', name:'schlucken'},
            {title:'nein', id:'neinSchlucken', name:'schlucken'},
          ]"
          :title="'Fähigkeit zu schlucken'"
          :color ="'assessmentColor'"
          v-model="schlucken"
        />
      <div v-if="schlucken == 'ja, aber eingeschränkt'">
        <InputForm
          v-model="schluckenJaAber"
          :content="{title:'Welche Einschränkungen bestehen?', id:'schluckenJaAberBegruendung', type:'text', color:'assessmentColor', border:'assessmentBorder'}"
          :style="marginSmall"
        />
      </div>
      <div v-if="schlucken == 'nein'">
        <InputForm
          v-model="schluckenNein"
          :content="{title:'Warum nicht?', id:'schluckenNeinBegruendung', type:'text', color:'assessmentColor', border:'assessmentBorder'}"
          :style="marginSmall"
        />
      </div> 
      <RadioForm
          :items="[
            {title:'ja', id:'jaErbrechen', name:'erbrechen'},
            {title:'nein', id:'neinErbrechen', name:'erbrechen'},
          ]"
          :title="'Erbrechen'"
          :color ="'assessmentColor'"
          v-model="erbrechen"
        />
      <div v-if="erbrechen == 'ja'">
        <InputForm
          v-model="erbrechenJa"
          :content="{title:'Inwiefern?', id:'erbrechenJa', type:'text', color:'assessmentColor', border:'assessmentBorder'}"
          :style="marginSmall"
        />
      </div> 
      <CheckboxForm
        :checkboxs="[
          {title:'Prothese', id:'prothese'},
          {title:'Mukositis', id:'mukositis'},
          {title:'keine Auffälligkeiten', id:'keineAuffaelligkeiten'},
        ]"
        :title="'Mundgesundheit'"
        :isTipp="true"
        :myTipp="'Zahnfleisch, Lippen, Zähne, Zunge'"
        :color ="'assessmentColor'"
        v-model="mundgesundheit"
      />
      <InputForm
        v-model="mundgesundheitAndere"
        :content="{ title: 'andere', id: 'mundgesundheitAndere', type:'text', color:'assessmentColor', border:'assessmentBorder'}"
        :style="marginSmall"
      />
      <TextareaForm
        v-model="problemeNahrungsaufnahme"
        :content="{ title: 'Bei der Nutzung eines Zahnersatzes: Probleme bei der Nahrungsaufnahme', id: 'problemeNahrungsaufnahme', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <TextareaForm
        v-model="appetitBeeintraechtigung"
        :content="{ title: 'Appetit und Beeinträchtigung', id: 'appetitBeeintraechtigung', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <TextareaForm
        v-model="weitereKoerperlicheBefunde"
        :content="{ title: 'weitere körperliche Befunde', id: 'weitereKoerperlicheBefunde', color:'assessmentColor', border:'assessmentBorder'}"
        :isTipp="true"
        :myTipp="'z.B. Stuhlgang, Urin, Atmung'"
      />
       <p class="assessmentAspekt" ref="upload">Upload-Bereich für weitere Dokumente in Klinischer Status</p>
       <UploadFile
        v-model="uploadAssessment4"
        :color ="'btn-gold'"
      />
    </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import TextareaForm from "../TextareaForm.vue";
import RadioForm from "../RadioForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import UploadFile from "../UploadFile.vue";
import {mapGetters} from "vuex";

export default {
    name: "assessment4",
    data() {
      return {
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        }
      }
    },
    components: {
        InputForm,
        TextareaForm,
        RadioForm,
        CheckboxForm,
        UploadFile,
    },
    computed: {
      ...mapGetters("a4",[
        "bmi"
      ]),
      koerpergroesse:{
        get() {
          return this.$store.state.a4.koerpergroesse
        },
        set(value) {
          this.$store.commit("a4/koerpergroesse", value)
        }
      },
      koerpergewicht:{
        get() {
          return this.$store.state.a4.koerpergewicht
        },
        set(value) {
          this.$store.commit("a4/koerpergewicht", value)
        }
      },
      taillenumfang:{
        get() {
          return this.$store.state.a4.taillenumfang
        },
        set(value) {
          this.$store.commit("a4/taillenumfang", value)
        }
      },
      hautfaltendicke:{
        get() {
          return this.$store.state.a4.hautfaltendicke
        },
        set(value) {
          this.$store.commit("a4/hautfaltendicke", value)
        }
      },
      fettfreieMasse:{
        get() {
          return this.$store.state.a4.fettfreieMasse
        },
        set(value) {
          this.$store.commit("a4/fettfreieMasse", value)
        }
      },
      fettmasse:{
        get() {
          return this.$store.state.a4.fettmasse
        },
        set(value) {
          this.$store.commit("a4/fettmasse", value)
        }
      },
      ruheenergieumsatz:{
        get() {
          return this.$store.state.a4.ruheenergieumsatz
        },
        set(value) {
          this.$store.commit("a4/ruheenergieumsatz", value)
        }
      },
      chemieMetabolischeParameter:{
        get() {
          return this.$store.state.a4.chemieMetabolischeParameter
        },
        set(value) {
          this.$store.commit("a4/chemieMetabolischeParameter", value)
        }
      },
      vitalzeichen:{
        get() {
          return this.$store.state.a4.vitalzeichen
        },
        set(value) {
          this.$store.commit("a4/vitalzeichen", value)
        }
      },
      weitereMessungen:{
        get() {
          return this.$store.state.a4.weitereMessungen
        },
        set(value) {
          this.$store.commit("a4/weitereMessungen", value)
        }
      },
      schlucken:{
        get() {
          return this.$store.state.a4.schlucken
        },
        set(value) {
          this.$store.commit("a4/schlucken", value)
        }
      },
      schluckenJaAber:{
        get() {
          return this.$store.state.a4.schluckenJaAber
        },
        set(value) {
          this.$store.commit("a4/schluckenJaAber", value)
        }
      },
      schluckenNein:{
        get() {
          return this.$store.state.a4.schluckenNein
        },
        set(value) {
          this.$store.commit("a4/schluckenNein", value)
        }
      },
      erbrechen:{
        get() {
          return this.$store.state.a4.erbrechen
        },
        set(value) {
          this.$store.commit("a4/erbrechen", value)
        }
      },
      erbrechenJa:{
        get() {
          return this.$store.state.a4.erbrechenJa
        },
        set(value) {
          this.$store.commit("a4/erbrechenJa", value)
        }
      },
      mundgesundheit:{
        get() {
          return this.$store.state.a4.mundgesundheit
        },
        set(value) {
          this.$store.commit("a4/mundgesundheit", value)
        }
      },
      mundgesundheitAndere:{
        get() {
          return this.$store.state.a4.mundgesundheitAndere
        },
        set(value) {
          this.$store.commit("a4/mundgesundheitAndere", value)
        }
      },
      problemeNahrungsaufnahme:{
        get() {
          return this.$store.state.a4.problemeNahrungsaufnahme
        },
        set(value) {
          this.$store.commit("a4/problemeNahrungsaufnahme", value)
        }
      },
      appetitBeeintraechtigung:{
        get() {
          return this.$store.state.a4.appetitBeeintraechtigung
        },
        set(value) {
          this.$store.commit("a4/appetitBeeintraechtigung", value)
        }
      },
      weitereKoerperlicheBefunde:{
        get() {
          return this.$store.state.a4.weitereKoerperlicheBefunde
        },
        set(value) {
          this.$store.commit("a4/weitereKoerperlicheBefunde", value)
        }
      },
      uploadAssessment4: {
        get() {
          return this.$store.state.a4.uploadAssessment4
        },
        set(value) {
          this.$store.commit("a4/uploadAssessment4", value)
        }
      },
    },
    methods: {
      //https://stackoverflow.com/questions/42645964/vue-js-anchor-to-div-within-the-same-component
      scrollMeTo(refName) {
        var element = this.$refs[refName];
        element.scrollIntoView({behavior: 'smooth'});
      }
    }
};
</script>