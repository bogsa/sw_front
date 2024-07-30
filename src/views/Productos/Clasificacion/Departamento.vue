<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { SubmitEventPromise } from 'vuetify'
import use_Departamento from '@/composables/Productos/api_Departamento'
import { useAuth } from '@/stores/authStore';

// VARIABLES
const auth = useAuth();
const usuario = ref(auth.usuario["payload"]);
const id_corporativo = ref(usuario.value["ID_Corporativo"]);
const drawer = ref(false);
const editIndex = ref(-1);
const search = ref(null)
const headers = [
    { key: 'idDepartamento', title: '#', sortable: true, },
    { key: 'nombre', title: 'Nombre', sortable: true, },
    { key: 'status', title: 'Status', sortable: true, },
    { key: 'acciones', title: 'Acciones' },
]
const formData = ref({
    e_CorporativoId: id_corporativo.value,
    idDepartamento: 0,
    nombre: "",
    status: false,
});

const { apiData_Departamento, statusCode_Departamento, get_Departamento, post_Departamento, put_Departamento } = use_Departamento();

onMounted(async () => {
    await get_Departamento(id_corporativo.value);

})
// VALIDACIONES
const v_nombre = [
    value => {
        if (value) return true
        return 'El nombre es requerido.'
    },
    value => {
        if (value?.length <= 100) return true
        return 'El nombre debe de tener menos de 100 caracteres.'
    },
]

// FUNCIONES
function crear() {
    limpiar();
    editIndex.value = -1;
    drawer.value = true;
}
function limpiar() {
    formData.value.idDepartamento = null;
    formData.value.nombre = null;
    formData.value.status = false;
}
function editar(item) {
    limpiar();
    editIndex.value = 1;
    formData.value.idDepartamento = item.idDepartamento;
    formData.value.nombre = item.nombre;
    formData.value.status = item.status;
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
            await post_Departamento(formData.value)
            if (statusCode_Departamento.value == 200) {
                await get_Departamento(id_corporativo.value);
                limpiar();
            }
        }
        else {
            await put_Departamento(formData.value)
            if (statusCode_Departamento.value == 200) {
                await get_Departamento(id_corporativo.value);

            }
        }

    }

}



</script>
<template>

    <p class="text-h5 text-light">Departamentos</p>
    <p class="text-caption text-light">Departamento de productos.</p>
    <v-divider class="my-3"></v-divider>
    <div class="text-subtitle-2 text-light my-2 text-medium-emphasis d-flex align-center justify-space-between">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-text-field v-model="search" density="compact" prepend-inner-icon="mdi-magnify" variant="outlined"
            hide-details color="primary" class="mx-2">
            <template v-slot:label>
                <div class="font-weight-regular text-caption text-secondary">Buscar</div>
            </template>
        </v-text-field>


        <v-tooltip text="Agregar un registro" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="small" elevation="0" color="primary" variant="tonal"
                    prepend-icon="mdi-plus-thick" class="text-none mx-2" v-on:click="crear()">
                    Crear un nuevo registro
                </v-btn>
            </template>
        </v-tooltip>
        <v-btn elevation="0" size="small" color="primary" variant="tonal" class="text-none mx-2">
            Registros: {{ apiData_Departamento.length }}
        </v-btn>


    </div>
    <v-card flat class="rounded-lg">
        <v-card-text>
            <v-data-table class="text-caption" :search="search" :headers="headers" :items="apiData_Departamento"
                density="compact" :items-per-page="15">

                <template class="text-caption pa-0" v-slot:item.status="{ item }">


                    <div v-if="item.status == true">
                        <v-icon class="mb-1" small color="success">mdi-check-circle-outline</v-icon>
                        <b class="text-caption">&nbsp; Activo</b>
                    </div>
                    <div v-else>
                        <v-icon class="mb-1" small color="error">mdi-close-circle-outline</v-icon>
                        <b class="text-caption">&nbsp; Inactivo</b>
                    </div>
                </template>



                <template v-slot:item.acciones="{ item }">
                    <v-tooltip text="Editar un registro" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" color="primary" class="material-symbols-outlined"
                                @click="editar(item)">
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

                    <v-text-field v-model="formData.nombre" density="compact" color="accent" variant="outlined"
                        :counter="100" class="mb-0" :rules="v_nombre">
                        <template v-slot:label>
                            <div class="font-weight-regular text-caption text-secondary">Nombre:</div>
                        </template>
                    </v-text-field>

                    <v-switch class="ms-0 text-caption" v-model="formData.status" color="primary">
                        <template v-slot:label>
                            <div class="font-weight-regular text-caption text-secondary">{{ `Activo:
                                ${formData.status.toString()}` }}</div>
                        </template>
                    </v-switch>

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
