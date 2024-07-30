import { ref } from "vue";
import { useUrl } from "@/stores/url";
import { useAuth } from "@/stores/authStore";
import axios from "axios";
import Swal from "sweetalert2";
import use_httpRSC from "@/composables/httpRSC"

export default function use_Modulos() {
    const url = useUrl();
    const auth = useAuth();
    const httpRSC = use_httpRSC();

    const apiData_Modulos = ref([]);
    const statusCode_Modulos = ref(null);
    const statusResponse = ref(null);

    const apiData_MenusSubMenus = ref([]);
    const statusCode_MenusSubMenus = ref(null);

    const apiData_Menu = ref([]);
    const statusCode_Menu = ref(null);

    const apiData_SubMenu = ref([]);
    const statusCode_SubMenu = ref(null);

    const apiData_Permisos = ref([]);
    const statusCode_Permisos = ref(null);

    ////////////////////////////////////////////////////////////////////////////////////////
    const get_Modulos = async () => {
        apiData_Modulos.value = [];
        try {
            const configuracion = {
                method: 'GET',
                url: url.apisw + 'api/C_Modulos/ListarRoles',
                header: {
                    'Content-Type': 'application/json',
                    Ahutorization: 'Bearer ' + auth.token,
                }
            }
            const respuesta = await axios(configuracion);
            apiData_Modulos.value = respuesta.data;
            statusCode_Modulos.value = respuesta.status;
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

    const post_Modulo = async (data) => {
        try {
            const configuracion = {
                method: 'POST',
                url: url.apisw + 'api/C_Modulos/CrearRol',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                },
                data: JSON.stringify(data)
            }
            const respuesta = await axios(configuracion);

            Swal.fire({
                icon: "success",
                title: httpRSC.searchCode(respuesta.status),
                html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' + '<br>' +
                    respuesta.data.result + '<br> Codigo de status: <strong>' + respuesta.status + '</strong>' + '</div>',
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

    const put_Modulo = async (data) => {
        try {
            const configuracion = {
                method: 'POST',
                url: url.apisw + 'api/C_Modulos/ActualizarRol',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                },
                data: JSON.stringify(data)
            }
            const respuesta = await axios(configuracion);

            Swal.fire({
                icon: "success",
                title: httpRSC.searchCode(respuesta.status),
                html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' + '<br>' +
                    respuesta.data.result + '<br> Codigo de status: <strong>' + respuesta.status + '</strong>' + '</div>',
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

    const delete_Modulo = async (idModulo) => {
        try {
            const configuracion = {
                method: 'DELETE',
                url: url.apisw + 'api/C_Modulos/EliminarRol/' + idModulo,
                header: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            }
            const respuesta = await axios(configuracion);
            statusCode_Modulos.value = respuesta.status;
            statusResponse.value = respuesta.data.result;
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
    ////////////////////////////////////////////////////////////////////////////////////////
    const get_MenuSubMenuModulo = async (idModulo) => {
        apiData_MenusSubMenus.value = [];
        try {
            const configuracion = {
                method: 'GET',
                url: url.apisw + 'api/C_Menus/ListarMenuSubMenu/' + idModulo,
                header: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            }
            const respuesta = await axios(configuracion)
            apiData_MenusSubMenus.value = respuesta.data;
            statusCode_Modulos.value = respuesta.status;
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
    const post_MenuModulo = async (data) => {
        try {
            const configuracion = {
                method: 'POST',
                url: url.apisw + 'api/C_Menus/CrearMenu',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                },
                data: JSON.stringify(data),
            }
            const respuesta = await axios(configuracion);
            statusCode_MenusSubMenus.value = respuesta.status;
            Swal.fire({
                icon: "success",
                title: httpRSC.searchCode(respuesta.status),
                html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' + '<br>' +
                    respuesta.data.result + '<br> Codigo de status: <strong>' + respuesta.status + '</strong>' + '</div>',
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
    const delete_MenuModulo = async (menuId) => {
        try {
            const configuracion = {
                method: 'DELETE',
                url: url.apisw + 'api/C_Menus/EliminarMenu/ ' + menuId,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            }
            const respuesta = await axios(configuracion);
            statusCode_MenusSubMenus.value = respuesta.status;
            Swal.fire({
                icon: "success",
                title: httpRSC.searchCode(respuesta.status),
                html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' + '<br>' +
                    respuesta.data.result + '<br> Codigo de status: <strong>' + respuesta.status + '</strong>' + '</div>',
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
    const post_SubMenuModulo = async (data) => {
        try {
            const configuracion = {
                method: 'POST',
                url: url.apisw + 'api/C_Menus/CrearSubMenu',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                },
                data: JSON.stringify(data)
            }
            const respuesta = await axios(configuracion);
            statusCode_MenusSubMenus.value = respuesta.status;
            Swal.fire({
                icon: "success",
                title: httpRSC.searchCode(respuesta.status),
                html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' + '<br>' +
                    respuesta.data.result + '<br> Codigo de status: <strong>' + respuesta.status + '</strong>' + '</div>',
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
    const delete_SubMenuModulo = async (submenuId) => {
        try {
            const configuracion = {
                method: 'DELETE',
                url: url.apisw + 'api/C_Menus/EliminarSubMenu/ ' + submenuId,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            }
            const respuesta = await axios(configuracion);
            statusCode_MenusSubMenus.value = respuesta.status;
            Swal.fire({
                icon: "success",
                title: httpRSC.searchCode(respuesta.status),
                html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' + '<br>' +
                    respuesta.data.result + '<br> Codigo de status: <strong>' + respuesta.status + '</strong>' + '</div>',
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
    ///////////////////////////////////////////////////////////////////////////////////////
    const get_Menu = async (rolId) => {
        apiData_Menu.value = [];
        try {
            const configuracion = {
                method: 'GET',
                url: url.apisw + 'api/C_Menus/ListarMenus/' + rolId,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            }
            const respuesta = await axios(configuracion);
            apiData_Menu.value = respuesta.data;
            statusCode_Menu.value = respuesta.status;
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
    const get_SubMenu = async (menuId) => {
        apiData_SubMenu.value = [];
        try {
            const configuracion = {
                method: 'GET',
                url: url.apisw + 'api/C_Menus/ListarSubMenus/' + menuId,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            }
            const respuesta = await axios(configuracion);
            apiData_SubMenu.value = respuesta.data;
            statusCode_SubMenu.value = respuesta.status;
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
    ///////////////////////////////////////////////////////////////////////////////////////
    const get_Permisos = async (rol) => {
        apiData_Permisos.value = [];
        try {
            const configuracion = {
                method: 'GET',
                url: url.apisw + 'api/C_Permisos/ListarClaimsRol/' + rol,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer: ' + auth.token,
                }
            }
            const respuesta = await axios(configuracion)
            apiData_Permisos.value = respuesta.data.result;
            statusCode_Permisos.value = respuesta.status;
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

    const post_Permisos = async (data) => {
        console.log(data)
        try {
            const configuracion = {
                method: 'POST',
                url: url.apisw + 'api/C_Permisos/CrearClaimRol',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                },
                data: JSON.stringify(data)

    
            }
            const respuesta = await axios(configuracion)
            statusCode_Permisos.value = respuesta.status,
                Swal.fire({
                    icon: "success",
                    title: httpRSC.searchCode(respuesta.status),
                    html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' + '<br>' +
                        respuesta.data.result + '<br> Codigo de status: <strong>' + respuesta.status + '</strong>' + '</div>',
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
    
    const delete_Permisos = async (data) => {
        try {
            const configuracion = {
                method: 'POST',
                url: url.apisw + 'api/C_Permisos/ElimnarClaimRol',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                },
                data: JSON.stringify(data)
            }
            const respuesta = await axios(configuracion)
            statusCode_Permisos.value = respuesta.status,
                Swal.fire({
                    icon: "success",
                    title: httpRSC.searchCode(respuesta.status),
                    html: '<div class="text-center text-body-2 font-weight-normal pa-0 my-0">' + '<br>' +
                        respuesta.data.result + '<br> Codigo de status: <strong>' + respuesta.status + '</strong>' + '</div>',
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
        apiData_Modulos,
        statusCode_Modulos,
        statusResponse,
        get_Modulos,
        post_Modulo,
        put_Modulo,
        delete_Modulo,

        apiData_MenusSubMenus,
        statusCode_MenusSubMenus,
        get_MenuSubMenuModulo,
        post_MenuModulo,
        delete_MenuModulo,
        post_SubMenuModulo,
        delete_SubMenuModulo,

        apiData_Menu,
        statusCode_Menu,
        get_Menu,

        apiData_SubMenu,
        statusCode_SubMenu,
        get_SubMenu,

        apiData_Permisos,
        statusCode_Permisos,
        get_Permisos,
        post_Permisos,
        delete_Permisos,


    }


}
