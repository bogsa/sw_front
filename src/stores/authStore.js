import { defineStore } from 'pinia' 
import { useJwt } from '@vueuse/integrations/useJwt'
import router from '../router'


export const useAuth = defineStore('auth', {
    state: () => ({ 
        token: localStorage.getItem("token"), 
        usuario: useJwt(localStorage.getItem("token")) , 
        loader: false, 
        variablePrueba: 1
    }),

    getters:{
        setUsuario:(state) => state.usuario,
        setToken:(state) => state.token,
        isAuthenticated: (state) => {  
            if (state.token)
            { 
                return state.token
            }
            else
            {
                router.push({name:'Login'});
            }
        },
        setPrueba:(state) => state.variablePrueba,
     },

    actions: {
        guardarToken(token) {  
            localStorage.setItem('token', token);
            this.token =token;    
            this.usuario = useJwt(token)
            console.log(this.usuario)
        },
        
        cerrarSesion () {
   
            this.token = null; 
            localStorage.removeItem("token")
            router.push({name:'login'});
         
        },
        tokenExpired(token) {
            this.token = useJwt(token)
            let expired = false
            if (token != null) {
                var current_time = Date.now() / 1000
                if (token.exp < current_time) {
                    expired = true
                }
            }
            else {
                expired = true
            }
            return expired
        },
                
    },
    
 

})