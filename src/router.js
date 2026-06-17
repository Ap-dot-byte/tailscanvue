import { createRouter, createWebHistory } from 'vue-router'

// Importa tus componentes
import Login from '@/components/Login.vue'
import SignIn from '@/components/SignIn.vue'
import Home from '@/components/Home.vue'
import GeneradorQR from '@/components/GeneradorQR.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/generador-qr',
    name: 'GeneradorQR',
    component: GeneradorQR
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router