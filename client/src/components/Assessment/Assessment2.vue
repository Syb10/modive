<template>
    <div>
      <p class="assessmentAspekt">Upload-Bereich für Ernährungsprotokolle und weitere Ernährungserhebungsmethoden</p>
      <label class="mt-5">
        24-h-Recall
        <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
          <span class="tipptext">Um die Ernährungsgewohnheiten zu erheben, ist es empfehlenswert, zwei 24-h-Recalls durchzuführen - von einem Werk- und einem Wochenendtag</span>
        </div>
      </label>
      <InputForm
        v-model.number="anzahlRecall"
        :content="{ title: 'Wie viele 24-h-Recalls sollen erfasst werden?', id: 'anzahlRecall', type:'number', min:'0' }"
      />
      <RecallTable :anzahl="anzahlRecall"/>
      <TextareaForm
        v-model="weitereAnmerkungenRecall"
        :content="{ title: 'Weitere Anmerkungen zum 24-h-Recall', id: 'weitereAnmerkungenRecall'}"
      />
      <TextareaForm
        v-model="vorlieben"
        :content="{ title: 'Vorlieben für Lebensmittel, Speisen und Getränke', id: 'vorlieben'}"
      />
      <TextareaForm
        v-model="abneigungen"
        :content="{ title: 'Abneigungen für Lebensmittel, Speisen und Getränke', id: 'abneigungen'}"
      />
      <p class="assessmentAspekt">Ernährungsgewohnheiten</p>
      <RadioForm
        :items="[
          {title:'ja', id:'jaRecall', name:'isRecall'},
          {title:'nein', id:'neinRecall', name:'isRecall'},
        ]"
        :title="'Wurde ein 24-h-Recall durchgeführt?'"
        v-model="isRecall"
      />
      <div v-if="isRecall == 'ja'">
        <RadioForm
          :items="[
            {title:'ja', id:'jaAnzahlMahlzeitenRecall', name:'anzahlMahlzeitenRecall'},
            {title:'nein', id:'neinAnzahlMahlzeitenRecall', name:'anzahlMahlzeitenRecall'},
          ]"
          :title="'Entspricht die im 24-h-Recall angegebene Anzahl an Mahlzeiten der gewöhnlichen Anzahl an Mahlzeiten?'"
          v-model="anzahlMahlzeitenRecall"
        />
        <div v-if="anzahlMahlzeitenRecall == 'nein'">
          <InputForm
            v-model="mahlzeitenNormalerweise"
            :content="{ title: 'Wie viele Mahlzeiten werden normalerweise verzehrt?', id: 'MahlzeitenNormalerweise', type:'number' }"
          />
          <CheckboxForm
            :checkboxs="[
              {title:'Frühstück', id:'fruehstueckWeggelassen'},
              {title:'Mittagessen', id:'mittagessenWeggelassen'},
              {title:'Abendessen', id:'abendessenWeggelassen'},
              {title:'Zwischenmahlzeiten(en)', id:'zwischenmahlzeitenWeggelassen'},
              {title:'Spätmahlzeiten', id:'saetmahlzeitenWeggelassen'}
            ]"
            :title="'Welche Mahlzeiten werden meist weggelassen?'"
            v-model="mahlzeitenWeggelassen"
          />
          <CheckboxForm
            :checkboxs="[
              {title:'Frühstück', id:'fruehstueckZusaetzlich'},
              {title:'Mittagessen', id:'mittagessenZusaetzlich'},
              {title:'Abendessen', id:'abendessenZusaetzlich'},
              {title:'Zwischenmahlzeiten(en)', id:'zwischenmahlzeitenZusaetzlich'},
              {title:'Spätmahlzeiten', id:'saetmahlzeitenZusaetzlich'}
            ]"
            :title="'Welche Mahlzeiten kommen meist zusätzlich dazu?'"
            v-model="mahlzeitenZusaetzlich"
          />
          <InputForm
            v-model="mahlzeitenZusaetzlichAndere"
            :content="{ title: 'andere', id: 'mahlzeitenZusaetzlichAndere', type:'text' }"
            :style="marginSmall"
          />
        </div>
      </div>
      <RadioForm
        :items="[
          {title:'ja', id:'jaEigenstaendigeDiaet', name:'eigenstaendigeDiaet'},
          {title:'nein', id:'neinEigenstaendigeDiaet', name:'eigenstaendigeDiaet'},
        ]"
        :title="'Wird eigenständig eine bestimmte Diät oder Ernährungsweise durchgeführt?'"
        :isTipp="true"
        :myTipp="'z.B. aus kulturellen oder religiösen Gründen'"
        v-model="eigenstaendigeDiaet"
      />
      <div v-if="eigenstaendigeDiaet == 'ja'">
        <InputForm
            v-model="eigenstaendigeDiaetJa"
            :content="{ title: 'Welche', id: 'eigenstaendigeDiaetJa', type:'text' }"
            :style="marginSmall"
          />
      </div>
      <RadioForm
        :items="[
          {title:'ja', id:'jaMahlzeitenAusserHaus', name:'mahlzeitenAusserHaus'},
          {title:'nein', id:'neinMahlzeitenAusserHaus', name:'mahlzeitenAusserHaus'},
        ]"
        :title="'Werden Mahlzeiten außer Haus verzehrt?'"
        v-model="mahlzeitenAusserHaus"
      />
      <div v-if="mahlzeitenAusserHaus == 'ja'">
        <TextareaForm
          v-model="mahlzeitenAusserHausJa"
          :content="{title: 'Welche und wo', id: 'mahlzeitenAusserHausJa'}"
          :style="marginSmall"
        />
      </div>
      <p class="assessmentAspekt">Notwendige diätische Kostform und Medikamente (inkl. rezeptfreier Medikamente und Supplemente)</p>
      <RadioForm
        :items="[
          {title:'ja', id:'jaDiaetischeKostform', name:'diaetischeKostform'},
          {title:'nein', id:'neinDiaetischeKostform', name:'diaetischeKostform'},
        ]"
        :title="'Wird/wurde eine diätetische Kostform angewendet?'"
        v-model="diaetischeKostform"
      />
      <div v-if="diaetischeKostform =='ja'">
        <CheckboxForm
            :checkboxs="[
              {title:'angepasste Vollkost', id:'angepassteVollkost'},
              {title:'energiereduziert', id:'energiereduziert'},
              {title:'proteinmodifiziert', id:'proteinmodifiziert'},
              {title:'fettmodifiziert', id:'fettmodifiziert'},
              {title:'kohlenhydratmodifiziert/zuckerreduziert', id:'kohlenhydratmodifiziertZuckerreduziert'},
              {title:'laktosefrei', id:'laktosefrei'},
              {title:'fruktosearm', id:'fruktosearm'},
              {title:'glutenfrei', id:'glutenfrei'},
              {title:'histaminarm', id:'histaminarm'},
              {title:'purinarm', id:'purinarm'},
              {title:'natriumarm', id:'natriumarm'},
              {title:'kaliumarm', id:'kaliumarm'},
              {title:'phosphatarm', id:'phosphatarm'},
              {title:'keimreduziert', id:'keimreduziert'},
              {title:'konsistenzmodifiziert (z.B. passiert)', id:'konsistenzmodifiziert'},
            ]"
            :title="'Welche?'"
            :style="marginSmall"
            v-model="diaetischeKostformJa"
          />
          <InputForm
            v-model="diaetischeKostformJaAndere"
            :content="{ title: 'andere', id: 'diaetischeKostformJaAndere', type:'text' }"
            :style="marginSmall"
          />
      </div>
      <RadioForm
        :items="[
          {title:'ja', id:'jaEnteraleErnaehrung', name:'enteraleErnaehrung'},
          {title:'nein', id:'neinEnteraleErnaehrung', name:'enteraleErnaehrung'},
        ]"
        :title="'Wird eine enterale, parenterale Ernährung oder Zusatznahrung eingesetzt?'"
        v-model="enteraleErnaehrung"
      />
      <div v-if="enteraleErnaehrung=='ja'">
        <InputForm
          v-model="enteraleErnaehrungJa"
          :content="{ title: 'Welche?', id: 'enteraleErnaehrungJa', type:'text' }"
          :style="marginSmall"
        />
      </div>
      <RadioForm
        :items="[
          {title:'ja', id:'jaMedikamente', name:'medikamente'},
          {title:'nein', id:'neinMedikamente', name:'medikamente'},
        ]"
        :title="'Medikamente (insbesondere mit diätetischem Bezug)/Supplemente'"
        v-model="medikamente"
      />
      <div v-if="medikamente=='ja'">
        <InputForm
          v-model="medikamenteJa"
          :content="{ title: 'Welche?', id: 'medikamenteJa', type:'text' }"
          :style="marginSmall"
          :isTipp="true"
          :myTipp="'z.B. verschreibungspflichtige, rezeptfreie Medikamente, Nahrungsergänzungsmittel und Pflanzenbestandteile, Komplementär-/Alternativmedizin'"
        />
      </div>
      <p @click.prevent="showBilanzierung">Geschätzte Bilanzierung nach Lebensmittelgruppen, Energie, Makro- und Mikronährstoffen <i v-if="isBilanzierung" class="fa fa-chevron-up"></i><i v-if="!isBilanzierung" class="fa fa-chevron-down"></i></p>
      <table v-if="isBilanzierung" class="table table-striped table-bordered">
        <thead>
          <th>Lebensmittelgruppen</th>
          <th>weniger</th>
          <th>entprechend der Ernährungsempfehlung</th>
          <th>mehr</th>
        </thead>
        <tbody>
          <BilanzierungsTable
            :items="Getränke"
            v-model="getraenke"
          />
          <BilanzierungsTable
            :items="Gemüse"
            v-model="gemuese"
          />
          <BilanzierungsTable
            :items="Obst"
            v-model="obst"
          />
          <BilanzierungsTable
            :items="Getreideprodukte"
            v-model="getreideprodukte"
          />
          <BilanzierungsTable
            :items="Milch"
            v-model="milch"
          />
          <BilanzierungsTable
            :items="Fleisch"
            v-model="fleisch"
          />
          <BilanzierungsTable
            :items="Fisch"
            v-model="fisch"
          />
          <BilanzierungsTable
            :items="Ei"
            v-model="ei"
          />
          <BilanzierungsTable
            :items="Fette"
            v-model="fette"
          />
          <TableForm
            :items="Süßigkeiten"
            v-model="suessigkeiten"
          />
          <BilanzierungsTable
            :items="PikanteSnacks"
            v-model="pikanteSnacks"
          />
        </tbody>
      </table>
      <table  v-if="isBilanzierung" class="table table-striped table-bordered">
        <thead>
          <th>Energie</th>
          <th>weniger</th>
          <th>entprechend der Ernährungsempfehlung</th>
          <th>mehr</th>
        </thead>
        <tbody>
          <BilanzierungsTable
            :items="Energie"
            v-model="energie"
          />
        </tbody>
      </table>
      <table  v-if="isBilanzierung" class="table table-striped table-bordered">
        <thead>
          <th>Makronährstoffe</th>
          <th>weniger</th>
          <th>entprechend der Ernährungsempfehlung</th>
          <th>mehr</th>
        </thead>
        <tbody>
          <BilanzierungsTable
            :items="Eiweiß"
            v-model="eiweiss"
          />
          <BilanzierungsTable
            :items="Kohlenhydrate"
            v-model="kohlenhydrate"
          />
          <TableForm
            :items="Ballaststoffe"
            v-model="ballaststoffe"
            :paddingLeft="paddingLeft"
          />
          <BilanzierungsTable
            :items="Zucker"
            v-model="zucker"
            :paddingLeft="paddingLeft"
          />
          <BilanzierungsTable
            :items="Gesamtfett"
            v-model="gesamtfett"
          />
          <BilanzierungsTable
            :items="GesättigteFettsäuren"
            v-model="gesaettigteFettsaeuren"
            :paddingLeft="paddingLeft"
          />
          <BilanzierungsTable
            :items="EinfachUngesättigteFettsäuren"
            v-model="einfachGesaettigte"
            :paddingLeft="paddingLeft"
          />
          <BilanzierungsTable
            :items="MehrfachUngesättigteFettsäuren"
            v-model="mehrfachGesaettigte"
            :paddingLeft="paddingLeft"
          />
          <BilanzierungsTable
            :items="Cholesterin"
            v-model="cholesterin"
            :paddingLeft="paddingLeft"
          />
        </tbody>
      </table>
      <table  v-if="isBilanzierung" class="table table-striped table-bordered">
        <thead>
          <th>Mikronährstoffe</th>
          <th>weniger</th>
          <th>entprechend der Ernährungsempfehlung</th>
          <th>mehr</th>
          <th>Löschen</th>
        </thead>
        <tbody>
          <BilanzierungsTableDynamic
            :title="'Vitamine'"
            v-model="vitamine"
          />
          <BilanzierungsTableDynamic
            :title="'Mineralstoffe'"
            v-model="mineralstoffe"
          />
        </tbody>
      </table>
      <p class="assessmentAspekt">Upload-Bereich für weitere Dokumente in Ernährungsgewohnheiten (Diet History)</p>
    </div>
</template>

<script>
import {mapFields} from "vuex-map-fields";
import BilanzierungsTable from "../BilanzierungsTable.vue";
import BilanzierungsTableDynamic from "../BilanzierungsTableDynamic.vue";
import RecallTable from "../RecallTable.vue";
import TextareaForm from "../TextareaForm.vue";
import RadioForm from "../RadioForm.vue";
import InputForm from "../InputForm.vue";
import CheckboxForm from "../CheckboxForm.vue";

export default {
    name: "assessment2",
    data() {
      return {
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        },
        paddingLeft: {
          padding: '.75rem 0 0 2.25rem',
        },
        Getränke:{
          title: "Getränke",
          weniger:{value: "weniger",id:"getraenkeWeniger",name:"getraenke"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"getraenkeEntsprechend",name:"getraenke"},
          mehr:{value: "mehr",id:"getraenkeMehr",name:"getraenke"}
        },
        Gemüse:{
          title: "Gemüse",
          weniger:{value: "weniger",id:"gemueseWeniger",name:"gemuese"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"gemueseEntsprechend",name:"gemuese"},
          mehr:{value: "mehr",id:"gemueseMehr",name:"gemuese"}
        },
        Obst:{
          title: "Obst",
          weniger:{value: "weniger",id:"obstWeniger",name:"obst"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"obstEntsprechend",name:"obst"},
          mehr:{value: "mehr",id:"obstMehr",name:"obst"}
        },
        Getreideprodukte:{
          title: "Getreideprodukte/Kartoffeln",
          weniger:{value: "weniger",id:"getreideprodukteWeniger",name:"getreideprodukte"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"getreideprodukteEntsprechend",name:"getreideprodukte"},
          mehr:{value: "mehr",id:"getreideprodukteMehr",name:"getreideprodukte"}
        },
        Milch:{
          title: "Milch und Milchprodukte",
          weniger:{value: "weniger",id:"milchWeniger", name:"milch"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"milchEntsprechend", name:"milch"},
          mehr:{value: "mehr",id:"milchMehr",name:"milch"}
        },
        Fleisch:{
          title: "Fleisch/-waren, Wurst/-waren",
          weniger:{value: "weniger",id:"fleischWeniger",name:"fleisch"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"fleischEntsprechend",name:"fleisch"},
          mehr:{value: "mehr",id:"fleischMehr",name:"fleisch"}
        },
        Fisch:{
          title: "Fisch",
          weniger:{value: "weniger",id:"fischWeniger",name:"fisch"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"fischEntsprechend",name:"fisch"},
          mehr:{value: "mehr",id:"fischMehr",name:"fisch"}
        },
        Ei:{
          title: "Ei",
          weniger:{value: "weniger",id:"eiWeniger",name:"ei"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"eiEntsprechend",name:"ei"},
          mehr:{value: "mehr",id:"eiMehr",name:"ei"}
        },
        Fette:{
          title: "Fette/Öle",
          weniger:{value: "weniger",id:"fetteWeniger",name:"fette"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"fetteEntsprechend",name:"fette"},
          mehr:{value: "mehr",id:"fetteMehr",name:"fette"}
        },
        Süßigkeiten:{
          title: "Süßigkeiten",
          weniger:{value: "weniger",id:"suessigkeitenWeniger",name:"suessigkeiten"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"suessigkeitenEntsprechend",name:"suessigkeiten"},
          mehr:{value: "mehr",id:"suessigkeitenMehr",name:"suessigkeiten"}
        },
        PikanteSnacks:{
          title: "Pikante Snacks",
          weniger:{value: "weniger",id:"pikanteSnacksWeniger",name:"pikanteSnacks"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"pikanteSnacksEntsprechend",name:"pikanteSnacks"},
          mehr:{value: "mehr",id:"pikanteSnacksMehr",name:"pikanteSnacks"}
        },
        Energie:{
          title: "Energie (kcal)",
          weniger:{value: "weniger",id:"energieWeniger",name:"energie"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"energieEntsprechend",name:"energie"},
          mehr:{value: "mehr",id:"energieMehr",name:"energie"}
        },
        Eiweiß:{
          title: "Eiweiß",
          weniger:{value: "weniger",id:"eiweissWeniger",name:"eiweiss"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"eiweissEntsprechend",name:"eiweiss"},
          mehr:{value: "mehr",id:"eiweissMehr",name:"eiweiss"}
        },
        Kohlenhydrate:{
          title: "Kohlenhydrate",
          weniger:{value: "weniger",id:"kohlenhydrateWeniger",name:"kohlenhydrate"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"kohlenhydrateEntsprechend",name:"kohlenhydrate"},
          mehr:{value: "mehr",id:"kohlenhydrateMehr",name:"kohlenhydrate"}
        },
        Ballaststoffe:{
          title: "Ballaststoffe",
          weniger:{value: "weniger",id:"ballaststoffeWeniger",name:"ballaststoffe"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"ballaststoffeEntsprechend",name:"ballaststoffe"},
          mehr:{value: "mehr",id:"ballaststoffeMehr",name:"ballaststoffe"}
        },
        Zucker:{
          title: "Zucker",
          weniger:{value: "weniger",id:"zuckerWeniger",name:"zucker"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"zuckerEntsprechend",name:"zucker"},
          mehr:{value: "mehr",id:"zuckerMehr",name:"zucker"}
        },
        Gesamtfett:{
          title: "Gesamtfett",
          weniger:{value: "weniger",id:"gesamtfettWeniger",name:"gesamtfett"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"gesamtfettEntsprechend",name:"gesamtfett"},
          mehr:{value: "mehr",id:"gesamtfettMehr",name:"gesamtfett"}
        },
        GesättigteFettsäuren:{
          title: "Gesättigte Fettsäuren",
          weniger:{value: "weniger",id:"gesaettigteFettsaeurenWeniger",name:"gesaettigteFettsaeuren"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"gesaettigteFettsaeurenEntsprechend",name:"gesaettigteFettsaeuren"},
          mehr:{value: "mehr",id:"gesaettigteFettsaeurenMehr",name:"gesaettigteFettsaeuren"}
        },
        EinfachUngesättigteFettsäuren:{
          title: "Einfach ungesättigte Fettsäuren",
          weniger:{value: "weniger",id:"einfachGesaettigteWeniger",name:"einfachGesaettigte"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"einfachGesaettigteEntsprechend",name:"einfachGesaettigte"},
          mehr:{value: "mehr",id:"einfachGesaettigteMehr",name:"einfachGesaettigte"}
        },
        MehrfachUngesättigteFettsäuren:{
          title: "Mehrfach ungesättigte Fettsäuren",
          weniger:{value: "weniger",id:"mehrfachGesaettigteWeniger",name:"mehrfachGesaettigte"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"mehrfachGesaettigteEntsprechend",name:"mehrfachGesaettigte"},
          mehr:{value: "mehr",id:"mehrfachGesaettigteMehr",name:"mehrfachGesaettigte"}
        },
        Cholesterin:{
          title: "Cholesterin",
          weniger:{value: "weniger",id:"cholesterinWeniger",name:"cholesterin"},
          entsprechend:{value: "entsprechend der Ernährungsempfehlung",id:"cholesterinEntsprechend",name:"cholesterin"},
          mehr:{value: "mehr",id:"cholesterinMehr",name:"cholesterin"}
        },
      }
    },
    components: {
      BilanzierungsTable,
      BilanzierungsTableDynamic,
      RecallTable,
      TextareaForm,
      RadioForm,
      InputForm,
      CheckboxForm
    },  
    computed: {
      ...mapFields([
          "anzahlRecall",
          "weitereAnmerkungenRecall",
          "vorlieben",
          "abneigungen",
          "isRecall",
          "anzahlMahlzeitenRecall",
          "mahlzeitenNormalerweise",
          "mahlzeitenWeggelassen",
          "mahlzeitenZusaetzlich",
          "mahlzeitenZusaetzlichAndere",
          "eigenstaendigeDiaet",
          "eigenstaendigeDiaetJa",
          "mahlzeitenAusserHaus",
          "mahlzeitenAusserHausJa",
          "diaetischeKostform",
          "diaetischeKostformJa",
          "diaetischeKostformJaAndere",
          "enteraleErnaehrung",
          "enteraleErnaehrungJa",
          "medikamente",
          "medikamenteJa",
          "isBilanzierung",
          "getraenke",
          "gemuese",
          "obst",
          "getreideprodukte",
          "milch",
          "fleisch",
          "fisch",
          "ei",
          "fette",
          "suessigkeiten",
          "pikanteSnacks",
          "energie",
          "eiweiss",
          "kohlenhydrate",
          "ballaststoffe",
          "zucker",
          "gesamtfett",
          "gesaettigteFettsaeuren",
          "einfachGesaettigte",
          "mehrfachGesaettigte",
          "cholesterin",
          "vitamine",
          "mineralstoffe"
      ]),
    },
    methods: {
      showBilanzierung() {
        this.isBilanzierung = !this.isBilanzierung;
      }
    }
};
</script>