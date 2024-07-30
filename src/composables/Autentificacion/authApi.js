import { ref } from 'vue'
import axios from 'axios'
import router from '@/router/index.js'
import { useAuth } from '@/stores/authStore.js';
import { useUrl } from '@/stores/url.js';


export default function useAuthApi() {
  const store = useUrl();
  const url = store.apisw
  const api = "api/C_Login/Login"
  const error = ref(null)
  const statusCode = ref(null)
  const auth = useAuth();

  //post      Add Data
  const loginData = async (formData) => {
    error.value = null
    try {

      const config = {
        method: 'POST',
        url: url + api,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(formData)
      }

      const res = await axios(config)
      
      auth.guardarToken(res.data.token)
      statusCode.value = res.status;
      router.push('/'); 
     
    } catch (err) { 
      if (err.code == "ERR_NETWORK") {
        error.value = "Error en la red o problemas de conexión"
      }
      if (err.code == "ERR_BAD_REQUEST") {
        error.value = "Error de comunicación con el servidor."
      }
      if (err.code == "ERR_BAD_REQUEST") {
        error.value = err.response.data.error
      }
    }
  }

  //update  Data

  //delete  Data
  return {
    error,
    statusCode,
    loginData,

  }
}