import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CurrentWorkView from '../views/CurrentWorkView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/current-work', name: 'current-work', component: CurrentWorkView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router