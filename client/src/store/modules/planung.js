export default {
    namespaced: true,
    state: {
      priorisierung: [],
      zieleKlient:[{title: "Ziel", vmodel:"", id:"zielKlient0"}],
      counterKlient:1,
      leitlinien: "",
      zieleIntervention: [{title: "Ziel", vmodel:"", id:"zielIntervention0"}],
      counterIntervention: 1,
      interventionsform: [],
      interventionsformAndere: "",
      weitereAnmerkungenInterventionform: "",
      zeitraumIntervention: "",
      frequenzInterventionen: "",
      zeitplanung:[
        {
          dauerEinzelberatung: "",
          inhaltIntervention: "",
          materialien: "",
          weitereAnmerkungenInterventionPlanung: "",
        }
      ],
      weitereBerufsgruppen: [],
      weitereBerufsgruppenAndere: "",
      angehoerige: "",
      weitereAnmerkungenInterventionNochmal: "",
      monitoring: [[
        {title:"", input:true},
        {title:"", input:true},
        {button:true}
      ]],


      //gehoert zur Umsetzung
      einzelberatung: [
        {
          datum: "",
          dauer:"",
          inhalt: "",
          materialien: "",
          ergebnis:"",
          probleme:"",
          anmerkungen:"",
        }
      ],
      entwicklungMonitoring: [
        [{
          datum: "",
          ergebnisse:"", 
        }]
      ],


    },
    getters: {
      joinPrio(state, getters, rootState) {
        var array = [];
        for(var i=0; i<state.priorisierung.length; i++) {
          array.push("<p>"+state.priorisierung[i]+". "+rootState.d.formD.pasr[i]+"</p>");
          array.sort();
        }
        return array
      },
      joinMonitoring(state) {
        var array = [];
        for(var i=0; i<state.monitoring.length; i++) {
          if(state.monitoring[i][0].title != '' || state.monitoring[i][1].title != '') {
            array.push([state.monitoring[i][0].title, state.monitoring[i][1].title])
          }
        }
        return array
      }
    },
    mutations: {
      priorisierung(state, value) {
        state.priorisierung = value
      },
      addNewZielKlient(state) {
        state.zieleKlient.push(
          {title: "Ziel", vmodel:"", id:"zielKlient"+state.counterKlient},
        );
        state.counterKlient++;
      },
      deleteZielKlient(state, index) {
        state.zieleKlient.splice(index, 1);
      },
      leitlinien(state, value) {
        state.leitlinien = value
      },
      addNewZielIntervention(state) {
        state.zieleIntervention.push(
          {title: "Ziel", vmodel:"", id:"zielIntervention"+state.counterIntervention},
        );
        state.counterIntervention++;
      },
      deleteZielIntervention(state, index) {
        state.zieleIntervention.splice(index, 1);
      },
      interventionsform(state, value) {
        state.interventionsform = value
      },
      interventionsformAndere(state, value) {
        state.interventionsformAndere = value
      },
      weitereAnmerkungenInterventionform(state, value) {
        state.weitereAnmerkungenInterventionform = value
      },
      zeitraumIntervention(state, value) {
        state.zeitraumIntervention = value
      },
      frequenzInterventionen(state, value) {
        state.frequenzInterventionen = value
      },
      addNewRowZeitplanung(state) {
        state.zeitplanung.push({
          dauerEinzelberatung: "",
          inhaltIntervention: "",
          materialien: "",
          weitereAnmerkungenInterventionPlanung: "",
        });
        state.einzelberatung.push({
          datum: "",
          dauer: "",
          inhalt: "",
          materialien: "",
          ergebnis:"",
          probleme:"",
          anmerkungen: "",
        });
      },
      deleteRowZeitplanung(state,index) {
        state.zeitplanung.splice(index, 1);
        state.einzelberatung.splice(index, 1);
      },
      addNewRowEinzelberatung(state) {
        state.einzelberatung.push({
          datum: "",
          dauer:"",
          inhalt: "",
          materialien:"",
          ergebnis:"",
          probleme:"",
          anmerkungen:"",
        });
      },
      deleteRowEinzelberatung(state, index) {
        state.einzelberatung.splice(index, 1);
      },
      updateEinzelberatung(state, payload) {
        if(state.einzelberatung[payload.index] == undefined) {
          state.einzelberatung.push({
            datum: "",
            dauer:"",
            inhalt: "",
            materialien:"",
            ergebnis:"",
            probleme:"",
            anmerkungen:"",
          });
        }
        // wenn Inhalte aus der Planung noch nicht in der Umsetzung sind, werden diese dazu getan
        var dauerPlanung = payload.value.dauerEinzelberatung;
        var dauerUmsetzung = state.einzelberatung[payload.index].dauer;
        var inhaltPlanung = payload.value.inhaltIntervention;
        var inhaltUmsetzung = state.einzelberatung[payload.index].inhalt;
        var materialienPlanung = payload.value.materialien;
        var materialienUmsetzung = state.einzelberatung[payload.index].materialien;
        var anmerkungenPlanung = payload.value.weitereAnmerkungenInterventionPlanung;
        var anmerkungenUmsetzung = state.einzelberatung[payload.index].anmerkungen;

        if(!dauerUmsetzung.includes(dauerPlanung)) {
          state.einzelberatung[payload.index].dauer += payload.value.dauerEinzelberatung;
        }
        if(!inhaltUmsetzung.includes(inhaltPlanung)) {
          state.einzelberatung[payload.index].inhalt += payload.value.inhaltIntervention;
        }
        if(!materialienUmsetzung.includes(materialienPlanung)) {
        state.einzelberatung[payload.index].materialien += payload.value.materialien;
        }
        if(!anmerkungenUmsetzung.includes(anmerkungenPlanung)) {
        state.einzelberatung[payload.index].anmerkungen += payload.value.weitereAnmerkungenInterventionPlanung;
        } 
      },
      weitereBerufsgruppen(state, value) {
        state.weitereBerufsgruppen = value
      },
      weitereBerufsgruppenAndere(state, value) {
        state.weitereBerufsgruppenAndere = value
      },
      angehoerige(state, value) {
        state.angehoerige = value
      },
      weitereAnmerkungenInterventionNochmal(state, value) {
        state.weitereAnmerkungenInterventionNochmal = value
      },
      addNewRowMonitoring(state) {
        state.monitoring.push([
          {title: "", input:true},
          {title: "", input:true},
          {button:true}
        ]);
       state.entwicklungMonitoring.push([{
          datum: "",
          ergebnisse:"", 
        }]);
      },
      deleteRowMonitoring(state, index) {
        state.monitoring.splice(index, 1);
        state.entwicklungMonitoring.splice(index, 1);
      },
      addNewRowEntwicklungMonitoring(state, index) {
        state.entwicklungMonitoring[index].push({
          datum:"",
          ergebnisse:"", 
        });
      },
      deleteRowEntwicklungMonitoring(state, payload) {
        state.entwicklungMonitoring[payload.indexI].splice(payload.index, 1);
      },
    },
}