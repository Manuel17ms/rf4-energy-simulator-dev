import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultView from '../views/ResultView.vue'
import LoginView from '../views/LoginView.vue'

import { useAuthStore } from '../store/authStore'

const routes = [

  { path: '/', redirect: '/login' },


  { path: '/login', name: 'login', component: LoginView, meta: { public: true } },


  { path: '/home', name: 'home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/result', name: 'result', component: ResultView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to) => {
  const auth = useAuthStore()


  if (to.path === '/login' && auth.token) return '/home'

 
  if (to.meta.requiresAuth && !auth.token) return '/login'

  return true
})

export default router

