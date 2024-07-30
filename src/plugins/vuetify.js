// Vuetify
import 'vuetify/styles'
import { h } from 'vue'
import { createVuetify } from 'vuetify' 
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'  
import '@mdi/font/css/materialdesignicons.css'
import '@mdi/light-font/css/materialdesignicons-light.css'
import { VFab } from 'vuetify/labs/VFab'



const light_blue = {
  dark: false,
  colors: {  
    primary: "#3398DB",                  // BASE  DEL TEMA
    secondary:"#3A3A3A",              // TEXTO
    background: "#F9F9F9",            // FONDO DE  LA APP
    accent: "#DBDBDB",                  // CARDS
    light:"#8F8F8F",  
    error:"#B70602",                        // ICONOS
  },
};
const light_green = {
  dark: false,
  colors: {  
    primary: "#73A707",  
    secondary:"#3A3A3A",
    background: "#F8F8F8",
    accent: "#DBDBDB",
    light:"#8F8F8F",
    error:"#B70602",    
  },
};
const light_purple = {
  dark: false,
  colors: {  
    primary: "#8E43AD",  
    secondary:"#3A3A3A",
    background: "#F8F8F8",
    accent: "#DBDBDB",
    light:"#8F8F8F",
    error:"#B70602",    
  },
};
const light_yellow = {
  dark: false,
  colors: {  
    primary: "#AE8E0D",  
    secondary:"#3A3A3A",
    background: "#F8F8F8",
    accent: "#DBDBDB",
    light:"#8F8F8F",
    error:"#B70602",    
  },
};
const light_orange = {
  dark: false,
  colors: {  
    primary: "#ed7117",  
    secondary:"#3A3A3A",
    background: "#F8F8F8",
    accent: "#DBDBDB",
    light:"#8F8F8F",
    error:"#B70602",    
  },
};
const light_red = {
  dark: false,
  colors: {  
    primary: "#AF3A2E",  
    secondary:"#3A3A3A",
    background: "#F8F8F8",
    accent: "#DBDBDB",
    light:"#8F8F8F",
    error:"#B70602",    
  },
};


const dark_blue = {
  dark: true,
  colors: {  
    primary: "#3398DB",  
    secondary: "#8F8F8F",
    background: "#262626",
    accent: "#DBDBDB",
    light:"#707070",
    error:"#B70602",    
  },
};
const dark_green = {
  dark: true,
  colors: {  
    primary: "#73A707",  
    secondary: "#8F8F8F",
    background: "#262626",
    accent: "#DBDBDB",
    light:"#707070",
    error:"#B70602",    
  },
};
const dark_purple = {
  dark: true,
  colors: {  
    primary: "#8E43AD",  
    secondary: "#8F8F8F",
    background: "#262626",
    accent: "#DBDBDB",
    light:"#707070",
    error:"#B70602",    
  },
};
const dark_yellow = {
  dark: true,
  colors: {  
    primary: "#AE8E0D",  
    secondary: "#8F8F8F",
    background: "#262626",
    accent: "#DBDBDB",
    light:"#707070",
    error:"#B70602",    
  },
};
const dark_orange = {
  dark: true,
  colors: {  
    primary: "#ed7117",  
    secondary: "#8F8F8F",
    background: "#262626",
    accent: "#DBDBDB",
    light:"#707070",
    error:"#B70602",    
  },
};
const dark_red = {
  dark: true,
  colors: {  
    primary: "#AF3A2E",  
    secondary: "#8F8F8F",
    background: "#262626",
    accent: "#DBDBDB",
    light:"#707070",
  },
};
export default createVuetify({  
  components,
  VFab,
  directives,
  theme: { 
    defaultTheme: 'dark_orange',  
    themes: {
      light_green,
      light_blue,
      light_purple,
      light_yellow,
      light_orange,
      light_red,      
      dark_green,
      dark_blue,
      dark_purple,
      dark_yellow,
      dark_orange,
      dark_red,
    },
  
  },
  
})