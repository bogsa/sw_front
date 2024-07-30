<script setup lang="ts"> 
 
</script>
<template>

    <p class="text-h5 text-light">Forma de pago</p>
    <p class="text-caption text-light">Catálogo SAT de forma de pago.</p>
    <v-divider class="my-3"></v-divider>
    <div class="text-subtitle-2 text-light my-2 text-medium-emphasis d-flex align-center justify-space-between">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-text-field   density="compact" prepend-inner-icon="mdi-magnify" variant="outlined"
            hide-details color="primary"  class="mx-2" >
            <template v-slot:label>
                <div class="font-weight-regular text-caption text-secondary">Buscar</div>
            </template>
        </v-text-field>


        <v-tooltip text="Agregar un registro" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="small" elevation="0" color="primary" variant="tonal" prepend-icon="mdi-plus-thick"
                    class="text-none mx-2"  >
                    Crear un nuevo registro
                </v-btn>
            </template>
        </v-tooltip>
        <v-btn elevation="0"  size="small" color="primary" variant="tonal" class="text-none mx-2"  >
            Registros:  
        </v-btn>


    </div>
    <v-card flat class="rounded-lg">
        <v-card-text>
             

        </v-card-text>
        <v-card-actions class="default">
        </v-card-actions>
    </v-card>

    <v-navigation-drawer app   location="right" floating temporary permanent width="300">
       
    </v-navigation-drawer>

</template>
