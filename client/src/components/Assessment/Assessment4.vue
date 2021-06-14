<template>
    <div>
        <button @click.prevent="scrollMeTo('anthropometrischeDaten')" class="btn mt-1 mr-1 tab-button">Anthropometrische Daten</button>
        <button @click.prevent="scrollMeTo('koerperzusammensetzung')" class="btn mt-1 mr-1 tab-button">Körperzusammensetzung</button>
        <button @click.prevent="scrollMeTo('biochemischeParameter')" class="btn mt-1 mr-1 tab-button">Biochemische Parameter, medizinische Tests/Maßnahmen</button>
        <button @click.prevent="scrollMeTo('koerperlicheErscheinungen')" class="btn mt-1 mr-1 tab-button">Körperliche Erscheinungen</button>
        <button @click.prevent="scrollMeTo('upload')" class="btn mt-1 mr-1 tab-button">Upload-Bereich für weitere Dokumente</button>
        <p class="assessmentAspekt mt-5" ref="anthropometrischeDaten">Anthropometrische Daten</p>
        <InputForm
          v-model="koerpergroesse"
          :content="{title:'Körpergröße (in m)', id:'koerpergroesse', type:'number', step: '0.01'}"
        />
        <InputForm
          v-model="koerpergewicht"
          :content="{title:'Körpergewicht (in kg)', id:'koerpergewicht', type:'number', step: '0.01'}"
        />
        <CalcBMI
          v-model="bmi"
        />
        <InputForm
          v-model="taillenumfang"
          :content="{title:'Taillenumfang (in cm)', id:'taillenumfang', type:'number'}"
        />
        <InputForm
          v-model="hautfaltendicke"
          :content="{title:'Hautfaltendicke', id:'hautfaltendicke', type:'text'}"
        />
        <p class="assessmentAspekt" ref="koerperzusammensetzung">Körperzusammensetzung</p>
        <InputForm
          v-model="fettfreieMasse"
          :content="{title:'fettfreie Masse (FFM)', id:'fettfreieMasse', type:'text'}"
        />
        <InputForm
          v-model="fettmasse"
          :content="{title:'Fettmasse (FM)', id:'fettmasse', type:'text'}"
        />
        <InputForm
          v-model="ruheenergieumsatz"
          :content="{title:'Ruheenergieumsatz', id:'ruheenergieumsatz', type:'text'}"
        />
        <p class="assessmentAspekt" ref="biochemischeParameter">Biochemische Parameter, medizinische Tests/Maßnahmen</p>
        <TextareaForm
          v-model="chemieMetabolischeParameter"
          :content="{ title: 'Chemie/metabolische Parameter in Blut und Urin', id: 'chemieMetabolischeParameter',}"
        />
        <TextareaForm
          v-model="vitalzeichen"
          :content="{ title: 'Vitalzeichen', id: 'vitalzeichen',}"
          :isTipp="true"
          :myTipp="'Blutdruck, Temperatur, Puls, Atmung, Bewusstsein'"
        />
        <TextareaForm
          v-model="weitereMessungen"
          :content="{ title: 'weitere Messungen', id: 'weitereMessungen',}"
        />
        <p class="assessmentAspekt" ref="koerperlicheErscheinungen">Körperliche Erscheinungen</p>
        <RadioForm
          :items="[
            {title:'ja', id:'jaSchlucken', name:'schlucken'},
            {title:'ja, aber eingeschränkt', id:'jaAberSchlucken', name:'schlucken'},
            {title:'nein', id:'neinSchlucken', name:'schlucken'},
          ]"
          :title="'Fähigkeit zu schlucken'"
          v-model="schlucken"
        />
      <div v-if="schlucken == 'ja, aber eingeschränkt'">
        <InputForm
          v-model="schluckenJaAber"
          :content="{title:'Welche Einschränkungen bestehen?', id:'schluckenJaAberBegruendung', type:'text'}"
          :style="marginSmall"
        />
      </div>
      <div v-if="schlucken == 'nein'">
        <InputForm
          v-model="schluckenNein"
          :content="{title:'Warum nicht?', id:'schluckenNeinBegruendung', type:'text'}"
          :style="marginSmall"
        />
      </div> 
      <RadioForm
          :items="[
            {title:'ja', id:'jaErbrechen', name:'erbrechen'},
            {title:'nein', id:'neinErbrechen', name:'erbrechen'},
          ]"
          :title="'Erbrechen'"
          v-model="erbrechen"
        />
      <div v-if="erbrechen == 'ja'">
        <InputForm
          v-model="erbrechenJa"
          :content="{title:'Inwiefern?', id:'erbrechenJa', type:'text'}"
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
        v-model="mundgesundheit"
      />
      <InputForm
        v-model="mundgesundheitAndere"
        :content="{ title: 'andere', id: 'mundgesundheitAndere', type:'text' }"
        :style="marginSmall"
      />
      <TextareaForm
        v-model="problemeNahrungsaufnahme"
        :content="{ title: 'Bei der Nutzung eines Zahnersatzes: Probleme bei der Nahrungsaufnahme', id: 'problemeNahrungsaufnahme',}"
      />
      <TextareaForm
        v-model="appetitBeeintraechtigung"
        :content="{ title: 'Appetit und Beeinträchtigung', id: 'appetitBeeintraechtigung',}"
      />
      <TextareaForm
        v-model="weitereKoerperlicheBefunde"
        :content="{ title: 'weitere körperliche Befunde', id: 'weitereKoerperlicheBefunde',}"
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