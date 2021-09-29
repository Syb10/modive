export default {
  namespaced: true,
  state: {
    diagnosestellung:[
      [
        {title: "Diätetisches Problem", vmodel:"", id:"diaetetischesProblem0", myTipp:"Informationen hierzu finden Sie im Assessment in der Kategorie Ernährungsgewohnheiten."},
        {title: "Ätiologie/Ursache", vmodel:"", id:"ursache0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie  Verhalten & Umfeld, aber auch in Klient*innengeschichte, Ernährungsgewohnheiten."}, 
        {title: "Zeichen und Symptome", vmodel:"",id:"symptome0", myTipp:"Informationen hierzu finden Sie im Assessment, in den Kategorien Klinischer Status und Ernährungsgewohnheiten."},
        {title: "positive Ressourcen", vmodel:"", id:"positiveRessourcen0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie  Verhalten & Umfeld, aber auch in Klient*innengeschichte, Ernährungsgewohnheiten."},
        {title: "negative Ressourcen", vmodel:"", id:"negativeRessourcen0", myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie  Verhalten & Umfeld, aber auch in Klient*innengeschichte, Ernährungsgewohnheiten."},
      ]
    ],
    pasr:[],
    counter:1,
    error: [false],
    errorList: [[]],
  },
  mutations:{
    addNewProblem(state) {
      state.diagnosestellung.push([
        {title: "Diätetisches Problem", vmodel:"", id:"diaetetischesProblem"+state.counter, myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in der Kategorie Ernährungsgewohnheiten."},
        {title: "Ätiologie/Ursache", vmodel:"", id:"ursache"+state.counter, myTipp:"Informationen hierzu finden Sie im Assessment, in den Kategorien Klient*innengeschichte, Ernährungsgewohnheiten, Verhalten & Umfeld."}, 
        {title: "Zeichen und Symptome", vmodel:"", id:"symptome"+state.counter, myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in den Kategorien Klinischer Status."},
        {title: "positive Ressourcen", vmodel:"", id:"positiveRessourcen"+state.counter, myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in den Kategorien Klient*innengeschichte, Verhalten & Umfeld."},
        {title: "negative Ressourcen", vmodel:"", id:"negativeRessourcen"+state.counter, myTipp:"Informationen hierzu finden Sie im Assessment, insbesondere in den Kategorien Klient*innengeschichte, Verhalten & Umfeld."},
      ]);
      state.counter++;
      state.errorList.push([]);
    },
    deleteProblem(state,index) {
      state.diagnosestellung.splice(index, 1);
      state.pasr.splice(index,1);
      state.error.splice(index,1);
      state.errorList.splice(index,1);
    },
    getPASR(state,payload) {
      if(payload.ernaehrungsproblem != "" && payload.ursache != "" && payload.symptome != "" && payload.pRessourcen != "" && payload.nRessourcen != ""){
        state.error[payload.index] = false;
        state.errorList[payload.index] = [];
        state.pasr[payload.index] = "Diätetisches Problem " + payload.ernaehrungsproblem.bold() + " bedingt durch Ätiologie/Ursache "+ payload.ursache.bold() +
        " nachgewiesen durch Zeichen und Symptomen " + payload.symptome.bold() + ". Unterstützend wirken sich die Ressourcen " + payload.pRessourcen.bold() + " aus. Hemmend wirken sich die Ressourcen " + payload.nRessourcen.bold() + " aus." 
      } else {
        payload.ernaehrungsproblem ? state.errorList[payload.index][0] = "" : state.errorList[payload.index][0] = "Ernährungsproblem"
        payload.ursache ? state.errorList[payload.index][1] = "" : state.errorList[payload.index][1] = "Ätiologie/Ursache"
        payload.symptome ? state.errorList[payload.index][2] = "" : state.errorList[payload.index][2] = "Zeichen und Symptomen"
        payload.pRessourcen ? state.errorList[payload.index][3] = "" : state.errorList[payload.index][3] = "positive Ressourcen"
        payload.nRessourcen ? state.errorList[payload.index][4] = "" : state.errorList[payload.index][4] = "negative Ressourcen"
        state.error[payload.index] = true;
      }
    }
  },
}