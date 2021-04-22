<template>
    <div>
       <p class="assessmentAspekt">Faktoren, die den Zugang zu Nahrungsmitteln beeinflussen, Lebensmittel und ernährungsbezogene Versorgung</p>
       <CheckboxForm
        :checkboxs="[
          {title:'gemeinschaftlich', id:'plantGemeinschaftlich'},
          {title:'eigenstängig', id:'plantEigenstaengig'},
          {title:'Partner*in', id:'plantPartner'},
          {title:'Familienmitglied', id:'plantFamilienmitglied'},
          {title:'Sonstiges', id:'plantSonstiges'}
        ]"
        :title="'Wer plant die Mahlzeiten?'"
        v-model="plantMahlzeiten"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'gemeinschaftlich', id:'bereitetGemeinschaftlich'},
          {title:'eigenstängig', id:'bereitetEigenstaengig',},
          {title:'Partner*in', id:'bereitetPartner'},
          {title:'Familienmitglied', id:'bereitetFamilienmitglied',},
          {title:'Außer-Haus-Verpflegung', id:'bereitetAusserHaus'},
          {title:'Essen auf Rädern', id:'bereitetEssenAufRaedern'},
          {title:'Sonstiges', id:'bereitetSonstiges'}
        ]"
        :title="'Wer bereitet die Mahlzeiten zu?'"
        v-model="bereitetMahlzeiten"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'gemeinschaftlich', id:'einkaufGemeinschaftlich'},
          {title:'eigenstängig', id:'einkaufEigenstaengig'},
          {title:'Partner*in', id:'einkaufPartner'},
          {title:'Familienmitglied', id:'einkaufFamilienmitglied'},
          {title:'Einkaufsservice', id:'einkaufEinkaufsservice'},
          {title:'Online-Einkauf', id:'einkaufOnlineEinkauf'},
          {title:'Sonstiges', id:'einkaufSonstiges'}
        ]"
        :title="'Wer tätigt den Lebensmitteleinkauf?'"
        v-model="lebensmitteleinkauf"
      />
      <RadioForm
        :items="[
          {title:'ja', value:'ja', id:'selbstversorgenJa', name:'selbstversorgen'},
          {title:'nein', value:'nein', id:'selbstversorgenNein', name:'selbstversorgen'},
          {title:'ja, aber eingeschränkt', value:'ja, aber eingeschränkt', id:'selbstversorgenJaAber', name:'selbstversorgen'},
        ]"
        :title="'Ist der/die Klient*in psychisch und physisch in der Lage, sich selbst zu versorgen?'"
        v-model="selbstversorgen"
      />
      <div v-if="selbstversorgen == 'ja, aber eingeschränkt'">
      <InputForm
          v-model="selbstversorgenEingeschraenkt"
          :content="{ title: 'Welche Einschränkungen bestehen?', id: 'selbstversorgenEingeschraenkt', type:'text' }"
          :style="marginSmall"
        />
      </div>
      <div v-if="selbstversorgen == 'nein'">
      <InputForm
          v-model="selbstversorgenNein"
          :content="{ title: 'Warum nicht?', id: 'selbstversorgenNein', type:'text' }"
          :style="marginSmall"
        />
      </div>
      <p class="assessmentAspekt">Wissen über Lebensmittel und Nährstoffe, Überzeugungen, Einstellungen</p>
      <Slider
          :label1="'sehr einfach'"
          :label2="'einfach'"
          :label3="'schwer'"
          :label4="'sehr schwer'"
          :title="'Für wie einfach beurteilt der/die Klient*in es, an einem normalen Tag eine ausgewogene Mahlzeit zu Hause zuzubereiten?'"
          v-model="einfachheitMahlzeitZuzubereiten"
      />
      <Slider
          :label1="'sehr wichtig'"
          :label2="'wichtig'"
          :label3="'unwichtig'"
          :label4="'sehr unwichtig'"
          :title="'Wie wichtig ist es dem/der Klient*in, diesen Empfehlungen zu folgen?'"
          v-model="wichtigkeitDerEmpfehlung"
      />
      <p>Wie wichtig sind dem/der Klient*in die folgenden Punkte beim Lebensmitteleinkauf?</p>
      <Slider
          :label1="'sehr wichtig'"
          :label2="'wichtig'"
          :label3="'unwichtig'"
          :label4="'sehr unwichtig'"
          :title="'für Frische'"
          v-model="wichtigkeitDerFrische"
      />
    </div>
</template>

<script>
import RadioForm from "../RadioForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import InputForm from "../InputForm.vue";
import Slider from "../Slider.vue";
import {mapFields} from "vuex-map-fields";
export default {
    name: "assessment3",
    components: {
      RadioForm,
      CheckboxForm,
      InputForm,
      Slider
    },
    computed: {
      ...mapFields([
        "plantMahlzeiten",
        "bereitetMahlzeiten",
        "lebensmitteleinkauf",
        "selbstversorgen",
        "selbstversorgenEingeschraenkt",
        "selbstversorgenNein",
        "einfachheitMahlzeitZuzubereiten",
        "wichtigkeitDerEmpfehlung",
        "wichtigkeitDerFrische"
      ])
    },
};
</script>