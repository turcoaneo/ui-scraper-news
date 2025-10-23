import { createRouter, createWebHistory } from 'vue-router'
import ClusterView from '@/views/ClusterView.vue'
import DespreView from '@/views/DespreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cluster',
      component: ClusterView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/despre',
      name: 'despre',
      component: () => DespreView,
    },
  ],
})

export default router
