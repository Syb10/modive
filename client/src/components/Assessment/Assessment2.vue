<template>
    <div>
      <button @click.prevent="scrollMeTo('ernaehrungsprotokolle')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Upload-Bereich für Ernährungsprotokolle</button>
      <button @click.prevent="scrollMeTo('ernaehrungsgewohnheiten')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Essgewohnheiten</button>
      <button @click.prevent="scrollMeTo('kostformMedikamente')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Diätetische Kostform und Medikamente</button>
      <button @click.prevent="scrollMeTo('upload')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Upload-Bereich für weitere Dokumente</button>
      <p class="assessmentAspekt mt-5" ref="ernaehrungsprotokolle">Upload-Bereich für Ernährungsprotokolle und weitere Ernährungserhebungsmethoden</p>
      <UploadFile
        v-model="uploadErnahrungsprotokoll"
        :color ="'btn-gold'"
      />
      <p class="assessmentAspekt mt-5" ref="ernaehrungsgewohnheiten">Essgewohnheiten</p>
      <label>
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
      <div v-if="anzahlRecall > 0">
        <TextareaForm
          v-model="weitereGetraenke"
          :content="{ title: 'Weitere Getränke mit Mengenangaben', id: 'weitereGetraenke', color:'assessmentColor', border:'assessmentBorder'}"
        />
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
            :content="{ title: 'Wie viele Mahlzeiten werden normalerweise verzehrt?', id: 'MahlzeitenNormalerweise', type:'number', min:'0', color:'assessmentColor', border:'assessmentBorder' }"
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
      <TextareaForm
        v-model="weitereAnmerkungenRecall"
        :content="{ title: 'Weitere Anmerkungen zur durchgeführten Ernährungserhebungsmethode', id: 'weitereAnmerkungenRecall', color:'assessmentColor', border:'assessmentBorder'}"
      />
      
      <p @click.prevent="showBilanzierung">Geschätzte Bilanzierung nach Lebensmittelgruppen, Energie, Makro- und Mikronährstoffen <i v-if="isBilanzierung" class="fa fa-chevron-up"></i><i v-if="!isBilanzierung" class="fa fa-chevron-down"></i></p>
      <table v-if="isBilanzierung" class="table table-striped table-bordered">
        <thead>
          <th>Lebensmittelgruppen</th>
          <th>weniger</th>
          <th>entsprechend der Ernährungsempfehlung</th>
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
          <th>entsprechend der Ernährungsempfehlung</th>
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
          <th>Wasser</th>
          <th>weniger</th>
          <th>entsprechend der Ernährungsempfehlung</th>
          <th>mehr</th>
        </thead>
        <tbody>
          <RadioTable
            :items="Wasser"
            v-model="wasser"
          />
        </tbody>
      </table>
      <table  v-if="isBilanzierung" class="table table-striped table-bordered">
        <thead>
          <th>Makronährstoffe</th>
          <th>weniger</th>
          <th>entsprechend der Ernährungsempfehlung</th>
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
            :items="Zucker"
            v-model="zucker"
          />
          <RadioTable
            :items="Ballaststoffe"
            v-model="ballaststoffe"
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
            v-model="einfachUngesaettigte"
          />
          <RadioTable
            :items="MehrfachUngesättigteFettsäuren"
            v-model="mehrfachUngesaettigte"
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
          <th>entsprechend der Ernährungsempfehlung</th>
          <th>mehr</th>
        </thead>
        <tbody>
          <Vitamine/>
          <Mineralstoffe/>
        </tbody>
      </table>
      <TextareaForm
        class="mt-5"
        v-model="vorlieben"
        :content="{ title: 'Vorlieben für Lebensmittel, Speisen und Getränke', id: 'vorlieben', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <TextareaForm
        v-model="abneigungen"
        :content="{ title: 'Abneigungen gegen Lebensmittel, Speisen und Getränke', id: 'abneigungen', color:'assessmentColor', border:'assessmentBorder'}"
      />
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
            :content="{ title: 'Welche?', id: 'eigenstaendigeDiaetJa', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
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
          :content="{title: 'Wie häufig?, welche? und wo?', id: 'mahlzeitenAusserHausJa', color:'assessmentColor', border:'assessmentBorder'}"
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
      <p class="assessmentAspekt" ref="upload">Upload-Bereich für weitere Dokumente in Ernährungsgewohnheiten</p>
      <UploadFile
        v-model="uploadAssessment2"
        :color ="'btn-gold'"
      />
    </div>
</template>

<script>
import RecallTable from "../RecallTable.vue";
import TextareaForm from "../TextareaForm.vue";
import RadioForm from "../RadioForm.vue";
import InputForm from "../InputForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import RadioTable from "../RadioTable.vue";
import Vitamine from "../Vitamine.vue";
import Mineralstoffe from "../Mineralstoffe.vue";
import UploadFile from "../UploadFile.vue";

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
        isBilanzierung: false,
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
        Wasser:[
          {title: "Wasser (ml)"},
          {value: "weniger",id:"wasserWeniger",name:"wasser"},
          {value: "entsprechend der Ernährungsempfehlung",id:"wasserEntsprechend",name:"wasser"},
          {value: "mehr",id:"wasserMehr",name:"wasser"}
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
        Zucker:[
          {title: "Zucker", class:"paddingLeft"},
          {value: "weniger",id:"zuckerWeniger",name:"zucker"},
          {value: "entsprechend der Ernährungsempfehlung",id:"zuckerEntsprechend",name:"zucker"},
          {value: "mehr",id:"zuckerMehr",name:"zucker"}
        ],
        Ballaststoffe:[
          {title: "Ballaststoffe"},
          {value: "weniger",id:"ballaststoffeWeniger",name:"ballaststoffe"},
          {value: "entsprechend der Ernährungsempfehlung",id:"ballaststoffeEntsprechend",name:"ballaststoffe"},
          {value: "mehr",id:"ballaststoffeMehr",name:"ballaststoffe"}
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
      Vitamine,
      Mineralstoffe,
      UploadFile,
    },  
    computed: {
      uploadErnahrungsprotokoll:{
        get() {
          return this.$store.state.a2.uploadErnahrungsprotokoll
        },
        set(value) {
          this.$store.commit("a2/uploadErnahrungsprotokoll", value)
        }
      },
      anzahlRecall:{
        get() {
          return this.$store.state.a2.anzahlRecall
        },
        set(value) {
          this.$store.commit("a2/anzahlRecall", value)
        }
      },
      weitereGetraenke: {
        get() {
          return this.$store.state.a2.weitereGetraenke
        },
        set(value) {
          this.$store.commit("a2/weitereGetraenke", value)
        }
      },
      anzahlMahlzeitenRecall:{
        get() {
          return this.$store.state.a2.anzahlMahlzeitenRecall
        },
        set(value) {
          this.$store.commit("a2/anzahlMahlzeitenRecall", value)
        }
      },
      mahlzeitenNormalerweise:{
        get() {
          return this.$store.state.a2.mahlzeitenNormalerweise
        },
        set(value) {
          this.$store.commit("a2/mahlzeitenNormalerweise", value)
        }
      },
      mahlzeitenWeggelassen:{
        get() {
          return this.$store.state.a2.mahlzeitenWeggelassen
        },
        set(value) {
          this.$store.commit("a2/mahlzeitenWeggelassen", value)
        }
      },
      mahlzeitenZusaetzlich:{
        get() {
          return this.$store.state.a2.mahlzeitenZusaetzlich
        },
        set(value) {
          this.$store.commit("a2/mahlzeitenZusaetzlich", value)
        }
      },
      mahlzeitenZusaetzlichAndere:{
        get() {
          return this.$store.state.a2.mahlzeitenZusaetzlichAndere
        },
        set(value) {
          this.$store.commit("a2/mahlzeitenZusaetzlichAndere", value)
        }
      },
      weitereAnmerkungenRecall:{
        get() {
          return this.$store.state.a2.weitereAnmerkungenRecall
        },
        set(value) {
         this.$store.commit("a2/weitereAnmerkungenRecall", value)
        }
      },
      getraenke:{
        get() {
          return this.$store.state.a2.getraenke
        },
        set(value) {
          this.$store.commit("a2/getraenke", value)
        }
      },
      gemuese:{
        get() {
          return this.$store.state.a2.gemuese
        },
        set(value) {
          this.$store.commit("a2/gemuese", value)
        }
      },
      obst:{
        get() {
          return this.$store.state.a2.obst
        },
        set(value) {
          this.$store.commit("a2/obst", value)
        }
      },
      getreideprodukte:{
        get() {
          return this.$store.state.a2.getreideprodukte
        },
        set(value) {
          this.$store.commit("a2/getreideprodukte", value)
        }
      },
      milch:{
        get() {
         return this.$store.state.a2.milch
        },
        set(value) {
          this.$store.commit("a2/milch", value)
        }
      },
      fleisch:{
        get() {
         return this.$store.state.a2.fleisch
        },
        set(value) {
         this.$store.commit("a2/fleisch", value)
        }
      },
      fisch:{
        get() {
          return this.$store.state.a2.fisch
        },
        set(value) {
          this.$store.commit("a2/fisch", value)
        }
      },
      ei:{
        get() {
         return this.$store.state.a2.ei
        },
        set(value) {
          this.$store.commit("a2/ei", value)
        }
      },
      fette:{
        get() {
         return this.$store.state.a2.fette
        },
        set(value) {
         this.$store.commit("a2/fette", value)
        }
      },
      suessigkeiten:{
        get() {
          return this.$store.state.a2.suessigkeiten
        },
        set(value) {
          this.$store.commit("a2/suessigkeiten", value)
        }
      },
      pikanteSnacks:{
        get() {
          return this.$store.state.a2.pikanteSnacks
        },
        set(value) {
          this.$store.commit("a2/pikanteSnacks", value)
        }
      },
      energie:{
        get() {
         return this.$store.state.a2.energie
        },
        set(value) {
          this.$store.commit("a2/energie", value)
        }
      },
      wasser:{
        get() {
          return this.$store.state.a2.wasser
        },
        set(value) {
          this.$store.commit("a2/wasser", value)
        }
      },
      eiweiss:{
        get() {
          return this.$store.state.a2.eiweiss
        },
        set(value) {
          this.$store.commit("a2/eiweiss", value)
        }
      },
      kohlenhydrate:{
        get() {
          return this.$store.state.a2.kohlenhydrate
        },
        set(value) {
          this.$store.commit("a2/kohlenhydrate", value)
        }
      },
      zucker:{
        get() {
          return this.$store.state.a2.zucker
        },
        set(value) {
          this.$store.commit("a2/zucker", value)
        }
      },
      ballaststoffe:{
        get() {
          return this.$store.state.a2.ballaststoffe
        },
        set(value) {
         this.$store.commit("a2/ballaststoffe", value)
        }
      },
      gesamtfett:{
        get() {
          return this.$store.state.a2.gesamtfett
        },
        set(value) {
          this.$store.commit("a2/gesamtfett", value)
        }
      },
      gesaettigteFettsaeuren:{
        get() {
          return this.$store.state.a2.gesaettigteFettsaeuren
        },
        set(value) {
          this.$store.commit("a2/gesaettigteFettsaeuren", value)
        }
      },
      einfachUngesaettigte:{
        get() {
          return this.$store.state.a2.einfachUngesaettigte
        },
        set(value) {
          this.$store.commit("a2/einfachUngesaettigte", value)
        }
      },
      mehrfachUngesaettigte:{
        get() {
          return this.$store.state.a2.mehrfachUngesaettigte
        },
        set(value) {
          this.$store.commit("a2/mehrfachUngesaettigte", value)
        }
      },
      cholesterin:{
        get() {
         return this.$store.state.a2.cholesterin
        },
        set(value) {
         this.$store.commit("a2/cholesterin", value)
        }
      },
      vorlieben:{
        get() {
          return this.$store.state.a2.vorlieben
        },
        set(value) {
          this.$store.commit("a2/vorlieben", value)
        }
      },
      abneigungen:{
        get() {
          return this.$store.state.a2.abneigungen
        },
        set(value) {
          this.$store.commit("a2/abneigungen",value)
        }
      },
      eigenstaendigeDiaet:{
        get() {
          return this.$store.state.a2.eigenstaendigeDiaet
        },
        set(value) {
          this.$store.commit("a2/eigenstaendigeDiaet", value)
        }
      },
      eigenstaendigeDiaetJa:{
        get() {
          return this.$store.state.a2.eigenstaendigeDiaetJa
        },
        set(value) {
         this.$store.commit("a2/eigenstaendigeDiaetJa", value)
        }
      },
      mahlzeitenAusserHaus:{
        get() {
          return this.$store.state.a2.mahlzeitenAusserHaus
        },
        set(value) {
          this.$store.commit("a2/mahlzeitenAusserHaus", value)
        }
      },
      mahlzeitenAusserHausJa:{
        get() {
          return this.$store.state.a2.mahlzeitenAusserHausJa
        },
        set(value) {
          this.$store.commit("a2/mahlzeitenAusserHausJa", value)
        }
      },
      diaetischeKostform:{
        get() {
          return this.$store.state.a2.diaetischeKostform
        },
        set(value) {
         this.$store.commit("a2/diaetischeKostform", value)
        }
      },
      diaetischeKostformJa:{
        get() {
          return this.$store.state.a2.diaetischeKostformJa
        },
        set(value) {
          this.$store.commit("a2/diaetischeKostformJa", value)
        }
      },
      diaetischeKostformJaAndere:{
        get() {
          return this.$store.state.a2.diaetischeKostformJaAndere
        },
        set(value) {
          this.$store.commit("a2/diaetischeKostformJaAndere", value)
        }
      },
      enteraleErnaehrung:{
        get() {
          return this.$store.state.a2.enteraleErnaehrung
        },
        set(value) {
          this.$store.commit("a2/enteraleErnaehrung", value)
        }
      },
      enteraleErnaehrungJa:{
        get() {
          return this.$store.state.a2.enteraleErnaehrungJa
        },
        set(value) {
          this.$store.commit("a2/enteraleErnaehrungJa", value)
        }
      },
      medikamente:{
        get() {
          return this.$store.state.a2.medikamente
        },
        set(value) {
          this.$store.commit("a2/medikamente", value)
        }
      },
      medikamenteJa:{
        get() {
          return this.$store.state.a2.medikamenteJa
        },
        set(value) {
          this.$store.commit("a2/medikamenteJa", value)
        }
      },
      uploadAssessment2: {
        get() {
          return this.$store.state.a2.uploadAssessment2
        },
        set(value) {
          this.$store.commit("a2/uploadAssessment2", value)
        }
      }
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