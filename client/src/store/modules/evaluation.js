export default {
  namespaced: true,
  state: {
    evaluationEntwicklungMonitoring: [],
    zielerreichungUebergeordetesZiel: [],
    begruendungZielerreichungUebergeordetesZiel: [],
    zielerreichungVerlaufsziel:[],
    begruendungZielerreichungVerlaufsziel:[],
    evaluationWeitersVorgehen: "",
  },
  getters: {
    joinEntwicklungMonitoring(state, getters, rootState) {
      var array=[];
      for(var i=0; i<rootState.p.entwicklungMonitoring.length; i++){
        array.push("<p>"+ rootState.p.monitoring[i][0].title + "/"+rootState.p.monitoring[i][1].title , rootState.p.entwicklungMonitoring[i]+ "</p>")
      }
      return array
    },
    getUebergeordetesZiel(state, getters, rootState) {
      var array = [];
      for(var i=0; i<rootState.p.uebergeordetesZiel.length; i++) {
        if(rootState.p.uebergeordetesZiel[i].vmodel != '') {
          array.push(rootState.p.uebergeordetesZiel[i].vmodel)
        }
      }
      return array
    },
    getVerlaufsziel(state, getters, rootState) {
        var array = [];
        for(var i=0; i<rootState.p.verlaufsziel.length; i++) {
          if(rootState.p.verlaufsziel[i].vmodel != '') {
            array.push(rootState.p.verlaufsziel[i].vmodel)
          }
        }
        return array
      },
      evaluationUebergeordetesZiel(state, getters) {
        var array=[]
          for(var i=0; i < getters.getUebergeordetesZiel.length; i++){
            if(state.zielerreichungUebergeordetesZiel[i]){
              array[i] = getters.getUebergeordetesZiel[i] + " <b>Ziel erreicht: " + state.zielerreichungUebergeordetesZiel[i] + "</b>"
            }
            if(state.zielerreichungUebergeordetesZiel[i] && state.begruendungZielerreichungUebergeordetesZiel[i]){
              array[i] = getters.getUebergeordetesZiel[i] + " <b>Ziel erreicht: " + state.zielerreichungUebergeordetesZiel[i] + "</b>, " + state.begruendungZielerreichungUebergeordetesZiel[i]
            }
          }
        return array  
      },
      evaluationVerlaufsziel(state, getters) {
        var array=[]
          for(var i=0; i < getters.getVerlaufsziel.length; i++){
            if(state.zielerreichungVerlaufsziel[i]){
              array[i] = getters.getVerlaufsziel[i] + " <b>Ziel erreicht: " + state.zielerreichungVerlaufsziel[i] + "</b>"
            }
            if(state.zielerreichungVerlaufsziel[i] && state.begruendungZielerreichungVerlaufsziel[i]){
              array[i] = getters.getVerlaufsziel[i] + " <b>Ziel erreicht: " + state.zielerreichungVerlaufsziel[i] + "</b>, " + state.begruendungZielerreichungVerlaufsziel[i]
            }
          }
        return array  
      },
  },
  mutations: {
    evaluationEntwicklungMonitoring(state, value) {
      state.evaluationEntwicklungMonitoring = value
    },
    zielerreichungUebergeordetesZiel(state, value) {
      state.zielerreichungUebergeordetesZiel = value
    },
    begruendungZielerreichungUebergeordetesZiel(state, value) {
      state.begruendungZielerreichungUebergeordetesZiel = value
    },
    zielerreichungVerlaufsziel(state, value) {
      state.zielerreichungVerlaufsziel = value
    },
    begruendungZielerreichungVerlaufsziel(state, value) {
      state.begruendungZielerreichungVerlaufsziel = value
    },
    evaluationWeitersVorgehen(state, value) {
      state.evaluationWeitersVorgehen = value
    }
  },
}