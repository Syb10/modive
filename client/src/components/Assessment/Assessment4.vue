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
          :content="{title:'Körpergröße (in m)', id:'koerpergroesse', type:'number', step: '0.01', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <InputForm
          v-model="koerpergewicht"
          :content="{title:'Körpergewicht (in kg)', id:'koerpergewicht', type:'number', step: '0.01', color:'assessmentColor', border:'assessmentBorder'}"
        />
        <CalcBMI
          v-model="bmi"
        />
        <InputForm
          v-model="taillenumfang"
          :content="{title:'Taillenumfang (in cm)', id:'taillenumfang', type:'number', color:'assessmentColor', border:'assessmentBorder'}"
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
       <p class="assessmentAspekt" ref="upload">Upload-Bereich für weitere Dokumente in Klinischer Status (Clinical Status)</p>  
    </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import CalcBMI from "../CalcBMI.vue";
import TextareaForm from "../TextareaForm.vue";
import RadioForm from "../RadioForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import {mapFields} from "vuex-map-fields";
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
        CalcBMI,
        TextareaForm,
        RadioForm,
        CheckboxForm,
    },
    computed: {
        ...mapFields([
            "koerpergroesse",
            "koerpergewicht",
            "bmi",
            "taillenumfang",
            "hautfaltendicke",
            "fettfreieMasse",
            "fettmasse",
            "ruheenergieumsatz",
            "chemieMetabolischeParameter",
            "vitalzeichen",
            "weitereMessungen",
            "schlucken",
            "schluckenJaAber",
            "schluckenNein",
            "erbrechen",
            "erbrechenJa",
            "mundgesundheit",
            "mundgesundheitAndere",
            "problemeNahrungsaufnahme",
            "appetitBeeintraechtigung",
            "weitereKoerperlicheBefunde",
        ]),
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