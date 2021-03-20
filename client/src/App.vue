<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="container mt-5">
      <router-view/>
    </div>
  </div>
</template>

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

.form-control {
  border-radius: 0 0.25rem 0.25rem 0 !important;
}
.input-group-text{
  border-radius: 0.25rem 0 0 0.25rem !important;
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
</style>
