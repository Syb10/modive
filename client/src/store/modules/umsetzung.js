export default {
  namespaced: true,
  state: {
    zusatznahrung: "",
    zusatznahrungJa: [
      {
        datum: "",
        produktbezeichnung:"",
        verzehrshaeufigkeit:"",
        menge:""
      }
    ],
    sonstigesUmsetung: "",
  },
  mutations: {
    zusatznahrung(state, value) {
      state.zusatznahrung = value  
    },  
    addNewRowZusatznahrung(state) {
      state.zusatznahrungJa.push({
        datum: "",
        produktbezeichnung:"",
        verzehrshaeufigkeit:"",
        menge:"", 
      });
    },
    deleteRowZusatznahrung(state, index) {
      state.zusatznahrungJa.splice(index, 1);
    },
    sonstigesUmsetung(state, value) {
      state.sonstigesUmsetung = value  
    },
  }
}