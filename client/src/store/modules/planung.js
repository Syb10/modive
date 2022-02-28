export default {
    namespaced: true,
    state: {
      priorisierung: [],
      leitlinien: "",
      uebergeordetesZiel:[{title: "Übergeordnetes Ziel (diätetisches Outcome)", vmodel:"", id:"uebergeordetesZiel0"}],
      counterUebergeordetesZiel:1,
      verlaufsziel: [{title: "Verlaufsziel", vmodel:"", id:"verlaufsziel0"}],
      counterVerlaufsziel: 1,
      ernaehrungsempfehlung: "",
      interventionsform: [],
      interventionsformAndere: "",
      weitereAnmerkungenInterventionform: "",
      zeitraumIntervention: "",
      frequenzInterventionen: "",
      planungEinzelberatung:[
        {
          dauer: "",
          inhalt: "",
          materialien: "",
          weitereAnmerkungen: "",
        }
      ],
      planungGruppenschulung:[
        {
          dauer: "",
          inhalt: "",
          materialien: "",
          weitereAnmerkungen: "",
        }
      ],
      planungEinkaufstraining:[
        {
          dauer: "",
          inhalt: "",
          materialien: "",
          weitereAnmerkungen: "",
        }
      ],
      planungLehrkueche:[
        {
          dauer: "",
          inhalt: "",
          materialien: "",
          weitereAnmerkungen: "",
        }
      ],
      planungAndereInterventionsform:[
        {
          dauer: "",
          inhalt: "",
          materialien: "",
          weitereAnmerkungen: "",
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
      gruppenschulung: [
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
      einkaufstraining: [
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
      lehrkueche: [
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
      andereInterventionsform: [
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
      leitlinien(state, value) {
        state.leitlinien = value
      },
      addNewUebergeordetesZiel(state) {
        state.uebergeordetesZiel.push(
          {title: "Übergeordnetes Ziel (diätetisches Outcome)", vmodel:"", id:"uebergeordetesZiel"+state.counterUebergeordetesZiel},
        );
        state.counterUebergeordetesZiel++;
      },
      deleteUebergeordetesZiel(state, index) {
        state.uebergeordetesZiel.splice(index, 1);
      },
      addNewVerlaufsziel(state) {
        state.verlaufsziel.push(
          {title: "Verlaufsziel", vmodel:"", id:"verlaufsziel"+state.counterVerlaufsziel},
        );
        state.counterVerlaufsziel++;
      },
      deleteVerlaufsziel(state, index) {
        state.verlaufsziel.splice(index, 1);
      },
      ernaehrungsempfehlung(state, value){
        state.ernaehrungsempfehlung = value
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
      addNewRowPlanungEinzelberatung(state) {
        state.planungEinzelberatung.push({
          dauer: "",
          inhalt: "",
          materialien: "",
          weitereAnmerkungen: "",
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
      deleteRowPlanungEinzelberatung(state,index) {
        state.planungEinzelberatung.splice(index, 1);
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
        var dauerPlanung = payload.value.dauer;
        var dauerUmsetzung = state.einzelberatung[payload.index].dauer;
        var inhaltPlanung = payload.value.inhalt;
        var inhaltUmsetzung = state.einzelberatung[payload.index].inhalt;
        var materialienPlanung = payload.value.materialien;
        var materialienUmsetzung = state.einzelberatung[payload.index].materialien;
        var anmerkungenPlanung = payload.value.weitereAnmerkungen;
        var anmerkungenUmsetzung = state.einzelberatung[payload.index].anmerkungen;

        if(!dauerUmsetzung.includes(dauerPlanung)) {
          state.einzelberatung[payload.index].dauer += payload.value.dauer;
        }
        if(!inhaltUmsetzung.includes(inhaltPlanung)) {
          state.einzelberatung[payload.index].inhalt += payload.value.inhalt;
        }
        if(!materialienUmsetzung.includes(materialienPlanung)) {
        state.einzelberatung[payload.index].materialien += payload.value.materialien;
        }
        if(!anmerkungenUmsetzung.includes(anmerkungenPlanung)) {
        state.einzelberatung[payload.index].anmerkungen += payload.value.weitereAnmerkungen;
        } 
      },
      addNewRowPlanungGruppenschulung(state) {
        state.planungGruppenschulung.push({
          dauer: "",
          inhalt: "",
          materialien: "",
          weitereAnmerkungen: "",
        });
        state.gruppenschulung.push({
          datum: "",
          dauer: "",
          inhalt: "",
          materialien: "",
          ergebnis:"",
          probleme:"",
          anmerkungen: "",
        });
      },
      deleteRowPlanungGruppenschulung(state,index) {
        state.planungGruppenschulung.splice(index, 1);
        state.gruppenschulung.splice(index, 1);
      },
      addNewRowGruppenschulung(state) {
        state.gruppenschulung.push({
          datum: "",
          dauer:"",
          inhalt: "",
          materialien:"",
          ergebnis:"",
          probleme:"",
          anmerkungen:"",
        });
      },
      deleteRowGruppenschulung(state, index) {
        state.gruppenschulung.splice(index, 1);
      },
      updateGruppenschulung(state, payload) {
        if(state.gruppenschulung[payload.index] == undefined) {
          state.gruppenschulung.push({
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
        var dauerPlanung = payload.value.dauer;
        var dauerUmsetzung = state.gruppenschulung[payload.index].dauer;
        var inhaltPlanung = payload.value.inhalt;
        var inhaltUmsetzung = state.gruppenschulung[payload.index].inhalt;
        var materialienPlanung = payload.value.materialien;
        var materialienUmsetzung = state.gruppenschulung[payload.index].materialien;
        var anmerkungenPlanung = payload.value.weitereAnmerkungen;
        var anmerkungenUmsetzung = state.gruppenschulung[payload.index].anmerkungen;

        if(!dauerUmsetzung.includes(dauerPlanung)) {
          state.gruppenschulung[payload.index].dauer += payload.value.dauer;
        }
        if(!inhaltUmsetzung.includes(inhaltPlanung)) {
          state.gruppenschulung[payload.index].inhalt += payload.value.inhalt;
        }
        if(!materialienUmsetzung.includes(materialienPlanung)) {
        state.gruppenschulung[payload.index].materialien += payload.value.materialien;
        }
        if(!anmerkungenUmsetzung.includes(anmerkungenPlanung)) {
        state.gruppenschulung[payload.index].anmerkungen += payload.value.weitereAnmerkungen;
        } 
      },
      addNewRowPlanungEinkaufstraining(state) {
        state.planungEinkaufstraining.push({
          dauer: "",
          inhalt: "",
          materialien: "",
          weitereAnmerkungen: "",
        });
        state.einkaufstraining.push({
          datum: "",
          dauer: "",
          inhalt: "",
          materialien: "",
          ergebnis:"",
          probleme:"",
          anmerkungen: "",
        });
      },
      deleteRowPlanungEinkaufstraining(state,index) {
        state.planungEinkaufstraining.splice(index, 1);
        state.einkaufstraining.splice(index, 1);
      },
      addNewRowEinkaufstraining(state) {
        state.einkaufstraining.push({
          datum: "",
          dauer:"",
          inhalt: "",
          materialien:"",
          ergebnis:"",
          probleme:"",
          anmerkungen:"",
        });
      },
      deleteRowEinkaufstraining(state, index) {
        state.einkaufstraining.splice(index, 1);
      },
      updateEinkaufstraining(state, payload) {
        if(state.einkaufstraining[payload.index] == undefined) {
          state.einkaufstraining.push({
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
        var dauerPlanung = payload.value.dauer;
        var dauerUmsetzung = state.einkaufstraining[payload.index].dauer;
        var inhaltPlanung = payload.value.inhalt;
        var inhaltUmsetzung = state.einkaufstraining[payload.index].inhalt;
        var materialienPlanung = payload.value.materialien;
        var materialienUmsetzung = state.einkaufstraining[payload.index].materialien;
        var anmerkungenPlanung = payload.value.weitereAnmerkungen;
        var anmerkungenUmsetzung = state.einkaufstraining[payload.index].anmerkungen;

        if(!dauerUmsetzung.includes(dauerPlanung)) {
          state.einkaufstraining[payload.index].dauer += payload.value.dauer;
        }
        if(!inhaltUmsetzung.includes(inhaltPlanung)) {
          state.einkaufstraining[payload.index].inhalt += payload.value.inhalt;
        }
        if(!materialienUmsetzung.includes(materialienPlanung)) {
        state.einkaufstraining[payload.index].materialien += payload.value.materialien;
        }
        if(!anmerkungenUmsetzung.includes(anmerkungenPlanung)) {
        state.einkaufstraining[payload.index].anmerkungen += payload.value.weitereAnmerkungen;
        } 
      },
      addNewRowPlanungLehrkueche(state) {
        state.planungLehrkueche.push({
          dauer: "",
          inhalt: "",
          materialien: "",
          weitereAnmerkungen: "",
        });
        state.lehrkueche.push({
          datum: "",
          dauer: "",
          inhalt: "",
          materialien: "",
          ergebnis:"",
          probleme:"",
          anmerkungen: "",
        });
      },
      deleteRowPlanungLehrkueche(state,index) {
        state.planungLehrkueche.splice(index, 1);
        state.lehrkueche.splice(index, 1);
      },
      addNewRowLehrkueche(state) {
        state.lehrkueche.push({
          datum: "",
          dauer:"",
          inhalt: "",
          materialien:"",
          ergebnis:"",
          probleme:"",
          anmerkungen:"",
        });
      },
      deleteRowLehrkueche(state, index) {
        state.lehrkueche.splice(index, 1);
      },
      updateLehrkueche(state, payload) {
        if(state.lehrkueche[payload.index] == undefined) {
          state.lehrkueche.push({
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
        var dauerPlanung = payload.value.dauer;
        var dauerUmsetzung = state.lehrkueche[payload.index].dauer;
        var inhaltPlanung = payload.value.inhalt;
        var inhaltUmsetzung = state.lehrkueche[payload.index].inhalt;
        var materialienPlanung = payload.value.materialien;
        var materialienUmsetzung = state.lehrkueche[payload.index].materialien;
        var anmerkungenPlanung = payload.value.weitereAnmerkungen;
        var anmerkungenUmsetzung = state.lehrkueche[payload.index].anmerkungen;

        if(!dauerUmsetzung.includes(dauerPlanung)) {
          state.lehrkueche[payload.index].dauer += payload.value.dauer;
        }
        if(!inhaltUmsetzung.includes(inhaltPlanung)) {
          state.lehrkueche[payload.index].inhalt += payload.value.inhalt;
        }
        if(!materialienUmsetzung.includes(materialienPlanung)) {
        state.lehrkueche[payload.index].materialien += payload.value.materialien;
        }
        if(!anmerkungenUmsetzung.includes(anmerkungenPlanung)) {
        state.lehrkueche[payload.index].anmerkungen += payload.value.weitereAnmerkungen;
        } 
      },
      addNewRowPlanungAndereInterventionsform(state) {
        state.planungAndereInterventionsform.push({
          dauer: "",
          inhalt: "",
          materialien: "",
          weitereAnmerkungen: "",
        });
        state.andereInterventionsform.push({
          datum: "",
          dauer: "",
          inhalt: "",
          materialien: "",
          ergebnis:"",
          probleme:"",
          anmerkungen: "",
        });
      },
      deleteRowPlanungAndereInterventionsform(state,index) {
        state.planungAndereInterventionsform.splice(index, 1);
        state.andereInterventionsform.splice(index, 1);
      },
      addNewRowAndereInterventionsform(state) {
        state.andereInterventionsform.push({
          datum: "",
          dauer:"",
          inhalt: "",
          materialien:"",
          ergebnis:"",
          probleme:"",
          anmerkungen:"",
        });
      },
      deleteRowAndereInterventionsform(state, index) {
        state.andereInterventionsform.splice(index, 1);
      },
      updateAndereInterventionsform(state, payload) {
        if(state.andereInterventionsform[payload.index] == undefined) {
          state.andereInterventionsform.push({
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
        var dauerPlanung = payload.value.dauer;
        var dauerUmsetzung = state.andereInterventionsform[payload.index].dauer;
        var inhaltPlanung = payload.value.inhalt;
        var inhaltUmsetzung = state.andereInterventionsform[payload.index].inhalt;
        var materialienPlanung = payload.value.materialien;
        var materialienUmsetzung = state.andereInterventionsform[payload.index].materialien;
        var anmerkungenPlanung = payload.value.weitereAnmerkungen;
        var anmerkungenUmsetzung = state.andereInterventionsform[payload.index].anmerkungen;

        if(!dauerUmsetzung.includes(dauerPlanung)) {
          state.andereInterventionsform[payload.index].dauer += payload.value.dauer;
        }
        if(!inhaltUmsetzung.includes(inhaltPlanung)) {
          state.andereInterventionsform[payload.index].inhalt += payload.value.inhalt;
        }
        if(!materialienUmsetzung.includes(materialienPlanung)) {
        state.andereInterventionsform[payload.index].materialien += payload.value.materialien;
        }
        if(!anmerkungenUmsetzung.includes(anmerkungenPlanung)) {
        state.andereInterventionsform[payload.index].anmerkungen += payload.value.weitereAnmerkungen;
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