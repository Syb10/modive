<template>
    <div>
      <button @click.prevent="scrollMeTo('zugangNahrungsmittel')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Ernährungsbezogene Versorgung</button>
      <button @click.prevent="scrollMeTo('wissen')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Ernährungswissen, Überzeugungen, Einstellungen</button>
      <button @click.prevent="scrollMeTo('verhalten')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Verhalten und Verhaltensänderungen</button>
      <button @click.prevent="scrollMeTo('aktivitaet')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Körperliche Aktivität</button>
      <button @click.prevent="scrollMeTo('lebensqualitaet')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Lebensqualität</button>
      <button @click.prevent="scrollMeTo('upload')" class="btn mt-1 mr-1 tab-button tab-button-assessment">Upload-Bereich für weitere Dokumente</button>
      <p class="assessmentAspekt mt-5" ref="zugangNahrungsmittel">Ernährungsbezogene Versorgung</p>
      <CheckboxForm
        :checkboxs="[
          {title:'gemeinschaftlich', id:'plantGemeinschaftlich'},
          {title:'eigenständig', id:'plantEigenstaendig'},
          {title:'(Ehe-)Partner*in', id:'plantPartner'},
          {title:'Familienmitglied', id:'plantFamilienmitglied'}
        ]"
        :title="'Wer plant die Mahlzeiten?'"
        :color ="'assessmentColor'"
        v-model="plantMahlzeiten"
      />
      <InputForm
        v-model="plantMahlzeitenAndere"
        :content="{ title: 'andere', id: 'plantMahlzeitenAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
        :style="marginSmall"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'gemeinschaftlich', id:'bereitetGemeinschaftlich'},
          {title:'eigenständig', id:'bereitetEigenstaendig',},
          {title:'(Ehe-)Partner*in', id:'bereitetPartner'},
          {title:'Familienmitglied', id:'bereitetFamilienmitglied',},
          {title:'Außer-Haus-Verpflegung', id:'bereitetAusserHaus'},
          {title:'Essen auf Rädern', id:'bereitetEssenAufRaedern'}
        ]"
        :title="'Wer bereitet die Mahlzeiten zu?'"
        :color ="'assessmentColor'"
        v-model="bereitetMahlzeiten"
      />
      <InputForm
        v-model="bereitetMahlzeitenAndere"
        :content="{ title: 'andere', id: 'bereitetMahlzeitenAndere', type:'text', color:'assessmentColor', border:'assessmentBorder'}"
        :style="marginSmall"
      />
      <TextareaForm
        v-model="weitereAnmerkungenMahlzeiten"
        :content="{ title: 'Weitere Anmerkungen zur Planung und Zubereitung von Mahlzeiten', id: 'weitereAnmerkungenMahlzeiten', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'gemeinschaftlich', id:'einkaufGemeinschaftlich'},
          {title:'eigenständig', id:'einkaufEigenstaendig'},
          {title:'(Ehe-)Partner*in', id:'einkaufPartner'},
          {title:'Familienmitglied', id:'einkaufFamilienmitglied'},
          {title:'Einkaufsservice', id:'einkaufEinkaufsservice'}
        ]"
        :title="'Wer tätigt den Lebensmitteleinkauf?'"
        :color ="'assessmentColor'"
        v-model="lebensmitteleinkauf"
      />
      <InputForm
        v-model="lebensmitteleinkaufAndere"
        :content="{ title: 'andere', id: 'lebensmitteleinkaufAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
        :style="marginSmall"
      />
      <RadioForm
        :items="[
          {title:'ja', id:'selbstversorgenJa', name:'selbstversorgen'},
          {title:'ja, aber eingeschränkt', id:'selbstversorgenJaAber', name:'selbstversorgen'},
          {title:'nein', id:'selbstversorgenNein', name:'selbstversorgen'},
        ]"
        :title="'Ist der/die Klient*in psychisch und physisch in der Lage, sich selbst zu versorgen?'"
        :color ="'assessmentColor'"
        v-model="selbstversorgen"
      />
      <div v-if="selbstversorgen == 'ja, aber eingeschränkt'">
        <InputForm
          v-model="selbstversorgenEingeschraenkt"
          :content="{ title: 'Welche Einschränkungen bestehen?', id: 'selbstversorgenEingeschraenkt', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
          :style="marginSmall"
        />
      </div>
      <div v-if="selbstversorgen == 'nein'">
        <InputForm
          v-model="selbstversorgenNein"
          :content="{ title: 'Warum nicht?', id: 'selbstversorgenNein', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
          :style="marginSmall"
        />
      </div>
      <p class="assessmentAspekt" ref="wissen">Ernährungswissen, Überzeugungen, Einstellungen</p>
      <p>Für wie einfach beurteilt der/die Klient*in es, an einem normalen Tag eine ausgewogene Mahlzeit zu Hause zuzubereiten?</p>
      <table class="table table-striped table-bordered mb-5">
        <thead>
          <th>sehr einfach</th>
          <th>einfach</th>
          <th>eher einfach</th>
          <th>eher schwer</th>
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
        :content="{ title: 'Begründung', id: 'begruendungMahlzeitZuzubereiten', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <CheckboxForm
        :checkboxs="[
          {title:'Internet', id:'internet'},
          {title:'Zeitschriften', id:'zeitschriften'},
          {title:'Fernsehen', id:'fernsehen'},
          {title:'Volkshochschule', id:'volkshochschule'},
          {title:'Schule', id:'schule'},
          {title:'nirgendwo', id:'nirgendwo'}
        ]"
        :title="'Wo informiert sich der/die Klient*in über Ernährung?'"
        :color ="'assessmentColor'"
        v-model="informationErnaehrung"
      />
      <InputForm
        v-model="informationErnaehrungAndere"
        :content="{ title: 'andere', id: 'informationErnaehrungAndere', type:'text', color:'assessmentColor', border:'assessmentBorder' }"
        :style="marginSmall"
      />
      <TextareaForm
        v-model="weitereAnmerkungenInformationsquellen"
        :content="{ title: 'Weitere Anmerkungen zu den Informationsquellen über Ernährung', id: 'weitereAnmerkungenInformationsquellen', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <TextareaForm
        v-model="orientierungErnaehrung"
        :content="{ title: 'An welchen Empfehlungen orientiert sich der/die Klient*in bei seiner/ihrer Ernährung?', id: 'orientierungErnaehrung', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <p>Wie wichtig ist es dem/der Klient*in, diesen Empfehlungen zu folgen?</p>
      <table class="table table-striped table-bordered mb-5">
        <thead>
          <th>sehr wichtig</th>
          <th>wichtig</th>
          <th>eher wichtig</th>
          <th>eher unwichtig</th>
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
          <th>eher wichtig</th>
          <th>eher unwichtig</th>
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
              <span class="tipptext">Er/sie denkt nicht daran, seine/ihre Ernährungsgewohnheiten in den nächsten Monaten zu verändern.</span>
            </div>
          </th>
          <th>
            Absichtsbildung
            <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
              <span class="tipptext">Er/sie denkt darüber nach, seine/ihre Ernährungsgewohnheiten in den nächsten Monaten zu verändern.</span>
            </div>
          </th>
          <th>
            Vorbereitung
            <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
              <span class="tipptext">Er/sie plant, in den nächsten 30 Tagen seine/ihre Ernährungsgewohnheiten zu verändern.</span>
            </div>
          </th>
          <th>
            Handlung
            <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
              <span class="tipptext">Er/sie hat seine/ihre Ernährungsgewohnheiten seit weniger als sechs Monaten verändert.</span>
            </div>
          </th>
          <th>
            Aufrechterhaltung
            <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
              <span class="tipptext aufrechterhaltung">Er/sie behält seine/ihre veränderten Ernährungsgewohnheiten seit mehr als sechs Monaten bei.</span>
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
        :content="{ title: 'Begründung', id: 'begruendungErnaehrungsgewohnheitenVeraendern', color:'assessmentColor', border:'assessmentBorder'}"
      />
      <p class="assessmentAspekt" ref="aktivitaet">Körperliche Aktivität</p>
      <RadioForm
        :items="[
          {titlekurz:'1,2-1,3', title:'1,2-1,3 ausschließlich sitzende oder liegende Tätigkeiten', myInnerTipp:'ausschließlich sitzende oder liegende Tätigkeiten (z.B. gebrechliche, immobile, bettlägerige Menschen)', id:'1physicalActivityLevel', name:'physicalActivityLevel'},
          {titlekurz:'1,4-1,5', title:'1,4-1,5 ausschließlich sitzende Tätigkeit mit wenig oder keiner anstrengenden Freizeitaktivität', myInnerTipp:'ausschließlich sitzende Tätigkeit mit wenig oder keiner anstrengenden Freizeitaktivität (z.B. Büroangestellte, Feinmechaniker*innen)', id:'2physicalActivityLevel', name:'physicalActivityLevel'},
          {titlekurz:'1,6-1,7', title:'1,6-1,7 sitzende Tätigkeit, zeitweilig auch zusätzlicher Energieaufwand für gehende und stehende Tätigkeiten, wenig oder keine anstrengende Freizeitaktivität', myInnerTipp:'sitzende Tätigkeit, zeitweilig auch zusätzlicher Energieaufwand für gehende und stehende Tätigkeiten, wenig oder keine anstrengende Freizeitaktivität (z.B. Laborant*innen, Studierende, Fließbandarbeiter*innen)', id:'3physicalActivityLevel', name:'physicalActivityLevel'},
          {titlekurz:'1,8-1,9', title:'1,8-1,9 überwiegend gehende und stehende Arbeit', myInnerTipp:'überwiegend gehende und stehende Arbeit (z.B. Verkäufer*innen, Kellner*innen, Mechaniker*innen, Handwerker*innen)', id:'4physicalActivityLevel', name:'physicalActivityLevel'},
          {titlekurz:'2,0-2,4', title:'2,0-2,4 körperlich anstrengende berufliche Arbeit oder sehr aktive Freizeittätigkeit', myInnerTipp:'körperlich anstrengende berufliche Arbeit oder sehr aktive Freizeittätigkeit (z.B. Bauarbeiter*innen, Landwirt*innen, Waldarbeiter*innen, Bergarbeiter*innen, Leistungssportler*innen)', id:'5physicalActivityLevel', name:'physicalActivityLevel'},
        ]"
        :title="'Physical Activity Level (PAL)'"
        :color ="'assessmentColor'"
        v-model="physicalActivityLevel"
        :isInnerTipp="true"
      />
      <TextareaForm
        v-model="weitereAnmerkungenAktivitaet"
        :content="{ title: 'Weitere Anmerkungen zur körperlichen Aktivität', id: 'weitereAnmerkungenAktivitaet', color:'assessmentColor', border:'assessmentBorder'}"
        :isTipp="true"
        :myTipp="'Alltagsaktivität und Sport inklusive Dauer und Häufigkeit'"
      />
      <p class="assessmentAspekt" ref="lebensqualitaet">Lebensqualität</p>
      <label>
        WHO Wellbeing Index
        <div class="tipp ml-3"> <i class="fa fa-info-circle"></i>
          <span class="tipptext">Der Fragebogen zum WHO Wellbeing Index kann auch durch den/die Klient*in ausgefüllt und im Upload-Bereich hochgeladen werden.</span>
        </div>
      </label>
      <table class="table table-striped table-bordered">
        <thead>
          <th>In den letzten zwei Wochen...</th>
          <th>die ganze Zeit</th>
          <th>meistens</th>
          <th>etwas mehr als die Hälfte der Zeit</th>
          <th>etwas weniger als die Hälfte der Zeit</th>
          <th>ab und zu</th>
          <th>zu keinem Zeitpunkt</th>
        </thead>
        <tbody>
          <RadioTable
            :items="laune"
            v-model="whoLaune"
          />
          <RadioTable
            :items="ruhig"
            v-model="whoRuhig"
          />
          <RadioTable
            :items="aktiv"
            v-model="whoAktiv"
          />
          <RadioTable
            :items="ausgeruht"
            v-model="whoAusgeruht"
          />
          <RadioTable
            :items="interessieren"
            v-model="whoInteressieren"
          />
        </tbody>
      </table>
      <p><b>Lebensqualität: {{whoWert}} Punkte ({{whoProzent}}%) <i class="fa fa-arrow-right"></i> {{whoAuswertung}}</b></p> 
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
          {value:"eher einfach", id:"eherEinfachMahlzeitZuzubereiten", name:"mahlzeitZuzubereiten"},
          {value:"eher schwer", id:"eherSchwerMahlzeitZuzubereiten", name:"mahlzeitZuzubereiten"},
          {value:"schwer", id:"schwerMahlzeitZuzubereiten", name:"mahlzeitZuzubereiten"},
          {value:"sehr schwer", id:"sehrSchwerMahlzeitZuzubereiten", name:"mahlzeitZuzubereiten"},
        ],
        empfehlung:[
          {value:"sehr wichtig", id:"sehrWichtigEmpfehlung", name:"empfehlung"},
          {value:"wichtig", id:"wichtigEmpfehlung", name:"empfehlung"},
          {value:"eher wichtig", id:"eherWichtigEmpfehlung", name:"empfehlung"},
          {value:"eher unwichtig", id:"eherUnwichtigEmpfehlung", name:"empfehlung"},
          {value:"unwichtig", id:"unwichtigEmpfehlung", name:"empfehlung"},
          {value:"sehr unwichtig", id:"sehrUnwichtigEmpfehlung", name:"empfehlung"},
        ],
        frische:[
          {title:"...Frische"},
          {value:"sehr wichtig", id:"sehrWichtigFrische", name:"frische"},
          {value:"wichtig", id:"wichtigFrische", name:"frische"},
          {value:"eher wichtig", id:"eherWichtigFrische", name:"frische"},
          {value:"eher unwichtig", id:"eherUnwichtigFrische", name:"frische"},
          {value:"unwichtig", id:"unwichtigFrische", name:"frische"},
          {value:"sehr unwichtig", id:"sehrUnwichtigFrische", name:"frische"},
        ],
        geschmack: [
          {title:"...Geschmack"},
          {value:"sehr wichtig", id:"sehrWichtigGeschmack", name:"geschmack"},
          {value:"wichtig", id:"wichtigGeschmack", name:"geschmack"},
          {value:"eher wichtig", id:"eherWichtigGeschmack", name:"geschmack"},
          {value:"eher unwichtig", id:"eherUnwichtigGeschmack", name:"geschmack"},
          {value:"unwichtig", id:"unwichtigGeschmack", name:"geschmack"},
          {value:"sehr unwichtig", id:"sehrUnwichtigGeschmack", name:"geschmack"},
        ],
        gesundheit:[
          {title:"...Gesundheit"},
          {value:"sehr wichtig", id:"sehrWichtigGesundheit", name:"gesundheit"},
          {value:"wichtig", id:"wichtigGesundheit", name:"gesundheit"},
          {value:"eher wichtig", id:"eherWichtigGesundheit", name:"gesundheit"},
          {value:"eher unwichtig", id:"eherUnwichtigGesundheit", name:"gesundheit"},
          {value:"unwichtig", id:"unwichtigGesundheit", name:"gesundheit"},
          {value:"sehr unwichtig", id:"sehrUnwichtigGesundheit", name:"gesundheit"},
        ],
        preis:[
          {title:"...Preis"},
          {value:"sehr wichtig", id:"sehrWichtigPreis", name:"preis"},
          {value:"wichtig", id:"wichtigPreis", name:"preis"},
          {value:"eher wichtig", id:"eherWichtigPreis", name:"preis"},
          {value:"eher unwichtig", id:"eherUnwichtigPreis", name:"preis"},
          {value:"unwichtig", id:"unwichtigPreis", name:"preis"},
          {value:"sehr unwichtig", id:"sehrUnwichtigPreis", name:"preis"},
        ],
        regionalitaet:[
          {title:"...Regionalität"},
          {value:"sehr wichtig", id:"sehrWichtigRegionalitaet", name:"regionalitaet"},
          {value:"wichtig", id:"wichtigRegionalitaet", name:"regionalitaet"},
          {value:"eher wichtig", id:"eherWichtigRegionalitaet", name:"regionalitaet"},
          {value:"eher unwichtig", id:"eherUnwichtigRegionalitaet", name:"regionalitaet"},
          {value:"unwichtig", id:"unwichtigRegionalitaet", name:"regionalitaet"},
          {value:"sehr unwichtig", id:"sehrUnwichtigRegionalitaet", name:"regionalitaet"},
        ],
        saisonalitaet:[
          {title:"...Saisonalität"},
          {value:"sehr wichtig", id:"sehrWichtigSaisonalitaet", name:"saisonalitaet"},
          {value:"wichtig", id:"wichtigSaisonalitaet", name:"saisonalitaet"},
          {value:"eher wichtig", id:"eherWichtigSaisonalitaet", name:"saisonalitaet"},
          {value:"eher unwichtig", id:"eherUnwichtigSaisonalitaet", name:"saisonalitaet"},
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
        laune:[
          {title:"...war der/die Klient*in froh und guter Laune."},
          {value:5, id:"5Laune", name:"laune"},
          {value:4, id:"4Laune", name:"laune"},
          {value:3, id:"3Laune", name:"laune"},
          {value:2, id:"2Laune", name:"laune"},
          {value:1, id:"1Laune", name:"laune"},
          {value:10, id:"0Laune", name:"laune"},
        ],
        ruhig:[
          {title:"...hat sich der/die Klient*in ruhig und entspannt gefühlt."},
          {value:5, id:"5Ruhig", name:"ruhig"},
          {value:4, id:"4Ruhig", name:"ruhig"},
          {value:3, id:"3Ruhig", name:"ruhig"},
          {value:2, id:"2Ruhig", name:"ruhig"},
          {value:1, id:"1Ruhig", name:"ruhig"},
          {value:10, id:"0Ruhig", name:"ruhig"},
        ],
        aktiv:[
          {title:"...hat sich der/die Klient*in energisch und aktiv gefühlt."},
          {value:5, id:"5Aktiv", name:"aktiv"},
          {value:4, id:"4Aktiv", name:"aktiv"},
          {value:3, id:"3Aktiv", name:"aktiv"},
          {value:2, id:"2Aktiv", name:"aktiv"},
          {value:1, id:"1Aktiv", name:"aktiv"},
          {value:10, id:"0Aktiv", name:"aktiv"},
        ],
        ausgeruht:[
          {title:"...hat sich der/die Klient*in beim Aufwachen frisch und ausgeruht gefühlt."},
          {value:5, id:"5Ausgeruht", name:"ausgeruht"},
          {value:4, id:"4Ausgeruht", name:"ausgeruht"},
          {value:3, id:"3Ausgeruht", name:"ausgeruht"},
          {value:2, id:"2Ausgeruht", name:"ausgeruht"},
          {value:1, id:"1Ausgeruht", name:"ausgeruht"},
          {value:10, id:"0Ausgeruht", name:"ausgeruht"},
        ],
        interessieren:[
          {title:"...war der Alltag des/der Klient*in voller Dinge, die er/sie interessieren."},
          {value:5, id:"5Interessieren", name:"interessieren"},
          {value:4, id:"4Interessieren", name:"interessieren"},
          {value:3, id:"3Interessieren", name:"interessieren"},
          {value:2, id:"2Interessieren", name:"interessieren"},
          {value:1, id:"1Interessieren", name:"interessieren"},
          {value:10, id:"0Interessieren", name:"interessieren"},
        ],
      }
    },
    computed: {
      ...mapFields([
        "plantMahlzeiten",
        "plantMahlzeitenAndere",
        "bereitetMahlzeiten",
        "bereitetMahlzeitenAndere",
        "weitereAnmerkungenMahlzeiten",
        "lebensmitteleinkauf",
        "lebensmitteleinkaufAndere",
        "selbstversorgen",
        "selbstversorgenEingeschraenkt",
        "selbstversorgenNein",
        "einfachheitMahlzeitZuzubereiten",
        "begruendungMahlzeitZuzubereiten",
        "informationErnaehrung",
        "informationErnaehrungAndere",
        "weitereAnmerkungenInformationsquellen",
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
        "whoLaune",
        "whoRuhig",
        "whoAktiv",
        "whoAusgeruht",
        "whoInteressieren",
      ]),
      whoWert() {
        var value = 0;
         if(this.whoLaune) value += this.whoLaune == 10 ? 0 : this.whoLaune
         if(this.whoRuhig) value += this.whoRuhig == 10 ? 0: this.whoRuhig
         if(this.whoAktiv) value += this.whoAktiv == 10 ? 0: this.whoAktiv
         if(this.whoAusgeruht) value += this.whoAusgeruht == 10 ? 0: this.whoAusgeruht
         if(this.whoInteressieren) value += this.whoInteressieren == 10 ? 0: this.whoInteressieren
        return value
      },
      whoProzent() {
        return this.whoWert*4
      },
      whoAuswertung() {
        var value=""
        if(this.whoWert < 7) value = "Das Vorhandensein einer klinischen Depression ist sehr wahrscheinlich"
        if(this.whoWert >= 7 && this.whoWert < 10) value = "deutlich eingeschränktes Wohlbefinden"
        if(this.whoWert >= 10 && this.whoWert < 13) value = "Hinweis auf ein reduziertes Wohlbefinden"
        if(this.whoWert >=13 && this.whoWert < 19) value = "ein insgesamt zufriedenstellendes Wohlbefinden"
        if(this.whoWert >= 19) value = "ein sehr gutes Wohlbefinden"
        return value
      },
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