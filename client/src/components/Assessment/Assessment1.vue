<template>
    <div>
      <button @click.prevent="scrollMeTo('klientengeschichte')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Klient*innengeschichte</button>
      <button @click.prevent="scrollMeTo('medizinischeAngaben')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Medizinische/gesundheitliche Angaben</button>
      <button @click.prevent="scrollMeTo('upload')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Upload-Bereich für weitere Dokumente</button>
      <p class="assessmentAspekt mt-5" ref="klientengeschichte">Klient*innengeschichte</p>
      <InputForm
        v-model="vorname"
        :content="{ title: 'Vorname *', id: 'vorname', type: 'text', color:'assessmentColor', border:'assessmentBorder' }"        
      />
      <InputForm
        v-model="nachname"
        :content="{ title: 'Nachname *', id: 'nachname', type: 'text', color:'assessmentColor', border:'assessmentBorder' }"        
      />
      <InputForm
        v-model="geburtsdatum"
        :content="{ title: 'Geburtsdatum *', id: 'geburtsdatum', type:'date', color:'assessmentColor', border:'assessmentBorder' }"
      />
      <InputForm
        v-model="adresse"
        :content="{ title: 'Adresse', id: 'adresse', type: 'text', color:'assessmentColor', border:'assessmentBorder' }"        
      />
      <InputForm
        v-model="telefonnummer"
        :content="{ title: 'Telefonnummer', id: 'telefonnummer', type: 'text', color:'assessmentColor', border:'assessmentBorder' }"        
      />
      <InputForm
        v-model="email"
        :content="{ title: 'E-Mail', id: 'email', type: 'email', color:'assessmentColor', border:'assessmentBorder' }"        
      />
      <InputForm
        v-model="krankenkasse"
        :content="{ title: 'Krankenkasse', id: 'krankenkasse', type: 'text', color:'assessmentColor', border:'assessmentBorder' }"        
      />
      <InputForm
        v-model="hausarzt"
        :content="{ title: 'Hausärzt*in', id: 'hausarzt', type: 'text', color:'assessmentColor', border:'assessmentBorder' }"        
      />
      <RadioForm
        :items="[
          {title:'weiblich', id:'weiblich', name:'geschlecht'},
          {title:'männlich', id:'maennlich', name:'geschlecht'},
          {title:'divers', id:'divers', name:'geschlecht'}
        ]"
        :title="'Geschlecht'"
        :color ="'assessmentColor'"
        v-model="geschlecht"
      />
      <InputForm
        v-model="herkunft"
        :content="{ title: 'Herkunft', id: 'herkunft', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
      />
      <InputForm
        v-model="muttersprache"
        :content="{ title: 'Muttersprache', id: 'muttersprache', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
      />
      <RadioForm
        :items="[
          {title:'kein schulischer Abschluss', id:'keinAbschlussSchulischeBildung', name:'schulischeBildung'},
          {title:'Hauptschulabschluss/vergleichbarer Abschluss', id:'hauptschule', name:'schulischeBildung'},
          {title:'Realschulabschluss/vergleichbarer Abschluss', id:'realschule', name:'schulischeBildung'},
          {title:'Fachhochschulreife/Abitur', id:'abitur', name:'schulischeBildung'},
          {title:'keine Angabe', id:'keineAngabenSchulischeBildung', name:'schulischeBildung'}
        ]"
        :title="'Höchster schulischer Abschluss'"
        :color ="'assessmentColor'"
        v-model="schulischeBildung"
      />
      <RadioForm
        :items="[
          {title:'kein beruflicher Abschluss', id:'keinAbschlussBeruflicheBildung', name:'beruflicheBildung'},
          {title:'Ausbildung/Lehre/Fachschule', id:'ausbildung', name:'beruflicheBildung'},
          {title:'Bachelor/Diplom', id:'bachelor', name:'beruflicheBildung'},
          {title:'Master', id:'master', name:'beruflicheBildung'},
          {title:'Promotion', id:'promotion', name:'beruflicheBildung'},
          {title:'keine Angabe', id:'keineAngabenBeruflicheBildung', name:'beruflicheBildung'}
        ]"
        :title="'Höchster beruflicher Abschluss'"
        :color ="'assessmentColor'"
        v-model="beruflicheBildung"
      />
      <InputForm
        v-model="beruf"
        :content="{ title: 'Ausgeübter Beruf/Tätigkeit', id: 'beruf', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'Vollzeit', id:'vollzeit'},
          {title:'Teilzeit', id:'teilzeit'},
          {title:'Schichtarbeit', id:'schichtarbeit'},
        ]"
        :title="'Weitere Angaben zum ausgeübten Beruf'"
        :color ="'assessmentColor'"
        v-model="artDerArbeit"
        :style="marginSmaller"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'ledig', id:'ledig'},
          {title:'in Partnerschaft', id:'partnerschaft'},
          {title:'verheiratet/eingetragene Partnerschaft', id:'verheiratet'},
          {title:'verwitwet/eingetragene*r Lebenspartner*in verstorben', id:'verwitwet'},
          {title:'geschieden/eingetragene Lebenspartnerschaft aufgehoben', id:'geschieden'},
          {title:'keine Angabe', id:'keineAngabenFamilienstand'}
        ]"
        :title="'Familienstand'"
        :color ="'assessmentColor'"
        v-model="familienstand"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'alleine lebend', id:'alleine'},
          {title:'mit Partner*in lebend', id:'partner'},
          {title:'mit der Familie lebend', id:'familie'},
          {title:'mit pflegender Person lebend', id:'pflegenderPerson'},
          {title:'in einer Wohngemeinschaft lebend', id:'wohngemeinschaft'},
          {title:'in einer Pflegeeinrichtung lebend', id:'pflegeeinrichtung'},
        ]"
        :title="'Wohnsituation'"
        :color ="'assessmentColor'"
        v-model="wohnsituation"
      />
      <InputForm
        v-model="wohnsituationAndere"
        :content="{ title: 'andere', id: 'wohnsituationAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
        :style="marginSmall"
      />
      <div class="form-inline mb-4">Der/die Klient*in lebt mit <input class="form-control assessmentBorder mr-1 ml-1" v-model="personenImHaushalt" type="number" min="0"/> Personen in einem Haushalt.</div>
      <TextareaForm
        v-model="weitereAnmerkungenZurWohnsituation"
        :content="{ title: 'Weitere Anmerkungen zur Wohnsituation', id: 'weitereAnmerkungenZurWohnsituation', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <div>Tabakkonsum</div>
      <RadioForm
        :items="[
          {title:'ja', id:'jaaktuell', name:'aktuellGeraucht'},
          {title:'nein', id:'neinaktuell', name:'aktuellGeraucht'},
        ]"
        :title="'Wird zum aktuellen Zeitpunkt geraucht?'"
        :color ="'assessmentColor'"
        v-model="aktuellGeraucht"
      />
      <div v-if="aktuellGeraucht == 'nein'">
        <RadioForm
          :items="[
            {title:'ja', id:'jajemals', name:'jemalsGeraucht'},
            {title:'nein', id:'neinjemals', name:'jemalsGeraucht'},
          ]"
          :title="'Wurde jemals geraucht?'"
          :color ="'assessmentColor'"
          v-model="jemalsGeraucht"
          :style="marginSmall"
        />
      </div>  
      <div v-if="jemalsGeraucht == 'ja' || aktuellGeraucht == 'ja'">
        <InputForm
          v-model="anzahlZigaretten"
          :content="{ title: 'Anzahl an Zigaretten/Tag', id: 'anzahlZigaretten', type:'number', min:'0', color:'assessmentColor', border:'assessmentBorder' }"
          :style="marginSmall"
        />
        <InputForm
          v-model="anzahlTabakprodukte"
          :content="{ title: 'Anzahl an Tabakprodukten/Tag', id: 'anzahlTabakprodukte', type:'number', min:'0', color:'assessmentColor', border:'assessmentBorder' }"
          :style="marginSmaller"
        />
        <InputForm
          v-model="anzahlJahreRauchen"
          :content="{ title: 'Anzahl an Jahren, in denen bisher geraucht wurde', id: 'anzahlJahreRauchen', type:'number', min:'0', color:'assessmentColor', border:'assessmentBorder' }"
          :style="marginSmaller"
        />
      </div>
      <RadioForm
        :items="[
          {title:'ja', id:'jaBeeintraechtigungen', name:'beeintraechtigungen'},
          {title:'nein', id:'neinBeeintraechtigungen', name:'beeintraechtigungen'},
        ]"
        :title="'Körperliche Beeinträchtigungen'"
        :color ="'assessmentColor'"
        v-model="beeintraechtigungen"
      />
      <div v-if="beeintraechtigungen == 'ja'">
        <CheckboxForm
          :checkboxs="[
            {title:'Sehbehinderung', id:'sehbehinderung'},
            {title:'Hörbehinderung', id:'hörbehinderung'},
          ]"
          :title="'Welche körperliche Beeinträchtigungen sind vorhanden'"
          :color ="'assessmentColor'"
          v-model="beeintraechtigungenVorhanden"
          :style="marginSmall"
        />
        <InputForm
          v-model="beeintraechtigungenVorhandenAndere"
          :content="{ title: 'andere', id: 'beeintraechtigungenVorhandenAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
          :style="marginSmall"
        />
      </div>
      <RadioForm
        :items="[
          {title:'eingeschränkt', id:'eingeschraenkt', name:'mobil'},
          {title:'nicht eingeschränkt', id:'nichtEingeschraenkt', name:'mobil'},
        ]"
        :title="'Mobilität'"
        :color ="'assessmentColor'"
        v-model="mobil"
      />
      <div v-if="mobil == 'eingeschränkt'">
        <CheckboxForm
          :checkboxs="[
            {title:'ans Haus gebunden', id:'haus'},
            {title:'bettlägerig', id:'bettlaegerig'},
            {title:'an den Rollstuhl gebunden', id:'rollstuhl'},
          ]"
          :title="'Warum?'"
          :color ="'assessmentColor'"
          v-model="mobileingeschraenkt"
          :style="marginSmall"
        />
        <InputForm
          v-model="mobileingeschraenktAndere"
          :content="{ title: 'andere', id: 'mobileingeschraenktAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
          :style="marginSmall"
        />
      </div>
      <RadioForm
        :items="[
          {title:'ja', id:'jaUnterstuetzungMedizinischerVersorgung', name:'unterstuetzungMedizinischerVersorgung'},
          {title:'nein', id:'neinUnterstuetzungMedizinischerVersorgung', name:'unterstuetzungMedizinischerVersorgung'},
        ]"
        :title="'Unterstützung bei medizinischer/pflegerischer Versorgung notwendig'"
        :color ="'assessmentColor'"
        v-model="unterstuetzungMedizinischerVersorgung"
      />
      <div v-if="unterstuetzungMedizinischerVersorgung == 'ja'">
        <CheckboxForm
          :checkboxs="[
            {title:'Familie', id:'familie'},
            {title:'Betreuungs-/Pflegepersonal', id:'betreuungspersonal'}
          ]"
          :title="'Durch wen?'"
          :color ="'assessmentColor'"
          v-model="jaUnterstuetzungMedizinischerVersorgung"
          :style="marginSmall"
        />
        <InputForm
          v-model="jaUnterstuetzungMedizinischerVersorgungAndere"
          :content="{ title: 'andere', id: 'jaUnterstuetzungMedizinischerVersorgungAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
          :style="marginSmall"
        />
      </div>
      <TextareaForm
        v-model="kontakAktivitaet"
        :content="{ title: 'Kontakt/Aktivität in sozialen Strukturen', id: 'kontakAktivitaet', color:'assessmentColor', border:'assessmentBorder'}"
        :isTipp="true"
        :myTipp="'z.B. Familienmitglieder, Gemeinschaften (z.B. Vereine, Kirchengemeinde)'"
      />
      <TextareaForm
        v-model="hobbies"
        :content="{ title: 'Hobbies/Freizeitbeschäftigungen', id: 'hobbies', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <p class="assessmentAspekt" ref="medizinischeAngaben">Medizinische/gesundheitliche Angaben</p>
      <TextareaForm
        v-model="medizinischeDiagnose"
        :content="{ title: 'Hauptdiagnose', id: 'medizinischeDiagnose', color:'assessmentColor', border:'assessmentBorder'}"
        :isTipp="true"
        :myTipp="'Grund für die Ernährungsberatung/ -therapie'"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'Adipositas', id:'adipositas'},
          {title:'Allergien', id:'allergien'},
          {title:'Diabetes mellitus', id:'diabetes'},
          {title:'gastrointestinale/neuro-endokrine Erkrankungen', id:'gastrointestinaleErkrankungen'},
          {title:'genetische Erkrankungen, die den Ernährungsstatus beeinflussen können', id:'genetischeErkrankungen'},
          {title:'Herz-Kreislauf-Erkrankungen', id:'herzKreislaufErkrankungen'},
          {title:'Krebs', id:'krebs'},
          {title:'Lebensmittelunverträglichkeiten', id:'lebensmittelunverträglichkeiten'},
          {title:'Osteoporose', id:'osteoporose'},
        ]"
        :title="'Nebendiagnosen'"
        :color ="'assessmentColor'"
        v-model="weitereDiagnosen"
      />
      <InputForm
        v-model="weitereDiagnosenAndere"
        :content="{ title: 'andere', id: 'weitereDiagnosenAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
        :style="marginSmall"
      />
      <TextareaForm
        v-model="vergangeneDiagnosen"
        :content="{ title: 'Vergangene Diagnosen', id: 'vergangeneDiagnosen', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'Abhängigkeitserkrankungen', id:'abhaengigkeitserkrankungen'},
          {title:'Affektive Erkrankungen (z.B. Depression)', id:'affektiveErkrankungen'},
          {title:'Angststörungen', id:'angststoerungen'},
          {title:'Anpassungs- und (posttraumatische) Belastungsstörungen', id:'anpassungsBelastungsstoerungen'},
          {title:'Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung (ADHS)', id:'adhs'},
          {title:'Demenz', id:'demenz'},
          {title:'Essstörung', id:'Essstoerung'},
          {title:'Persönlichkeitsstörungen (z.B. Borderline)', id:'persoenlichkeitsstoerungen'},
          {title:'Schizophrenie', id:'schizophrenie'},
          {title:'Schlafstörungen', id:'schlafstoerungen'},
          {title:'Zwangsstörungen', id:'zwangsstoerungen'},
        ]"
        :title="'Psychische Gesundheit'"
        :color ="'assessmentColor'"
        v-model="psychischeGesundheit"
      />
      <InputForm
        v-model="psychischeGesundheitAndere"
        :content="{ title: 'andere', id: 'psychischeGesundheitAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
        :style="marginSmall"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'Adipositas', id:'adipositasFamilie'},
          {title:'Allergien', id:'allergienFamilie'},
          {title:'Diabetes mellitus', id:'diabetesFamilie'},
          {title:'gastrointestinale/neuro-endokrine Erkrankungen', id:'gastrointestinaleErkrankungenFamilie'},
          {title:'genetische Erkrankungen, die den Ernährungsstatus beeinflussen können', id:'genetischeErkrankungenFamilie'},
          {title:'Herz-Kreislauf-Erkrankungen', id:'herzKreislaufErkrankungenFamilie'},
          {title:'Krebs', id:'krebsFamilie'},
          {title:'Lebensmittelunverträglichkeiten', id:'lebensmittelunverträglichkeitenFamilie'},
          {title:'Osteoporose', id:'osteoporoseFamilie'},
        ]"
        :title="'Gesundheitszustand der Familie'"
        :isTipp = "true"
        :myTipp = "'Zustand und Erkrankungen, die Einfluss auf die Ernährung haben können'"
        :color ="'assessmentColor'"
        v-model="gesundheitszustandDerFamilie"
      />
      <InputForm
        v-model="gesundheitszustandDerFamilieAndere"
        :content="{ title: 'andere', id: 'gesundheitszustandDerFamilieAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
        :style="marginSmall"
      />
      <TextareaForm
        v-model="weitereAnmerkungenZumGesundheitszustandDerFamilie"
        :content="{ title: 'Weitere Anmerkungen zum Gesundheitszustand der Familie', id: 'weitereAnmerkungenZumGesundheitszustandDerFamilie', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <div v-if="geschlecht == 'weiblich' || geschlecht == 'divers'">
        <RadioForm
          :items="[
            {title:'ja', id:'jaSchwangerschaft', name:'schwangerschaft'},
            {title:'nein', id:'neinSchwangerschaft', name:'schwangerschaft'},
          ]"
          :title="'Schwangerschaft'"
          :color ="'assessmentColor'"
          v-model="schwangerschaft"
        />
        <RadioForm
          :items="[
            {title:'ja', id:'jaStillzeit', name:'stillzeit'},
            {title:'nein', id:'neinStillzeit', name:'stillzeit'},
          ]"
          :title="'Stillzeit'"
          :color ="'assessmentColor'"
          v-model="stillzeit"
        />
      </div>
      <p class="assessmentAspekt" ref="upload">Upload-Bereich für weitere Dokumente in der Klient*innengeschichte/Krankengeschichte</p>  
      <UploadFile
        v-model="uploadAssessment1"
        :color ="'btn-gold'"
      />
    </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import RadioForm from "../RadioForm.vue";
import TextareaForm from "../TextareaForm.vue";
import UploadFile from "../UploadFile.vue";
import moment from 'moment';

export default {
  name: 'assessment1',
  components: {
    InputForm,
    CheckboxForm,
    RadioForm,
    TextareaForm,
    UploadFile,
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
  methods: {
    //https://stackoverflow.com/questions/42645964/vue-js-anchor-to-div-within-the-same-component
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      element.scrollIntoView({behavior: 'smooth'});
    },
    changeDate(value){
      return moment(value).locale('de').format('L');
    },
  },
  computed: {
    vorname:{
      get() {
        return this.$store.state.vorname
      },
      set(value) {
        this.$store.commit("vorname", value)
      }
    },
    nachname:{
      get() {
        return this.$store.state.nachname
      },
      set(value) {
        this.$store.commit("nachname", value)
      }
    },
    geburtsdatum: {
      get() {
        return this.$store.state.geburtsdatum
      },
      set(value) {
        this.$store.commit("geburtsdatum", value)
      }
    },
    adresse: {
      get() {
        return this.$store.state.a1.adresse
      },
      set(value) {
        this.$store.commit("a1/adresse", value)
      }
    }, 
    telefonnummer: {
      get() {
        return this.$store.state.a1.telefonnummer
      },
      set(value) {
        this.$store.commit("a1/telefonnummer", value)
      }
    },
    email: {
      get() {
        return this.$store.state.a1.email
      },
      set(value) {
        this.$store.commit("a1/email", value)
      }
    },
    krankenkasse: {
      get() {
       return this.$store.state.a1.krankenkasse
      },
      set(value) {
        this.$store.commit("a1/krankenkasse",value)
      }
    },
    hausarzt:{
      get() {
        return this.$store.state.a1.hausarzt
      },
      set(value) {
        this.$store.commit("a1/hausarzt", value)
      }
    },
    geschlecht:{
      get() {
        return this.$store.state.a1.geschlecht
      },
      set(value) {
        this.$store.commit("a1/geschlecht", value)
      }
    },
    herkunft:{
      get() {
        return this.$store.state.a1.herkunft
      },
      set(value) {
        this.$store.commit("a1/herkunft", value)
      }
    },
    muttersprache:{
      get() {
        return this.$store.state.a1.muttersprache
      },
      set(value) {
        this.$store.commit("a1/muttersprache", value) 
        }
    },
    schulischeBildung:{
      get() {
        return this.$store.state.a1.schulischeBildung
      },
      set(value) {
        this.$store.commit("a1/schulischeBildung", value)
      }
    },
    beruflicheBildung:{
      get() {
        return this.$store.state.a1.beruflicheBildung
      },
      set(value) {
        this.$store.commit("a1/beruflicheBildung", value) 
      }
    },
    beruf:{
      get() {
        return this.$store.state.a1.beruf
      },
      set(value) {
        this.$store.commit("a1/beruf", value)
      }
    },
    artDerArbeit:{
      get() {
        return this.$store.state.a1.artarbeit
      },
      set(value) {
        this.$store.commit("a1/artarbeit", value)
      }
    },
    familienstand:{
      get() {
        return this.$store.state.a1.familienstand
      },
      set(value) {
        this.$store.commit("a1/familienstand", value)
      }
    },
    wohnsituation:{
      get() {
        return this.$store.state.a1.wohnsituation
      },
      set(value) {
         this.$store.commit("a1/wohnsituation", value)
      }
    },
    wohnsituationAndere:{
      get() {
        return this.$store.state.a1.wohnsituationAndere
      },
      set(value) {
        this.$store.commit("a1/wohnsituationAndere", value)
      }
    },
    personenImHaushalt:{
      get() {
        return this.$store.state.a1.personenImHaushalt
      },
      set(value) {
        this.$store.commit("a1/personenImHaushalt", value) 
        }
    },
    weitereAnmerkungenZurWohnsituation: {
      get() {
        return this.$store.state.a1.weitereAnmerkungenZurWohnsituation
      },
      set(value) {
        this.$store.commit("a1/weitereAnmerkungenZurWohnsituation", value)
      }
    },
    aktuellGeraucht:{
      get() {
        return this.$store.state.a1.aktuellGeraucht
      },
      set(value) {
        this.$store.commit("a1/aktuellGeraucht", value)
      }
    },
    jemalsGeraucht:{
      get() {
        return this.$store.state.a1.jemalsGeraucht
      },
      set(value) {
        this.$store.commit("a1/jemalsGeraucht", value)
      }
    },
    anzahlZigaretten:{
      get() {
        return this.$store.state.a1.anzahlZigaretten
      },
      set(value) {
        this.$store.commit("a1/anzahlZigaretten", value)
      }
    },
    anzahlTabakprodukte:{
      get() {
        return this.$store.state.a1.anzahlTabakprodukte
      },
      set(value) {
        this.$store.commit("a1/anzahlTabakprodukte", value)
      }
    },
    anzahlJahreRauchen:{
      get() {
        return this.$store.state.a1.anzahlJahreRauchen
      },
      set(value) {
        this.$store.commit("a1/anzahlJahreRauchen", value)
      }
    },
    beeintraechtigungen:{
      get() {
        return this.$store.state.a1.beeintraechtigungen
      },
      set(value) {
        this.$store.commit("a1/beeintraechtigungen", value)
      }
    },
    beeintraechtigungenVorhanden:{
      get() {
        return this.$store.state.a1.beeintraechtigungenVorhanden
      },
      set(value) {
        this.$store.commit("a1/beeintraechtigungenVorhanden", value)
      }
    },
    beeintraechtigungenVorhandenAndere:{
      get() {
        return this.$store.state.a1.beeintraechtigungenVorhandenAndere
      },
      set(value) {
        this.$store.commit("a1/beeintraechtigungenVorhandenAndere", value)
      }
    },
    mobil:{
      get() {
        return this.$store.state.a1.mobil
      },
      set(value) {
        this.$store.commit("a1/mobil", value)
      }
    },
    mobileingeschraenkt:{
      get() {
        return this.$store.state.a1.mobileingeschraenkt
      },
      set(value) {
        this.$store.commit("a1/mobileingeschraenkt", value)
      }
    },
    mobileingeschraenktAndere:{
      get() {
        return this.$store.state.a1.mobileingeschraenktAndere
      },
      set(value) {
        this.$store.commit("a1/mobileingeschraenktAndere", value)
      }
    },
    unterstuetzungMedizinischerVersorgung:{
      get() {
        return this.$store.state.a1.unterstuetzungMedizinischerVersorgung
      },
      set(value) {
        this.$store.commit("a1/unterstuetzungMedizinischerVersorgung", value)
      }
    },
    jaUnterstuetzungMedizinischerVersorgung:{
      get() {
        return this.$store.state.a1.jaUnterstuetzungMedizinischerVersorgung
      },
      set(value) {
        this.$store.commit("a1/jaUnterstuetzungMedizinischerVersorgung", value)
      }
    },
    jaUnterstuetzungMedizinischerVersorgungAndere:{
      get() {
        return this.$store.state.a1.jaUnterstuetzungMedizinischerVersorgungAndere
      },
      set(value) {
        this.$store.commit("a1/jaUnterstuetzungMedizinischerVersorgungAndere", value)
      }
    },
    kontakAktivitaet:{
      get() {
        return this.$store.state.a1.kontakAktivitaet
      },
      set(value) {
        this.$store.commit("a1/kontakAktivitaet", value)
      }
    },
    hobbies:{
      get() {
        return this.$store.state.a1.hobbies
      },
      set(value) {
        this.$store.commit("a1/hobbies", value)
      }
    },
    medizinischeDiagnose:{
      get() {
        return this.$store.state.a1.medizinischeDiagnose
      },
      set(value) {
        this.$store.commit("a1/medizinischeDiagnose", value)
      }
    },
    weitereDiagnosen:{
      get() {
        return this.$store.state.a1.weitereDiagnosen
      },
      set(value) {
        this.$store.commit("a1/weitereDiagnosen", value)
      }
    },
    weitereDiagnosenAndere:{
      get() {
        return this.$store.state.a1.weitereDiagnosenAndere
      },
      set(value) {
        this.$store.commit("a1/weitereDiagnosenAndere", value)
      }
    },
    vergangeneDiagnosen:{
      get() {
        return this.$store.state.a1.vergangeneDiagnosen
      },
      set(value) {
        this.$store.commit("a1/vergangeneDiagnosen", value)
      }
    },
    psychischeGesundheit:{
      get() {
        return this.$store.state.a1.psychischeGesundheit
      },
      set(value) {
        this.$store.commit("a1/psychischeGesundheit", value)
      }
    },
    psychischeGesundheitAndere:{
      get() {
        return this.$store.state.a1.psychischeGesundheitAndere
      },
      set(value) {
        this.$store.commit("a1/psychischeGesundheitAndere", value)
      }
    },
    gesundheitszustandDerFamilie:{
      get() {
        return this.$store.state.a1.gesundheitszustandDerFamilie
      },
      set(value) {
        this.$store.commit("a1/gesundheitszustandDerFamilie", value)
      }
    },
    gesundheitszustandDerFamilieAndere:{
      get() {
        return this.$store.state.a1.gesundheitszustandDerFamilieAndere
      },
      set(value) {
        this.$store.commit("a1/gesundheitszustandDerFamilieAndere", value)
      }
    },
    weitereAnmerkungenZumGesundheitszustandDerFamilie: {
      get() {
        return this.$store.state.a1.weitereAnmerkungenZumGesundheitszustandDerFamilie
      },
      set(value) {
        this.$store.commit("a1/weitereAnmerkungenZumGesundheitszustandDerFamilie", value)
      }
    },
    schwangerschaft:{
      get() {
        return this.$store.state.a1.schwangerschaft
      },
      set(value) {
        this.$store.commit("a1/schwangerschaft", value)
      }
    },
    stillzeit:{
      get() {
        return this.$store.state.a1.stillzeit
      },
      set(value) {
        this.$store.commit("a1/stillzeit", value)
      }
    },
    uploadAssessment1:{
      get() {
        return this.$store.state.a1.uploadAssessment1
      },
      set(value) {
        this.$store.commit("a1/uploadAssessment1", value)
      }
    },
  }
};
</script>
