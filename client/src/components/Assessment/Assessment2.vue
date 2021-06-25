<template>
    <div>
      <button @click.prevent="scrollMeTo('ernaehrungsprotokolle')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Upload-Bereich für Ernährungsprotokolle</button>
      <button @click.prevent="scrollMeTo('ernaehrungsgewohnheiten')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Essgewohnheiten</button>
      <button @click.prevent="scrollMeTo('kostformMedikamente')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Diätetische Kostform und Medikamente</button>
      <button @click.prevent="scrollMeTo('upload')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Upload-Bereich für weitere Dokumente</button>
      <p class="assessmentAspekt mt-5" ref="ernaehrungsprotokolle">Upload-Bereich für Ernährungsprotokolle und weitere Ernährungserhebungsmethoden</p>
      <p class="assessmentAspekt" ref="ernaehrungsgewohnheiten">Essgewohnheiten</p>
      <label class="mt-5">
        24-h-Recall
        <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
          <span class="tipptext">Um die Ernährungsgewohnheiten zu erheben, ist es empfehlenswert, zwei 24-h-Recalls durchzuführen - von einem Werk- und einem Wochenendtag</span>
        </div>
      </label>
      <InputForm
        v-model.number="anzahlRecall"
        :content="{ title: 'Wie viele 24-h-Recalls sollen erfasst werden?', id: 'anzahlRecall', type:'number', min:'0', color:'assessmentColor', border:'assessmentBorder' }"
      />
      <RecallTable :anzahl="anzahlRecall"/>
      <TextareaForm
        v-model="weitereAnmerkungenRecall"
        :content="{ title: 'Weitere Anmerkungen zum 24-h-Recall', id: 'weitereAnmerkungenRecall', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <TextareaForm
        v-model="vorlieben"
        :content="{ title: 'Vorlieben für Lebensmittel, Speisen und Getränke', id: 'vorlieben', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <TextareaForm
        v-model="abneigungen"
        :content="{ title: 'Abneigungen für Lebensmittel, Speisen und Getränke', id: 'abneigungen', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <RadioForm
        :items="[
          {title:'ja', id:'jaRecall', name:'isRecall'},
          {title:'nein', id:'neinRecall', name:'isRecall'},
        ]"
        :color="'assessmentColor'"
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
          :color="'assessmentColor'"
          v-model="anzahlMahlzeitenRecall"
        />
        <div v-if="anzahlMahlzeitenRecall == 'nein'">
          <InputForm
            v-model="mahlzeitenNormalerweise"
            :content="{ title: 'Wie viele Mahlzeiten werden normalerweise verzehrt?', id: 'MahlzeitenNormalerweise', type:'number', color:'assessmentColor', border:'assessmentBorder' }"
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
            :color="'assessmentColor'"
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
            :color="'assessmentColor'"
            v-model="mahlzeitenZusaetzlich"
          />
          <InputForm
            v-model="mahlzeitenZusaetzlichAndere"
            :content="{ title: 'andere', id: 'mahlzeitenZusaetzlichAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
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
        :color="'assessmentColor'"
        v-model="eigenstaendigeDiaet"
      />
      <div v-if="eigenstaendigeDiaet == 'ja'">
        <InputForm
            v-model="eigenstaendigeDiaetJa"
            :content="{ title: 'Welche', id: 'eigenstaendigeDiaetJa', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
            :style="marginSmall"
          />
      </div>
      <RadioForm
        :items="[
          {title:'ja', id:'jaMahlzeitenAusserHaus', name:'mahlzeitenAusserHaus'},
          {title:'nein', id:'neinMahlzeitenAusserHaus', name:'mahlzeitenAusserHaus'},
        ]"
        :title="'Werden Mahlzeiten außer Haus verzehrt?'"
        :color="'assessmentColor'"
        v-model="mahlzeitenAusserHaus"
      />
      <div v-if="mahlzeitenAusserHaus == 'ja'">
        <TextareaForm
          v-model="mahlzeitenAusserHausJa"
          :content="{title: 'Welche und wo', id: 'mahlzeitenAusserHausJa', color:'assessmentColor', border:'assessmentBorder'}"
          :style="marginSmall"
        />
      </div>
      <p class="assessmentAspekt" ref="kostformMedikamente">Diätetische Kostform und Medikamente</p>
      <RadioForm
        :items="[
          {title:'ja', id:'jaDiaetischeKostform', name:'diaetischeKostform'},
          {title:'nein', id:'neinDiaetischeKostform', name:'diaetischeKostform'},
        ]"
        :title="'Wird/wurde eine diätetische Kostform angewendet?'"
        :color="'assessmentColor'"
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
            :color="'assessmentColor'"
            :style="marginSmall"
            v-model="diaetischeKostformJa"
          />
          <InputForm
            v-model="diaetischeKostformJaAndere"
            :content="{ title: 'andere', id: 'diaetischeKostformJaAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
            :style="marginSmall"
          />
      </div>
      <RadioForm
        :items="[
          {title:'ja', id:'jaEnteraleErnaehrung', name:'enteraleErnaehrung'},
          {title:'nein', id:'neinEnteraleErnaehrung', name:'enteraleErnaehrung'},
        ]"
        :title="'Wird eine enterale, parenterale Ernährung oder Zusatznahrung eingesetzt?'"
        :color="'assessmentColor'"
        v-model="enteraleErnaehrung"
      />
      <div v-if="enteraleErnaehrung=='ja'">
        <InputForm
          v-model="enteraleErnaehrungJa"
          :content="{ title: 'Welche?', id: 'enteraleErnaehrungJa', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
          :style="marginSmall"
        />
      </div>
      <RadioForm
        :items="[
          {title:'ja', id:'jaMedikamente', name:'medikamente'},
          {title:'nein', id:'neinMedikamente', name:'medikamente'},
        ]"
        :title="'Medikamente (insbesondere mit diätetischem Bezug)/Supplemente'"
        :color="'assessmentColor'"
        v-model="medikamente"
      />
      <div v-if="medikamente=='ja'">
        <InputForm
          v-model="medikamenteJa"
          :content="{ title: 'Welche?', id: 'medikamenteJa', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
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
          <RadioTable
            :items="Getränke"
            v-model="getraenke"
          />
          <RadioTable
            :items="Gemüse"
            v-model="gemuese"
          />
          <RadioTable
            :items="Obst"
            v-model="obst"
          />
          <RadioTable
            :items="Getreideprodukte"
            v-model="getreideprodukte"
          />
          <RadioTable
            :items="Milch"
            v-model="milch"
          />
          <RadioTable
            :items="Fleisch"
            v-model="fleisch"
          />
          <RadioTable
            :items="Fisch"
            v-model="fisch"
          />
          <RadioTable
            :items="Ei"
            v-model="ei"
          />
          <RadioTable
            :items="Fette"
            v-model="fette"
          />
          <RadioTable
            :items="Süßigkeiten"
            v-model="suessigkeiten"
          />
          <RadioTable
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
          <RadioTable
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
          <RadioTable
            :items="Eiweiß"
            v-model="eiweiss"
          />
          <RadioTable
            :items="Kohlenhydrate"
            v-model="kohlenhydrate"
          />
          <RadioTable
            :items="Ballaststoffe"
            v-model="ballaststoffe"
          />
          <RadioTable
            :items="Zucker"
            v-model="zucker"
          />
          <RadioTable
            :items="Gesamtfett"
            v-model="gesamtfett"
          />
          <RadioTable
            :items="GesättigteFettsäuren"
            v-model="gesaettigteFettsaeuren"
          />
          <RadioTable
            :items="EinfachUngesättigteFettsäuren"
            v-model="einfachGesaettigte"
          />
          <RadioTable
            :items="MehrfachUngesättigteFettsäuren"
            v-model="mehrfachGesaettigte"
          />
          <RadioTable
            :items="Cholesterin"
            v-model="cholesterin"
          />
        </tbody>
      </table>
      <table  v-if="isBilanzierung" class="table table-striped table-bordered">
        <thead>
          <th>Mikronährstoffe</th>
          <th>weniger</th>
          <th>entprechend der Ernährungsempfehlung</th>
          <th>mehr</th>
        </thead>
        <tbody>
          <RadioTableDynamic
            :subtitle="'Vitamine'"
            v-model="vitamine"
            :isBilanzierung="true"
          />
          <RadioTableDynamic
            :subtitle="'Mineralstoffe'"
            v-model="mineralstoffe"
            :isBilanzierung="true"
          />
        </tbody>
      </table>
      <p class="assessmentAspekt" ref="upload">Upload-Bereich für weitere Dokumente in Ernährungsgewohnheiten (Diet History)</p>
    </div>
</template>

<script>
import {mapFields} from "vuex-map-fields";
import RecallTable from "../RecallTable.vue";
import TextareaForm from "../TextareaForm.vue";
import RadioForm from "../RadioForm.vue";
import InputForm from "../InputForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import RadioTable from "../RadioTable.vue";
import RadioTableDynamic from "../RadioTableDynamic.vue";

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
        Getränke:[
          {title: "Getränke"},
          {value: "weniger",id:"getraenkeWeniger",name:"getraenke"},
          {value: "entsprechend der Ernährungsempfehlung",id:"getraenkeEntsprechend",name:"getraenke"},
          {value: "mehr",id:"getraenkeMehr",name:"getraenke"},
        ],
        Gemüse:[
          {title: "Gemüse"},
          {value: "weniger",id:"gemueseWeniger",name:"gemuese"},
          {value: "entsprechend der Ernährungsempfehlung",id:"gemueseEntsprechend",name:"gemuese"},
          {value: "mehr",id:"gemueseMehr",name:"gemuese"}
        ],
        Obst:[
          {title: "Obst"},
          {value: "weniger",id:"obstWeniger",name:"obst"},
          {value: "entsprechend der Ernährungsempfehlung",id:"obstEntsprechend",name:"obst"},
          {value: "mehr",id:"obstMehr",name:"obst"}
        ],
        Getreideprodukte:[
          {title: "Getreideprodukte/Kartoffeln"},
          {value: "weniger",id:"getreideprodukteWeniger",name:"getreideprodukte"},
          {value: "entsprechend der Ernährungsempfehlung",id:"getreideprodukteEntsprechend",name:"getreideprodukte"},
          {value: "mehr",id:"getreideprodukteMehr",name:"getreideprodukte"}
        ],
        Milch:[
          {title: "Milch und Milchprodukte"},
          {value: "weniger",id:"milchWeniger", name:"milch"},
          {value: "entsprechend der Ernährungsempfehlung",id:"milchEntsprechend", name:"milch"},
          {value: "mehr",id:"milchMehr",name:"milch"}
        ],
        Fleisch:[
          {title: "Fleisch/-waren, Wurst/-waren"},
          {value: "weniger",id:"fleischWeniger",name:"fleisch"},
          {value: "entsprechend der Ernährungsempfehlung",id:"fleischEntsprechend",name:"fleisch"},
          {value: "mehr",id:"fleischMehr",name:"fleisch"}
        ],
        Fisch:[
          {title: "Fisch"},
          {value: "weniger",id:"fischWeniger",name:"fisch"},
          {value: "entsprechend der Ernährungsempfehlung",id:"fischEntsprechend",name:"fisch"},
          {value: "mehr",id:"fischMehr",name:"fisch"}
        ],
        Ei:[
          {title: "Ei"},
          {value: "weniger",id:"eiWeniger",name:"ei"},
          {value: "entsprechend der Ernährungsempfehlung",id:"eiEntsprechend",name:"ei"},
          {value: "mehr",id:"eiMehr",name:"ei"}
        ],
        Fette:[
          {title: "Fette/Öle"},
          {value: "weniger",id:"fetteWeniger",name:"fette"},
          {value: "entsprechend der Ernährungsempfehlung",id:"fetteEntsprechend",name:"fette"},
          {value: "mehr",id:"fetteMehr",name:"fette"}
        ],
        Süßigkeiten:[
          {title: "Süßigkeiten"},
          {value: "weniger",id:"suessigkeitenWeniger",name:"suessigkeiten"},
          {value: "entsprechend der Ernährungsempfehlung",id:"suessigkeitenEntsprechend",name:"suessigkeiten"},
          {value: "mehr",id:"suessigkeitenMehr",name:"suessigkeiten"}
        ],
        PikanteSnacks:[
          {title: "Pikante Snacks"},
          {value: "weniger",id:"pikanteSnacksWeniger",name:"pikanteSnacks"},
          {value: "entsprechend der Ernährungsempfehlung",id:"pikanteSnacksEntsprechend",name:"pikanteSnacks"},
          {value: "mehr",id:"pikanteSnacksMehr",name:"pikanteSnacks"}
        ],
        Energie:[
          {title: "Energie (kcal)"},
          {value: "weniger",id:"energieWeniger",name:"energie"},
          {value: "entsprechend der Ernährungsempfehlung",id:"energieEntsprechend",name:"energie"},
          {value: "mehr",id:"energieMehr",name:"energie"}
        ],
        Eiweiß:[
          {title: "Eiweiß"},
          {value: "weniger",id:"eiweissWeniger",name:"eiweiss"},
          {value: "entsprechend der Ernährungsempfehlung",id:"eiweissEntsprechend",name:"eiweiss"},
          {value: "mehr",id:"eiweissMehr",name:"eiweiss"}
        ],
        Kohlenhydrate:[
          {title: "Kohlenhydrate"},
          {value: "weniger",id:"kohlenhydrateWeniger",name:"kohlenhydrate"},
          {value: "entsprechend der Ernährungsempfehlung",id:"kohlenhydrateEntsprechend",name:"kohlenhydrate"},
          {value: "mehr",id:"kohlenhydrateMehr",name:"kohlenhydrate"}
        ],
        Ballaststoffe:[
          {title: "Ballaststoffe", class:"paddingLeft"},
          {value: "weniger",id:"ballaststoffeWeniger",name:"ballaststoffe"},
          {value: "entsprechend der Ernährungsempfehlung",id:"ballaststoffeEntsprechend",name:"ballaststoffe"},
          {value: "mehr",id:"ballaststoffeMehr",name:"ballaststoffe"}
        ],
        Zucker:[
          {title: "Zucker", class:"paddingLeft"},
          {value: "weniger",id:"zuckerWeniger",name:"zucker"},
          {value: "entsprechend der Ernährungsempfehlung",id:"zuckerEntsprechend",name:"zucker"},
          {value: "mehr",id:"zuckerMehr",name:"zucker"}
        ],
        Gesamtfett:[
          {title: "Gesamtfett"},
          {value: "weniger",id:"gesamtfettWeniger",name:"gesamtfett"},
          {value: "entsprechend der Ernährungsempfehlung",id:"gesamtfettEntsprechend",name:"gesamtfett"},
          {value: "mehr",id:"gesamtfettMehr",name:"gesamtfett"}
        ],
        GesättigteFettsäuren:[
          {title: "Gesättigte Fettsäuren", class:"paddingLeft"},
          {value: "weniger",id:"gesaettigteFettsaeurenWeniger",name:"gesaettigteFettsaeuren"},
          {value: "entsprechend der Ernährungsempfehlung",id:"gesaettigteFettsaeurenEntsprechend",name:"gesaettigteFettsaeuren"},
          {value: "mehr",id:"gesaettigteFettsaeurenMehr",name:"gesaettigteFettsaeuren"}
        ],
        EinfachUngesättigteFettsäuren:[
          {title: "Einfach ungesättigte Fettsäuren", class:"paddingLeft"},
          {value: "weniger",id:"einfachGesaettigteWeniger",name:"einfachGesaettigte"},
          {value: "entsprechend der Ernährungsempfehlung",id:"einfachGesaettigteEntsprechend",name:"einfachGesaettigte"},
          {value: "mehr",id:"einfachGesaettigteMehr",name:"einfachGesaettigte"}
        ],
        MehrfachUngesättigteFettsäuren:[
          {title: "Mehrfach ungesättigte Fettsäuren", class:"paddingLeft"},
          {value: "weniger",id:"mehrfachGesaettigteWeniger",name:"mehrfachGesaettigte"},
          {value: "entsprechend der Ernährungsempfehlung",id:"mehrfachGesaettigteEntsprechend",name:"mehrfachGesaettigte"},
          {value: "mehr",id:"mehrfachGesaettigteMehr",name:"mehrfachGesaettigte"}
        ],
        Cholesterin:[
          {title: "Cholesterin", class:"paddingLeft"},
          {value: "weniger",id:"cholesterinWeniger",name:"cholesterin"},
          {value: "entsprechend der Ernährungsempfehlung",id:"cholesterinEntsprechend",name:"cholesterin"},
          {value: "mehr",id:"cholesterinMehr",name:"cholesterin"}
        ],
      }
    },
    components: {
      RecallTable,
      TextareaForm,
      RadioForm,
      InputForm,
      CheckboxForm,
      RadioTable,
      RadioTableDynamic,
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
      },
      //https://stackoverflow.com/questions/42645964/vue-js-anchor-to-div-within-the-same-component
      scrollMeTo(refName) {
        var element = this.$refs[refName];
        element.scrollIntoView({behavior: 'smooth'});
      },
    }
};
</script>