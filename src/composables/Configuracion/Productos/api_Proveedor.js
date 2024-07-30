import { ref } from "vue";
import { useUrl } from "@/stores/url";
import { useAuth } from "@/stores/authStore";
import use_httpRSC from "@/composables/httpRSC";
import axios from "axios";
import Swal from "sweetalert2";

export default function use_Proveedor() {
    const url = useUrl();
    const auth = useAuth();
    const httpRSC = use_httpRSC();

    const apiData_Proveedor = ref([]);
    const statusCode_Proveedor = ref(null);

    const get_Proveedor = async (idCorporativo) => {
        apiData_Proveedor.value = [];
        try {
            const configuracion = {
                method: "GET",
                url: url.apisw + 'api/C_Proveedor/ListarporCorporativo/' + idCorporativo,
                headers: {
                    'Content-Type': 'application/json',
                    Ahutorization: 'Bearer ' + auth.token,
                }
            }
            const respuesta = await axios(configuracion);
            apiData_Proveedor.value = respuesta.data;

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
    const post_Proveedor = async (data) => {
        try {
            const configuracion = {
                method: 'POST',
                url: url.apisw,
                headers: {
                    'Content-Type': 'application/json',
                    Ahutorization: 'Bearer ' + auth.token,
                },
                data: JSON.stringify(data)
            }
            const respueta = await axios(configuracion)
            statusCode_Proveedor.value = respueta.status;
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
    const put_Proveedor = async (data) => {
        try {
            const configuracion = {
                method: 'GET',
                url: url.apisw,
                headers: {
                    'Content-Type': 'application/json',
                    Ahutorization: 'Bearer ' + auth.token,
                },
                data: JSON.stringify(data)
            }
            const respuesta = await axios(configuracion);
            statusCode_Categoria.value = respuesta.status;
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
        apiData_Proveedor,
        statusCode_Proveedor,
        get_Proveedor,
        post_Proveedor,
        put_Proveedor,
    }
}