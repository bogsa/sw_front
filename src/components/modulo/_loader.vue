<template>
  <div class="text-xs-center">

    <v-dialog v-model="auth.loader" hide-overlay persistent width="350">
      <v-card color="primary" dark class="pa-2">

        <v-card-text>
          <span class="text-body-2 font-weight-normal"> Por favor espere un momento...</span>

          <v-progress-linear indeterminate color="white"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>
<script setup>
import { useAuth } from '@/stores/authStore'; 
const auth = useAuth();
 
</script>