<script setup>
import { ref } from "vue";
import useAuthApi from "@/composables/Autentificacion/authApi.js";
import router from '@/router/index.js'
const vs = ref({
  error: null,
  visible: null,
});
const { error, statusCode, loginData } = useAuthApi();
const formData = ref({
  usuario: "",
  password: "",
});
const handleLoginForm = async () => {
  await loginData(formData.value);
  //
  if (statusCode.value === 201 || statusCode.value === 200) { 
    router.push('/'); 
 
  }
  else {
    vs.value.error = error.value
  }

};
</script>



<template>
  <v-layout row wrap>
    <v-card elevation="0" class="ma-auto pa-15  text-secondary " min-width="450" max-width="400" rounded="lg">
      <h3 class="text-center font-weight-medium py-2">Bienvenido a SW 3.0</h3>
      <h5 class="text-center font-weight-medium py-2">Sistema global de administracion de negocios.</h5>
      <form @submit.prevent="handleLoginForm" id="LoginForm">

        <div class="text-medium-emphasis text-caption">Usuario</div>


        <v-text-field v-model="formData.usuario" density="compact" placeholder="Ingrasa tu nombre de usuario."
          prepend-inner-icon="mdil mdil-account" variant="outlined" required>
        </v-text-field>

        <div class="text-medium-emphasis text-caption">Contraseña</div>

        <v-text-field v-model="formData.password"
          :append-inner-icon="vs.visible ? 'mdil mdil-eye-off' : 'mdil mdil-eye'"
          :type="vs.visible ? 'text' : 'password'" density="compact" placeholder="Ingresa tu contraseña"
          prepend-inner-icon="mdil mdil-lock" variant="outlined" @click:append-inner="vs.visible = !vs.visible"
          required></v-text-field>



        <v-alert v-if="vs.error" type="info" variant="tonal" density="compact" color="primary"
          class="text-medium-emphasis text-caption">{{ vs.error }}</v-alert>
        <br>
        <v-btn block type="submit" elevation="0" dark slarge color="primary">Iniciar sesión</v-btn>

 

      </form>
    </v-card>


  </v-layout>
</template>


<style lang="css" scoped>
.v-logo {
  background-color: transparent;
}
</style>