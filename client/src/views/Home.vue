<template>
  <div class="home">
    <form>
      <div>
        <div class="stickyoben">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="btn mb-5"
            :id="tab.id"
            :class="['tab-button', {active:currentTab === tab.id}]"
            @click.prevent="currentTab = tab.id"
          >
            {{tab.name}}
          </button>
        </div>
        <keep-alive>
          <component :is="currentTab"></component>
        </keep-alive>
      </div>
      <div class="form-group">
        <button
          type="submit"
          @click.prevent="addPatient"
          class="btn btn-primary"
        >
          Daten senden
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import assessment from "../components/Assessment/Assessment.vue";
import diagnosestellung from "../components/Diagnosestellung/Diagnosestellung.vue";
import {mapFields} from "vuex-map-fields";
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  data () {
    return{
      currentTab:"assessment",
      tabs: [
        {id:"assessment", name: "Assessment"},
        {id:"diagnosestellung", name: "Diagnosestellung"},
        {id:"planung", name: "Planung der Intervention"},
        {id:"umsetzung", name:"Umsetzung der Intervention"},
        {id:"evaluation", name:"Outcome Evaluation"}
      ]
    }
  },
  components: {
    assessment,
    diagnosestellung,
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
      "stillzeit",
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
      "mineralstoffe",
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
      "koerpergroesse",
      "koerpergewicht",
      "bmi",
      "taillenumfang",
      "hautfaltendicke",
      "fettfreieMasse",
      "fettmasse",
      "ruheenergieumsatz",
      "chemieMetabolischeParameter",
      "vitalzeichen",
      "weitereMessungen",
      "schlucken",
      "schluckenJaAber",
      "schluckenNein",
      "erbrechen",
      "erbrechenJa",
      "mundgesundheit",
      "mundgesundheitAndere",
      "problemeNahrungsaufnahme",
      "appetitBeeintraechtigung",
      "weitereKoerperlicheBefunde",
      "diagnosestellung",
    ]),
    ...mapGetters([
      "recallMahlzeiten"
    ]),
    ausgeuebterBeruf: {
      get() {
        return this.zweiZusammen(this.beruf, this.artDerArbeit);
      }
    },
    alleWohnsituation: {
      get() {
        return this.zweiZusammen(this.wohnsituation, this.wohnsituationAndere);
      }
    },
    alleBeeintraechtigungen: {
      get() {
        return this.dreiZusammen(this.beeintraechtigungen, this.beeintraechtigungenVorhanden, this.beeintraechtigungenVorhandenAndere);
      }  
    },
    alleMobileingeschraenkt: {
      get() {
        return this.dreiZusammen(this.mobil, this.mobileingeschraenkt, this.mobileingeschraenktAndere);
      } 
    },
    alleUnterstuetzungMedizinischerVersorgung: {
      get() {
        return this.dreiZusammen(this.unterstuetzungMedizinischerVersorgung, this.jaUnterstuetzungMedizinischerVersorgung, this.jaUnterstuetzungMedizinischerVersorgungAndere);
      }
    },
    alleWeitereDiagnosen: {
      get() {
        return this.zweiZusammen(this.weitereDiagnosen, this.weitereDiagnosenAndere);
      }
    },
    allePsychischeGesundheit: {
      get() {
        return this.zweiZusammen(this.psychischeGesundheit, this.psychischeGesundheitAndere);
      }
    },
    alleGesundheitszustandDerFamilie: {
      get() {
        return this.zweiZusammen(this.gesundheitszustandDerFamilie, this.gesundheitszustandDerFamilieAndere);
      }
    },
    alleMahlzeitenZusaetzlich: {
      get() {
        return this.zweiZusammen(this.mahlzeitenZusaetzlich, this.mahlzeitenZusaetzlichAndere);
      }
    },
    alleEigenstaendigeDiaet: {
      get() {
        return this.zweiZusammen(this.eigenstaendigeDiaet, this.eigenstaendigeDiaetJa);
      }
    },
    alleMahlzeitenAusserHaus: {
      get() {
        return this.zweiZusammen(this.mahlzeitenAusserHaus, this.mahlzeitenAusserHausJa);
      }
    },
    alleDiaetischeKostform: {
      get() {
        return this.dreiZusammen(this.diaetischeKostform, this.diaetischeKostformJa, this.diaetischeKostformJaAndere);
      }
    },
    alleEnteraleErnaehrung: {
      get() {
        return this.zweiZusammen(this.enteraleErnaehrung, this.enteraleErnaehrungJa);
      }
    },
    alleMedikamente: {
      get() {
        return this.zweiZusammen(this.medikamente, this.medikamenteJa);
      }
    },
    allePlantMahlzeiten:{
      get() {
        return this.zweiZusammen(this.plantMahlzeiten, this.plantMahlzeitenAndere);
      }
    },
    alleBereitetMahlzeiten: {
      get() {
        return this.zweiZusammen(this.bereitetMahlzeiten, this.bereitetMahlzeitenAndere);
      }
    },
    alleLebensmitteleinkauf: {
      get() {
        return this.zweiZusammen(this.lebensmitteleinkauf, this.lebensmitteleinkaufAndere);
      }
    },
    alleSelbstversorgen: {
      get() {
        return this.dreiZusammen(this.selbstversorgen, this.selbstversorgenEingeschraenkt, this.selbstversorgenNein)
      }
    },
    alleEinfachheitMahlzeitZuzubereiten: {
      get() {
        return this.zweiZusammen(this.einfachheitMahlzeitZuzubereiten, this.begruendungMahlzeitZuzubereiten);
      }
    },
    alleInformationErnaehrung: {
      get() {
        return this.zweiZusammen(this.informationErnaehrung, this.informationErnaehrungAndere);
      }
    },
    alleWichtigkeitAndere: {
      get() {
        return this.zweiZusammen(this.wichtigkeitAndere, this.wichtigkeitAndereValue);
      }
    },
    alleErnaehrungsgewohnheitenVeraendern: {
      get() {
        return this.zweiZusammen(this.ernaehrungsgewohnheitenVeraendern, this.begruendungErnaehrungsgewohnheitenVeraendern);
      }
    },
    alleSchlucken: {
      get() {
        return this.dreiZusammen(this.schlucken, this.schluckenJaAber, this.schluckenNein);
      }
    },
    alleErbrechen: {
      get() {
        return this.zweiZusammen(this.erbrechen, this.erbrechenJa);
      }
    },
    alleMundgesundheit: {
      get() {
        return this.zweiZusammen(this.mundgesundheit, this.mundgesundheitAndere);
      }
    },
  },
  methods: {
    zweiZusammen(value1, value2) {
      if(value1 && value2){
        return value1 +  ', ' + value2
      }else if(value1 && !value2){
        return value1
      }else if(!value1 && value2){
        return value2
      }
    },
    dreiZusammen(value1, value2, value3) {
      //alle
      if(value1 && value2 && value3){
        return value1 +  ', ' + value2 + ', ' + value3
      }
      // nur ja/nein
      else if(value1 && !value2 && !value3){
        return value1
      }
      // ja/nein + checkbox
      else if(value1 && value2 && !value3){
        return value1 + ', ' + value2
      }
      // ja/nein + andere
      else if(value1 && !value2 && value3){
        return value1 + ', ' + value3
      }
    },
    addPatient() {
      const apiURL = "http://localhost:9000/api";
      axios
        .post(apiURL, {
          "Vorname": this.vorname,
          "Nachname": this.nachname,
          "Geburtsdatum": this.geburtsdatum,
          assessment1:{
            "Adresse":this.adresse,
            "Telefonnummer": this.telefonnummer,
            "Email": this.email,
            "Krankenkasse": this.krankenkasse,
            "Hausarzt": this.hausarzt,
            "Geschlecht" : this.geschlecht,
            "Herkunft": this.herkunft,
            "Muttersprache": this.muttersprache,
            "SchulischeBildung": this.schulischeBildung,
            "BeruflicheBildung": this.beruflicheBildung,
            "Beruf": this.ausgeuebterBeruf,
            "Familienstand": this.familienstand,
            "Wohnsituation": this.alleWohnsituation,
            "PersonenImHaushalt": this.personenImHaushalt,
            "aktuellGeraucht": this.aktuellGeraucht,
            "jemalsGeraucht" : this.jemalsGeraucht,
            "AnzahlZigaretten": this.anzahlZigaretten,
            "AnzahlTabakprodukte": this.anzahlTabakprodukte,
            "AnzahlJahreRauchen": this.anzahlJahreRauchen,
            "Beeintraechtigungen": this.alleBeeintraechtigungen,
            "mobil": this.alleMobileingeschraenkt,
            "KontakAktivitaet": this.kontakAktivitaet,
            "Hobbies" : this.hobbies,
            "UnterstuetzungMedizinischerVersorgung": this.alleUnterstuetzungMedizinischerVersorgung,
            "MedizinischeDiagnose": this.medizinischeDiagnose,
            "weitereDiagnosen": this.alleWeitereDiagnosen,
            "vergangeneDiagnosen": this.vergangeneDiagnosen,
            "PsychischeGesundheit": this.allePsychischeGesundheit,
            "GesundheitszustandDerFamilie": this.alleGesundheitszustandDerFamilie,
            "Schwangerschaft": this.schwangerschaft,
            "Stillzeit": this.stillzeit
          },
          Recall: this.recallMahlzeiten,
          assessment2: {
            "weitereAnmerkungenZumRecall": this.weitereAnmerkungenRecall,
            "Vorlieben": this.vorlieben,
            "Abneigungen": this.abneigungen,
            "AnzahlMahlzeitenRecall": this.anzahlMahlzeitenRecall,
            "MahlzeitenNormalerweise": this.mahlzeitenNormalerweise,
            "MahlzeitenWeggelassen": this.mahlzeitenWeggelassen,
            "MahlzeitenZusaetzlich": this.alleMahlzeitenZusaetzlich,
            "EigenstaendigeDiaet": this.alleEigenstaendigeDiaet,
            "MahlzeitenAusserHaus": this.alleMahlzeitenAusserHaus,
            "DiaetischeKostform": this.alleDiaetischeKostform,
            "EnteraleErnaehrung": this.alleEnteraleErnaehrung,
            "Medikamente": this.alleMedikamente,
          },
          bilanzierung:{
            //"isBilanzierung": this.isBilanzierung,
            "Getränke" : this.getraenke,
            "Gemüse": this.gemuese,
            "Obst": this.obst,
            "Getreideprodukte": this.getreideprodukte,
            "Milch": this.milch,
            "Fleisch": this.fleisch,
            "Fisch" : this.fisch,
            "Ei": this.ei,
            "Fette": this.fette,
            "Suessigkeiten": this.suessigkeiten,
            "PikanteSnacks": this.pikanteSnacks,
            "Energie": this.energie,
            "Eiweiss": this.eiweiss,
            "Kohlenhydrate": this.kohlenhydrate,
            "Ballaststoffe": this.ballaststoffe,
            "Zucker": this.zucker,
            "Gesamtfett": this.gesamtfett,
            "GesaettigteFettsaeuren": this.gesaettigteFettsaeuren,
            "EinfachUngesaettigte": this.einfachGesaettigte,
            "MehrfachUngesaettigte": this.mehrfachGesaettigte,
            "Cholesterin": this.cholesterin,
            "Vitamine": this.vitamine,
            "Mineralstoffe": this.mineralstoffe,
          },
          assessment3: {
            "PlantMahlzeiten": this.allePlantMahlzeiten,
            "BereitetMahlzeiten": this.alleBereitetMahlzeiten,
            "Lebensmitteleinkauf": this.alleLebensmitteleinkauf,
            "Selbstversorgung": this.alleSelbstversorgen,
            "EinfachheitMahlzeitZuzubereiten" : this.alleEinfachheitMahlzeitZuzubereiten,
            "InformationErnaehrung": this.alleInformationErnaehrung,
            "OrientierungErnaehrung": this.orientierungErnaehrung,
            "WichtigkeitDerEmpfehlung": this.wichtigkeitDerEmpfehlung,
            "WichtigkeitDerFrische" : this.wichtigkeitDerFrische,
            "WichtigkeitDesGeschmacks": this.wichtigkeitDesGeschmacks,
            "WichtigkeitDerGesundheit": this.wichtigkeitDerGesundheit,
            "WichtigkeitEinesGeringenPreises": this.wichtigkeitEinesGeringenPreises,
            "WichtigkeitDerRegionalitaet": this.wichtigkeitDerRegionalitaet,
            "WichtigkeitDerSaisonalitaet": this.wichtigkeitDerSaisonalitaet,
            "WichtigkeitAndere": this.alleWichtigkeitAndere,
            "ErnaehrungsgewohnheitenVeraendern": this.alleErnaehrungsgewohnheitenVeraendern,
            "PhysicalActivityLevel": this.physicalActivityLevel,
            "WeitereAnmerkungenAktivitaet": this.weitereAnmerkungenAktivitaet,
          },
          assessment4:{
            "Koerpergroesse": this.koerpergroesse,
            "Koerpergewicht": this.koerpergewicht,
            "bmi": this.bmi,
            "taillenumfang": this.taillenumfang,
            "hautfaltendicke": this.hautfaltendicke,
            "fettfreieMasse": this.fettfreieMasse,
            "fettmasse": this.fettmasse,
            "ruheenergieumsatz": this.ruheenergieumsatz,
            "chemieMetabolischeParameter": this.chemieMetabolischeParameter,
            "vitalzeichen": this.vitalzeichen,
            "weitereMessungen": this.weitereMessungen,
            "schlucken": this.alleSchlucken,
            "erbrechen": this.alleErbrechen,
            "mundgesundheit": this.alleMundgesundheit,
            "problemeNahrungsaufnahme": this.problemeNahrungsaufnahme,
            "appetitBeeintraechtigung": this.appetitBeeintraechtigung,
            "weitereKoerperlicheBefunde": this.weitereKoerperlicheBefunde,
          },
          "diagnosestellung": this.diagnosestellung, 
        })
        .then(response => {
          console.log(response);
          this.$router.push('/List');
          this.vorname = "";
          this.nachname = "";
          this.geburtsdatum = "";
          this.adresse = "";
          this.telefonnummer = "";
          this.email = "";
          this.krankenkasse = "";
          this.hausarzt = "";
          this.geschlecht = "";
          this.herkunft = "";
          this.muttersprache = "";
          this.schulischeBildung = "";
          this.beruflicheBildung = "";
          this.beruf = "";
          this.artDerArbeit = "";
          this.familienstand = "";
          this.wohnsituation = "";
          this.wohnsituationAndere = "";
          this.personenImHaushalt = null;
          this.aktuellGeraucht = "";
          this.jemalsGeraucht = "";
          this.anzahlZigaretten = null;
          this.anzahlTabakprodukte = null;
          this.anzahlJahreRauchen = null;
          this.beeintraechtigungen = "";
          this.beeintraechtigungenVorhanden = "";
          this.beeintraechtigungenVorhandenAndere = "";
          this.mobil = "";
          this.mobileingeschraenkt = "";
          this.mobileingeschraenktAndere = "";
          this.kontakAktivitaet = "";
          this.hobbies = "";
          this.unterstuetzungMedizinischerVersorgung = "";
          this.jaUnterstuetzungMedizinischerVersorgung = "";
          this.jaUnterstuetzungMedizinischerVersorgungAndere = "";
          this.medizinischeDiagnose = "";
          this.weitereDiagnosen = "";
          this.weitereDiagnosenAndere = "";
          this.vergangeneDiagnosen = "";
          this.psychischeGesundheit = "";
          this.psychischeGesundheitAndere = "";
          this.gesundheitszustandDerFamilie = "";
          this.gesundheitszustandDerFamilieAndere = "";
          this.schwangerschaft = "";
          this.stillzeit = "";
          this.recallMahlzeiten = {table:[]};
          this.weitereAnmerkungenRecall = "";
          this.vorlieben = "";
          this.abneigungen = "";
          this.isRecall = "";
          this.anzahlMahlzeitenRecall = "";
          this.mahlzeitenNormalerweise = "";
          this.mahlzeitenWeggelassen = "";
          this.mahlzeitenZusaetzlich = "";
          this.mahlzeitenZusaetzlichAndere = "";
          this.eigenstaendigeDiaet = "";
          this.eigenstaendigeDiaetJa = "";
          this.mahlzeitenAusserHaus = "";
          this.mahlzeitenAusserHausJa = "";
          this.diaetischeKostform = "";
          this.diaetischeKostformJa = "";
          this.diaetischeKostformJaAndere = "";
          this.enteraleErnaehrung = "";
          this.enteraleErnaehrungJa = "";
          this.medikamente = "";
          this.medikamenteJa = "";
          this.isBilanzierung = false;
          this.getraenke = "";
          this.gemuese = "";
          this.obst = "";
          this.getreideprodukte = "";
          this.milch = "";
          this.fleisch = "";
          this.fisch = "";
          this.ei = "";
          this.fette = "";
          this.suessigkeiten = "";
          this.pikanteSnacks = "";
          this.energie = "";
          this.eiweiss = "";
          this.kohlenhydrate = "";
          this.ballaststoffe = "";
          this.zucker = "";
          this.gesamtfett = "";
          this.gesaettigteFettsaeuren = "";
          this.einfachGesaettigte = "";
          this.mehrfachGesaettigte = "";
          this.cholesterin = "";
          this.vitamine = "";
          this.mineralstoffe = "";
          this.plantMahlzeiten = "";
          this.plantMahlzeitenAndere = "";
          this.bereitetMahlzeiten = "";
          this.bereitetMahlzeitenAndere = "";
          this.lebensmitteleinkauf = "";
          this.lebensmitteleinkaufAndere = "";
          this.selbstversorgen = "";
          this.selbstversorgenEingeschraenkt = "";
          this.selbstversorgenNein = "";
          this.einfachheitMahlzeitZuzubereiten = "";
          this.begruendungMahlzeitZuzubereiten = "";
          this.informationErnaehrung = "";
          this.informationErnaehrungAndere = "";
          this.orientierungErnaehrung = "";
          this.wichtigkeitDerEmpfehlung = "";
          this.wichtigkeitDerFrische = "";
          this.wichtigkeitDesGeschmacks = "";
          this.wichtigkeitDerGesundheit = "";
          this.wichtigkeitEinesGeringenPreises = "";
          this.wichtigkeitDerRegionalitaet = "";
          this.wichtigkeitDerSaisonalitaet = "";
          this.wichtigkeitAndere = "";
          this.wichtigkeitAndereValue = "";
          this.ernaehrungsgewohnheitenVeraendern = "";
          this.begruendungErnaehrungsgewohnheitenVeraendern = "";
          this.physicalActivityLevel = "";
          this.weitereAnmerkungenAktivitaet = "";
          this.koerpergroesse = null;
          this.koerpergewicht = null;
          this.bmi = null;
          this.taillenumfang = "";
          this.hautfaltendicke = "";
          this.fettfreieMasse = "";
          this.fettmasse = "";
          this.ruheenergieumsatz = "";
          this.chemieMetabolischeParameter = "";
          this.vitalzeichen = "";
          this.weitereMessungen = "";
          this.schlucken = "";
          this.schluckenJaAber = "";
          this.schluckenNein = "";
          this.erbrechen = "";
          this.erbrechenJa = "";
          this.mundgesundheit = "";
          this.mundgesundheitAndere = "";
          this.problemeNahrungsaufnahme = "";
          this.appetitBeeintraechtigung = "";
          this.weitereKoerperlicheBefunde = "";
          this.diagnosestellung = "";
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
 #assessment{
   background-color: #9a884f !important;
   border: 1px solid #9a884f !important;
   color: white !important;
 }
  #diagnosestellung{
   background-color: #6eaead !important;
   border: 1px solid #6eaead !important;
   color: white !important;
 }
 #planung{
   background-color: #376f75 !important;
   border: 1px solid #376f75 !important;
   color: white !important;
 }
 #umsetzung{
   background-color: #00303C !important;
   border: 1px solid #00303C !important;
   color: white !important;
 }
 #evaluation{
   background-color: #72BF44 !important;
   border: 1px solid #72BF44 !important;
   color: white !important;
 }
</style>
