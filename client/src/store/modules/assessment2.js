export default {
  namespaced: true,
  state: {
    uploadErnahrungsprotokoll: [],
    anzahlRecall: 0,
    recall:[],
    weitereGetraenke: "",
    anzahlMahlzeitenRecall: "",
    mahlzeitenNormalerweise: "",
    mahlzeitenWeggelassen: [],
    mahlzeitenZusaetzlich: [],
    mahlzeitenZusaetzlichAndere: "",
    weitereAnmerkungenRecall: "",
    getraenke:"",
    gemuese:"",
    obst: "",
    getreideprodukte: "",
    milch: "",
    fleisch: "",
    fisch: "",
    ei: "",
    fette: "",
    suessigkeiten: "",
    pikanteSnacks: "",
    energie: "",
    wasser: "",
    eiweiss: "",
    kohlenhydrate: "",
    zucker: "",
    ballaststoffe: "",
    gesamtfett: "",
    gesaettigteFettsaeuren: "",
    einfachUngesaettigte: "",
    mehrfachUngesaettigte: "",
    cholesterin: "",
    test: [[
      {title: "", vmodel:"", input:true, button:true},
      {value: "weniger",id:"test0Weniger",name:"test0"},
      {value: "entsprechend der Ernährungsempfehlung",id:"test0Entsprechend",name:"test0"},
      {value: "mehr",id:"test0Mehr",name:"test0"}, 
    ]],
    vitamine: [[
      {title: "", vmodel:"", input:true, button:true},
      {value: "weniger",id:"Vitamine0Weniger",name:"Vitamine0"},
      {value: "entsprechend der Ernährungsempfehlung",id:"Vitamine0Entsprechend",name:"Vitamine0"},
      {value: "mehr",id:"Vitamine0Mehr",name:"Vitamine0"}, 
    ]],
    counterVitamine:1,
    mineralstoffe: [[
      {title: "", vmodel:"", input:true, button:true},
      {value: "weniger",id:"Mineralstoffe0Weniger",name:"Mineralstoffe0"},
      {value: "entsprechend der Ernährungsempfehlung",id:"Mineralstoffe0Entsprechend",name:"Mineralstoffe0"},
      {value: "mehr",id:"Mineralstoffe0Mehr",name:"Mineralstoffe0"}, 
    ]],
    counterMineralstoffe:1,
    vorlieben: "",
    abneigungen: "",
    eigenstaendigeDiaet: "",
    eigenstaendigeDiaetJa: "",
    mahlzeitenAusserHaus: "",
    mahlzeitenAusserHausJa: "",
    diaetischeKostform: "",
    diaetischeKostformJa: [],
    diaetischeKostformJaAndere: "",
    enteraleErnaehrung: "",
    enteraleErnaehrungJa: "",
    medikamente: "",
    medikamenteJa: "",
    uploadAssessment2:[],
  },
  mutations: {
    uploadErnahrungsprotokoll(state, value){
      state.uploadErnahrungsprotokoll = value
    },
    anzahlRecall(state, value) {
      state.anzahlRecall = value
    },
    addTableRecall(state) {
      state.recall.push([{
        datum: "",
        mahlzeit:"",
        uhrzeit:"",
        wo:"",
        wer:"",
        lebensmittelGetraenke:"",
      }]);
      console.log("add Table Recall");
    },
    addNewRowRecall(state, index) {
      state.recall[index].push({
        mahlzeit:"",
        uhrzeit:"",
        wo:"",
        wer:"",
        lebensmittelGetraenke:"",
      });
      console.log("add Row Recall");
    },
    deleteRowRecall(state,payload) {
      state.recall[payload.tableIndex].splice(payload.rowIndex, 1);
      console.log("delete Row Recall");
    },
    deleteTableRecall(state,index) {
      state.recall.splice(index, 1);
      console.log("delete Table Recall")
    },
    weitereGetraenke(state, value) {
      state.weitereGetraenke = value
    },
    anzahlMahlzeitenRecall(state, value) {
      state.anzahlMahlzeitenRecall = value
    },
    mahlzeitenNormalerweise(state, value) {
      state.mahlzeitenNormalerweise = value
    },
    mahlzeitenWeggelassen(state, value) {
      state.mahlzeitenWeggelassen = value
    },
    mahlzeitenZusaetzlich(state, value) {
      state.mahlzeitenZusaetzlich = value
    },
    mahlzeitenZusaetzlichAndere(state, value) {
      state.mahlzeitenZusaetzlichAndere = value
    },
    weitereAnmerkungenRecall(state, value) {
      state.weitereAnmerkungenRecall = value
    },
    getraenke(state, value) {
      state.getraenke = value
    },
    gemuese(state, value) {
      state.gemuese = value
    },
    obst(state, value) {
      state.obst = value
    },
    getreideprodukte(state, value) {
      state.getreideprodukte = value
    },
    milch(state, value) {
      state.milch = value
    },
    fleisch(state, value) {
      state.fleisch = value
    },
    fisch(state, value) {
      state.fisch = value
    },
    ei(state, value) {
      state.ei = value
    },
    fette(state, value) {
      state.fette = value
    },
    suessigkeiten(state, value) {
      state.suessigkeiten = value
    },
    pikanteSnacks(state, value) {
      state.pikanteSnacks = value
    },
    energie(state, value) {
      state.energie = value
    },
    wasser(state, value) {
      state.wasser = value
    },
    eiweiss(state, value) {
      state.eiweiss = value
    },
    kohlenhydrate(state, value) {
      state.kohlenhydrate = value
    },
    zucker(state, value) {
      state.zucker = value
    },
    ballaststoffe(state, value) {
      state.ballaststoffe = value
    },
    gesamtfett(state, value) {
      state.gesamtfett = value
    },
    gesaettigteFettsaeuren(state, value) {
      state.gesaettigteFettsaeuren = value
    },
    einfachUngesaettigte(state, value) {
      state.einfachUngesaettigte = value
    },
    mehrfachUngesaettigte(state, value) {
      state.mehrfachUngesaettigte = value
    },
    cholesterin(state, value) {
      state.cholesterin = value
    },
    addNewRowVitamine(state) {
      state.vitamine.push([
        {title: "", vmodel:"", input:true, button:true},
        {value: "weniger",id:"vitamine"+state.counterVitamine+"Weniger",name:"vitamine"+state.counterVitamine},
        {value: "entsprechend der Ernährungsempfehlung",id:"vitamine"+state.counterVitamine+"Entsprechend",name:"vitamine"+state.counterVitamine},
        {value: "mehr",id:"vitamine"+state.counterVitamine+"Mehr",name:"vitamine"+state.counterVitamine},
      ]);
      state.counterVitamine++;
    },
    deleteRowVitamine(state, index) {
      state.vitamine.splice(index, 1);
    },
    addNewRowMineralstoffe(state) {
      state.mineralstoffe.push([
        {title: "", vmodel:"", input:true, button:true},
        {value: "weniger",id:"mineralstoffe"+state.counterMineralstoffe+"Weniger",name:"mineralstoffe"+state.counterMineralstoffe},
        {value: "entsprechend der Ernährungsempfehlung",id:"mineralstoffe"+state.counterMineralstoffe+"Entsprechend",name:"mineralstoffe"+state.counterMineralstoffe},
        {value: "mehr",id:"mineralstoffe"+state.counterMineralstoffe+"Mehr",name:"mineralstoffe"+state.counterMineralstoffe},
      ]);
      state.counterMineralstoffe++;
    },
    deleteRowMineralstoffe(state, index) {
      state.mineralstoffe.splice(index, 1);
    },
    vorlieben(state, value) {
      state.vorlieben = value
    },
    abneigungen(state, value) {
      state.abneigungen = value
    },
    eigenstaendigeDiaet(state, value) {
      state.eigenstaendigeDiaet = value
    },
    eigenstaendigeDiaetJa(state, value) {
      state.eigenstaendigeDiaetJa = value
    },
    mahlzeitenAusserHaus(state, value) {
      state.mahlzeitenAusserHaus = value
    },
    mahlzeitenAusserHausJa(state, value) {
      state.mahlzeitenAusserHausJa = value
    },
    diaetischeKostform(state, value) {
      state.diaetischeKostform = value
    },
    diaetischeKostformJa(state, value) {
      state.diaetischeKostformJa = value
    },
    diaetischeKostformJaAndere(state, value) {
      state.diaetischeKostformJaAndere = value
    },
    enteraleErnaehrung(state, value) {
      state.enteraleErnaehrung = value
    },
    enteraleErnaehrungJa(state, value) {
      state.enteraleErnaehrungJa = value
    },
    medikamente(state, value) {
      state.medikamente = value
    },
    medikamenteJa(state, value) {
      state.medikamenteJa = value
    },
    uploadAssessment2(state, value) {
      state.uploadAssessment2 = value
    },
  }
}