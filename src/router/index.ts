import { createRouter, createWebHistory } from 'vue-router'
import KatalogView from '@/views/KatalogView.vue'
import Brosur from '@/views/Brosur.vue'
import Direktori from '@/views/Direktori.vue'



const router = createRouter({
  history: createWebHistory(),

  routes: [
  
    {
    path: '/Katalog',
    name: 'Katalog',
    component: KatalogView,
  },
  {
    path: '/Brosur',
    name: 'Brosur',
    component: Brosur,
  },
  {
    path: '/Direktori',
    name: 'Direktori',
    component: Direktori,
  },
    
  ],
})

export default router
