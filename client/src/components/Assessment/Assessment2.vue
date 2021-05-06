<template>
    <div>
      <p class="assessmentAspekt">Upload-Bereich für Ernährungsprotokolle und weitere Ernährungserhebungsmethoden</p>
      <label class="mt-5">
        24-h-Recall
        <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
          <span class="tipptext">Um die Ernährungsgewohnheiten zu erheben, ist es empfehlenswert, zwei 24-h-Recalls durchzuführen - von einem Werk- und einem Wochenendtag</span>
        </div>
      </label>
      <DynamicTable v-model="myrecall"/>
      <p>{{recall}}</p>
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
              <th>Lebensmittel</th>
              <th>weniger</th>
              <th>entprechend der Ernährungsempfehlung</th>
              <th>mehr</th>
          </thead>
          <tbody>
              <tr>
                  <td>Lebensmittel</td>
                  <td>
                    <TableForm
                    :items="[{value:'zuwenig', id:'zuwenig', name:'getraenke'}]"
                    v-model="getraenke"
                    />
                  </td>
                  <td>
                    <TableForm
                    :items="[{value:'entsprechend', id:'entsprechend', name:'getraenke'}]"
                    v-model="getraenke"
                    />
                  </td>
                  <td>
                    <TableForm
                    :items="[{value:'zuviel', id:'zuviel', name:'getraenke'}]"
                    v-model="getraenke"
                    />
                  </td>
              </tr>
              <tr>
                  <td>Gemüse</td>
                  <td>
                    <TableForm
                    :items="[{value:'zuwenig', id:'zuwenig', name:'gemuese'}]"
                    v-model="gemuese"
                    />
                  </td>
                  <td>
                    <TableForm
                    :items="[{value:'entsprechend', id:'entsprechend', name:'gemuese'}]"
                    v-model="gemuese"
                    />
                  </td>
                  <td>
                    <TableForm
                    :items="[{value:'zuviel', id:'zuviel', name:'gemuese'}]"
                    v-model="gemuese"
                    />
                  </td>
              </tr>       
          </tbody>
      </table>
      <!--<input type="range" class="custom-range" min="0" max="2">-->
      
      <p class="assessmentAspekt">Upload-Bereich für weitere Dokumente in Ernährungsgewohnheiten (Diet History)</p>
    </div>
</template>

<script>
import {mapFields} from "vuex-map-fields";
import TableForm from "../TableForm.vue";
import DynamicTable from "../DynamicTable.vue";
import TextareaForm from "../TextareaForm.vue";
import RadioForm from "../RadioForm.vue";
import InputForm from "../InputForm.vue";
import CheckboxForm from "../CheckboxForm.vue";

export default {
    name: "assessment2",
    data() {
      return {
        isBilanzierung: false,
        myrecall: [],
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        }
      }
    },
    components: {
      TableForm,
      DynamicTable,
      TextareaForm,
      RadioForm,
      InputForm,
      CheckboxForm
    },  
    computed: {
      ...mapFields([
          "getraenke",
          "gemuese",
          "recall",
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
          "medikamenteJa"
      ]),
      recall() {
        return this.myrecall;
      }
    },
    methods: {
      showBilanzierung() {
        this.isBilanzierung = !this.isBilanzierung;
      }
    }
};
</script>