<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount, onMounted, onUpdated, onUnmounted } from "vue";
import { useTheme } from "vuetify";
import { useAuth } from '@/stores/authStore';
import axios from "axios";
import Loader from './components/modulo/_loader.vue';
import ModalIdle from './components/modulo/_modalIdle.vue';
import { useIdle } from '@vueuse/core'
import useAppLoad from '@/composables/Application/appApi.js';
import router from './router'
// VARIABLES PARA LA ACTIVIDAD DE LA APP
const { idle } = useIdle(300000) //( 5 * 60 * 1000)  5min

const objetoIdle = {
  status: idle
}

// VARIABLES
const navitationDrawerRight = ref(null);
const auth = useAuth();
const drawerRight = ref(false);
const app_title = ref(null);
const app_subtitle = ref(null);
const theme = useTheme();
const modo_tema = ref("light");
const colorInline = ref(null);
const swatchesArray = ref([
  { color: "#3398DB" },
  { color: "#73A707" },
  { color: "#8E43AD" },
  { color: "#DCB410" },
  { color: "#ed7117" },
  { color: "#AF3A2E" },
]);
const draweMenu= ref(true);
const { apiData_Roles, statusCode_Roles, postData_Roles } = useAppLoad();
const { apiData_Menus, statusCode_Menus, getData_Menus } = useAppLoad();
const { apiData_Corporativos, statusCode_Corporativo, getData_Corporativos } = useAppLoad();
const { apiData_Empresas, statusCode_Empresas, getData_Empresas, getData_MisEmpresas } = useAppLoad();
const { apiData_CentroTrabajo, statusCode_CentroTrabajo, getData_CentrosTrabajo, getData_MisCentrosTrabajo } = useAppLoad();
const { apiSingleData_CentroTrabajoAsignado, stautsCode_CentroTrabajoAsignado, getSingleData_CentroTrabajoAsignado } = useAppLoad();
const { statusCode_AsignarCentroTrabajo, putSinlgeData_AsignarCentroTrabajo } = useAppLoad();

//const usuario = ref(null);
const nombreUsuario = ref(null);
const perfil = ref({});
const corporativo = ref(null);
const empresa = ref(null);
const centroTrabajo = ref(null);

// INTERCEPTORES
axios.interceptors.request.use(
  (config) => {
    // Hacer algo antes de enviar la solicitud 
    auth.loader = true;
    return config;
  },
  (error) => {
    // Hacer algo con error de solicitud 
    auth.loader = false;
    return Promise.reject(error);
  }
);

// Agregar un interceptor de respuesta
axios.interceptors.response.use(
  (response) => {
    // Hacer algo con datos de respuesta
    auth.loader = false;
    return response;
  },
  (error) => {
    // Hacer algo con error de solicitud
    auth.loader = false;
    return Promise.reject(error);
  }
);



const isAuthenticated = computed(() => {

  if (auth.token) {
    const usuario = ref(auth.usuario["payload"]);
    const modulos = ref(usuario.value["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
    nombreUsuario.value = usuario.value["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]

    cargarDatosApp(modulos.value);
    cargarPerfil();



  }
  return auth.token
})



const cargarDatosApp = async (modulos) => {
  await postData_Roles(modulos)
}


// FUNCIONES
function show_drawer_filter() {
  navitationDrawerRight.value = "filter"
  app_title.value = 'Filtro';
  app_subtitle.value = 'Configura tu lugar de trabajo';
  drawerRight.value = true;
}
function show_drawer_account() {
  navitationDrawerRight.value = "account"
  app_title.value = "Mi cuenta"
  app_subtitle.value = "Gestiona tu cuenta de usuario."
  drawerRight.value = true;

}
function show_drawer_settings() {
  navitationDrawerRight.value = "settings"
  app_title.value = 'Tema';
  app_subtitle.value = 'Personaliza tu experiencia con los colores que mas te gusten.';
  drawerRight.value = true;
}

function set_themes() {
  var color = "";
  switch (colorInline.value) {
    case "#73A707":
      color = 'green';
      break;
    case "#3398DB":
      color = 'blue';
      break;
    case "#8E43AD":
      color = 'purple';
      break;
    case "#DCB410":
      color = 'yellow';
      break;
    case "#ed7117":
      color = 'orange';
      break;
    case "#AF3A2E":
      color = 'red';
      break;
  }
  enableSweetAlertTheme(modo_tema.value);
  theme.global.name.value = modo_tema.value + "_" + color;
  drawerRight.value = false;
}
function cerrar_drawerRight() {
  drawerRight.value = false;
  navitationDrawerRight.value = null;
}
function cargarPerfil() {
  const usuario = ref(auth.usuario["payload"]);
  perfil.value = usuario.value["typ"];
  const id_corporativo = ref(usuario.value["ID_Corporativo"]);
  const id_usuario = ref(usuario.value["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);

  if (perfil.value == "Super administrador") {
    cargarCorporativos();
  }
  else if (perfil.value == "Administrador de corporativo") {
    cargarEmpresas(id_corporativo.value);
  }
  else if (perfil.value == "Administrador empresa") {
    cargarMisEmpresas(id_usuario.value);
  }
  else if (perfil.value == "Empleado de centro de trabajo") {
    cargarMisCentrosTrabajo(id_usuario.value);
  }
  cargarCentroTrabajoAsignado(id_usuario.value);



}
function cerrarSesion() {
  drawerRight.value = false;
  auth.cerrarSesion();
}


// METODOS

const enableSweetAlertTheme = (theme) => {
  document.head.querySelector('#swal2-theme-styles').setAttribute('href', `https://cdn.jsdelivr.net/npm/@sweetalert2/theme-${theme}@4/${theme}.css`)
}

const selectModulo = async (id_modulo) => {
  await getData_Menus(id_modulo)
}
const cargarCorporativos = async () => {
  await getData_Corporativos();
}
const cargarEmpresas = async (id_corporativo) => {
  await getData_Empresas(id_corporativo);
}
const cargarMisEmpresas = async (id_usuario) => {
  await getData_MisEmpresas(id_usuario);
}
const cargarCentroTrabajo = async (id_empresa) => {
  await getData_CentrosTrabajo(id_empresa)
}
const cargarMisCentrosTrabajo = async (id_usuario) => {
  await getData_MisCentrosTrabajo(id_usuario);
}
const cargarCentroTrabajoAsignado = async (id_usuario) => {
  await getSingleData_CentroTrabajoAsignado(id_usuario);
}

const asignarCentroTrabajo = async (id_centroTrabajo) => {

  const usuario = ref(auth.usuario["payload"]);
  const id_usuario = ref(usuario.value["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
  await putSinlgeData_AsignarCentroTrabajo(id_usuario.value, id_centroTrabajo)
  if (statusCode_AsignarCentroTrabajo.value == 200 || statusCode_AsignarCentroTrabajo.value == 202) {
    cargarCentroTrabajoAsignado(id_usuario.value);
  }
}





</script>


<template>
  <v-app>
    <v-layout class="rounded rounded-md">

      <v-app-bar  prominent flat>
        <v-app-bar-nav-icon variant="text">
          <v-icon @click="draweMenu =!draweMenu" color="secondary" icon="mdil mdil-menu"></v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title class="text-secondary">SW 3.0</v-toolbar-title>
        <v-spacer></v-spacer>


        <div v-if="isAuthenticated" class="px-3">
          <span class="text-caption text-secondary">Bienvenido:
            <a class="text-primary font-weight-bold px-2">{{ nombreUsuario }}</a>
            Centro de trabajo asignado:
            <a class="text-primary font-weight-bold px-2">{{ apiSingleData_CentroTrabajoAsignado }}</a>
          </span>

          <v-tooltip text="Cambiar de lugar de trabajo" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" v-bind="props" class="mx-1" small color="light" icon
                @click="show_drawer_filter()">
                <icon class="material-symbols-outlined">filter_alt</icon>
              </v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="Mi cuenta" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" v-bind="props" class="mx-1" small color="light" icon
                @click="show_drawer_account()">
                <icon class="material-symbols-outlined">account_box</icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Notificaciónes" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" v-bind="props" class="mx-1" small color="light" icon>
                <v-badge color="primary" content="2">
                  <icon class="material-symbols-outlined">notifications</icon>
                </v-badge>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Configuración" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" v-bind="props" class="mx-1" icon small color="light"
                @click="show_drawer_settings()">
                <icon class="material-symbols-outlined">palette</icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
        <div v-else class="px-3">
          <v-tooltip text="Cerrar sesión" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" v-bind="props" small icon @click="cerrarSesion()">
                <icon class="material-symbols-outlined mx-3">login</icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-app-bar>


      <v-navigation-drawer  v-if="isAuthenticated" class="align-center justify-center " 
      floating elevation="10" rail
        permanent location="right">

        <span v-for="(modulo, i) in apiData_Roles" :key="i">
          <v-tooltip left>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" class="ma-1" @click="selectModulo(modulo.idRol)">
                <v-avatar :color="modulo.color" size="large">
                  <v-icon size="16" color="white">
                    <icon class="material-symbols-outlined">{{ modulo.icono }}</icon>
                  </v-icon>

                </v-avatar>
              </v-btn>
            </template>
            <span class="caption font-weight-normal">{{ modulo.tooltip }}</span>
          </v-tooltip>
        </span>
      </v-navigation-drawer>

      <v-navigation-drawer  v-if="isAuthenticated" permanent 
      elevation="10" floating v-model="draweMenu">
        <v-list class="text-overline">

          <v-list-item link :to="{ name: 'inicio' }" class="rounded-lg">
            <div class="font-weight-regular text-caption text-secondary">Inicio</div>
            <template v-slot:prepend>
              <icon class="material-symbols-outlined mx-3 text-primary">home</icon>
            </template>
          </v-list-item>

          <v-list-group v-for="item in apiData_Menus" :key="item.id">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <div class="font-weight-regular text-caption text-secondary">{{ item.titulo }}</div>
                <template v-slot:prepend>
                  <icon class="material-symbols-outlined mx-3 text-primary">{{ item.icono }}</icon>
                </template>
              </v-list-item>
            </template>
            <v-list-item v-for="child in item.subMenus" :key="child.id" link :to="child.link">
              <div class="font-weight-regular text-caption text-secondary">{{ child.titulo }}</div>
              <template v-slot:prepend>
                <icon class="material-symbols-outlined px-3 text-primary">{{ child.icono }}</icon>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>


      <v-main  color="background">
        <v-container fluid color="background" class="px-md-12 mx-lg-auto">
          <router-view />
          <ModalIdle :="objetoIdle" v-if="isAuthenticated && idle"></ModalIdle>
          <Loader></Loader>

        </v-container>
      </v-main>

      <v-navigation-drawer  v-model="drawerRight" location="right" floating temporary permanent width="300">
        <v-alert class="ma-3">
          <p class="text-subtitle-1"> {{ app_title }}</p>
          <p class="text-caption">{{ app_subtitle }}</p>
        </v-alert>




        <div v-if="navitationDrawerRight == 'filter'">
          <form @submit.prevent="asignarCentroTrabajo(centroTrabajo)" id="formAsigCenTra">
            <v-card elevation="0" class=" text-secondary">
              <v-card-text>
                <v-autocomplete v-if="perfil == 'Super administrador'" variant="outlined" v-model="corporativo"
                  :items="apiData_Corporativos" item-title="nombre" item-value="idCoorporativo" density="compact"
                  @update:model-value="cargarEmpresas(corporativo)">
                  <template v-slot:label>
                    <div class="font-weight-regular text-caption text-secondary">Corporativo</div>
                  </template>
                </v-autocomplete>
                <v-autocomplete
                  v-if="perfil == 'Super administrador' || perfil == 'Administrador de corporativo' || perfil == 'Administrador de empresa'"
                  variant="outlined" density="compact" v-model="empresa" :items="apiData_Empresas"
                  @update:model-value="cargarCentroTrabajo(empresa)" item-value="idEmpresa" item-title="nombre">
                  <template v-slot:label>
                    <div class="font-weight-regular text-caption text-secondary">Empresa</div>
                  </template>
                </v-autocomplete>
                <v-autocomplete
                  v-if="perfil == 'Super administrador' || perfil == 'Administrador de corporativo' || perfil == 'Administrador de empresa' || perfil == 'Empleado de centro de trabajo'"
                  variant="outlined" density="compact" v-model="centroTrabajo" :items="apiData_CentroTrabajo"
                  item-value="idCentroTrabajo" item-title="nombre">
                  <template v-slot:label>
                    <div class="font-weight-regular text-caption text-secondary">Centro de trabajo</div>
                  </template>
                </v-autocomplete>
              </v-card-text>
            </v-card>

            <v-footer bottom absolute padless class="justify-end px-5">
              <v-btn class="mx-2 text-none" size="small" variant="outlined" elevation="0" @click="cerrar_drawerRight()"
                color="light" prepend-icon="mdi-close-circle">
                Cerrar
              </v-btn>
              <v-btn class="mx-2 text-none" type="submit" size="small" elevation="0" color="primary"
                prepend-icon="mdi-check-circle">
                Guardar
              </v-btn>
            </v-footer>
          </form>
        </div>


        <div v-if="navitationDrawerRight == 'account'">
          <v-list>
            <v-list-item link class="rounded-lg mx-3">
              <div class="font-weight-regular text-caption text-secondary">Informacion del perfil</div>
              <template v-slot:prepend>
                <icon class="material-symbols-outlined mx-3 text-primary">id_card</icon>
              </template>
            </v-list-item>
            <v-list-item link class="rounded-lg mx-3">
              <div class="font-weight-regular text-caption text-secondary">Reestablecer la contraseña</div>
              <template v-slot:prepend>
                <icon class="material-symbols-outlined mx-3 text-primary">lock</icon>
              </template>
            </v-list-item>
            <v-list-item link class="rounded-lg mx-3">
              <div class="font-weight-regular text-caption text-secondary">Preferencias</div>
              <template v-slot:prepend>
                <icon class="material-symbols-outlined mx-3 text-primary">settings_account_box</icon>
              </template>
            </v-list-item>
            <v-list-item link @click="cerrarSesion()" class="rounded-lg mx-3">
              <div class="font-weight-regular text-caption text-secondary">Cerrar sesión</div>
              <template v-slot:prepend>
                <icon class="material-symbols-outlined mx-3 text-primary">power_settings_new</icon>
              </template>
            </v-list-item>
          </v-list>
        </div>

        <div v-if="navitationDrawerRight == 'settings'">
          <v-radio-group v-model="modo_tema" class="px-5">
            <v-radio color="primary" value="light">
              <template v-slot:label>
                <div class="font-weight-regular text-caption">Light Theme</div>
              </template>
            </v-radio>
            <v-radio color="primary" value="dark">
              <template v-slot:label>
                <div class="font-weight-regular text-caption">Dark Theme</div>
              </template>
            </v-radio>
          </v-radio-group>

          <v-alert class="mx-3">
            <v-swatches v-model="colorInline" inline :swatches="swatchesArray" key="label" :spacing-size="10"
              background-color="transparent" shapes="circles" :show-border="false" swatch-size="25" />
          </v-alert>
          <v-spacer class="pa-3"></v-spacer>
          <v-footer bottom absolute padless class="justify-end pl-2 pa-3">

            <v-btn class="mx-2 text-none" size="small" variant="outlined" elevation="0" @click="cerrar_drawerRight()"
              color="light" prepend-icon="mdi-close-circle">
              Cerrar
            </v-btn>
            <v-btn class="mx-2 text-none" size="small" color="primary" elevation="0" @click="set_themes()"
              prepend-icon="mdi-check-circle">
              Guardar
            </v-btn>
          </v-footer>
        </div>




      </v-navigation-drawer>

      <v-footer app color="background"  dense temporary>
        <a class="text-caption text-secondary"> copyright © 2024 Woola Group </a>
      </v-footer>

    </v-layout>

  </v-app>
</template>
