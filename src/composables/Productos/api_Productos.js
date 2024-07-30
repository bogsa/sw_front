import { ref } from "vue";
import { useUrl } from "@/stores/url";
import { useAuth } from "@/stores/authStore";
import use_httpRSC from "@/composables/httpRSC";
import axios from "axios";
import Swal from "sweetalert2";


export default function use_Productos() {
    const url = useUrl();
    const auth = useAuth();
    const httpRSC = use_httpRSC();

    const apiData_Productos = ref([]);
    const statusCode_Productos = ref(null); 

    const get_Productos = async (idCorporativo) => {
        apiData_Productos.value = [];
        try {
            const configuracion = {
                method: 'GET',
                url: url.apisw + 'api/C_Producto/ListarporCorporativo/' + idCorporativo,
                header: {
                    'Content-Type': 'application/json',
                    Ahutorization: 'Bearer ' + auth.token,
                }
            }
            const respuesta = await axios(configuracion);
            apiData_Productos.value = respuesta.data;
            statusCode_Productos.value = respuesta.status;
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
        apiData_Productos,
        statusCode_Productos,
        get_Productos,
    }
}