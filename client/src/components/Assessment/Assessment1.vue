<template>
    <div>
      <p class="assessmentAspekt">Klient*innengeschichte</p>
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
      <InputForm
        v-model="adresse"
        :content="{ title: 'Adresse', id: 'adresse', type: 'text' }"        
      />
      <InputForm
        v-model="telefonnummer"
        :content="{ title: 'Telefonnummer', id: 'telefonnummer', type: 'text' }"        
      />
      <InputForm
        v-model="email"
        :content="{ title: 'E-Mail', id: 'email', type: 'email' }"        
      />
      <InputForm
        v-model="krankenkasse"
        :content="{ title: 'Krankenkasse', id: 'krankenkasse', type: 'text' }"        
      />
      <InputForm
        v-model="hausarzt"
        :content="{ title: 'Hausarzt*in', id: 'hausarzt', type: 'text' }"        
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
          {title:'keine Angaben', id:'keineAngabenSchulischeBildung', name:'schulischeBildung'}
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
          {title:'keine Angaben', id:'keineAngabenBeruflicheBildung', name:'beruflicheBildung'}
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
          {title:'Schichtarbeit', id:'schichtarbeit'},
          {title:'keine Angaben', id:'keineAngabenArtDerArbeit'}
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
          {title:'keine Angaben', id:'keineAngaben'}
        ]"
        :title="'Wohnsituation'"
        v-model="wohnsituation"
      />
      <InputForm
        v-model="wohnsituationAndere"
        :content="{ title: 'andere', id: 'wohnsituationAndere', type:'text' }"
        :style="marginSmall"
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
      <div v-if="aktuellGeraucht == 'nein'">
        <RadioForm
          :items="[
            {title:'ja', id:'jajemals', name:'jemalsGeraucht'},
            {title:'nein', id:'neinjemals', name:'jemalsGeraucht'},
          ]"
          :title="'Wurde jemals geraucht?'"
          v-model="jemalsGeraucht"
          :style="marginSmall"
        />
      </div>  
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
        <InputForm
          v-model="beeintraechtigungenVorhandenAndere"
          :content="{ title: 'andere', id: 'beeintraechtigungenVorhandenAndere', type:'text' }"
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
            {title:'ans Haus gebunden', id:'haus'},
            {title:'bettlägerig', id:'bettlaegerig'},
            {title:'an den Rollstuhl gebunden', id:'rollstuhl'},
          ]"
          :title="'Warum?'"
          v-model="mobileingeschraenkt"
          :style="marginSmall"
        />
        <InputForm
          v-model="mobileingeschraenktAndere"
          :content="{ title: 'andere', id: 'mobileingeschraenktAndere', type:'text' }"
          :style="marginSmall"
        />
      </div>
      <TextareaForm
        v-model="kontakAktivitaet"
        :content="{ title: 'Kontakt/Aktivität in sozialen Strukturen', id: 'kontakAktivitaet',}"
        :isTipp="true"
        :myTipp="'z.B. Familienmitglieder, Gemeinschaften (z.B. Vereine, Kirchengemeinde)'"
      />
      <TextareaForm
        v-model="hobbies"
        :content="{ title: 'Hobbies/Freizeitbeschäftigungen', id: 'hobbies',}"
      />
      <RadioForm
        :items="[
          {title:'ja', id:'jaUnterstuetzungMedizinischerVersorgung', name:'unterstuetzungMedizinischerVersorgung'},
          {title:'nein', id:'neinUnterstuetzungMedizinischerVersorgung', name:'unterstuetzungMedizinischerVersorgung'},
        ]"
        :title="'Unterstützung bei medizinischer/pflegerischer Versorgung notwendig'"
        v-model="unterstuetzungMedizinischerVersorgung"
      />
      <div v-if="unterstuetzungMedizinischerVersorgung == 'ja'">
        <CheckboxForm
          :checkboxs="[
            {title:'Familie', id:'familie'},
            {title:'Betreuungs-/Pflegepersonal', id:'betreuungspersonal'}
          ]"
          :title="'Durch wen?'"
          v-model="jaUnterstuetzungMedizinischerVersorgung"
          :style="marginSmall"
        />
        <InputForm
          v-model="jaUnterstuetzungMedizinischerVersorgungAndere"
          :content="{ title: 'andere', id: 'jaUnterstuetzungMedizinischerVersorgungAndere', type:'text' }"
          :style="marginSmall"
        />
      </div>
      <p class="assessmentAspekt">Medizinische/gesundheitliche Vergangenheit in der Familie</p>
      <TextareaForm
        v-model="medizinischeDiagnose"
        :content="{ title: 'Medizinische Diagnose', id: 'medizinischeDiagnose'}"
        :isTipp="true"
        :myTipp="'Grund für die Ernährungsberatung/ -therapie'"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'Adipositas', id:'adipositas'},
          {title:'Allergien', id:'allergien'},
          {title:'Diabetes mellitus', id:'diabetes'},
          {title:'gastrointestinale/neuro-endokrine Erkrankungen', id:'gastrointestinaleErkrankungen'},
          {title:'genetische Erkrankungen die den Ernährungsstatus beeinflussen können', id:'genetischeErkrankungen'},
          {title:'Herz-Kreislauf-Erkrankungen', id:'herzKreislaufErkrankungen'},
          {title:'Krebs', id:'krebs'},
          {title:'Lebensmittelunverträglichkeiten', id:'lebensmittelunverträglichkeiten'},
          {title:'Osteoporose', id:'osteoporose'},
        ]"
        :title="'Weitere Diagnosen'"
        v-model="weitereDiagnosen"
      />
      <InputForm
        v-model="weitereDiagnosenAndere"
        :content="{ title: 'andere', id: 'weitereDiagnosenAndere', type:'text' }"
        :style="marginSmall"
      />
      <TextareaForm
        v-model="vergangeneDiagnosen"
        :content="{ title: 'Vergangene Diagnosen', id: 'vergangeneDiagnosen'}"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'Abhängigkeitserkrankungen', id:'abhaengigkeitserkrankungen'},
          {title:'Affektive Erkrankungen (z.B. Depression)', id:'affektiveErkrankungen'},
          {title:'Angststörungen', id:'angststoerungen'},
          {title:'Essstörung', id:'Essstoerung'},
          {title:'Anpassungs- und (posttraumatische) Belastungsstörungen', id:'anpassungsBelastungsstoerungen'},
          {title:'Demenz', id:'demenz'},
          {title:'Persönlichkeitsstörungen (z.B. Borderline)', id:'persoenlichkeitsstoerungen'},
          {title:'Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung (ADHS)', id:'adhs'},
          {title:'Schizophrenie', id:'schizophrenie'},
          {title:'Schlafstörungen', id:'schlafstoerungen'},
          {title:'Zwangsstörungen', id:'zwangsstoerungen'},
        ]"
        :title="'Psychische Gesundheit'"
        v-model="psychischeGesundheit"
      />
      <InputForm
        v-model="psychischeGesundheitAndere"
        :content="{ title: 'andere', id: 'psychischeGesundheitAndere', type:'text' }"
        :style="marginSmall"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'Adipositas', id:'adipositasFamilie'},
          {title:'Allergien', id:'allergienFamilie'},
          {title:'Diabetes mellitus', id:'diabetesFamilie'},
          {title:'gastrointestinale/neuro-endokrine Erkrankungen', id:'gastrointestinaleErkrankungenFamilie'},
          {title:'genetische Erkrankungen die den Ernährungsstatus beeinflussen können', id:'genetischeErkrankungenFamilie'},
          {title:'Herz-Kreislauf-Erkrankungen', id:'herzKreislaufErkrankungenFamilie'},
          {title:'Krebs', id:'krebsFamilie'},
          {title:'Lebensmittelunverträglichkeiten', id:'lebensmittelunverträglichkeitenFamilie'},
          {title:'Osteoporose', id:'osteoporoseFamilie'},
        ]"
        :title="'Gesundheitszustand der Familie'"
        :isTipp = "true"
        :myTipp = "'Zustand und Erkrankungen, die Einfluss auf die Ernährung haben können'"
        v-model="gesundheitszustandDerFamilie"
      />
      <InputForm
        v-model="gesundheitszustandDerFamilieAndere"
        :content="{ title: 'andere', id: 'gesundheitszustandDerFamilieAndere', type:'text' }"
        :style="marginSmall"
      />
      <div v-if="geschlecht == 'weiblich' || geschlecht == 'divers'">
        <RadioForm
          :items="[
            {title:'ja', id:'jaSchwangerschaft', name:'schwangerschaft'},
            {title:'nein', id:'neinSchwangerschaft', name:'schwangerschaft'},
          ]"
          :title="'Schwangerschaft'"
          v-model="schwangerschaft"
        />
        <RadioForm
          :items="[
            {title:'ja', id:'jaStillzeit', name:'stillzeit'},
            {title:'nein', id:'neinStillzeit', name:'stillzeit'},
          ]"
          :title="'Stillzeit'"
          v-model="stillzeit"
        />
      </div>
      <p class="assessmentAspekt">Upload-Bereich für weitere Dokumente in der Klient*innengeschichte/Krankengeschichte (Client History)</p>  
    </div>
</template>

<script>
import InputForm from "../InputForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import RadioForm from "../RadioForm.vue";
import TextareaForm from "../TextareaForm.vue";
import {mapFields} from "vuex-map-fields";

export default {
  name: 'assessment1',
  components: {
    InputForm,
    CheckboxForm,
    RadioForm,
    TextareaForm,
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
      "adresse",
      "telefonnummer",
      "email",
      "krankenkasse",
      "hausarzt",
      "geschlecht",
      "herkunft",
      "muttersprache",
      "schulischeBildung",
      "beruflicheBildung",
      "beruf",
      "artDerArbeit",
      "familienstand", 
      "wohnsituation",
      "wohnsituationAndere",
      "personenImHaushalt",
      "aktuellGeraucht",
      "jemalsGeraucht",
      "anzahlZigaretten",
      "anzahlTabakprodukte",
      "anzahlJahreRauchen",
      "beeintraechtigungen",
      "beeintraechtigungenVorhanden",
      "beeintraechtigungenVorhandenAndere",
      "mobil",
      "mobileingeschraenkt",
      "mobileingeschraenktAndere",
      "kontakAktivitaet",
      "hobbies",
      "unterstuetzungMedizinischerVersorgung",
      "jaUnterstuetzungMedizinischerVersorgung",
      "jaUnterstuetzungMedizinischerVersorgungAndere",
      "medizinischeDiagnose",
      "weitereDiagnosen",
      "weitereDiagnosenAndere",
      "vergangeneDiagnosen",
      "psychischeGesundheit",
      "psychischeGesundheitAndere",
      "gesundheitszustandDerFamilie",
      "gesundheitszustandDerFamilieAndere",
      "schwangerschaft",
      "stillzeit"
    ]),
  }
};
</script>
