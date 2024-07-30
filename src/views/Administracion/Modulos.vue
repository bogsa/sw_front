<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { SubmitEventPromise } from 'vuetify'
import use_Modulos from "@/composables/Administracion/api_Modulos";
import { dbIcons } from "@/data/icons"
import Swal from "sweetalert2"
import use_httpRSC from "@/composables/httpRSC"
// VARIABLES
const httpRSC = use_httpRSC();
const drawer = ref(false);
const drawer_navigation = ref(null);
const drawer_title = ref(null);
const drawer_subtitle = ref(null);

const {
    apiData_Modulos,
    statusCode_Modulos,
    statusResponse,
    get_Modulos,
    post_Modulo,
    put_Modulo,
    delete_Modulo } = use_Modulos();
const {
    apiData_MenusSubMenus,
    statusCode_MenusSubMenus,
    get_MenuSubMenuModulo,
    post_MenuModulo,
    delete_MenuModulo,
    post_SubMenuModulo,
    delete_SubMenuModulo
} = use_Modulos();

const {
    apiData_Menu,
    statusCode_Menu,
    get_Menu,
    apiData_SubMenu,
    statusCode_SubMenu,
    get_SubMenu,
} = use_Modulos();

const {
    apiData_Permisos,
    statusCode_Permisos,
    get_Permisos,
    post_Permisos,
    delete_Permisos,
} = use_Modulos();

const IconsData = ref(dbIcons);
const menu = ref(null)
const formData_1 = ref({
    idRol: null,
    nombreRol: null,
    icono: 'home',
    color: '#A5C736',
    tooltip: null,
    prioridad: 0,
    activo: false,
})
const editIndex = ref(-1)


const ms_icono = ref(null);
const ms_color = ref(null);
const ms_nombre = ref(null);

const formData_2 = ref({
    idRol: null,
    titulo: null,
    icono: 'touch_app',
})

const formData_3 = ref({
    menuId: null,
    titulo: null,
    icono: 'touch_app',
    link: null,
})
const p_menu = ref(null);


const headers = [
    { key: 'type', title: 'Sub menú', sortable: true, },
    { key: 'value', title: 'Permiso', sortable: true, },
    { key: "acciones", title: "Acciones", sortable: false },
];
const formData_4 = ref({
    rol: null,
    claimName: null,
    claimValue: null,
})



// VALIDACIONES
const v_nombre = [
    value => {
        if (value) return true
        return 'El nombre es requiredio.'
    },
    value => {
        if (value?.length <= 100) return true
        return 'El nombre debe de tener menos de 60 caracteres.'
    },
]
const v_icono = [
    value => {
        if (value) return true
        return 'El icono es requiredio.'
    },
]
const v_color = [
    value => {
        if (value) return true
        return 'El color es requiredio.'
    },
]
const v_tooltip = [
    value => {
        if (value) return true
        return 'El tooltip es requiredio.'
    },
]
const v_prioridad = [
    value => {
        if (value) return true
        return 'La prioridad es requiredia.'
    },
]
const v_nombreMenu = [
    value => {
        if (value) return true
        return 'El nombre del menú es requiredio.'
    },
    value => {
        if (value?.length <= 100) return true
        return 'El nombre del menú  debe de tener menos de 60 caracteres.'
    },
]
const v_nombreSubMenu = [
    value => {
        if (value) return true
        return 'El nombre del sub menú es requiredio.'
    },
    value => {
        if (value?.length <= 100) return true
        return 'El nombre del sun menú  debe de tener menos de 60 caracteres.'
    },
]
const v_p_menu = [
    value => {
        if (value) return true
        return 'Selecciona el menú,  es requiredio.'
    },
]
const v_p_submenu = [
    value => {
        if (value) return true
        return 'Selecciona el sub menú,  es requiredio.'
    },
]
const v_p_permiso = [
    value => {
        if (value) return true
        return 'El nombre del permiso es requiredio.'
    },
    value => {
        if (value?.length <= 100) return true
        return 'El nombredel permiso debe de tener menos de 100 caracteres.'
    },
]
//HOOKS
onMounted(async () => {
    await get_Modulos();
})
const swatchStyle = computed(() => {
    return {
        backgroundColor: formData_1.value.color,
        cursor: "pointer",
        height: "25px",
        width: "25px",
        borderRadius: menu.value ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out",
    };

})
// FUNCIONES
function crear() {
    editIndex.value = -1
    drawer_navigation.value = 1;
    drawer_title.value = "Información del módulo";
    drawer_subtitle.value = "Crear un nuevo registro";
    drawer.value = true;
}
function actualizar(modulo) {
    editIndex.value = 1
    formData_1.value.idRol = modulo.idRol;
    formData_1.value.nombreRol = modulo.nombreRol;
    formData_1.value.icono = modulo.icono;
    formData_1.value.color = modulo.color;
    formData_1.value.tooltip = modulo.tooltip;
    formData_1.value.prioridad = modulo.prioridad;
    formData_1.value.activo = modulo.activo;
    drawer_navigation.value = 1;
    drawer_title.value = "Información del módulo";
    drawer_subtitle.value = "Actualiza la información del módulo";
    drawer.value = true;
}
function cerrar_drawer() {
    drawer.value = false;
    limpiar();

}
function limpiar() {
    editIndex.value = -1;
    formData_1.value.idRol = null;
    formData_1.value.nombreRol = null;
    formData_1.value.icono = "home";
    formData_1.value.color = "#A5C736";
    formData_1.value.tooltip = null;
    formData_1.value.prioridad = 0;
    formData_1.value.activo = false;
    drawer_navigation.value = null;
}
// METODOS


const guardar = async (submitEventPromise: SubmitEventPromise) => {
    const { valid } = await submitEventPromise
    if (valid) {
        if (editIndex.value == -1) {
            await post_Modulo(formData_1.value);
            if (statusCode_Modulos.value == 200) {
                formData_1.value.idRol = null;
                formData_1.value.nombreRol = null;
                formData_1.value.icono = 'home';
                formData_1.value.color = '#A5C736';
                formData_1.value.tooltip = null;
                formData_1.value.prioridad = 0;
                formData_1.value.activo = false;
                drawer.value = false;
                await get_Modulos();
                limpiar();
            }
        }
        else if (editIndex.value == 1) {
            await put_Modulo(formData_1.value);
            if (statusCode_Modulos.value == 200) {
                await get_Modulos();
            }
        }
    }

}

const eliminar = async (idModulo) => {

    Swal.fire({
        html: '<div class="text-center text-body-2 font-weight-normal "><strong>¿Estas seguro de eliminar el módulo?</strong>' + '<br>' +
            'Una vez eliminado no podra recuperarlo. </div>',
        width: 400,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#655CC9",
        cancelButtonColor: "#8F8F8F",
        confirmButtonText: "Si",
        cancelButtonText: "No",
    }).then(async (result) => {
        if (result.isConfirmed) {
            await delete_Modulo(idModulo)
            if (statusCode_Modulos.value == 200) {
                await get_Modulos();
                Swal.fire({
                    icon: "success",
                    title: httpRSC.searchCode(statusCode_Modulos.value),
                    html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' + '<br>' +
                        statusResponse.value + '</div>',
                    width: 400,
                    confirmButtonColor: '#655CC9',
                    customClass: {
                        htmlContainer: 'custom-container',
                        title: 'custom-title',
                        confirmButton: 'custom-button',
                    },
                });

            }
        }
    });
}

const selectModulo = async (modulo) => {
    await get_MenuSubMenuModulo(modulo.idRol);
    if (statusCode_Modulos.value == 200) {
        ms_nombre.value = modulo.nombreRol;
        ms_color.value = modulo.color;
        ms_icono.value = modulo.icono;
        formData_2.value.idRol = modulo.idRol;
        drawer_navigation.value = 2;
        drawer.value = true;
    }

}
const agregarMenu = async (submitEventPromise: SubmitEventPromise) => {

    const { valid } = await submitEventPromise
    if (valid) {
        await post_MenuModulo(formData_2.value)
        if (statusCode_MenusSubMenus.value == 200) {
            formData_2.value.titulo = null;
            await get_MenuSubMenuModulo(formData_2.value.idRol)
        }
    }

}
const eliminarMenu = async (item) => {
    await delete_MenuModulo(item.id);
    if (statusCode_MenusSubMenus.value == 200) {
        await get_MenuSubMenuModulo(item.rolId)
    }
}
const agregarSubMenu = async (submitEventPromise: SubmitEventPromise) => {

    const { valid } = await submitEventPromise
    if (valid) {
        formData_3.value.link = "/" + formData_3.value.titulo.replace(/ /g, "").toLowerCase(),
            await post_SubMenuModulo(formData_3.value)
        if (statusCode_MenusSubMenus.value == 200) {
            formData_3.value.titulo = null;
            await get_MenuSubMenuModulo(formData_2.value.idRol)
        }
    }
}
const eliminarSubMenu = async (item) => { 
    await delete_SubMenuModulo(item.idSubMenu);
    if (statusCode_MenusSubMenus.value == 200) {
        await get_MenuSubMenuModulo(formData_2.value.idRol)
    }
}


const selectPermisos = async (modulo) => {
    await Promise.all([
        get_Menu(modulo.idRol),
        get_Permisos(modulo.nombreRol),
    ])


    if (statusCode_Menu.value == 200 || statusCode_Permisos.value == 200) {
        ms_nombre.value = modulo.nombreRol;
        ms_color.value = modulo.color;
        ms_icono.value = modulo.icono;
        p_menu.value = null;
        formData_4.value.rol = modulo.nombreRol,
            formData_4.value.claimName = null;
        formData_4.value.claimValue = null;
        drawer_navigation.value = 3;
        drawer.value = true;
    }

}
const cargarSubMenu = async (idMenu) => {

    await get_SubMenu(idMenu);
    if (statusCode_SubMenu.value = 200) {

    }
}
const agregarPermiso = async (submitEventPromise: SubmitEventPromise) => {
    const { valid } = await submitEventPromise;
    if (valid) {
        await post_Permisos(formData_4.value)
        if (statusCode_Permisos.value == 200) {
            formData_4.value.claimValue = null;
            await get_Permisos(formData_4.value.rol)
        }
    }

}
const eliminarPermiso = async (item) => {
    formData_4.value.claimName = item.type;
    formData_4.value.claimValue = item.value;
    await delete_Permisos(formData_4.value)
    if (statusCode_Permisos.value == 200) {
        await get_Permisos(formData_4.value.rol)
    }
}



</script>
<template>

    <p class="text-h5 text-light">Módulos</p>
    <p class="text-caption text-light">Gestión de módulos del sistema.</p>
    <v-divider class="my-3"></v-divider>
    <div class="text-subtitle-2 text-light my-2 text-medium-emphasis d-flex align-center justify-space-between">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-tooltip text="Agregar un registro" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="small" elevation="0" color="primary" variant="tonal"
                    prepend-icon="mdi-plus-thick" class="text-none mx-2" @click="crear">
                    Crear un nuevo módulo
                </v-btn>
            </template>
        </v-tooltip>
        <v-btn elevation="0" size="small" color="primary" variant="tonal" class="text-none mx-2">
            Total módulos: {{ apiData_Modulos.length }}
        </v-btn>


    </div>
    <v-card flat class="rounded-lg">
        <v-card-text>

            <v-item-group dark>
                <v-container>

                    <v-row>
                        <v-col v-for="modulo in apiData_Modulos" 
                            cols="12" xxl="2" xl="2"  lg="3" md="4" sm="6"  xs="12" class="px-md-12 mx-lg-auto">
                            <v-item>

                                <v-menu location="bottom center" open-on-hover>
                                    <template v-slot:activator="{ props }">
                                        <v-avatar :color="modulo.color" size="150" v-bind="props">
                                            <v-icon size="45" color="white">
                                                <icon class="material-symbols-outlined">{{ modulo.icono
                                                    }}
                                                </icon>
                                            </v-icon>
                                        </v-avatar>
                                    </template>

                                    <v-card elevation="0" flat class="rounded-lg ma-5">
                                        <v-card-subtitle class="text-body-2">
                                            {{ modulo.tooltip }}
                                        </v-card-subtitle>
                                        <v-divider class="mt-2"></v-divider>
                                        <v-list class="text-overline">
                                            <v-list-item @click="actualizar(modulo)" class="rounded-lg">
                                                <div class="font-weight-regular text-caption text-secondary">
                                                    Información del módulo
                                                </div>
                                                <template v-slot:prepend>
                                                    <icon class="material-symbols-outlined mx-3 text-primary">
                                                        edit
                                                    </icon>
                                                </template>
                                            </v-list-item>
                                            <v-list-item @click="eliminar(modulo.idRol)" class="rounded-lg">
                                                <div class="font-weight-regular text-caption text-secondary">
                                                    Eliminar el módulo
                                                </div>
                                                <template v-slot:prepend>
                                                    <icon class="material-symbols-outlined mx-3 text-primary">
                                                        delete
                                                    </icon>
                                                </template>
                                            </v-list-item>
                                            <v-list-item @click="selectModulo(modulo)" class="rounded-lg">
                                                <div class="font-weight-regular text-caption text-secondary">
                                                    Menús del módulo
                                                </div>
                                                <template v-slot:prepend>
                                                    <icon class="material-symbols-outlined mx-3  text-primary">
                                                        list
                                                    </icon>
                                                </template>
                                            </v-list-item>
                                            <v-list-item @click="selectPermisos(modulo)" class="rounded-lg">
                                                <div class="font-weight-regular text-caption text-secondary">
                                                    Permisos del menú
                                                </div>
                                                <template v-slot:prepend>
                                                    <icon class="material-symbols-outlined mx-3 text-primary">
                                                        shield_lock
                                                    </icon>
                                                </template>
                                            </v-list-item>
                                        </v-list>


                                    </v-card>
                                </v-menu>

                            </v-item>
                        </v-col>
                    </v-row>

                </v-container>
            </v-item-group>

        </v-card-text>
        <v-card-actions class="default">
        </v-card-actions>
    </v-card>

    <v-navigation-drawer app v-model="drawer" location="right" temporary permanent floating width="400">
        <v-alert class="ma-3" v-if="drawer_navigation == 1">
            <p class="text-subtitle-1"> {{ drawer_title }}</p>
            <p class="text-caption">{{ drawer_subtitle }}</p>
        </v-alert>
        <div v-if="drawer_navigation == 1">
            <v-form @submit.prevent="guardar">
                <v-card elevation="0" class=" text-secondary">
                    <v-card-text>

                        <v-text-field v-model="formData_1.nombreRol" variant="outlined" density="compact"
                            prepend-inner-icon="mdi-apps" :rules="v_nombre" class="mb-2">
                            <template v-slot:label>
                                <div class="font-weight-regular text-caption text-secondary">Nombre del modulo</div>
                            </template>
                        </v-text-field>


                        <v-autocomplete item-value="nombre" item-title="nombre" class="mb-2" v-model="formData_1.icono"
                            :items="IconsData" clearable variant="outlined" density="compact" :rules="v_icono">
                            <template v-slot:prepend-inner>
                                <icon class="material-symbols-outlined text-primary">{{ formData_1.icono }}</icon>
                            </template>
                            <template v-slot:label>
                                <div class="font-weight-regular text-caption text-secondary">Icono</div>
                            </template>
                        </v-autocomplete>


                        <v-text-field label="Color:" dense v-model="formData_1.color" class="mb-2" variant="outlined"
                            density="compact" :rules="v_color">
                            <template v-slot:prepend-inner>
                                <icon class="material-symbols-outlined">colors</icon>
                            </template>
                            <template v-slot:label>
                                <div class="font-weight-regular text-caption text-secondary">Color</div>
                            </template>
                            <template v-slot:append-inner>
                                <v-menu top v-model="menu" nudge-bottom="105" nudge-left="16"
                                    :close-on-content-click="false">
                                    <template v-slot:activator="{ props }">
                                        <div class="pa-0 ma-2" :style="swatchStyle" v-bind="props" />
                                    </template>
                                    <v-card>
                                        <v-card-text class="pa-0">
                                            <v-color-picker class="ma-0" hide-canvas hide-inputs show-swatches
                                                v-model="formData_1.color" swatches-max-height="400px" />
                                        </v-card-text>
                                    </v-card>
                                </v-menu>
                            </template>
                        </v-text-field>


                        <v-text-field v-model="formData_1.tooltip" variant="outlined" density="compact" class="mb-2"
                            :rules="v_tooltip">
                            <template v-slot:prepend-inner>
                                <icon class="material-symbols-outlined">tooltip</icon>
                            </template>
                            <template v-slot:label>
                                <div class="font-weight-regular text-caption text-secondary">Tooltip</div>
                            </template>
                        </v-text-field>

                        <v-text-field v-model="formData_1.prioridad" color="accent" variant="outlined" density="compact"
                            :rules="v_prioridad" type="number">
                            <template v-slot:prepend-inner>
                                <icon class="material-symbols-outlined">priority</icon>
                            </template>
                            <template v-slot:label>
                                <div class="font-weight-regular text-caption text-secondary">Prioridad</div>
                            </template>
                        </v-text-field>

                        <v-switch class="ms-3 text-caption" v-model="formData_1.activo" color="primary">
                            <template v-slot:label>
                                <div class="font-weight-regular text-caption text-secondary">{{ `Activo:
                                    ${formData_1.activo.toString()}` }}</div>
                            </template>
                        </v-switch>


                    </v-card-text>
                </v-card>

                <v-footer bottom absolute padless class="justify-end px-5">
                    <v-btn class="mx-2 text-none" size="small" variant="outlined" elevation="0" @click="cerrar_drawer()"
                        color="light" prepend-icon="mdi-close-circle">
                        Cerrar
                    </v-btn>
                    <v-btn class="mx-2 text-none" type="submit" size="small" elevation="0" color="primary"
                        prepend-icon="mdi-check-circle">
                        Guardar
                    </v-btn>
                </v-footer>
            </v-form>
        </div>
        <div v-if="drawer_navigation == 2">


            <v-card elevation="0" class=" text-secondary">
                <v-alert class="mx-3">
                    <v-row>
                        <v-col cols="2">
                            <v-avatar class="mt-2" dark :color="ms_color">
                                <v-icon color="white" size="15">
                                    <icon class="material-symbols-outlined">{{ ms_icono }}</icon>
                                </v-icon>

                            </v-avatar>
                        </v-col>
                        <v-col cols="10">
                            <p class="text-h6">{{ ms_nombre }}</p>
                            <p class="text-caption">Nombre del módulo </p>
                        </v-col>
                    </v-row>
                </v-alert>

                <v-card-text>
                    <v-form @submit.prevent="agregarMenu">
                        <v-text-field v-model="formData_2.titulo" type="text" variant="outlined" density="compact"
                            :rules="v_nombreMenu" hint="Ingresa el nombre del menú" persistent-hint clearable>
                            <template v-slot:label>
                                <div class="font-weight-regular text-caption text-secondary">Nombre del menú
                                </div>
                            </template>
                            <template v-slot:prepend>
                                <v-menu location="bottom" :close-on-content-click="false" :close-on-click="false">

                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" icon density="comfortable" :color="ms_color">
                                            <v-icon color="white" size="15">
                                                <icon class="material-symbols-outlined">{{ formData_2.icono }}
                                                </icon>
                                            </v-icon>
                                        </v-btn>
                                    </template>

                                    <v-card width="300" color="background">
                                        <v-card-title class="text-caption">Selecciona el icono del menú</v-card-title>
                                        <v-card-text flat elevation="0">
                                            <v-autocomplete item-value="nombre" item-title="nombre" class="mb-2"
                                                v-model="formData_2.icono" :items="IconsData" clearable
                                                variant="outlined" density="compact" :rules="v_icono"
                                                hint="Busca el nombre del icono" persistent-hint>
                                                <template v-slot:label>
                                                    <div class="font-weight-regular text-caption text-secondary">Icono
                                                    </div>
                                                </template>
                                            </v-autocomplete>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                    </v-card>

                                </v-menu>
                            </template>
                            <template v-slot:append>

                                <v-tooltip location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="mx-2 text-none" type="submit" size="small" elevation="0"
                                            icon="mdi-plus-thick" v-bind="props">
                                        </v-btn>
                                    </template>
                                    Agregar menú
                                </v-tooltip>
                            </template>

                        </v-text-field>
                    </v-form>

                    <v-divider class="my-3"></v-divider>

                    <v-list class="text-overline">
                        <v-list-group v-for="item in apiData_MenusSubMenus" :key="item.id">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" @click="formData_3.menuId = item.id">
                                    <template v-slot:prepend>
                                        <icon class="material-symbols-outlined mx-3 text-primary">{{ item.icono }}
                                        </icon>
                                    </template>
                                    <div
                                        class="font-weight-regular text-caption text-secondary d-flex align-center justify-space-between">
                                        {{ item.titulo }}

                                        <v-tooltip location="bottom">
                                            <template v-slot:activator="{ props }">
                                                <v-btn icon elevation="0" @click="eliminarMenu(item)" density="compact"
                                                    v-bind="props">
                                                    <v-icon color="accent" size="11">
                                                        <icon class="material-symbols-outlined">delete
                                                        </icon>
                                                    </v-icon>
                                                </v-btn>
                                            </template>
                                            Eliminar el menú
                                        </v-tooltip>



                                    </div>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="child in item.subMenus" :key="child.id">
                                <template v-slot:prepend>
                                    <icon class="material-symbols-outlined px-3 text-primary">{{ child.icono }}
                                    </icon>
                                </template>
                                <div
                                    class="font-weight-regular text-caption text-secondary d-flex align-center justify-space-between">
                                    {{ child.titulo }}

                                    <v-tooltip location="bottom">
                                        <template v-slot:activator="{ props }">
                                            <v-btn icon elevation="0" @click="eliminarSubMenu(child)" density="compact" v-bind="props">
                                                <v-icon color="accent" size="11">
                                                    <icon class="material-symbols-outlined">delete
                                                    </icon>
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        Eliminar el sub menú
                                    </v-tooltip>



                                </div>
                            </v-list-item>

                            <v-list-item>
                                <v-form @submit.prevent="agregarSubMenu">


                                    <v-text-field v-model="formData_3.titulo" density="compact" class="my-3 text-none"
                                        variant="outlined" :rules="v_nombreSubMenu">
                                        <template v-slot:label>
                                            <div class="font-weight-regular text-caption text-secondary">
                                                Nombre del sub menú
                                            </div>
                                        </template>
                                        <template v-slot:prepend>
                                            <v-menu location="bottom" :close-on-content-click="false"
                                                :close-on-click="false">
                                                <template v-slot:activator="{ props }">
                                                    <v-btn v-bind="props" icon density="comfortable" :color="ms_color">
                                                        <v-icon color="white" size="15">
                                                            <icon class="material-symbols-outlined">{{
                                                                formData_3.icono }}
                                                            </icon>
                                                        </v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-card width="300" color="background">
                                                    <v-card-title class="text-caption">
                                                        Selecciona el icono del menú
                                                    </v-card-title>
                                                    <v-card-text flat elevation="0">
                                                        <v-autocomplete item-value="nombre" item-title="nombre"
                                                            class="mb-2" v-model="formData_3.icono" :items="IconsData"
                                                            clearable variant="outlined" density="compact"
                                                            :rules="v_icono" hint="Busca el nombre del icono"
                                                            persistent-hint>
                                                            <template v-slot:label>
                                                                <div
                                                                    class="font-weight-regular text-caption text-secondary">
                                                                    Icono
                                                                </div>
                                                            </template>
                                                        </v-autocomplete>
                                                    </v-card-text>
                                                    <v-divider></v-divider>

                                                </v-card>

                                            </v-menu>
                                        </template>
                                        <template v-slot:append>
                                            <v-tooltip location="bottom">
                                                <template v-slot:activator="{ props }">
                                                    <v-btn class="mx-2 text-none" type="submit" size="small"
                                                        elevation="0" icon="mdi-plus-thick" v-bind="props">
                                                    </v-btn>
                                                </template>
                                                Agregar un sub menú
                                            </v-tooltip>
                                        </template>

                                    </v-text-field>
                                </v-form>

                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-card-text>

            </v-card>
            <v-footer bottom absolute padless class="justify-end px-5">
                <v-btn class="mx-2 text-none" size="small" variant="outlined" elevation="0" @click="cerrar_drawer()"
                    color="light" prepend-icon="mdi-close-circle">
                    Cerrar
                </v-btn>

            </v-footer>


        </div>
        <div v-if="drawer_navigation == 3">
            <v-card elevation="0" class=" text-secondary">
                <v-alert class="mx-3">
                    <v-row>
                        <v-col cols="2">
                            <v-avatar class="mt-2" dark :color="ms_color">
                                <v-icon color="white" size="15">
                                    <icon class="material-symbols-outlined">{{ ms_icono }}</icon>
                                </v-icon>

                            </v-avatar>
                        </v-col>
                        <v-col cols="10">
                            <p class="text-h6">{{ ms_nombre }}</p>
                            <p class="text-caption ma-0">Gestiona los permisos del módulo</p>
                        </v-col>
                    </v-row>
                </v-alert>

                <v-card-text>
                    <v-form @submit.prevent="agregarPermiso">
                        <v-autocomplete variant="outlined" v-model="p_menu" :items="apiData_Menu" item-title="titulo"
                            item-value="idMenu" density="compact" :rules="v_p_menu"
                            @update:model-value="cargarSubMenu(p_menu)">
                            <template v-slot:label>
                                <div class="font-weight-regular text-caption text-secondary">Menu</div>
                            </template>
                        </v-autocomplete>
                        <v-autocomplete variant="outlined" density="compact" v-model="formData_4.claimName"
                            :items="apiData_SubMenu" item-value="titulo" item-title="titulo" :rules="v_p_submenu">
                            <template v-slot:label>
                                <div class="font-weight-regular text-caption text-secondary">Sub menu</div>
                            </template>
                        </v-autocomplete>

                        <v-text-field v-model="formData_4.claimValue" density="compact" class="ml-3 text-none"
                            variant="outlined" :rules="v_p_permiso">
                            <template v-slot:label>
                                <div class="font-weight-regular text-caption text-secondary">
                                    Nombre del permiso
                                </div>
                            </template>
                            <template v-slot:prepend>
                                <v-icon size="15">
                                    <icon class="material-symbols-outlined">verified_user</icon>
                                </v-icon>
                            </template>
                            <template v-slot:append>
                                <v-tooltip location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="text-none" type="submit" size="small" elevation="0"
                                            icon="mdi-plus-thick" v-bind="props">
                                        </v-btn>
                                    </template>
                                    Agregar un permiso
                                </v-tooltip>
                            </template>
                        </v-text-field>
                    </v-form>

                    <v-data-table class="text-caption text-secondary " :headers="headers" :items="apiData_Permisos"
                        density="compact" :items-per-page="15">

                        <template v-slot:item.acciones="{ item }">
                            <v-tooltip text="Eliminar un permiso" location="bottom">
                                <template v-slot:activator="{ props }">
                                    <v-icon v-bind="props" size="x-small" color="primary"
                                        @click="eliminarPermiso(item)">
                                        <icon class="material-symbols-outlined">
                                            delete
                                        </icon>

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

            </v-card>
            <v-divider class="mx-5"></v-divider>
            <v-footer bottom absolute padless class="justify-end px-5">
                <v-btn class="mx-2 text-none" size="small" variant="outlined" elevation="0" @click="cerrar_drawer()"
                    color="light" prepend-icon="mdi-close-circle">
                    Cerrar
                </v-btn>
            </v-footer>
        </div>
    </v-navigation-drawer>

</template>
