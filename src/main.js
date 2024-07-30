import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import createPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';
import '@/assets/sweetalertStyle.css'
import 'material-symbols'; 
import '@/assets/materialIconSymbols.css';
 
//import 'sweetalert2/dist/sweetalert2.min.css';  
//import  '@sweetalert2/theme-dark/dark.scss';
//import '@sweetalert2/theme-minimal/minimal.scss';
 
import '@/assets/main.scss'
import VSwatches from 'vue3-swatches'
import 'vue3-swatches/dist/style.css'

 


const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
pinia.use(createPersistedState)
const app = createApp(App);
app.use(pinia)
app.use(router)
app.use(vuetify) 
app.use(VueSweetalert2);
app.use(VSwatches)
app.mount('#app')  
