<template>
  <v-container>
    <v-dialog v-model="dialog" elevation="10" persistent width="450">
      <v-card elevation="0">
        <v-card-text class="pa-0">
          <v-item-group>
            <v-container> 
                <v-row>
                  <v-col>
                    <v-card elevation="0">
                      <v-card-text>
                        <v-row align="center" justify="center">
                          <v-col class="text-center" cols="12">
                            <p class="text-h5 font-weight-light mb-2">
                              Tu sesión esta apunto de expirar
                            </p>
                 
                          </v-col>
                    
     
 
                            <v-icon icon="mdi-lock-reset" size="128" color="accent"></v-icon>
                     
                          <v-col class="text-center" cols="12">
                            <p class="text-h7 font-weight-normal mb-4">
                              Tu sesión caducará por inactividad en <b>{{ time / 1000 }} </b> segundos.
                            </p>
                            <p class="primary--text caption font-weight-bold">
                              copyright © 2024 Woola Group
                            </p>
                          </v-col>
                        </v-row>
                      </v-card-text>


                    </v-card>
                  </v-col>
                </v-row> 
            </v-container>
          </v-item-group>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>


</template>

<script setup>

import { ref } from "vue";
import { useAuth } from '@/stores/authStore';

const props =  defineProps({
  status: Boolean,
})
const dialog = ref(true);
const time = ref(60000);
const auth = useAuth();

 
let timerId = setInterval(() => {
  time.value -= 1000; 
  if(props.status.value == false){ 
    clearInterval(timerId);
  }
 
  if (time.value < 1) {
    clearInterval(timerId);
    dialog.value = false;
    auth.cerrarSesion();
  }

}, 1000)


</script>