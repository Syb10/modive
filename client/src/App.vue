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

.form-control.inputForm{
  border-radius: 0 0.25rem 0.25rem 0 !important;
}
.input-group-text.inputForm{
  border-radius: 0.25rem 0 0 0.25rem !important;
}
.form-control.textareaForm{
  border-radius: 0 0 0.25rem 0.25rem  !important;
}
.input-group-text.textareaForm{
  border-radius: 0.25rem 0.25rem 0 0  !important;
}
.input-group-text.normal-white-space{
  white-space: normal;
}
.checkbox {
  border-radius: 0 0.25rem 0.25rem 0 !important;
}
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
.assessmentAspekt{
  color: #9a884f;
  font-weight: bold;
}
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
  /**bottom: 125%;*/
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}
.tipp:hover .tipptext {
  visibility: visible;
  opacity: 1;
}
</style>
