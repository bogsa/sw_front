import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('@/views/Inicio.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/Login.vue')
    }, 
    //** ADMINISTRACION */
    {
      path: '/configuracioninicial',
      name: 'Configuracioninicial',
      component: () => import('@/views/Administracion/Configuracioninicial.vue')
    },
    {
      path: '/informaciongeneral',
      name: 'Informaciongeneral',
      component: () => import('@/views/Administracion/Informaciongeneral.vue')
    },
    {
      path: '/modulos',
      name: 'Modulos',
      component: () => import('@/views/Administracion/Modulos.vue')
    },
    {
      path: '/administrarusuarios',
      name: 'Administrarusuarios',
      component: () => import('@/views/Administracion/Administrarusuarios.vue')
    },
    {
      path: '/perfilesperzonalizados',
      name: 'Perfilesperzonalizados',
      component: () => import('@/views/Administracion/Perfilesperzonalizados.vue')
    },
    {
      path: '/asignacióndeperfiles',
      name: 'Asignacióndeperfiles',
      component: () => import('@/views/Administracion/Asignacióndeperfiles.vue')
    },
    {
      path: '/Adquisiciondetimbres',
      name: 'Adquisiciondetimbres',
      component: () => import('@/views/Administracion/Adquisiciondetimbres.vue')
    },
    {
      path: '/Asignaciondetfds',
      name: 'Asignaciondetfds',
      component: () => import('@/views/Administracion/Asignaciondetfds.vue')
    },
    //**  PRODUCTOS */ 

   {
      path: '/Categoria',
      name: 'Categoria',
      component: () => import('@/views/Productos/Clasificacion/Categoria.vue')
    },
    {
      path: '/Departamento',
      name: 'Departamento',
      component: () => import('@/views/Productos/Clasificacion/Departamento.vue')
    },
    {
      path: '/Productos',
      name: 'Productos',
      component: () => import('@/views/Productos/Gestion/Productos.vue')
    },
    //** CONFIGURACION */ 
    {
      path: '/formadepago',
      name: 'Formadepago',
      component: () => import('@/views/Configuracion/CatalogosSAT/Formadepago.vue')
    },
    {
      path: '/metododepago',
      name: 'Metododepago',
      component: () => import('@/views/Configuracion/CatalogosSAT/Metododepago.vue')
    },
    {
      path: '/objetodeimpuesto',
      name: 'Objetodeimpuesto',
      component: () => import('@/views/Configuracion/CatalogosSAT/Objetodeimpuesto.vue')
    },
    {
      path: '/tipodefactor',
      name: 'Tipodefactor',
      component: () => import('@/views/Configuracion/CatalogosSAT/Tipodefactor.vue')
    },
    {
      path: '/impuestos',
      name: 'Impuestos',
      component: () => import('@/views/Configuracion/CatalogosSAT/Impuestos.vue')
    },
    {
      path: '/monedas',
      name: 'Monedas',
      component: () => import('@/views/Configuracion/CatalogosSAT/Monedas.vue')
    },
    {
      path: '/productosyservicios',
      name: 'Productosyservicios',
      component: () => import('@/views/Configuracion/CatalogosSAT/Productosyservicios.vue')
    },
    {
      path: '/regimenfiscal',
      name: 'Regimenfiscal',
      component: () => import('@/views/Configuracion/CatalogosSAT/Regimenfiscal.vue')
    },
    {
      path: '/tipoderelacion',
      name: 'Tipoderelacion',
      component: () => import('@/views/Configuracion/CatalogosSAT/Tipoderelacion.vue')
    },
    {
      path: '/tipodecomprobante',
      name: 'Tipodecomprobante',
      component: () => import('@/views/Configuracion/CatalogosSAT/Tipodecomprobante.vue')
    },
    {
      path: '/unidaddemedida',
      name: 'Unidaddemedida',
      component: () => import('@/views/Configuracion/CatalogosSAT/Unidaddemedida.vue')
    },
    {
      path: '/usodelcfdi',
      name: 'Usodelcfdi',
      component: () => import('@/views/Configuracion/CatalogosSAT/Usodelcfdi.vue')
    },
    {
      path: '/marca',
      name: 'Marca',
      component: () => import('@/views/Configuracion/Almacen/Marca.vue')
    },
    {
      path: '/proveedor',
      name: 'Proveedor',
      component: () => import('@/views/Configuracion/Almacen/Proveedor.vue')
    },


  ]
})

export default router
