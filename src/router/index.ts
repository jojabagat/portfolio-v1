import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import ExperienceView from '@/views/ExperienceView.vue'
import WorksView from '@/views/WorksView.vue'
import ContactView from '@/views/ContactView.vue'

const routes = [
  { path: '/', name: 'About', component: AboutView },
  { path: '/experience', name: 'Experience', component: ExperienceView },
  { path: '/works', name: 'Works', component: WorksView },
  { path: '/contact', name: 'Contact', component: ContactView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 } // Always scroll to top
  },
})
