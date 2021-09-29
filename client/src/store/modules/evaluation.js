export default {
  namespaced: true,
  state: {
    evaluationEntwicklungMonitoring: [],
    zielerreichungKlient: [],
    begruendungZielerreichungKlient: [],
    zielerreichungIntervention:[],
    begruendungZielerreichungIntervention:[],
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
    getZieleKlient(state, getters, rootState) {
      var array = [];
      for(var i=0; i<rootState.p.zieleKlient.length; i++) {
        if(rootState.p.zieleKlient[i].vmodel != '') {
          array.push(rootState.p.zieleKlient[i].vmodel)
        }
      }
      return array
    },
    getZieleIntervention(state, getters, rootState) {
        var array = [];
        for(var i=0; i<rootState.p.zieleIntervention.length; i++) {
          if(rootState.p.zieleIntervention[i].vmodel != '') {
            array.push(rootState.p.zieleIntervention[i].vmodel)
          }
        }
        return array
      },
      evaluationZieleKlient(state, getters) {
        var array=[]
          for(var i=0; i < getters.getZieleKlient.length; i++){
            if(state.zielerreichungKlient[i]){
              array[i] = getters.getZieleKlient[i] + " <b>Ziel erreicht: " + state.zielerreichungKlient[i] + "</b>"
            }
            if(state.zielerreichungKlient[i] && state.begruendungZielerreichungKlient[i]){
              array[i] = getters.getZieleKlient[i] + " <b>Ziel erreicht: " + state.zielerreichungKlient[i] + "</b>, " + state.begruendungZielerreichungKlient[i]
            }
          }
        return array  
      },
      evaluationZieleIntervention(state, getters) {
        var array=[]
          for(var i=0; i < getters.getZieleIntervention.length; i++){
            if(state.zielerreichungIntervention[i]){
              array[i] = getters.getZieleIntervention[i] + " <b>Ziel erreicht: " + state.zielerreichungIntervention[i] + "</b>"
            }
            if(state.zielerreichungIntervention[i] && state.begruendungZielerreichungIntervention[i]){
              array[i] = getters.getZieleIntervention[i] + " <b>Ziel erreicht: " + state.zielerreichungIntervention[i] + "</b>, " + state.begruendungZielerreichungIntervention[i]
            }
          }
        return array  
      },
  },
  mutations: {
    evaluationEntwicklungMonitoring(state, value) {
      state.evaluationEntwicklungMonitoring = value
    },
    zielerreichungKlient(state, value) {
      state.zielerreichungKlient = value
    },
    begruendungZielerreichungKlient(state, value) {
      state.begruendungZielerreichungKlient = value
    },
    zielerreichungIntervention(state, value) {
      state.zielerreichungIntervention = value
    },
    begruendungZielerreichungIntervention(state, value) {
      state.begruendungZielerreichungIntervention = value
    },
    evaluationWeitersVorgehen(state, value) {
      state.evaluationWeitersVorgehen = value
    }
  },
}