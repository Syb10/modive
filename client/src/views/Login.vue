<template>
  <div>
    <form class="form-signin">
      <h3 class="mb-3">Anmeldung</h3>
        <InputForm
          v-model="benutzername"
          :content="{ title: 'Benutzername', id: 'benutzername', type:'text', color:'loginColor', border:'loginBorder' }"
        />
        <InputForm
          v-model="passwort"
          :content="{ title: 'Passwort', id: 'passwort', type:'password', color:'loginColor', border:'loginBorder' }"
        />


      <button class="w-100 btn btn-primary" @click.prevent="login">anmelden</button>
    </form>
  </div>
</template>

<script>
import InputForm from "../components/InputForm.vue";
import {authMixin} from "../mixins/authMixin.js";

export default {
  name: 'Login',
  mixins:[authMixin],
  components:{
      InputForm,
  },
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