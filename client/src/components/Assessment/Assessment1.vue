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
          {title:'weiblich', id:'weiblich', name:'geschlecht'},
          {title:'männlich', id:'maennlich', name:'geschlecht'},
          {title:'divers', id:'divers', name:'geschlecht'}
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
          {title:'kein schulischer Abschluss', id:'keinAbschluss', name:'schulischeBildung'},
          {title:'Hauptschulabschluss/vergleichbarer Abschluss', id:'hauptschule', name:'schulischeBildung'},
          {title:'Realschulabschluss/vergleichbarer Abschluss', id:'realschule', name:'schulischeBildung'},
          {title:'Fachhochschulreife/Abitur', id:'abitur', name:'schulischeBildung'},
          {title:'keine Angaben', id:'keineAngaben', name:'schulischeBildung'}
        ]"
        :title="'Höchster schulischer Abschluss'"
        v-model="schulischeBildung"
      />
      <RadioForm
        :items="[
          {title:'kein beruflicher Abschluss', id:'keinAbschluss', name:'beruflicheBildung'},
          {title:'Ausbildung/Lehre/Fachschule', id:'ausbildung', name:'beruflicheBildung'},
          {title:'Bachelor/Diplom', id:'bachelor', name:'beruflicheBildung'},
          {title:'Master', id:'master', name:'beruflicheBildung'},
          {title:'Promotion', id:'promotion', name:'beruflicheBildung'},
          {title:'keine Angaben', id:'keineAngaben', name:'beruflicheBildung'}
        ]"
        :title="'Höchster beruflicher Abschluss'"
        v-model="beruflicheBildung"
      />
      <InputForm
        v-model="beruf"
        :content="{ title: 'Ausgeübter Beruf', id: 'beruf', type:'text' }"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'Vollzeit', id:'vollzeit'},
          {title:'Teilzeit', id:'teilzeit'},
          {title:'Schichtarbeit', id:'schichtarbeit'}
        ]"
        v-model="artDerArbeit"
        :style="marginSmall"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'ledig', id:'ledig'},
          {title:'in Partnerschaft', id:'partnerschaft'},
          {title:'verheiratet/eingetragene Partnerschaft', id:'verheiratet'},
          {title:'verwitwet/eingetragene*r Lebenspartner*in verstorben', id:'verwitwet'},
          {title:'geschieden/eingetragene Lebenspartnerschaft aufgehoben', id:'geschieden'},
          {title:'keine Angaben', id:'keineAngaben'}
        ]"
        :title="'Familienstand'"
        v-model="familienstand"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'alleine lebend', id:'alleine'},
          {title:'mit der Familie lebend', id:'familie'},
          {title:'mit pflegender Person lebend', id:'pflegenderPerson'},
          {title:'in einer Wohngemeinschaft lebend', id:'wohngemeinschaft'},
          {title:'in einer Pflegeeinrichtung lebend', id:'pflegeeinrichtung'},
          {title:'in der Stadt lebend', id:'stadt'},
          {title:'auf dem Land lebend', id:'land'},
          {title:'im Gefängnis', id:'gefaengnis'},
          {title:'obdachlos', id:'obdachlos'},
          {title:'keine Angaben', id:'keineAngaben'}
        ]"
        :title="'Wohnsituation'"
        v-model="wohnsituation"
      />
      <div class="form-inline mb-4">Der/die Klient*in lebt mit <input class="form-control mr-1 ml-1" v-model="personenImHaushalt" type="number"/> Personen in einem Haushalt.</div>
      <div>Tabakkonsum</div>
      <RadioForm
        :items="[
          {title:'ja', id:'jaaktuell', name:'aktuellGeraucht'},
          {title:'nein', id:'neinaktuell', name:'aktuellGeraucht'},
        ]"
        :title="'Wird zum aktuellen Zeitpunkt geraucht?'"
        v-model="aktuellGeraucht"
      />
      <RadioForm
        :items="[
          {title:'ja', id:'jajemals', name:'jemalsGeraucht'},
          {title:'nein', id:'neinjemals', name:'jemalsGeraucht'},
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
          {title:'ja', id:'jaBeeintraechtigungen', name:'beeintraechtigungen'},
          {title:'nein', id:'neinBeeintraechtigungen', name:'beeintraechtigungen'},
        ]"
        :title="'Körperliche Beeinträchtigungen'"
        v-model="beeintraechtigungen"
      />
      <div v-if="beeintraechtigungen == 'ja'">
        <CheckboxForm
        :checkboxs="[
          {title:'Sehbehinderung', id:'sehbehinderung'},
          {title:'Hörbehinderung', id:'hörbehinderung'},
        ]"
        :title="'Welche Körperliche Beeinträchtigungen sind vorhanden'"
        v-model="beeintraechtigungenVorhanden"
        :style="marginSmall"
      />
      </div>
      <RadioForm
        :items="[
          {title:'ja', id:'jamobil', name:'beeintraechtigungen'},
          {title:'nein', id:'neinmobil', name:'beeintraechtigungen'},
        ]"
        :title="'mobil'"
        v-model="mobil"
      />
      <div v-if="mobil == 'nein'">
        <CheckboxForm
        :checkboxs="[
          {title:'ans Haus gebunden', id:'haus', name:'mobileingeschraenkt'},
          {title:'bettlägerig', id:'bettlaegerig', name:'mobileingeschraenkt'},
          {title:'an den Rollstuhl gebunden', id:'rollstuhl', name:'mobileingeschraenkt'},
          {title:'andere', id:'andere', name:'mobileingeschraenkt'},
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
      "artDerArbeit",
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
      "mobil",
      "mobileingeschraenkt"
    ]),
  }
};
</script>
