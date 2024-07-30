import { ref, } from 'vue'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useAuth } from '@/stores/authStore.js';
import Swal from 'sweetalert2'
import use_httpRSC from "@/composables/httpRSC";

export default function useAppLoad() {
  //  VARIABLES
  const store = useUrl();
  const base = store.apisw;
  const auth = useAuth();
  const httpRSC = use_httpRSC();


  const modulosLista = ref([]);
  const apiData_Roles = ref([]);
  const statusCode_Roles = ref(null);

  const apiData_Menus = ref([]);
  const statusCode_Menus = ref(null);

  const apiData_Corporativos = ref([]);
  const statusCode_Corporativo = ref(null);

  const apiData_Empresas = ref([]);
  const statusCode_Empresas = ref(null);

  const apiData_CentroTrabajo = ref([]);
  const statusCode_CentroTrabajo = ref(null);

  const apiSingleData_CentroTrabajoAsignado = ref(null);
  const stautsCode_CentroTrabajoAsignado = ref(null);

  const statusCode_AsignarCentroTrabajo = ref(null);

  // METODOS  PARA CARGAR LOS DATOS NECESARIOS DE LA APP

  //  POST  
  const postData_Roles = async (modulos) => {

    apiData_Roles.value = [];
    modulosLista.value = [];
    for (var i = 0; i < modulos.length; i++) {
      modulosLista.value.push({
        idRol: modulos[i],
      })
    }

    try {
      const configuracion = {
        method: 'POST',
        url: base + "api/C_Usuarios/ListarRolesUsuario",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        data: { listaRoles: modulosLista.value }

      }
      const respuesta = await axios(configuracion)
      apiData_Roles.value = respuesta.data;
      statusCode_Roles.value = respuesta.status;

    } catch (error) {
      let res_error = null
      if (error.response.data.error == undefined) {
        res_error = error;
      }
      else {
        res_error = error.response.data.error
      }
      Swal.fire({
        icon: "info",
        title: httpRSC.searchCode(error.response.status),
        html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' +
          '<br> Codigo de status: <strong>' + error.code + '</strong>' + '<br>' + res_error + '</div>',
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
  //GET  MENUS
  const getData_Menus = async (idRol) => {
    apiData_Menus.value = [];
    try {
      const configuracion = {
        method: 'GET',
        url: base + 'api/C_Menus/ListarMenuSubMenu/' + idRol,
        headers: {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
        }
      }
      const respuesta = await axios(configuracion)
      apiData_Menus.value = respuesta.data;
      statusCode_Menus.value = respuesta.status;
    } catch (error) {
      let res_error = null
      if (error.response.data.error == undefined) {
        res_error = error;
      }
      else {
        res_error = error.response.data.error
      }
      Swal.fire({
        icon: "info",
        title: httpRSC.searchCode(error.response.status),
        html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' +
          '<br> Codigo de status: <strong>' + error.code + '</strong>' + '<br>' + res_error + '</div>',
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
  // GET CORPORATIVOS
  const getData_Corporativos = async () => {
    apiData_Corporativos.value = [];
    try {
      const configuracion = {
        method: "GET",
        url: base + "api/C_Coorporativo/ListarCoorporativos",
        headers: {
          'Content-Type': 'Application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      }
      const respuesta = await axios(configuracion);
      apiData_Corporativos.value = respuesta.data;
      statusCode_Corporativo.value = respuesta.status;
    } catch (error) {
      let res_error = null
      if (error.response.data.error == undefined) {
        res_error = error;
      }
      else {
        res_error = error.response.data.error
      }
      Swal.fire({
        icon: "info",
        title: httpRSC.searchCode(error.response.status),
        html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' +
          '<br> Codigo de status: <strong>' + error.code + '</strong>' + '<br>' + res_error + '</div>',
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
  // GET EMPRESAS
  const getData_Empresas = async (corporatico) => {
    apiData_Empresas.value = [];
    try {
      const configuracion = {
        method: 'GET',
        url: base + 'api/C_Empresa/ListarporIdCorporativo/' + corporatico,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      }
      const respuesta = await axios(configuracion);
      apiData_Empresas.value = respuesta.data;
      statusCode_Empresas.value = respuesta.status;
    } catch (error) {
      let res_error = null
      if (error.response.data.error == undefined) {
        res_error = error;
      }
      else {
        res_error = error.response.data.error
      }
      Swal.fire({
        icon: "info",
        title: httpRSC.searchCode(error.response.status),
        html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' +
          '<br> Codigo de status: <strong>' + error.code + '</strong>' + '<br>' + res_error + '</div>',
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
  // GET MIS EMPRESAS
  const getData_MisEmpresas = async (usuario) => {
    apiData_Empresas.value = [];
    try {
      const configuracion = {
        method: 'GET',
        url: base + 'api/C_Usuarios/UsuarioEmpresas/' + usuario,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      }
      const respuesta = await axios(configuracion)
      apiData_Empresas.value = respuesta.data;
      statusCode_Empresas.value = respuesta.data;
    } catch (error) {
      let res_error = null
      if (error.response.data.error == undefined) {
        res_error = error;
      }
      else {
        res_error = error.response.data.error
      }
      Swal.fire({
        icon: "info",
        title: httpRSC.searchCode(error.response.status),
        html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' +
          '<br> Codigo de status: <strong>' + error.code + '</strong>' + '<br>' + res_error + '</div>',
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
  // GET CENTROS DE TRABAJO
  const getData_CentrosTrabajo = async (empresa) => {
    apiData_CentroTrabajo.value = [];
    try {
      const configuracion = {
        method: 'GET',
        url: base + 'api/C_CentroTrabajo/ListarporEmpresa/' + empresa,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      }
      const respuesta = await axios(configuracion)
      apiData_CentroTrabajo.value = respuesta.data;
      statusCode_CentroTrabajo.value = respuesta.status;
    } catch (error) {
      let res_error = null
      if (error.response.data.error == undefined) {
        res_error = error;
      }
      else {
        res_error = error.response.data.error
      }
      Swal.fire({
        icon: "info",
        title: httpRSC.searchCode(error.response.status),
        html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' +
          '<br> Codigo de status: <strong>' + error.code + '</strong>' + '<br>' + res_error + '</div>',
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
  // GET MIS CENTROS DE TRABAJO
  const getData_MisCentrosTrabajo = async (usuario) => {
    apiData_CentroTrabajo.value = [];
    try {
      const configuracion = {
        method: 'GET',
        url: base + 'api/C_Usuarios/UsuarioCentroTrabajoes/' + usuario,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        },
      }
      const respuesta = await axios(configuracion)
      apiData_CentroTrabajo.value = respuesta.data;
      statusCode_CentroTrabajo.value = respuesta.status;
    } catch (error) {
      let res_error = null
      if (error.response.data.error == undefined) {
        res_error = error;
      }
      else {
        res_error = error.response.data.error
      }
      Swal.fire({
        icon: "info",
        title: httpRSC.searchCode(error.response.status),
        html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' +
          '<br> Codigo de status: <strong>' + error.code + '</strong>' + '<br>' + res_error + '</div>',
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
  // GET CENTRO DE TRABAJO ASIGNADO

  const getSingleData_CentroTrabajoAsignado = async (usuario) => {
    apiSingleData_CentroTrabajoAsignado.value = null;
    try {
      const configuracion = {
        method: 'GET',
        url: base + 'api/C_Usuarios/CentroTrabajoAsignado/' + usuario,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Berer ' + auth.token,
        }
      }
      const respuesta = await axios(configuracion)
      apiSingleData_CentroTrabajoAsignado.value = respuesta.data.result;
      stautsCode_CentroTrabajoAsignado.value = respuesta.status;

    } catch (error) {
      let res_error = null
      if (error.response.data.error == undefined) {
        res_error = error;
      }
      else {
        res_error = error.response.data.error
      }
      Swal.fire({
        icon: "info",
        title: httpRSC.searchCode(error.response.status),
        html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' +
          '<br> Codigo de status: <strong>' + error.code + '</strong>' + '<br>' + res_error + '</div>',
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

  //PUT ASIGNAR CENTRO DE TRABAJO

  const putSinlgeData_AsignarCentroTrabajo = async (usuario, centrotrabajo) => {
    try {
      const configuracion = {
        method: 'PUT',
        url: base + 'api/C_Usuarios/AsignarCentroTrabajo/' + usuario + '/' + centrotrabajo,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      }
      const respuesta = await axios(configuracion)
      statusCode_AsignarCentroTrabajo.value = respuesta.status;
      Swal.fire({
        icon: "success",
        title: httpRSC.searchCode(respuesta.status),
        html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' + '<br/>' +
          respuesta.data.result + '<br/><br/> Codigo de status: <strong>' + respuesta.status + '</strong>' + '</div>',
        width: 400,
        confirmButtonColor: '#655CC9',
        customClass: {
          htmlContainer: 'custom-container',
          title: 'custom-title',
          confirmButton: 'custom-button',
        },
      });
    } catch (error) {
      let res_error = null
      if (error.response.data.error == undefined) {
        res_error = error;
      }
      else {
        res_error = error.response.data.error
      }
      Swal.fire({
        icon: "info",
        title: httpRSC.searchCode(error.response.status),
        html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' +
          '<br> Codigo de status: <strong>' + error.code + '</strong>' + '<br>' + res_error + '</div>',
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








  return {
    apiData_Roles,
    statusCode_Roles,
    postData_Roles,

    apiData_Menus,
    statusCode_Menus,
    getData_Menus,

    apiData_Corporativos,
    statusCode_Corporativo,
    getData_Corporativos,

    apiData_Empresas,
    statusCode_Empresas,
    getData_Empresas,
    getData_MisEmpresas,

    apiData_CentroTrabajo,
    statusCode_CentroTrabajo,
    getData_CentrosTrabajo,
    getData_MisCentrosTrabajo,

    apiSingleData_CentroTrabajoAsignado,
    stautsCode_CentroTrabajoAsignado,
    getSingleData_CentroTrabajoAsignado,

    statusCode_AsignarCentroTrabajo,
    putSinlgeData_AsignarCentroTrabajo

  }


}


