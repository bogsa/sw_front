import { ref } from "vue";
import axios from "axios";
import { useUrl } from "@/stores/url";
import { useAuth } from "@/stores/authStore";
import Swal from "sweetalert2";
import use_httpRSC from "@/composables/httpRSC";

export default function use_usoCFDIs() {
    const url = useUrl();
    const auth = useAuth();
    const httpRSC = use_httpRSC();

    const apiData_usoCFDI = ref([]);
    const statusCode_usoCFDI = ref(null);
    const get_usoCFDI = async () => {
        apiData_usoCFDI.value = [];
        try {
            const configuracion = {
                method: 'GET',
                url: url.apisw + 'api/C_usoCFDI/Listar',
                headers: {
                    'Contetnt-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                },

            }
            const respuesta = await axios(configuracion);
            apiData_usoCFDI.value = respuesta.data;
            statusCode_usoCFDI.value = respuesta.status;
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

    const post_usoCFDI = async (data) => {
        try {
            const configuracion = {
                method: 'POST',
                url: url.apisw + 'api/C_usoCFDI/Crear',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                },
                data: JSON.stringify(data),
            }
            const respuesta = await axios(configuracion)
            statusCode_usoCFDI.value = respuesta.status;
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

    const put_usoCFDI = async (data) => {
        try {
            const configuracion = {
                method: 'PUT',
                url: url.apisw + 'api/C_usoCFDI/Actualizar',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                },
                data: JSON.stringify(data),
            }
            const respuesta = await axios(configuracion)
            statusCode_usoCFDI.value = respuesta.status;
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
        apiData_usoCFDI,
        statusCode_usoCFDI,
        get_usoCFDI,
        post_usoCFDI,
        put_usoCFDI,
    }

}