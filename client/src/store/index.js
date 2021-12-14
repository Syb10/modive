import { createStore} from "vuex";
import assessment1 from "./modules/assessment1";
import assessment2 from "./modules/assessment2";
import assessment3 from "./modules/assessment3";
import assessment4 from "./modules/assessment4";
import diagnosestellung from "./modules/diagnosestellung";
import evaluation from "./modules/evaluation";
import planung from "./modules/planung";
import umsetzung from "./modules/umsetzung";

export default createStore({
  modules: {
    a1: assessment1,
    a2: assessment2,
    a3: assessment3,
    a4: assessment4,
    d: diagnosestellung,
    p: planung,
    u: umsetzung,
    e: evaluation,
  },
  state: {
    vorname:"",
    nachname: "",
    geburtsdatum:"",
    isLogged: false,
  },
  getters: {},
  mutations: {
    vorname(state, value) {
      state.vorname = value
    },
    nachname(state, value) {
      state.nachname = value
    },
    geburtsdatum(state, value) {
      state.geburtsdatum = value
    },
    isLogged(state, value) {
      state.isLogged = value
    },
  },
  actions: {},
});