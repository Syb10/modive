<template>
  <div>
    <form>
      <div>
        <h4>Bearbeitung von Klient*in {{nachname}}, {{vorname}}</h4> 
        <div>
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
          <component :is="currentTab" :isEdit="true"></component>
        </keep-alive>
      </div>
      <div class="form-group">
        <button
          type="submit"
          @click.prevent="updateKlient"
          class="btn btn-primary"
        >
          Änderungen speichern
        </button>
      </div>
    </form>
  </div>

</template>

<script>
import assessment from "../components/Assessment/Assessment.vue";
import diagnosestellung from "../components/Diagnosestellung/Diagnosestellung.vue";
import planung from "../components/Planung/Planung.vue";
import umsetzung from "../components/Umsetzung/Umsetzung.vue";
import evaluation from "../components/Evaluation/Evaluation.vue";
import {mapGetters, mapState} from "vuex";
import axios from 'axios';

  export default {
    name: "Edit",
    data () {
      return{
        currentTab:"assessment",
        tabs: [
          {id:"assessment", name: "Assessment"},
          {id:"diagnosestellung", name: "Diagnosestellung"},
          {id:"planung", name: "Planung der Intervention"},
          {id:"umsetzung", name:"Umsetzung der Intervention"},
          {id:"evaluation", name:"Outcome Evaluation"}
        ],
      }
    },
    components: {
      assessment,
      diagnosestellung,
      planung,
      umsetzung,
      evaluation,
    },
    async created() {
      let apiURL = `http://localhost:9000/api/${this.$route.params.id}`;

      await axios.get(apiURL).then(res => {
        this.$store.state.vorname = res.data.Vorname;
        this.$store.state.nachname = res.data.Nachname;
        this.$store.state.geburtsdatum = res.data.Geburtsdatum;
        
        this.$store.state.a1.adresse = res.data.assessment1.Adresse;
        this.$store.state.a1.telefonnummer = res.data.assessment1.Telefonnummer;
        this.$store.state.a1.email = res.data.assessment1.Email;
        this.$store.state.a1.krankenkasse = res.data.assessment1.Krankenkasse;
        this.$store.state.a1.hausarzt = res.data.assessment1.Hausarzt;
        this.$store.state.a1.geschlecht = res.data.assessment1.Geschlecht;
        this.$store.state.a1.herkunft = res.data.assessment1.Herkunft;
        this.$store.state.a1.muttersprache = res.data.assessment1.Muttersprache;
        this.$store.state.a1.schulischeBildung = res.data.assessment1.SchulischeBildung;
        this.$store.state.a1.beruflicheBildung = res.data.assessment1.BeruflicheBildung;
        this.$store.state.a1.beruf = res.data.assessment1.Beruf;
        this.$store.state.a1.artarbeit = res.data.assessment1.weitereAngabenBeruf;
        this.$store.state.a1.familienstand = res.data.assessment1.Familienstand;
        this.$store.state.a1.wohnsituation = res.data.assessment1.Wohnsituation[0]; 
        this.$store.state.a1.wohnsituationAndere = res.data.assessment1.Wohnsituation[1];
        this.$store.state.a1.personenImHaushalt = res.data.assessment1.PersonenImHaushalt;
        this.$store.state.a1.weitereAnmerkungenZurWohnsituation =res.data.assessment1.WeitereAnmerkungenZurWohnsituation;
        this.$store.state.a1.aktuellGeraucht = res.data.assessment1.aktuellGeraucht;
        this.$store.state.a1.jemalsGeraucht = res.data.assessment1.jemalsGeraucht;
        this.$store.state.a1.anzahlZigaretten = res.data.assessment1.AnzahlZigaretten;
        this.$store.state.a1.anzahlTabakprodukte = res.data.assessment1.AnzahlTabakprodukte;
        this.$store.state.a1.anzahlJahreRauchen = res.data.assessment1.AnzahlJahreRauchen;
        this.$store.state.a1.beeintraechtigungen = res.data.assessment1.Beeintraechtigungen[0];
        this.$store.state.a1.beeintraechtigungenVorhanden = res.data.assessment1.Beeintraechtigungen[1];
        this.$store.state.a1.beeintraechtigungenVorhandenAndere = res.data.assessment1.Beeintraechtigungen[2];
        this.$store.state.a1.mobil = res.data.assessment1.mobil[0];
        this.$store.state.a1.mobileingeschraenkt = res.data.assessment1.mobil[1];
        this.$store.state.a1.mobileingeschraenktAndere = res.data.assessment1.mobil[2];
        this.$store.state.a1.unterstuetzungMedizinischerVersorgung = res.data.assessment1.UnterstuetzungMedizinischerVersorgung[0];
        this.$store.state.a1.jaUnterstuetzungMedizinischerVersorgung = res.data.assessment1.UnterstuetzungMedizinischerVersorgung[1]; 
        this.$store.state.a1.jaUnterstuetzungMedizinischerVersorgungAndere = res.data.assessment1.UnterstuetzungMedizinischerVersorgung[2];
        this.$store.state.a1.kontakAktivitaet = res.data.assessment1.KontakAktivitaet;
        this.$store.state.a1.hobbies = res.data.assessment1.Hobbies;
        this.$store.state.a1.medizinischeDiagnose = res.data.assessment1.MedizinischeDiagnose;
        this.$store.state.a1.weitereDiagnosen = res.data.assessment1.weitereDiagnosen[0];
        this.$store.state.a1.weitereDiagnosenAndere = res.data.assessment1.weitereDiagnosen[1];
        this.$store.state.a1.vergangeneDiagnosen = res.data.assessment1.vergangeneDiagnosen;
        this.$store.state.a1.psychischeGesundheit = res.data.assessment1.PsychischeGesundheit[0];
        this.$store.state.a1.psychischeGesundheitAndere = res.data.assessment1.PsychischeGesundheit[1];
        this.$store.state.a1.gesundheitszustandDerFamilie = res.data.assessment1.GesundheitszustandDerFamilie[0];
        this.$store.state.a1.gesundheitszustandDerFamilieAndere = res.data.assessment1.GesundheitszustandDerFamilie[1];
        this.$store.state.a1.weitereAnmerkungenZumGesundheitszustandDerFamilie = res.data.assessment1.WeitereAnmerkungenZumGesundheitszustandDerFamilie;
        this.$store.state.a1.schwangerschaft = res.data.assessment1.Schwangerschaft;
        this.$store.state.a1.stillzeit = res.data.assessment1.Stillzeit;

        this.$store.state.a2.anzahlRecall = res.data.anzahlRecall;
        this.$store.state.a2.recall = res.data.Recall;
        this.$store.state.a2.weitereGetraenke = res.data.assessment2.weitereGetraenke;
        this.$store.state.a2.anzahlMahlzeitenRecall = res.data.assessment2.AnzahlMahlzeitenRecall;
        this.$store.state.a2.mahlzeitenNormalerweise = res.data.assessment2.MahlzeitenNormalerweise;
        this.$store.state.a2.mahlzeitenWeggelassen = res.data.assessment2.MahlzeitenWeggelassen;
        this.$store.state.a2.mahlzeitenZusaetzlich = res.data.assessment2.MahlzeitenZusaetzlich[0];
        this.$store.state.a2.mahlzeitenZusaetzlichAndere = res.data.assessment2.MahlzeitenZusaetzlich[1];
        this.$store.state.a2.weitereAnmerkungenRecall = res.data.assessment2.weitereAnmerkungenRecall;

        this.$store.state.a2.getraenke = res.data.bilanzierung.Getraenke;
        this.$store.state.a2.gemuese = res.data.bilanzierung.Gemuese;
        this.$store.state.a2.obst = res.data.bilanzierung.Obst;
        this.$store.state.a2.getreideprodukte = res.data.bilanzierung.Getreideprodukte;
        this.$store.state.a2.milch = res.data.bilanzierung.Milch;
        this.$store.state.a2.fleisch = res.data.bilanzierung.Fleisch;
        this.$store.state.a2.fisch = res.data.bilanzierung.Fisch;
        this.$store.state.a2.ei = res.data.bilanzierung.Ei;
        this.$store.state.a2.fette = res.data.bilanzierung.Fette;
        this.$store.state.a2.suessigkeiten = res.data.bilanzierung.Suessigkeiten;
        this.$store.state.a2.pikanteSnacks = res.data.bilanzierung.PikanteSnacks;
        this.$store.state.a2.energie = res.data.bilanzierung.Energie;
        this.$store.state.a2.wasser = res.data.bilanzierung.Wasser;
        this.$store.state.a2.eiweiss = res.data.bilanzierung.Eiweiss;
        this.$store.state.a2.kohlenhydrate = res.data.bilanzierung.Kohlenhydrate;
        this.$store.state.a2.zucker = res.data.bilanzierung.Zucker;
        this.$store.state.a2.ballaststoffe = res.data.bilanzierung.Ballaststoffe;
        this.$store.state.a2.gesamtfett = res.data.bilanzierung.Gesamtfett;
        this.$store.state.a2.gesaettigteFettsaeuren = res.data.bilanzierung.GesaettigteFettsaeuren;
        this.$store.state.a2.einfachUngesaettigte = res.data.bilanzierung.EinfachUngesaettigte
        this.$store.state.a2.mehrfachUngesaettigte = res.data.bilanzierung.MehrfachUngesaettigte;
        this.$store.state.a2.cholesterin = res.data.bilanzierung.Cholesterin;
        this.$store.state.a2.vitamine = res.data.Vitamine;
        this.$store.state.a2.counterVitamine = res.data.bilanzierung.CounterVitamine;
        this.$store.state.a2.mineralstoffe = res.data.Mineralstoffe;
        this.$store.state.a2.counterMineralstoffe = res.data.bilanzierung.CounterMineralstoffe;

        this.$store.state.a2.vorlieben = res.data.assessment2.Vorlieben;
        this.$store.state.a2.abneigungen = res.data.assessment2.Abneigungen;
        this.$store.state.a2.eigenstaendigeDiaet = res.data.assessment2.EigenstaendigeDiaet[0];
        this.$store.state.a2.eigenstaendigeDiaetJa = res.data.assessment2.EigenstaendigeDiaet[1];
        this.$store.state.a2.mahlzeitenAusserHaus = res.data.assessment2.MahlzeitenAusserHaus[0];
        this.$store.state.a2.mahlzeitenAusserHausJa = res.data.assessment2.MahlzeitenAusserHaus[1];
        this.$store.state.a2.diaetischeKostform = res.data.assessment2.DiaetischeKostform[0];
        this.$store.state.a2.diaetischeKostformJa = res.data.assessment2.DiaetischeKostform[1];
        this.$store.state.a2.diaetischeKostformJaAndere = res.data.assessment2.DiaetischeKostform[2];
        this.$store.state.a2.enteraleErnaehrung = res.data.assessment2.EnteraleErnaehrung[0];
        this.$store.state.a2.enteraleErnaehrungJa = res.data.assessment2.EnteraleErnaehrung[1];
        this.$store.state.a2.medikamente = res.data.assessment2.Medikamente[0];
        this.$store.state.a2.medikamenteJa = res.data.assessment2.Medikamente[1];

        this.$store.state.a3.plantMahlzeiten = res.data.assessment3.PlantMahlzeiten[0];
        this.$store.state.a3.plantMahlzeitenAndere = res.data.assessment3.PlantMahlzeiten[1];
        this.$store.state.a3.bereitetMahlzeiten = res.data.assessment3.BereitetMahlzeiten[0];
        this.$store.state.a3.bereitetMahlzeitenAndere = res.data.assessment3.BereitetMahlzeiten[1];
        this.$store.state.a3.weitereAnmerkungenMahlzeiten = res.data.assessment3.weitereAnmerkungenMahlzeiten;
        this.$store.state.a3.lebensmitteleinkauf = res.data.assessment3.Lebensmitteleinkauf[0];
        this.$store.state.a3.lebensmitteleinkaufAndere = res.data.assessment3.Lebensmitteleinkauf[1];
        this.$store.state.a3.selbstversorgen = res.data.assessment3.Selbstversorgen[0];
        this.$store.state.a3.selbstversorgenEingeschraenkt = res.data.assessment3.Selbstversorgen[1];
        this.$store.state.a3.selbstversorgenNein = res.data.assessment3.Selbstversorgen[2];
        this.$store.state.a3.einfachheitMahlzeitZuzubereiten = res.data.assessment3.EinfachheitMahlzeitZuzubereiten[0];
        this.$store.state.a3.begruendungMahlzeitZuzubereiten = res.data.assessment3.EinfachheitMahlzeitZuzubereiten[1];
        this.$store.state.a3.informationErnaehrung = res.data.assessment3.InformationErnaehrung[0];
        this.$store.state.a3.informationErnaehrungAndere = res.data.assessment3.InformationErnaehrung[1];
        this.$store.state.a3.weitereAnmerkungenInformationsquellen = res.data.assessment3.weitereAnmerkungenInformationsquellen;
        this.$store.state.a3.orientierungErnaehrung = res.data.assessment3.OrientierungErnaehrung;
        this.$store.state.a3.wichtigkeitDerEmpfehlung = res.data.assessment3.WichtigkeitDerEmpfehlung;
        this.$store.state.a3.wichtigkeitDerFrische = res.data.wichtigkeit.WichtigkeitDerFrische;
        this.$store.state.a3.wichtigkeitDesGeschmacks = res.data.wichtigkeit.WichtigkeitDesGeschmacks;
        this.$store.state.a3.wichtigkeitDerGesundheit = res.data.wichtigkeit.WichtigkeitDerGesundheit;
        this.$store.state.a3.wichtigkeitEinesGeringenPreises = res.data.wichtigkeit.WichtigkeitEinesGeringenPreises;
        this.$store.state.a3.wichtigkeitDerRegionalitaet = res.data.wichtigkeit.WichtigkeitDerRegionalitaet;
        this.$store.state.a3.wichtigkeitDerSaisonalitaet = res.data.wichtigkeit.WichtigkeitDerSaisonalitaet;
        this.$store.state.a3.wichtigkeitAndere = res.data.WichtigkeitAndere;
        this.$store.state.a3.counterAndere = res.data.wichtigkeit.CounterAndere;
        this.$store.state.a3.ernaehrungsgewohnheitenVeraendern = res.data.assessment3.ErnaehrungsgewohnheitenVeraendern[0];
        this.$store.state.a3.begruendungErnaehrungsgewohnheitenVeraendern = res.data.assessment3.ErnaehrungsgewohnheitenVeraendern[1];
        this.$store.state.a3.physicalActivityLevel = res.data.assessment3.PhysicalActivityLevel;
        this.$store.state.a3.weitereAnmerkungenAktivitaet = res.data.assessment3.WeitereAnmerkungenAktivitaet;
        this.$store.state.a3.whoLaune = res.data.assessment3.WhoLaune;
        this.$store.state.a3.whoRuhig = res.data.assessment3.WhoRuhig;
        this.$store.state.a3.whoAktiv = res.data.assessment3.WhoAktiv;
        this.$store.state.a3.whoAusgeruht = res.data.assessment3.WhoAusgeruht;
        this.$store.state.a3.whoInteressieren = res.data.assessment3.WhoInteressieren;

        this.$store.state.a4.koerpergroesse = res.data.assessment4.Koerpergroesse;
        this.$store.state.a4.koerpergewicht = res.data.assessment4.Koerpergewicht;
        this.$store.state.a4.taillenumfang = res.data.assessment4.Taillenumfang;
        this.$store.state.a4.hautfaltendicke = res.data.assessment4.Hautfaltendicke;
        this.$store.state.a4.fettfreieMasse = res.data.assessment4.FettfreieMasse;
        this.$store.state.a4.fettmasse = res.data.assessment4.Fettmasse;
        this.$store.state.a4.ruheenergieumsatz = res.data.assessment4.Ruheenergieumsatz;
        this.$store.state.a4.chemieMetabolischeParameter = res.data.assessment4.ChemieMetabolischeParameter;
        this.$store.state.a4.vitalzeichen = res.data.assessment4.Vitalzeichen;
        this.$store.state.a4.weitereMessungen = res.data.assessment4.WeitereMessungen;
        this.$store.state.a4.schlucken = res.data.assessment4.Schlucken[0];
        this.$store.state.a4.schluckenJaAber = res.data.assessment4.Schlucken[1];
        this.$store.state.a4.schluckenNein = res.data.assessment4.Schlucken[2];
        this.$store.state.a4.erbrechen = res.data.assessment4.Erbrechen[0];
        this.$store.state.a4.erbrechenJa = res.data.assessment4.Erbrechen[1];
        this.$store.state.a4.mundgesundheit = res.data.assessment4.Mundgesundheit[0];
        this.$store.state.a4.mundgesundheitAndere = res.data.assessment4.Mundgesundheit[1];
        this.$store.state.a4.problemeNahrungsaufnahme = res.data.assessment4.ProblemeNahrungsaufnahme;
        this.$store.state.a4.appetitBeeintraechtigung = res.data.assessment4.AppetitBeeintraechtigung;
        this.$store.state.a4.weitereKoerperlicheBefunde = res.data.assessment4.WeitereKoerperlicheBefunde;

        this.$store.state.d.diagnosestellung = res.data.Diagnosestellung;
        this.$store.state.d.pasr = res.data.PASR;
        this.$store.state.d.counter = res.data.Counter;
        this.$store.state.d.error = res.data.Error;
        this.$store.state.d.errorList = res.data.ErrorList;

        this.$store.state.p.priorisierung = res.data.Priorisierung;
        this.$store.state.p.zieleKlient = res.data.ZieleKlient;
        this.$store.state.p.counterKlient = res.data.planung.CounterKlient;
        this.$store.state.p.leitlinien = res.data.planung.Leitlinien;
        this.$store.state.p.zieleIntervention = res.data.ZieleIntervention;
        this.$store.state.p.counterIntervention = res.data.planung.CounterIntervention;
        this.$store.state.p.interventionsform = res.data.planung.Interventionsform[0];
        this.$store.state.p.interventionsformAndere = res.data.planung.Interventionsform[1];
        this.$store.state.p.weitereAnmerkungenInterventionform = res.data.planung.WeitereAnmerkungenInterventionform;
        this.$store.state.p.zeitraumIntervention = res.data.planung.ZeitraumIntervention;
        this.$store.state.p.frequenzInterventionen = res.data.planung.FrequenzInterventionen;
        this.$store.state.p.zeitplanung = res.data.planung.Zeitplanung;
        this.$store.state.p.weitereBerufsgruppen = res.data.planung.WeitereBerufsgruppen[0];
        this.$store.state.p.weitereBerufsgruppenAndere = res.data.planung.WeitereBerufsgruppen[1];
        this.$store.state.p.angehoerige = res.data.planung.Angehoerige;
        this.$store.state.p.weitereAnmerkungenInterventionNochmal = res.data.planung.WeitereAnmerkungenInterventionNochmal;
        this.$store.state.p.monitoring = res.data.planung.Monitoring;

        this.$store.state.p.einzelberatung = res.data.EntwicklungEinzelberatung;
        this.$store.state.u.zusatznahrung = res.data.Zusatznahrung;
        this.$store.state.u.zusatznahrungJa = res.data.EntwicklungZusatznahrung;
        this.$store.state.u.sonstigesUmsetung = res.data.SonstigesUmsetung;        
        this.$store.state.p.entwicklungMonitoring = res.data.EntwicklungMonitoring;
        
        this.$store.state.e.evaluationEntwicklungMonitoring = res.data.evaluation.EvaluationEntwicklungMonitoring;
        this.$store.state.e.zielerreichungKlient = res.data.evaluation.ZielerreichungKlient;
        this.$store.state.e.begruendungZielerreichungKlient = res.data.evaluation.BegruendungZielerreichungKlient;
        this.$store.state.e.zielerreichungIntervention = res.data.evaluation.ZielerreichungIntervention;
        this.$store.state.e.begruendungZielerreichungIntervention = res.data.evaluation.BegruendungZielerreichungIntervention;
        this.$store.state.e.evaluationWeitersVorgehen = res.data.evaluation.EvaluationWeitersVorgehen;
        
      })
    },
    computed: {
      ...mapState([
        "vorname",
        "nachname",
        "geburtsdatum"
      ]),
      ...mapState("a1",[
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
        "artarbeit",
        "familienstand",
        "wohnsituation",
        "wohnsituationAndere",
        "personenImHaushalt",
        "weitereAnmerkungenZurWohnsituation",
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
        "unterstuetzungMedizinischerVersorgung",
        "jaUnterstuetzungMedizinischerVersorgung",
        "jaUnterstuetzungMedizinischerVersorgungAndere",
        "kontakAktivitaet",
        "hobbies",
        "medizinischeDiagnose",
        "weitereDiagnosen",
        "weitereDiagnosenAndere",
        "vergangeneDiagnosen",
        "psychischeGesundheit",
        "psychischeGesundheitAndere",
        "gesundheitszustandDerFamilie",
        "gesundheitszustandDerFamilieAndere",
        "weitereAnmerkungenZumGesundheitszustandDerFamilie",
        "schwangerschaft",
        "stillzeit",
      ]),
      ...mapState("a2",[
        "anzahlRecall",
        "recall",
        "weitereGetraenke",
        "anzahlMahlzeitenRecall",
        "mahlzeitenNormalerweise",
        "mahlzeitenWeggelassen",
        "mahlzeitenZusaetzlich",
        "mahlzeitenZusaetzlichAndere",
        "weitereAnmerkungenRecall",
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
        "wasser",
        "eiweiss",
        "kohlenhydrate",
        "zucker",
        "ballaststoffe",
        "gesamtfett",
        "gesaettigteFettsaeuren",
        "einfachUngesaettigte",
        "mehrfachUngesaettigte",
        "cholesterin",
        "vitamine",
        "counterVitamine",
        "mineralstoffe",
        "counterMineralstoffe",
        "dynamicBilanzierung",
        "vorlieben",
        "abneigungen",
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
      ]),
      ...mapState("a3",[
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
        "counterAndere",
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
      ...mapGetters("a3",[
        "whoWert",
        "whoProzent",
        "whoAuswertung",
      ]),
      ...mapState("a4",[
        "koerpergroesse",
        "koerpergewicht",
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
      ]),
      ...mapGetters("a4",[
        "bmi"
      ]),
      ...mapState("d",[
        "diagnosestellung",
        "pasr",
        "counter",
        "error",
        "errorList",
      ]),
      ...mapState("p", [
        "priorisierung",
        "zieleKlient",
        "counterKlient",
        "leitlinien",
        "zieleIntervention",
        "counterIntervention",
        "interventionsform",
        "interventionsformAndere",
        "weitereAnmerkungenInterventionform",
        "zeitraumIntervention",
        "frequenzInterventionen",
        "zeitplanung",
        "weitereBerufsgruppen",
        "weitereBerufsgruppenAndere",
        "angehoerige",
        "weitereAnmerkungenInterventionNochmal",
        "monitoring",
        "einzelberatung",
        "entwicklungMonitoring",
      ]),
      ...mapGetters("p",[
        "joinMonitoring",
      ]),
      ...mapState("u",[
        "zusatznahrung",
        "zusatznahrungJa",
        "sonstigesUmsetung",
      ]),
      ...mapState("e", [
        "evaluationEntwicklungMonitoring",
        "zielerreichungKlient",
        "begruendungZielerreichungKlient",
        "zielerreichungIntervention",
        "begruendungZielerreichungIntervention",
        "evaluationWeitersVorgehen",
      ]),
      ...mapGetters("e", [
        "evaluationZieleKlient",
        "evaluationZieleIntervention",
      ]),
    },
    methods: {
      updateKlient() {
        let apiURL = `http://localhost:9000/api/${this.$route.params.id}`;

        axios.put(apiURL,{
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
            "Beruf": this.beruf, 
            "weitereAngabenBeruf": this.artarbeit,
            "Familienstand": this.familienstand,
            "Wohnsituation": [this.wohnsituation, this.wohnsituationAndere],
            "PersonenImHaushalt": this.personenImHaushalt,
            "WeitereAnmerkungenZurWohnsituation": this.weitereAnmerkungenZurWohnsituation,
            "aktuellGeraucht": this.aktuellGeraucht,
            "jemalsGeraucht" : this.jemalsGeraucht,
            "AnzahlZigaretten": this.anzahlZigaretten,
            "AnzahlTabakprodukte": this.anzahlTabakprodukte,
            "AnzahlJahreRauchen": this.anzahlJahreRauchen,
            "Beeintraechtigungen": [this.beeintraechtigungen, this.beeintraechtigungenVorhanden, this.beeintraechtigungenVorhandenAndere],
            "mobil":[this.mobil, this.mobileingeschraenkt, this.mobileingeschraenktAndere],
            "UnterstuetzungMedizinischerVersorgung": [this.unterstuetzungMedizinischerVersorgung, this.jaUnterstuetzungMedizinischerVersorgung, this.jaUnterstuetzungMedizinischerVersorgungAndere],
            "KontakAktivitaet": this.kontakAktivitaet,
            "Hobbies" : this.hobbies,
            "MedizinischeDiagnose": this.medizinischeDiagnose,
            "weitereDiagnosen": [this.weitereDiagnosen, this.weitereDiagnosenAndere],
            "vergangeneDiagnosen": this.vergangeneDiagnosen,
            "PsychischeGesundheit": [this.psychischeGesundheit, this.psychischeGesundheitAndere],
            "GesundheitszustandDerFamilie": [this.gesundheitszustandDerFamilie, this.gesundheitszustandDerFamilieAndere],
            "WeitereAnmerkungenZumGesundheitszustandDerFamilie": this.weitereAnmerkungenZumGesundheitszustandDerFamilie,
            "Schwangerschaft": this.schwangerschaft,
            "Stillzeit": this.stillzeit
          },
          "Recall": this.recall,
          "anzahlRecall": this.anzahlRecall,
          assessment2: {
            "weitereGetraenke": this.weitereGetraenke,
            "AnzahlMahlzeitenRecall": this.anzahlMahlzeitenRecall,
            "MahlzeitenNormalerweise": this.mahlzeitenNormalerweise,
            "MahlzeitenWeggelassen": this.mahlzeitenWeggelassen,
            "MahlzeitenZusaetzlich": [this.mahlzeitenZusaetzlich, this.mahlzeitenZusaetzlichAndere],
            "weitereAnmerkungenRecall": this.weitereAnmerkungenRecall,
            "Vorlieben": this.vorlieben,
            "Abneigungen": this.abneigungen,
            "EigenstaendigeDiaet": [this.eigenstaendigeDiaet, this.eigenstaendigeDiaetJa],
            "MahlzeitenAusserHaus": [this.mahlzeitenAusserHaus, this.mahlzeitenAusserHausJa],
            "DiaetischeKostform": [this.diaetischeKostform, this.diaetischeKostformJa],
            "EnteraleErnaehrung": [this.enteraleErnaehrung, this.enteraleErnaehrungJa],
            "Medikamente": [this.medikamente, this.medikamenteJa],
          },
          bilanzierung:{
            "Getraenke": this.getraenke,
            "Gemuese": this.gemuese,
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
            "Wasser": this.wasser,
            "Eiweiss": this.eiweiss,
            "Kohlenhydrate": this.kohlenhydrate,
            "Zucker": this.zucker,
            "Ballaststoffe": this.ballaststoffe,
            "Gesamtfett": this.gesamtfett,
            "GesaettigteFettsaeuren": this.gesaettigteFettsaeuren,
            "EinfachUngesaettigte": this.einfachUngesaettigte,
            "MehrfachUngesaettigte": this.mehrfachUngesaettigte,
            "Cholesterin": this.cholesterin,
            "CounterVitamine": this.counterVitamine,
            "CounterMineralstoffe": this.counterMineralstoffe,
          },
          "Vitamine": this.vitamine,
          "Mineralstoffe": this.mineralstoffe,
          assessment3: {
            "PlantMahlzeiten": [this.plantMahlzeiten, this.plantMahlzeitenAndere],
            "BereitetMahlzeiten": [this.bereitetMahlzeiten, this.bereitetMahlzeitenAndere],
            "weitereAnmerkungenMahlzeiten": this.weitereAnmerkungenMahlzeiten,
            "Lebensmitteleinkauf": [this.lebensmitteleinkauf, this.lebensmitteleinkaufAndere],
            "Selbstversorgen": [this.selbstversorgen, this.selbstversorgenEingeschraenkt, this.selbstversorgenNein],
            "EinfachheitMahlzeitZuzubereiten" : [this.einfachheitMahlzeitZuzubereiten, this.begruendungMahlzeitZuzubereiten],
            "InformationErnaehrung": [this.informationErnaehrung, this.informationErnaehrungAndere],
            "weitereAnmerkungenInformationsquellen": this.weitereAnmerkungenInformationsquellen,
            "OrientierungErnaehrung": this.orientierungErnaehrung,
            "WichtigkeitDerEmpfehlung": this.wichtigkeitDerEmpfehlung,
            "ErnaehrungsgewohnheitenVeraendern": [ this.ernaehrungsgewohnheitenVeraendern, this.begruendungErnaehrungsgewohnheitenVeraendern],
            "PhysicalActivityLevel":  this.physicalActivityLevel,
            "WeitereAnmerkungenAktivitaet":  this.weitereAnmerkungenAktivitaet,
            "WhoLaune": this.whoLaune,
            "WhoRuhig": this.whoRuhig,
            "WhoAktiv": this.whoAktiv,
            "WhoAusgeruht": this.whoAusgeruht,
            "WhoInteressieren": this.whoInteressieren,
            "WhoWert": this.whoWert,
            "WhoProzent": this.whoProzent,
            "WhoAuswertung": this.whoAuswertung,
          },
          wichtigkeit: {
            "WichtigkeitDerFrische" : this.wichtigkeitDerFrische,
            "WichtigkeitDesGeschmacks": this.wichtigkeitDesGeschmacks,
            "WichtigkeitDerGesundheit": this.wichtigkeitDerGesundheit,
            "WichtigkeitEinesGeringenPreises": this.wichtigkeitEinesGeringenPreises,
            "WichtigkeitDerRegionalitaet": this.wichtigkeitDerRegionalitaet,
            "WichtigkeitDerSaisonalitaet": this.wichtigkeitDerSaisonalitaet,
            "CounterAndere": this.counterAndere,
          },
          "WichtigkeitAndere": this.wichtigkeitAndere,
          assessment4:{
            "Koerpergroesse": this.koerpergroesse,
            "Koerpergewicht": this.koerpergewicht,
            "Bmi": this.bmi,
            "Taillenumfang": this.taillenumfang,
            "Hautfaltendicke": this.hautfaltendicke,
            "FettfreieMasse": this.fettfreieMasse,
            "Fettmasse": this.fettmasse,
            "Ruheenergieumsatz": this.ruheenergieumsatz,
            "ChemieMetabolischeParameter": this.chemieMetabolischeParameter,
            "Vitalzeichen": this.vitalzeichen,
            "WeitereMessungen": this.weitereMessungen,
            "Schlucken": [this.schlucken, this.schluckenJaAber, this.schluckenNein],
            "Erbrechen": [this.erbrechen, this.erbrechenJa],
            "Mundgesundheit": [this.mundgesundheit, this.mundgesundheitAndere],
            "ProblemeNahrungsaufnahme": this.problemeNahrungsaufnahme,
            "AppetitBeeintraechtigung": this.appetitBeeintraechtigung,
            "WeitereKoerperlicheBefunde": this.weitereKoerperlicheBefunde,
          },
          "Diagnosestellung": this.diagnosestellung,
          "PASR": this.pasr,
          "Counter": this.counter,
          "Error": this.error,
          "ErrorList": this.errorList,
          "Priorisierung": this.priorisierung,
          "ZieleKlient": this.zieleKlient,
          "ZieleIntervention": this.zieleIntervention,
          planung: {     
            "CounterKlient": this.counterKlient,
            "Leitlinien": this.leitlinien,
            "CounterIntervention": this.counterIntervention,
            "Interventionsform": [this.interventionsform, this.interventionsformAndere],
            "WeitereAnmerkungenInterventionform": this.weitereAnmerkungenInterventionform,
            "ZeitraumIntervention": this.zeitraumIntervention,
            "FrequenzInterventionen": this.frequenzInterventionen,
            "Zeitplanung": this.zeitplanung,
            "WeitereBerufsgruppen": [this.weitereBerufsgruppen, this.weitereBerufsgruppenAndere],
            "Angehoerige": this.angehoerige,
            "WeitereAnmerkungenInterventionNochmal": this.weitereAnmerkungenInterventionNochmal,
            "Monitoring": this.monitoring,
            "JoinMonitoring": this.joinMonitoring,
          },
          "EntwicklungEinzelberatung": this.einzelberatung,
          "Zusatznahrung": this.zusatznahrung,
          "EntwicklungZusatznahrung": this.zusatznahrungJa,
          "SonstigesUmsetung": this.sonstigesUmsetung,        
          "EntwicklungMonitoring": this.entwicklungMonitoring,
          evaluation: {
            "EvaluationEntwicklungMonitoring": this.evaluationEntwicklungMonitoring,
            "ZielerreichungKlient": this.zielerreichungKlient,
            "BegruendungZielerreichungKlient": this.begruendungZielerreichungKlient,
            "ZielerreichungIntervention": this.zielerreichungIntervention,
            "BegruendungZielerreichungIntervention": this.begruendungZielerreichungIntervention,
            "EvaluationZieleKlient": this.evaluationZieleKlient,
            "EvaluationZieleIntervention": this.evaluationZieleIntervention,
            "EvaluationWeitersVorgehen": this.evaluationWeitersVorgehen,
          }
        })
        .then(response => {
          console.log(response);
          this.$router.push('/List');

          this.$store.state.vorname = "";
          this.$store.state.nachname = "";
          this.$store.state.geburtsdatum = "";
          this.$store.state.a1.adresse = "";
          this.$store.state.a1.telefonnummer = "";
          this.$store.state.a1.email = "";
          this.$store.state.a1.krankenkasse = "";
          this.$store.state.a1.hausarzt = "";
          this.$store.state.a1.geschlecht = "";
          this.$store.state.a1.herkunft = "";
          this.$store.state.a1.muttersprache = "";
          this.$store.state.a1.schulischeBildung = "";
          this.$store.state.a1.beruflicheBildung = "";
          this.$store.state.a1.beruf = "";
          this.$store.state.a1.artarbeit = [];
          this.$store.state.a1.familienstand = [];
          this.$store.state.a1.wohnsituation = [];
          this.$store.state.a1.wohnsituationAndere = "";
          this.$store.state.a1.personenImHaushalt = "";
          this.$store.state.a1.weitereAnmerkungenZurWohnsituation = "";
          this.$store.state.a1.aktuellGeraucht = "";
          this.$store.state.a1.jemalsGeraucht = "";
          this.$store.state.a1.anzahlZigaretten = "";
          this.$store.state.a1.anzahlTabakprodukte = "";
          this.$store.state.a1.anzahlJahreRauchen = "";
          this.$store.state.a1.beeintraechtigungen = "";
          this.$store.state.a1.beeintraechtigungenVorhanden = [];
          this.$store.state.a1.beeintraechtigungenVorhandenAndere = "";
          this.$store.state.a1.mobil = "";
          this.$store.state.a1.mobileingeschraenkt = [];
          this.$store.state.a1.mobileingeschraenktAndere = "";
          this.$store.state.a1.unterstuetzungMedizinischerVersorgung = "";
          this.$store.state.a1.jaUnterstuetzungMedizinischerVersorgung = [];
          this.$store.state.a1.jaUnterstuetzungMedizinischerVersorgungAndere = "";
          this.$store.state.a1.kontakAktivitaet = "";
          this.$store.state.a1.hobbies = "";
          this.$store.state.a1.medizinischeDiagnose = "";
          this.$store.state.a1.weitereDiagnosen = [];
          this.$store.state.a1.weitereDiagnosenAndere = "";
          this.$store.state.a1.vergangeneDiagnosen = "";
          this.$store.state.a1.psychischeGesundheit = [];
          this.$store.state.a1.psychischeGesundheitAndere = "";
          this.$store.state.a1.gesundheitszustandDerFamilie = [];
          this.$store.state.a1.gesundheitszustandDerFamilieAndere = "";
          this.$store.state.a1.weitereAnmerkungenZumGesundheitszustandDerFamilie = "";
          this.$store.state.a1.schwangerschaft = "";
          this.$store.state.a1.stillzeit = "";
          this.$store.state.a2.anzahlRecall = 0;
          this.$store.state.a2.recall = [];
          this.$store.state.a2.weitereGetraenke= "";
          this.$store.state.a2.anzahlMahlzeitenRecall = "";
          this.$store.state.a2.mahlzeitenNormalerweise = "";
          this.$store.state.a2.mahlzeitenWeggelassen = [];
          this.$store.state.a2.mahlzeitenZusaetzlich = [];
          this.$store.state.a2.mahlzeitenZusaetzlichAndere = "";
          this.$store.state.a2.weitereAnmerkungenRecall = "";
          this.$store.state.a2.getraenke = "";
          this.$store.state.a2.gemuese = "";
          this.$store.state.a2.obst = "";
          this.$store.state.a2.getreideprodukte = "";
          this.$store.state.a2.milch = "";
          this.$store.state.a2.fleisch = "";
          this.$store.state.a2.fisch = "";
          this.$store.state.a2.ei = "";
          this.$store.state.a2.fette = "";
          this.$store.state.a2.suessigkeiten = "";
          this.$store.state.a2.pikanteSnacks = "";
          this.$store.state.a2.energie = "";
          this.$store.state.a2.wasser = "";
          this.$store.state.a2.eiweiss = "";
          this.$store.state.a2.kohlenhydrate = "";
          this.$store.state.a2.zucker = "";
          this.$store.state.a2.ballaststoffe = "";
          this.$store.state.a2.gesamtfett = "";
          this.$store.state.a2.gesaettigteFettsaeuren = "";
          this.$store.state.a2.einfachUngesaettigte = "";
          this.$store.state.a2.mehrfachUngesaettigte = "";
          this.$store.state.a2.cholesterin = "";
          this.$store.state.a2.vitamine = [[{title: "", vmodel:"", input:true, button:true},{value: "weniger",id:"Vitamine0Weniger",name:"Vitamine0"},{value: "entsprechend der Ernährungsempfehlung",id:"VitamineWeniger",name:"Vitamine0"},{value: "mehr",id:"Vitamine0Mehr",name:"Vitamine0"},]];
          this.$store.state.a2.counterVitamine = 1;
          this.$store.state.a2.mineralstoffe =  [[{title: "", vmodel:"", input:true, button:true},{value: "weniger",id:"Mineralstoffe0Weniger",name:"Mineralstoffe0"},{value: "entsprechend der Ernährungsempfehlung",id:"MineralstoffeWeniger",name:"Mineralstoffe0"},{value: "mehr",id:"Mineralstoffe0Mehr",name:"Mineralstoffe0"}, ]];
          this.$store.state.a2.counterMineralstoffe = 1;
          this.$store.state.a2.vorlieben = "";
          this.$store.state.a2.abneigungen = "";
          this.$store.state.a2.eigenstaendigeDiaet = "";
          this.$store.state.a2.eigenstaendigeDiaetJa = "";
          this.$store.state.a2.mahlzeitenAusserHaus = "";
          this.$store.state.a2.mahlzeitenAusserHausJa = "";
          this.$store.state.a2.diaetischeKostform = "";
          this.$store.state.a2.diaetischeKostformJa = [];
          this.$store.state.a2.diaetischeKostformJaAndere = "";
          this.$store.state.a2.enteraleErnaehrung = "";
          this.$store.state.a2.enteraleErnaehrungJa = "";
          this.$store.state.a2.medikamente = "";
          this.$store.state.a2.medikamenteJa = "";
          this.$store.state.a3.plantMahlzeiten = [];
          this.$store.state.a3.plantMahlzeitenAndere = "";
          this.$store.state.a3.bereitetMahlzeiten = [];
          this.$store.state.a3.bereitetMahlzeitenAndere = "";
          this.$store.state.a3.weitereAnmerkungenMahlzeiten = "";
          this.$store.state.a3.lebensmitteleinkauf = [];
          this.$store.state.a3.lebensmitteleinkaufAndere = "";
          this.$store.state.a3.selbstversorgen = "";
          this.$store.state.a3.selbstversorgenEingeschraenkt = "";
          this.$store.state.a3.selbstversorgenNein = "";
          this.$store.state.a3.einfachheitMahlzeitZuzubereiten = "";
          this.$store.state.a3.begruendungMahlzeitZuzubereiten = "";
          this.$store.state.a3.informationErnaehrung = [];
          this.$store.state.a3.informationErnaehrungAndere = "";
          this.$store.state.a3.weitereAnmerkungenInformationsquellen = "";
          this.$store.state.a3.orientierungErnaehrung = "";
          this.$store.state.a3.wichtigkeitDerEmpfehlung = "";
          this.$store.state.a3.wichtigkeitDerFrische = "";
          this.$store.state.a3.wichtigkeitDesGeschmacks = "";
          this.$store.state.a3.wichtigkeitDerGesundheit = "";
          this.$store.state.a3.wichtigkeitEinesGeringenPreises = "";
          this.$store.state.a3.wichtigkeitDerRegionalitaet = "";
          this.$store.state.a3.wichtigkeitDerSaisonalitaet = "";
          this.$store.state.a3.wichtigkeitAndere = [[{title:"", vmodel:"", input:true, button:true},{value:"sehr wichtig", id:"andere0sehrWichtig", name:"andere0"},{value:"wichtig", id:"andere0wichtig", name:"andere0"},{value:"eher wichtig", id:"andere0eherWichtig", name:"andere0"},{value:"eher unwichtig", id:"andere0eherUnwichtig", name:"andere0"},{value:"unwichtig", id:"andere0unwichtig", name:"andere0"},{value:"sehr unwichtig", id:"andere0sehrUnwichtig", name:"andere0"},]];
          this.$store.state.a3.counterAndere = 1;
          this.$store.state.a3.ernaehrungsgewohnheitenVeraendern = "";
          this.$store.state.a3.begruendungErnaehrungsgewohnheitenVeraendern = "";
          this.$store.state.a3.physicalActivityLevel = "";
          this.$store.state.a3.weitereAnmerkungenAktivitaet = "";
          this.$store.state.a3.whoLaune = 0;
          this.$store.state.a3.whoRuhig = 0;
          this.$store.state.a3.whoAktiv = 0;
          this.$store.state.a3.whoAusgeruht = 0;
          this.$store.state.a3.whoInteressieren = 0;
          this.$store.state.a4.koerpergroesse = "";
          this.$store.state.a4.koerpergewicht = "";
          this.$store.state.a4.taillenumfang = "";
          this.$store.state.a4.hautfaltendicke = "";
          this.$store.state.a4.fettfreieMasse = "";
          this.$store.state.a4.fettmasse = "";
          this.$store.state.a4.ruheenergieumsatz = "";
          this.$store.state.a4.chemieMetabolischeParameter = "";
          this.$store.state.a4.vitalzeichen = "";
          this.$store.state.a4.weitereMessungen = "";
          this.$store.state.a4.schlucken = "";
          this.$store.state.a4.schluckenJaAber = "";
          this.$store.state.a4.schluckenNein = "";
          this.$store.state.a4.erbrechen = "";
          this.$store.state.a4.erbrechenJa = "";
          this.$store.state.a4.mundgesundheit = [];
          this.$store.state.a4.mundgesundheitAndere = "";
          this.$store.state.a4.problemeNahrungsaufnahme = "";
          this.$store.state.a4.appetitBeeintraechtigung = "";
          this.$store.state.a4.weitereKoerperlicheBefunde = "";
          this.$store.state.d.diagnosestellung = [[{title: "Diätetisches Problem", vmodel:"", id:"diaetetischesProblem0", myTipp:"Informationen hierzu finden Sie im Assessment in der Kategorie Ernährungsgewohnheiten."},{title: "Ätiologie/Ursache", vmodel:"", id:"ursache0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie  Verhalten & Umfeld, aber auch in Klient*innengeschichte, Ernährungsgewohnheiten."},{title: "Zeichen und Symptome", vmodel:"",id:"symptome0", myTipp:"Informationen hierzu finden Sie im Assessment, in den Kategorien Klinischer Status und Ernährungsgewohnheiten."},{title: "positive Ressourcen", vmodel:"", id:"positiveRessourcen0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie  Verhalten & Umfeld, aber auch in Klient*innengeschichte, Ernährungsgewohnheiten."},{title: "negative Ressourcen", vmodel:"", id:"negativeRessourcen0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie  Verhalten & Umfeld, aber auch in Klient*innengeschichte, Ernährungsgewohnheiten."},]];
          this.$store.state.d.pasr = [];
          this.$store.state.d.counter = 1;
          this.$store.state.d.error = [];
          this.$store.state.d.errorList = [[]];
          this.$store.state.p.priorisierung = [];
          this.$store.state.p.zieleKlient = [{title: "Ziel", vmodel:"", id:"zielKlient0"}];
          this.$store.state.p.counterKlient = 1;
          this.$store.state.p.leitlinien = "";
          this.$store.state.p.zieleIntervention = [{title: "Ziel", vmodel:"", id:"zielIntervention0"}];
          this.$store.state.p.counterIntervention = 1;
          this.$store.state.p.interventionsform = [];
          this.$store.state.p.interventionsformAndere = "";
          this.$store.state.p.weitereAnmerkungenInterventionform = "";
          this.$store.state.p.zeitraumIntervention = "";
          this.$store.state.p.frequenzInterventionen = "";
          this.$store.state.p.zeitplanung = [{dauerEinzelberatung: "",inhaltIntervention: "",materialien: "",weitereAnmerkungenInterventionPlanung: "",}];
          this.$store.state.p.weitereBerufsgruppen = [];
          this.$store.state.p.weitereBerufsgruppenAndere = "";
          this.$store.state.p.angehoerige = "";
          this.$store.state.p.weitereAnmerkungenInterventionNochmal = "";
          this.$store.state.p.monitoring = [[{title:"", input:true},{title:"", input:true},{button:true}]];
          this.$store.state.p.einzelberatung = [{datum: "",dauer:"",inhalt: "",materialien: "",ergebnis:"",probleme:"",anmerkungen:"",}];
          this.$store.state.u.zusatznahrung = "";
          this.$store.state.u.zusatznahrungJa = [{datum: "",produktbezeichnung:"",verzehrshaeufigkeit:"",menge:""}];
          this.$store.state.u.sonstigesUmsetung = "";
          this.$store.state.p.entwicklungMonitoring = [[{datum: "",ergebnisse:"", }]];
          this.$store.state.e.evaluationEntwicklungMonitoring = [];
          this.$store.state.e.zielerreichungKlient = [];
          this.$store.state.e.begruendungZielerreichungKlient = [];
          this.$store.state.e.zielerreichungIntervention = [];
          this.$store.state.e.begruendungZielerreichungIntervention = [];
          this.$store.state.e.evaluationWeitersVorgehen = "";
        })
        .catch(error => {
          console.log(error);
        });
      },
    }
  }
</script>