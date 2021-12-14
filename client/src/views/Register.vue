<template>
  <div>
    <form class="">
      <h3 class="mb-3">Registrierung</h3>
        <InputForm
          v-model="benutzername"
          :content="{ title: 'Benutzername', id: 'benutzername', type:'text', color:'loginColor', border:'loginBorder' }"
        />
        <InputForm
          v-model="email"
          :content="{ title: 'E-Mail', id: 'email', type:'email', color:'loginColor', border:'loginBorder' }"
        />
        <InputForm
          v-model="passwort"
          :content="{ title: 'Passwort', id: 'passwort', type:'password', color:'loginColor', border:'loginBorder' }"
        />
        <InputForm
          :content="{ title: 'Passwort wiederholen', id: 'passwort2', type:'password', color:'loginColor', border:'loginBorder' }"
        />
      <button class="btn btn-primary" @click.prevent="login">registrieren</button>
    </form>
  </div>
</template>

<script>
import InputForm from "../components/InputForm.vue";
import {authMixin} from "../mixins/authMixin.js";

export default {
  name: 'Register',
  mixins:[authMixin],
  components:{
      InputForm,
  }
};
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: auto;
}
</style>