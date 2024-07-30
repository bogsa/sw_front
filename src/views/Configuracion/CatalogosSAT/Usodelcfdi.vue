<script setup lang="ts">
import { ref, computed, onMounted } from "vue"; 
import { SubmitEventPromise } from 'vuetify'
import use_usoCFDI from '@/composables/Configuracion/CatalodosSAT/api_usoCFDI.js'

// VARIABLES
const drawer = ref(false);
const editIndex = ref(-1);
const search = ref(null)
const headers = [
    { key: 'idUsoCFDI', title: '#', sortable: true, },
    { key: 'clave', title: 'Clave', sortable: true, },
    { key: 'descripcion', title: 'Descripción', sortable: true, },
    { key: 'acciones', title: 'Acciones' },
]
const formData = ref({
    idusoCFDI: 0,
    clave: "",
    descripcion: "",
});

const { apiData_usoCFDI, statusCode_usoCFDI, get_usoCFDI, post_usoCFDI, put_usoCFDI} = use_usoCFDI();

onMounted(async () => {
    await get_usoCFDI();

})
// VALIDACIONES
const v_descripcion = [
    value => {
        if (value) return true
        return 'La descripción es requerida.'
    },
    value => {
        if (value?.length <= 100) return true
        return 'La descripcion debe de tener menos de 100 caracteres.'
    },
]
const v_clave = [
    value => {
        if (value) return true
        return 'La clave es requerida.'
    },
    value => {
        if (value?.length <= 100) return true
        return 'La descripción debe de tener menos de 10 caracteres.'
    },
]
// FUNCIONES
function crear() {
    limpiar();
    editIndex.value = -1;
    drawer.value = true;
}
function limpiar() {
    formData.value.idusoCFDI = null;
    formData.value.clave = null;
    formData.value.descripcion = null;
}
function editar(item) {
    limpiar();
    editIndex.value = 1;
    formData.value.idusoCFDI = item.idusoCFDI;
    formData.value.clave = item.clave;
    formData.value.descripcion = item.descripcion; 
    drawer.value = true;
}
function cerrar() {
    limpiar();
    drawer.value = false;
}

// METODOS 
const drawer_Titulo = computed(() => {
    return editIndex.value === -1 ? "Crear" : "Editar"
})
const drawer_SubTitulo = computed(() => {
    return editIndex.value === -1 ? "Ingresa la información para crear un nuevo registro." : "Ingresa la información  para editar el registro.";
})

const guardar = async (submitEventPromise: SubmitEventPromise) => {
    const { valid } = await submitEventPromise
    if (valid) {
        if (editIndex.value == -1) {
            await post_usoCFDI(formData.value)
            if (statusCode_usoCFDI.value == 200) {
                await get_usoCFDI();
                limpiar();
            }  
        }
        else {
            await put_usoCFDI(formData.value)
            if(statusCode_usoCFDI.value == 200)
            {
                await get_usoCFDI();
                
            }
        }

    }

}



</script>
<template>

    <p class="text-h5 text-light">Uso de CFDI</p>
    <p class="text-caption text-light">Catálogo SAT de uso de CFDI.</p>
    <v-divider class="my-3"></v-divider>
    <div class="text-subtitle-2 text-light my-2 text-medium-emphasis d-flex align-center justify-space-between">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        
        <v-text-field v-model="search" density="compact" prepend-inner-icon="mdi-magnify" variant="outlined"
            hide-details color="primary"  class="mx-2" >
            <template v-slot:label>
                <div class="font-weight-regular text-caption text-secondary">Buscar</div>
            </template>
        </v-text-field>


        <v-tooltip text="Agregar un registro" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="small" elevation="0" color="primary" variant="tonal" prepend-icon="mdi-plus-thick"
                    class="text-none mx-2" v-on:click="crear()">
                    Crear un nuevo registro
                </v-btn>
            </template>
        </v-tooltip>
        <v-btn elevation="0"  size="small" color="primary" variant="tonal" class="text-none mx-2"  >
            Registros: {{ apiData_usoCFDI.length }}
        </v-btn>


    </div>
    <v-card flat class="rounded-lg">
        <v-card-text>
            <v-data-table class="text-caption" :search="search" :headers="headers" :items="apiData_usoCFDI"
                density="compact" :items-per-page="15">

                <template v-slot:item.acciones="{ item }">
                    <v-tooltip text="Editar un registro" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" color="primary"  class="material-symbols-outlined" @click="editar(item)">
                                mdi-pencil
                            </v-icon> 
                        </template>
                    </v-tooltip>
                </template>

                <template v-slot:no-data>
                    <h4>Aún no hay registros en este catálogo.</h4>
                    <small>(Por el momento el catálogo no cuenta con registros)</small>
                </template>
            </v-data-table>

        </v-card-text>
        <v-card-actions class="default">
        </v-card-actions>
    </v-card>

    <v-navigation-drawer app v-model="drawer" location="right" floating temporary permanent width="300">
        <v-alert class="ma-3">
            <p class="text-subtitle-1"> {{ drawer_Titulo }}</p>
            <p class="text-caption">{{ drawer_SubTitulo }}</p>
        </v-alert>
        <v-form @submit.prevent="guardar">
            <v-card elevation="0" class=" text-secondary">
                <v-card-text>
                    <v-text-field v-model="formData.clave" class="mb-3" density="compact" color="accent"
                        variant="outlined" :counter="10" :rules="v_clave">
                        <template v-slot:label>
                            <div class="font-weight-regular text-caption text-secondary">Clave:</div>
                        </template>
                    </v-text-field>

                    <v-text-field v-model="formData.descripcion" density="compact" color="accent" variant="outlined"
                        :counter="100" class="mb-3" :rules="v_descripcion">
                        <template v-slot:label>
                            <div class="font-weight-regular text-caption text-secondary">Descripcion:</div>
                        </template>
                    </v-text-field>






                </v-card-text>
            </v-card>

            <v-footer bottom absolute padless class="justify-end px-5">
                <v-btn class="mx-2 text-none" size="small" variant="outlined" elevation="0" @click="cerrar()"
                    color="light" prepend-icon="mdi-close-circle">
                    Cerrar
                </v-btn>
                <v-btn class="mx-2 text-none" size="small" elevation="0" color="primary" prepend-icon="mdi-check-circle"
                    type="submit">
                    Guardar
                </v-btn>
            </v-footer>
        </v-form>

    </v-navigation-drawer>

</template>
