<template>
  <div>
    <div id="nav" ref="nav">
      <router-link to="/">Formular</router-link> |
      <router-link to="/list">Klienten-Liste</router-link>
    </div>
    <div class="container mt-5">
      <router-view/>
    </div>
    <button @click.prevent="scrollMeTo('nav')" class="nachObenButton btn"><i class="fa fa-arrow-circle-up"></i></button>
  </div>
</template>

<script>
  export default {
    name: "App",
    methods: {
      //https://stackoverflow.com/questions/42645964/vue-js-anchor-to-div-within-the-same-component
      scrollMeTo(refName) {
        var element = this.$refs[refName];
        element.scrollIntoView({behavior: 'smooth'});
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


/************************** 
 style menu tab button
 **************************/
.tab-button{
  border-radius: 0 !important;
  opacity: 0.6;
}
.tab-button:hover{
  opacity: 1;
  
}
.tab-button.active{
  opacity: 1;
}
.tab-button-assessment{
  border: 1px solid #9a884f !important;
  background-color: white !important;
  color: #9a884f !important;
}
.tab-button-assessment:hover{
  background-color: #9a884f !important;
  color: white !important;  
}
.tab-button-assessment.active{
  background-color: #9a884f !important;
  color: white !important;
}
.tab-button-planung{
  border: 1px solid #376f75 !important;
  background-color: white !important;
  color: #376f75 !important;
}
.tab-button-planung:hover{
  background-color: #376f75 !important;
  color: white !important;  
}
.tab-button-planung.active{
  background-color: #376f75 !important;
  color: white !important;
}

/************************** 
 style menu color
 **************************/
#assessment{
  background-color: #9a884f !important;
  border: 1px solid #9a884f !important;
  color: white !important;
}
#diagnosestellung{
  background-color: #6eaead !important;
  border: 1px solid #6eaead !important;
  color: white !important;
}
#planung{
  background-color: #376f75 !important;
  border: 1px solid #376f75 !important;
  color: white !important;
}
#umsetzung{
  background-color: #00303C !important;
  border: 1px solid #00303C !important;
  color: white !important;
}
#evaluation{
  background-color: #72BF44 !important;
  border: 1px solid #72BF44 !important;
  color: white !important;
}

/*******************************
 style p-tag Headline
 ********************************/
.assessmentAspekt{
  color: #9a884f;
  font-weight: bold;
}
.diagnosestellungAspekt{
  color: #6eaead;
  font-weight: bold;
}
.planungAspekt{
  color: #376f75;
  font-weight: bold;
}
.umsetzungAspekt{
  color: #00303C;
  font-weight: bold;
}
.evaluationAspekt{
  color: #72BF44;
  font-weight: bold; 
}

/******************************
 style form 
 *****************************/
.form-control.inputForm{
  border-radius: 0 0.25rem 0.25rem 0 !important;
}
.input-group-text.inputForm{
  border-radius: 0.25rem 0 0 0.25rem !important;
  color: white;
}
.form-control.textareaForm{
  border-radius: 0 0 0.25rem 0.25rem  !important;
}
.input-group-text.textareaForm{
  border-radius: 0.25rem 0.25rem 0 0  !important;
  color: white;
}
.input-group-text.normal-white-space{
  white-space: normal;
  color: white;
}
.checkbox {
  border-radius: 0 0.25rem 0.25rem 0 !important;
}
.assessmentColor {
  background-color: #9a884f !important;
  border: 1px solid #9a884f !important;
  color: white;
}
.assessmentBorder {
  border: 1px solid #9a884f !important;
}
.diagnosestellungColor {
  background-color: #6eaead !important;
  border: 1px solid #6eaead !important;
  color: white;
}
.diagnosestellungBorder {
  border: 1px solid #6eaead !important;
}
.planungColor {
  background-color: #376f75 !important;
  border: 1px solid #376f75 !important;
  color: white;
}
.planungBorder {
  border: 1px solid #376f75 !important;
}
.umsetzungColor {
  background-color: #00303C !important;
  border: 1px solid #00303C !important;
  color: white;
}
.umsetzungBorder {
  border: 1px solid #00303C !important;
}
.evaluationColor {
  background-color: #72BF44 !important;
  border: 1px solid #72BF44 !important;
  color: white;
}
.evaluationBorder {
  border: 1px solid #72BF44 !important;
}

/**********************
 style tipp 
 *********************/
.tipp {
  position: relative;
  display: inline-block;
  float: right;
}
.tipp .tipptext {
  visibility: hidden;
  background-color: #2c3e50;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  position: absolute;
  z-index: 2;
  min-width: 250px;
  /**bottom: 125%;*/
  /**left: 50%;*/
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}
.tipp:hover .tipptext {
  visibility: visible;
  opacity: 1;
}
.tipp .tipptext.aufrechterhaltung {
  margin-left: -2500%;
}

/***********************
 style button 
 *************************/
.nachObenButton{
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 1;
  /*background-color: #9a884f !important;*/
}
.nachObenButton i{
  font-size: 2rem;
} 
td .btn{
  margin: 5px;
}
.btn-gold{
  background-color: #9a884f !important;
  border: 1px solid #9a884f !important;
  color: white !important;
}
.btn-red{
  background-color: #B75757 !important;
  border: 1px solid #B75757 !important;
  color: white !important;
}
.btn-blue{
  background-color: #6eaead !important;
  border: 1px solid #6eaead !important;
  color: white !important;
}
.btn-bluelight{
  border: 1px solid #6eaead !important;
  color: #6eaead !important;
}
.btn-darkblue{
  background-color: #376f75 !important;
  border: 1px solid #376f75 !important;
  color: white !important;
}
.btn-umsetzung{
  background-color: #00303C !important;
  border: 1px solid #00303C !important;
  color: white !important;
}
.form-control.btnAndere{
  display:inline !important;
  width: 75%;
}
.trash-right{
  position: absolute;
  right: 2%;
  font-size: 1.2rem !important;
}

.position-relative{
  position: relative;
}
.paddingLeft{
  padding: .75rem .75rem .75rem 2.25rem;
}
.marginRadioTableDynamic{
  margin: 0.75rem;
}
.label-prio{
  display: inline !important
}
</style>
