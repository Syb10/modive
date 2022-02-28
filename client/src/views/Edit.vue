<template>
  <div>
    <p @click.prevent="resetKlient" class="mb-5"><i class="fa fa-arrow-left"></i> zurück</p>
    <form enctype="multipart/form-data">
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
          class="btn btn-grey mb-3 mr-3"
        >
          Änderungen speichern und beenden
        </button>
        <button
          type="submit"
          @click.prevent="saveKlient"
          class="btn btn-grey mb-3 mr-3"
        >
          Änderungen speichern
        </button>
        <button
          type="submit"
          @click.prevent="resetKlient"
          class="btn btn-grey mb-3"
        >
          Abbrechen
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
import axios from 'axios';
import {navMixin} from "../mixins/navMixin.js";

  export default {
    name: "Edit",
    mixins:[navMixin],
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
        this.$store.state.a1.uploadAssessment1 = res.data.assessment1.UploadAssessment1;

        this.$store.state.a2.uploadErnahrungsprotokoll = res.data.assessment2.UploadErnahrungsprotokoll;
        this.$store.state.a2.anzahlRecall = res.data.anzahlRecall;
        this.$store.state.a2.recall = res.data.Recall;
        this.$store.state.a2.weitereGetraenke = res.data.assessment2.weitereGetraenke;
        this.$store.state.a2.anzahlMahlzeitenRecall = res.data.assessment2.AnzahlMahlzeitenRecall;
        this.$store.state.a2.mahlzeitenNormalerweise = res.data.assessment2.MahlzeitenNormalerweise;
        this.$store.state.a2.mahlzeitenWeggelassen = res.data.assessment2.MahlzeitenWeggelassen;
        this.$store.state.a2.mahlzeitenZusaetzlich = res.data.assessment2.MahlzeitenZusaetzlich[0];
        this.$store.state.a2.mahlzeitenZusaetzlichAndere = res.data.assessment2.MahlzeitenZusaetzlich[1];
        this.$store.state.a2.weitereAnmerkungenRecall = res.data.assessment2.weitereAnmerkungenRecall;
        this.$store.state.a2.uploadAssessment2 = res.data.assessment2.UploadAssessment2;

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
        this.$store.state.a3.uploadLebensqualitaet = res.data.assessment3.UploadLebensqualitaet;
        this.$store.state.a3.uploadAssessment3 = res.data.assessment3.UploadAssessment3;

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
        this.$store.state.a4.uploadAssessment4 = res.data.assessment4.UploadAssessment4;

        this.$store.state.d.diagnosestellung = res.data.Diagnosestellung;
        this.$store.state.d.pasr = res.data.PASR;
        this.$store.state.d.counter = res.data.Counter;
        this.$store.state.d.error = res.data.Error;
        this.$store.state.d.errorList = res.data.ErrorList;

        this.$store.state.p.priorisierung = res.data.Priorisierung;
        this.$store.state.p.leitlinien = res.data.planung.Leitlinien;
        this.$store.state.p.uebergeordetesZiel = res.data.UebergeordetesZiel;
        this.$store.state.p.counterUebergeordetesZiel = res.data.planung.CounterUebergeordetesZiel;     
        this.$store.state.p.verlaufsziel = res.data.Verlaufsziel;
        this.$store.state.p.counterVerlaufsziel = res.data.planung.CounterVerlaufsziel;
        this.$store.state.p.ernaehrungsempfehlung = res.data.planung.Ernaehrungsempfehlung;
        this.$store.state.p.interventionsform = res.data.planung.Interventionsform[0];
        this.$store.state.p.interventionsformAndere = res.data.planung.Interventionsform[1];
        this.$store.state.p.weitereAnmerkungenInterventionform = res.data.planung.WeitereAnmerkungenInterventionform;
        this.$store.state.p.zeitraumIntervention = res.data.planung.ZeitraumIntervention;
        this.$store.state.p.frequenzInterventionen = res.data.planung.FrequenzInterventionen;
        this.$store.state.p.planungEinzelberatung = res.data.planung.PlanungEinzelberatung;
        this.$store.state.p.planungGruppenschulung = res.data.planung.PlanungGruppenschulung;
        this.$store.state.p.planungEinkaufstraining = res.data.planung.PlanungEinkaufstraining;
        this.$store.state.p.planungLehrkueche = res.data.planung.PlanungLehrkueche;
        this.$store.state.p.planungAndereInterventionsform = res.data.planung.PlanungAndereInterventionsform;
        this.$store.state.p.weitereBerufsgruppen = res.data.planung.WeitereBerufsgruppen[0];
        this.$store.state.p.weitereBerufsgruppenAndere = res.data.planung.WeitereBerufsgruppen[1];
        this.$store.state.p.angehoerige = res.data.planung.Angehoerige;
        this.$store.state.p.weitereAnmerkungenInterventionNochmal = res.data.planung.WeitereAnmerkungenInterventionNochmal;
        this.$store.state.p.monitoring = res.data.planung.Monitoring;

        this.$store.state.p.einzelberatung = res.data.UmsetzungEinzelberatung;
        this.$store.state.p.gruppenschulung = res.data.UmsetzungGruppenschulung;
        this.$store.state.p.einkaufstraining = res.data.UmsetzungEinkaufstraining;
        this.$store.state.p.lehrkueche = res.data.UmsetzungLehrkueche;
        this.$store.state.p.andereInterventionsform = res.data.UmsetzungAndereInterventionsform;
        this.$store.state.u.zusatznahrung = res.data.Zusatznahrung;
        this.$store.state.u.zusatznahrungJa = res.data.EntwicklungZusatznahrung;
        this.$store.state.u.sonstigesUmsetung = res.data.SonstigesUmsetung;        
        this.$store.state.p.entwicklungMonitoring = res.data.EntwicklungMonitoring;
        
        this.$store.state.e.evaluationEntwicklungMonitoring = res.data.evaluation.EvaluationEntwicklungMonitoring;
        this.$store.state.e.zielerreichungUebergeordetesZiel = res.data.evaluation.ZielerreichungUebergeordetesZiel;
        this.$store.state.e.begruendungZielerreichungUebergeordetesZiel = res.data.evaluation.BegruendungZielerreichungUebergeordetesZiel;
        this.$store.state.e.zielerreichungVerlaufsziel = res.data.evaluation.ZielerreichungVerlaufsziel;
        this.$store.state.e.begruendungZielerreichungVerlaufsziel = res.data.evaluation.BegruendungZielerreichungVerlaufsziel;
        this.$store.state.e.evaluationWeitersVorgehen = res.data.evaluation.EvaluationWeitersVorgehen;
        
      })
    },
    methods: {
      updateKlient() {
        let apiURL = `http://localhost:9000/api/${this.$route.params.id}`;

        axios.put(apiURL, this.klient)
        .then(response => {
          console.log(response);
          this.resetKlient();
        })
        .catch(error => {
          console.log(error);
        });
      },
      saveKlient() {
        let apiURL = `http://localhost:9000/api/${this.$route.params.id}`;

        axios.put(apiURL, this.klient)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      },
    }
  }
</script>