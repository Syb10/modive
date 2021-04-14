<template>
    <div>
      <InputForm
        v-model="vorname"
        :content="{ title: 'Vorname', id: 'vorname', type: 'text' }"        
      />
      <InputForm
        v-model="nachname"
        :content="{ title: 'Nachname', id: 'nachname', type: 'text' }"        
      />
      <InputForm
        v-model="geburtsdatum"
        :content="{ title: 'Geburtsdatum', id: 'geburtsdatum', type:'date' }"
      />
      <RadioForm
        :items="[
          {title:'weiblich', value:'weiblich', id:'weiblich', name:'geschlecht'},
          {title:'männlich', value:'maennlich', id:'maennlich', name:'geschlecht'},
          {title:'divers', value:'divers', id:'divers', name:'geschlecht'}
        ]"
        :title="'Geschlecht'"
        v-model="geschlecht"
      />
      <InputForm
        v-model="herkunft"
        :content="{ title: 'Herkunft', id: 'herkunft', type:'text' }"
      />
      <InputForm
        v-model="muttersprache"
        :content="{ title: 'Muttersprache', id: 'muttersprache', type:'text' }"
      />
      <RadioForm
        :items="[
          {title:'kein schulischer Abschluss', value:'keinAbschluss', id:'keinAbschluss', name:'schulischeBildung'},
          {title:'Hauptschulabschluss/vergleichbarer Abschluss', value:'hauptschule', id:'hauptschule', name:'schulischeBildung'},
          {title:'Realschulabschluss/vergleichbarer Abschluss', value:'realschule', id:'realschule', name:'schulischeBildung'},
          {title:'Fachhochschulreife/Abitur', value:'abitur', id:'abitur', name:'schulischeBildung'},
          {title:'keine Angaben', value:'keineAngaben', id:'keineAngaben', name:'schulischeBildung'}
        ]"
        :title="'Höchster schulischer Abschluss'"
        v-model="schulischeBildung"
      />
      <RadioForm
        :items="[
          {title:'kein beruflicher Abschluss', value:'keinAbschluss', id:'keinAbschluss', name:'beruflicheBildung'},
          {title:'Ausbildung/Lehre/Fachschule', value:'ausbildung', id:'ausbildung', name:'beruflicheBildung'},
          {title:'Bachelor/Diplom', value:'bachelor', id:'bachelor', name:'beruflicheBildung'},
          {title:'Master', value:'master', id:'master', name:'beruflicheBildung'},
          {title:'Promotion', value:'promotion', id:'promotion', name:'beruflicheBildung'},
          {title:'keine Angaben', value:'keineAngaben', id:'keineAngaben', name:'beruflicheBildung'}
        ]"
        :title="'Höchster beruflicher Abschluss'"
        v-model="beruflicheBildung"
      />
      <InputForm
        v-model="beruf"
        :content="{ title: 'Ausgeübter Beruf', id: 'beruf', type:'text' }"
      />
      <RadioForm
        :items="[
          {title:'Vollzeit', value:'vollzeit', id:'vollzeit', name:'artarbeit'},
          {title:'Teilzeit', value:'teilzeit', id:'teilzeit', name:'artarbeit'},
          {title:'Schichtarbeit', value:'schichtarbeit', id:'schichtarbeit', name:'artarbeit'}
        ]"
        v-model="artarbeit"
        :style="marginSmall"
      />
      <RadioForm
        :items="[
          {title:'ledig', value:'ledig', id:'ledig', name:'familienstand'},
          {title:'in Partnerschaft', value:'partnerschaft', id:'partnerschaft', name:'familienstand'},
          {title:'verheiratet/eingetragene Partnerschaft', value:'verheiratet', id:'verheiratet', name:'familienstand'},
          {title:'verwitwet/eingetragene*r Lebenspartner*in verstorben', value:'verwitwet', id:'verwitwet', name:'familienstand'},
          {title:'geschieden/eingetragene Lebenspartnerschaft aufgehoben', value:'geschieden', id:'geschieden', name:'familienstand'},
          {title:'keine Angaben', value:'keineAngaben', id:'keineAngaben', name:'familienstand'}
        ]"
        :title="'Familienstand'"
        v-model="familienstand"
      />
      <RadioForm
        :items="[
          {title:'alleine lebend', value:'alleine', id:'alleine', name:'wohnsituation'},
          {title:'mit der Familie lebend', value:'familie', id:'familie', name:'wohnsituation'},
          {title:'mit pflegender Person lebend', value:'pflegenderPerson', id:'pflegenderPerson', name:'wohnsituation'},
          {title:'in einer Wohngemeinschaft lebend', value:'wohngemeinschaft', id:'wohngemeinschaft', name:'wohnsituation'},
          {title:'in einer Pflegeeinrichtung lebend', value:'pflegeeinrichtung', id:'pflegeeinrichtung', name:'wohnsituation'},
          {title:'in der Stadt lebend', value:'stadt', id:'stadt', name:'wohnsituation'},
          {title:'auf dem Land lebend', value:'land', id:'land', name:'wohnsituation'},
          {title:'im Gefängnis', value:'gefaengnis', id:'gefaengnis', name:'wohnsituation'},
          {title:'obdachlos', value:'obdachlos', id:'obdachlos', name:'wohnsituation'},
          {title:'keine Angaben', value:'keineAngaben', id:'keineAngaben', name:'wohnsituation'}
        ]"
        :title="'Wohnsituation'"
        v-model="wohnsituation"
      />
      <div class="form-inline mb-4">Der/die Klient*in lebt mit <input class="form-control mr-1 ml-1" v-model="personenImHaushalt" type="number"/> Personen in einem Haushalt.</div>
      <div>Tabakkonsum</div>
      <RadioForm
        :items="[
          {title:'ja', value:'ja', id:'jaaktuell', name:'aktuellGeraucht'},
          {title:'nein', value:'nein', id:'neinaktuell', name:'aktuellGeraucht'},
        ]"
        :title="'Wird zum aktuellen Zeitpunkt geraucht?'"
        v-model="aktuellGeraucht"
      />
      <RadioForm
        :items="[
          {title:'ja', value:'ja', id:'jajemals', name:'jemalsGeraucht'},
          {title:'nein', value:'nein', id:'neinjemals', name:'jemalsGeraucht'},
        ]"
        :title="'Wurde jemals geraucht?'"
        v-model="jemalsGeraucht"
        :style="marginSmall"
      />
      <div v-if="jemalsGeraucht == 'ja' || aktuellGeraucht == 'ja'">
        <InputForm
          v-model="anzahlZigaretten"
          :content="{ title: 'Anzahl an Zigaretten/Tag', id: 'anzahlZigaretten', type:'number' }"
          :style="marginSmall"
        />
        <InputForm
          v-model="anzahlTabakprodukte"
          :content="{ title: 'Anzahl an Tabakprodukten/Tag', id: 'anzahlTabakprodukte', type:'number' }"
          :style="marginSmaller"
        />
        <InputForm
          v-model="anzahlJahreRauchen"
          :content="{ title: 'Anzahl an Jahren, in denen bisher geraucht wurde', id: 'anzahlJahreRauchen', type:'number' }"
          :style="marginSmaller"
        />
      </div>
      <RadioForm
        :items="[
          {title:'ja', value:'ja', id:'ja', name:'beeintraechtigungen'},
          {title:'nein', value:'nein', id:'nein', name:'beeintraechtigungen'},
        ]"
        :title="'Körperliche Beeinträchtigungen'"
        v-model="beeintraechtigungen"
      />
      <div v-if="beeintraechtigungen == 'ja'">
        <RadioForm
        :items="[
          {title:'Sehbehinderung', value:'sehbehinderung', id:'sehbehinderung', name:'beeintraechtigungenVorhanden'},
          {title:'Hörbehinderung', value:'hörbehinderung', id:'hörbehinderung', name:'beeintraechtigungenVorhanden'},
        ]"
        :title="'Welche Körperliche Beeinträchtigungen sind vorhanden'"
        v-model="beeintraechtigungenVorhanden"
        :style="marginSmall"
      />
      </div>
      
      <CheckboxForm
        :checkboxs="[
          {title:'Sehbehinderung', value:'sehbehinderung', id:'sehbehinderung', name:'test'},
          {title:'Hörbehinderung', value:'hörbehinderung', id:'hörbehinderung', name:'test'},
        ]"
        :title="'Welche Körperliche Beeinträchtigungen sind vorhanden'"
        v-model="test"
      />
      <div>beeintraechtigungenVorhanden: {{beeintraechtigungenVorhanden}}</div>
      <div>Test: {{myData}}</div>
      
      <RadioForm
        :items="[
          {title:'ja', value:'ja', id:'jamobil', name:'beeintraechtigungen'},
          {title:'nein', value:'nein', id:'neinmobil', name:'beeintraechtigungen'},
        ]"
        :title="'mobil'"
        v-model="mobil"
      />
      <div v-if="mobil == 'nein'">
        <RadioForm
        :items="[
          {title:'ans Haus gebunden', value:'haus', id:'haus', name:'mobileingeschraenkt'},
          {title:'bettlägerig', value:'bettlaegerig', id:'bettlaegerig', name:'mobileingeschraenkt'},
          {title:'an den Rollstuhl gebunden', value:'rollstuhl', id:'rollstuhl', name:'mobileingeschraenkt'},
          {title:'andere', value:'andere', id:'andere', name:'mobileingeschraenkt'},
        ]"
        :title="'Warum?'"
        v-model="mobileingeschraenkt"
        :style="marginSmall"
      />
      </div>
    </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import RadioForm from "../RadioForm.vue";
import {mapFields} from "vuex-map-fields";
import {mapGetters} from "vuex";

export default {
  name: 'assessment1',
  components: {
    InputForm,
    CheckboxForm,
    RadioForm,
  },
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
  computed: {
    ...mapFields([
      "vorname",
      "nachname",
      "geburtsdatum",
      "geschlecht",
      "herkunft",
      "muttersprache",
      "schulischeBildung",
      "beruflicheBildung",
      "beruf",
      "artarbeit",
      "familienstand",
      "wohnsituation",
      "personenImHaushalt",
      "aktuellGeraucht",
      "jemalsGeraucht",
      "anzahlZigaretten",
      "anzahlTabakprodukte",
      "anzahlJahreRauchen",
      "beeintraechtigungen",
      "beeintraechtigungenVorhanden",
      "test",
      "mobil",
      "mobileingeschraenkt"
    ]),
    ...mapGetters([
      "myData"
    ])
  }
};
</script>
