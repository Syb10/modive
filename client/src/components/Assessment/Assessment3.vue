<template>
    <div>
      <button @click.prevent="scrollMeTo('zugangNahrungsmittel')" class="btn mt-1 mr-1 tab-button">Ernährungsbezogene Versorgung</button>
      <button @click.prevent="scrollMeTo('wissen')" class="btn mt-1 mr-1 tab-button">Ernährungswissen, Überzeugungen, Einstellungen</button>
      <button @click.prevent="scrollMeTo('verhalten')" class="btn mt-1 mr-1 tab-button">Verhalten und Verhaltensänderungen</button>
      <button @click.prevent="scrollMeTo('aktivitaet')" class="btn mt-1 mr-1 tab-button">Körperliche Aktivität</button>
      <button @click.prevent="scrollMeTo('lebensqualitaet')" class="btn mt-1 mr-1 tab-button">Lebensqualität</button>
      <button @click.prevent="scrollMeTo('upload')" class="btn mt-1 mr-1 tab-button">Upload-Bereich für weitere Dokumente</button>
      <p class="assessmentAspekt mt-5" ref="zugangNahrungsmittel">Ernährungsbezogene Versorgung</p>
      <CheckboxForm
        :checkboxs="[
          {title:'gemeinschaftlich', id:'plantGemeinschaftlich'},
          {title:'eigenstängig', id:'plantEigenstaengig'},
          {title:'(Ehe-)Partner*in', id:'plantPartner'},
          {title:'Familienmitglied', id:'plantFamilienmitglied'}
        ]"
        :title="'Wer plant die Mahlzeiten?'"
        v-model="plantMahlzeiten"
      />
      <InputForm
        v-model="plantMahlzeitenAndere"
        :content="{ title: 'andere', id: 'plantMahlzeitenAndere', type:'text' }"
        :style="marginSmall"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'gemeinschaftlich', id:'bereitetGemeinschaftlich'},
          {title:'eigenstängig', id:'bereitetEigenstaengig',},
          {title:'(Ehe-)Partner*in', id:'bereitetPartner'},
          {title:'Familienmitglied', id:'bereitetFamilienmitglied',},
          {title:'Außer-Haus-Verpflegung', id:'bereitetAusserHaus'},
          {title:'Essen auf Rädern', id:'bereitetEssenAufRaedern'}
        ]"
        :title="'Wer bereitet die Mahlzeiten zu?'"
        v-model="bereitetMahlzeiten"
      />
      <InputForm
        v-model="bereitetMahlzeitenAndere"
        :content="{ title: 'andere', id: 'bereitetMahlzeitenAndere', type:'text' }"
        :style="marginSmall"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'gemeinschaftlich', id:'einkaufGemeinschaftlich'},
          {title:'eigenstängig', id:'einkaufEigenstaengig'},
          {title:'(Ehe-)Partner*in', id:'einkaufPartner'},
          {title:'Familienmitglied', id:'einkaufFamilienmitglied'},
          {title:'Einkaufsservice', id:'einkaufEinkaufsservice'}
        ]"
        :title="'Wer tätigt den Lebensmitteleinkauf?'"
        v-model="lebensmitteleinkauf"
      />
      <InputForm
        v-model="lebensmitteleinkaufAndere"
        :content="{ title: 'andere', id: 'lebensmitteleinkaufAndere', type:'text' }"
        :style="marginSmall"
      />
      <RadioForm
        :items="[
          {title:'ja', id:'selbstversorgenJa', name:'selbstversorgen'},
          {title:'ja, aber eingeschränkt', id:'selbstversorgenJaAber', name:'selbstversorgen'},
          {title:'nein', id:'selbstversorgenNein', name:'selbstversorgen'},
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
      <p class="assessmentAspekt" ref="wissen">Ernährungswissen, Überzeugungen, Einstellungen</p>
      <p>Für wie einfach beurteilt der/die Klient*in es, an einem normalen Tag eine ausgewogene Mahlzeit zu Hause zuzubereiten?</p>
      <table class="table table-striped table-bordered mb-5">
        <thead>
          <th>sehr einfach</th>
          <th>einfach</th>
          <th>schwer</th>
          <th>sehr schwer</th>
        </thead>
        <tbody>
          <RadioTable
            :items="mahlzeitZuzubereiten"
            v-model="einfachheitMahlzeitZuzubereiten"
          />
        </tbody>
      </table>
      <TextareaForm
        v-model="begruendungMahlzeitZuzubereiten"
        :content="{ title: 'Begründung', id: 'begruendungMahlzeitZuzubereiten',}"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'Internet', id:'internet'},
          {title:'Zeitschriften', id:'zeitschriften'},
          {title:'Volkshochschule', id:'volkshochschule'},
          {title:'Schule', id:'schule'}
        ]"
        :title="'Wo informiert sich der/die Klient*in über Ernährung?'"
        v-model="informationErnaehrung"
      />
      <InputForm
        v-model="informationErnaehrungAndere"
        :content="{ title: 'andere', id: 'informationErnaehrungAndere', type:'text' }"
        :style="marginSmall"
      />
      <TextareaForm
        v-model="orientierungErnaehrung"
        :content="{ title: 'Woran orientiert sich der/die Klient*in bei seiner/ihrer Ernährung?', id: 'orientierungErnaehrung',}"
      />
      <p>Wie wichtig ist es dem/der Klient*in, diesen Empfehlungen zu folgen?</p>
      <table class="table table-striped table-bordered mb-5">
        <thead>
          <th>sehr wichtig</th>
          <th>wichtig</th>
          <th>unwichtig</th>
          <th>sehr unwichtig</th>
        </thead>
        <tbody>
          <RadioTable
            :items="empfehlung"
            v-model="wichtigkeitDerEmpfehlung"
          />
        </tbody>
      </table>
      <p>Wie wichtig sind dem/der Klient*in die folgenden Punkte beim Lebensmitteleinkauf? Für...</p>
      <table class="table table-striped table-bordered mb-5">
        <thead>
          <th>Für...</th>
          <th>sehr wichtig</th>
          <th>wichtig</th>
          <th>unwichtig</th>
          <th>sehr unwichtig</th>
        </thead>
        <tbody>
          <RadioTable
            :items="frische"
            v-model="wichtigkeitDerFrische"
          />
          <RadioTable
            :items="geschmack"
            v-model="wichtigkeitDesGeschmacks"
          />
          <RadioTable
            :items="gesundheit"
            v-model="wichtigkeitDerGesundheit"
          />
          <RadioTable
            :items="preis"
            v-model="wichtigkeitEinesGeringenPreises"
          />
          <RadioTable
            :items="regionalitaet"
            v-model="wichtigkeitDerRegionalitaet"
          />
          <RadioTable
            :items="saisonalitaet"
            v-model="wichtigkeitDerSaisonalitaet"
          />
          <RadioTableDynamic
            :subtitle="'...andere'"
            v-model="wichtigkeitAndere"
            :isAndere="true"
          /> 
        </tbody>
      </table>
      <p class="assessmentAspekt" ref="verhalten">Verhalten und Verhaltensänderungen</p>
      <p>Kann sich der/die Klient*in vorstellen, begleitet durch die gemeinsamen Treffen, die Ernährungsgewohnheiten zu verändern?</p>
      <table class="table table-striped table-bordered mb-5">
        <thead>
          <th>
            Absichtslosigkeit
            <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
              <span class="tipptext">Er/sie denkt nicht daran, seine/ihre Ernährungsgewohnheiten zu verändern.</span>
            </div>
          </th>
          <th>
            Absichtsbildung
            <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
              <span class="tipptext">Er/sie denkt darüber nach, seine/ihre Ernährungsgewohnheiten zu verändern.</span>
            </div>
          </th>
          <th>
            Vorbereitung
            <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
              <span class="tipptext">Er/sie plant, in den nächsten 6 Monaten seine/ihre Ernährungsgewohnheiten zu verändern.</span>
            </div>
          </th>
          <th>
            Handlung
            <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
              <span class="tipptext">Er/sie plant definitiv im nächsten Monat seine/ihre Ernährungsgewohnheiten zu verändern.</span>
            </div>
          </th>
          <th>
            Aufrechterhaltung
            <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
              <span class="tipptext aufrechterhaltung">Er/sie hat seine/ihre Ernährungsgewohnheiten bereits verändert.</span>
            </div>
          </th>         
        </thead>
        <tbody>
          <RadioTable
            :items="veraendern"
            v-model="ernaehrungsgewohnheitenVeraendern"
          />
        </tbody>
      </table>
      <TextareaForm
        v-model="begruendungErnaehrungsgewohnheitenVeraendern"
        :content="{ title: 'Begründung', id: 'begruendungErnaehrungsgewohnheitenVeraendern',}"
      />
      <p class="assessmentAspekt" ref="aktivitaet">Körperliche Aktivität</p>
      <RadioForm
        :items="[
          {title:'1,2-1,3', myInnerTipp:'ausschließlich sitzende oder liegende Tätigkeiten (z.B. gebrechliche, immobile, bettlägerige Menschen)', id:'1physicalActivityLevel', name:'physicalActivityLevel'},
          {title:'1,4-1,5', myInnerTipp:'ausschließlich sitzende Tätigkeit mit wenig oder keiner anstrengenden Freizeitaktivität (z.B. Büroangestellte, Feinmechaniker*innen)', id:'2physicalActivityLevel', name:'physicalActivityLevel'},
          {title:'1,6-1,7', myInnerTipp:'sitzende Tätigkeit, zeitweilig auch zusätzlicher Energieaufwand für gehende und stehende Tätigkeiten, wenig oder keine anstrengende Freizeitaktivität (z.B. Laborant*innen, Studierende, Fließbandarbeiter*innen)', id:'3physicalActivityLevel', name:'physicalActivityLevel'},
          {title:'1,8-1,9', myInnerTipp:'überwiegend gehende und stehende Arbeit (z.B. Verkäufer*innen, Kellner*innen, Mechaniker*innen, Handwerker*innen)', id:'4physicalActivityLevel', name:'physicalActivityLevel'},
          {title:'2,0-2,4', myInnerTipp:'körperlich anstrengende berufliche Arbeit oder sehr aktive Freizeittätigkeit (z.B. Bauarbeiter*innen, Landwirt*innen, Waldarbeiter*innen, Bergarbeiter*innen, Leistungssportler*innen)', id:'5physicalActivityLevel', name:'physicalActivityLevel'},
        ]"
        :title="'Physical Activity Level (PAL)'"
        v-model="physicalActivityLevel"
        :isInnerTipp="true"
      />
      <TextareaForm
        v-model="weitereAnmerkungenAktivitaet"
        :content="{ title: 'Weitere Anmerkungen zur körperlichen Aktivität', id: 'weitereAnmerkungenAktivitaet',}"
        :isTipp="true"
        :myTipp="'Alltagsaktivität und Sport inklusive Dauer und Häufigkeit'"
      />
      <p class="assessmentAspekt" ref="lebensqualitaet">Lebensqualität</p>
      <p>Upload-Bereich</p>
      <p class="assessmentAspekt" ref="upload">Upload-Bereich für weitere Dokumente in Verhalten und Umfeld (Behavioral-Environmental)</p>
    </div>
</template>

<script>
import RadioForm from "../RadioForm.vue";
import CheckboxForm from "../CheckboxForm.vue";
import InputForm from "../InputForm.vue";
import TextareaForm from "../TextareaForm.vue";
import RadioTable from "../RadioTable.vue";
import RadioTableDynamic from "../RadioTableDynamic.vue";
import {mapFields} from "vuex-map-fields";
export default {
    name: "assessment3",
    components: {
      RadioForm,
      CheckboxForm,
      InputForm,
      TextareaForm,
      RadioTable,
      RadioTableDynamic,
    },
    data() {
      return {
        marginSmall: {
          margin: '-2rem 0 0 0',
        },
        marginSmaller: {
          margin: '-1rem 0 0 0',
        },
        mahlzeitZuzubereiten:[
          {value:"sehr einfach", id:"sehrEinfachMahlzeitZuzubereiten", name:"mahlzeitZuzubereiten"},
          {value:"einfach", id:"einfachMahlzeitZuzubereiten", name:"mahlzeitZuzubereiten"},
          {value:"schwer", id:"schwerMahlzeitZuzubereiten", name:"mahlzeitZuzubereiten"},
          {value:"sehr schwer", id:"sehrSchwerMahlzeitZuzubereiten", name:"mahlzeitZuzubereiten"},
        ],
        empfehlung:[
          {value:"sehr wichtig", id:"sehrWichtigEmpfehlung", name:"empfehlung"},
          {value:"wichtig", id:"wichtigEmpfehlung", name:"empfehlung"},
          {value:"unwichtig", id:"unwichtigEmpfehlung", name:"empfehlung"},
          {value:"sehr unwichtig", id:"sehrUnwichtigEmpfehlung", name:"empfehlung"},
        ],
        frische:[
          {title:"...Frische"},
          {value:"sehr wichtig", id:"sehrWichtigFrische", name:"frische"},
          {value:"wichtig", id:"wichtigFrische", name:"frische"},
          {value:"unwichtig", id:"unwichtigFrische", name:"frische"},
          {value:"sehr unwichtig", id:"sehrUnwichtigFrische", name:"frische"},
        ],
        geschmack: [
          {title:"...Geschmack"},
          {value:"sehr wichtig", id:"sehrWichtigGeschmack", name:"geschmack"},
          {value:"wichtig", id:"wichtigGeschmack", name:"geschmack"},
          {value:"unwichtig", id:"unwichtigGeschmack", name:"geschmack"},
          {value:"sehr unwichtig", id:"sehrUnwichtigGeschmack", name:"geschmack"},
        ],
        gesundheit:[
          {title:"...Gesundheit"},
          {value:"sehr wichtig", id:"sehrWichtigGesundheit", name:"gesundheit"},
          {value:"wichtig", id:"wichtigGesundheit", name:"gesundheit"},
          {value:"unwichtig", id:"unwichtigGesundheit", name:"gesundheit"},
          {value:"sehr unwichtig", id:"sehrUnwichtigGesundheit", name:"gesundheit"},
        ],
        preis:[
          {title:"...Preis"},
          {value:"sehr wichtig", id:"sehrWichtigPreis", name:"preis"},
          {value:"wichtig", id:"wichtigPreis", name:"preis"},
          {value:"unwichtig", id:"unwichtigPreis", name:"preis"},
          {value:"sehr unwichtig", id:"sehrUnwichtigPreis", name:"preis"},
        ],
        regionalitaet:[
          {title:"...Regionalität"},
          {value:"sehr wichtig", id:"sehrWichtigRegionalitaet", name:"regionalitaet"},
          {value:"wichtig", id:"wichtigRegionalitaet", name:"regionalitaet"},
          {value:"unwichtig", id:"unwichtigRegionalitaet", name:"regionalitaet"},
          {value:"sehr unwichtig", id:"sehrUnwichtigRegionalitaet", name:"regionalitaet"},
        ],
        saisonalitaet:[
          {title:"...Saisonalität"},
          {value:"sehr wichtig", id:"sehrWichtigSaisonalitaet", name:"saisonalitaet"},
          {value:"wichtig", id:"wichtigSaisonalitaet", name:"saisonalitaet"},
          {value:"unwichtig", id:"unwichtigSaisonalitaet", name:"saisonalitaet"},
          {value:"sehr unwichtig", id:"sehrUnwichtigSaisonalitaet", name:"saisonalitaet"},
        ],
        veraendern:[
          {value:"Absichtslosigkeit", id:"absichtslosigkeit", name:"veraendern"},
          {value:"Absichtsbildung", id:"absichtsbildung", name:"veraendern"},
          {value:"Vorbereitung", id:"vorbereitung", name:"veraendern"},
          {value:"Handlung", id:"handlung", name:"veraendern"},
          {value:"Aufrechterhaltung", id:"aufrechterhaltung", name:"veraendern"},
        ],
      }
    },
    computed: {
      ...mapFields([
        "plantMahlzeiten",
        "plantMahlzeitenAndere",
        "bereitetMahlzeiten",
        "bereitetMahlzeitenAndere",
        "lebensmitteleinkauf",
        "lebensmitteleinkaufAndere",
        "selbstversorgen",
        "selbstversorgenEingeschraenkt",
        "selbstversorgenNein",
        "einfachheitMahlzeitZuzubereiten",
        "begruendungMahlzeitZuzubereiten",
        "informationErnaehrung",
        "informationErnaehrungAndere",
        "orientierungErnaehrung",
        "wichtigkeitDerEmpfehlung",
        "wichtigkeitDerFrische",
        "wichtigkeitDesGeschmacks",
        "wichtigkeitDerGesundheit",
        "wichtigkeitEinesGeringenPreises",
        "wichtigkeitDerRegionalitaet",
        "wichtigkeitDerSaisonalitaet",
        "wichtigkeitAndere",
        "wichtigkeitAndereValue",
        "ernaehrungsgewohnheitenVeraendern",
        "begruendungErnaehrungsgewohnheitenVeraendern",
        "physicalActivityLevel",
        "weitereAnmerkungenAktivitaet",
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