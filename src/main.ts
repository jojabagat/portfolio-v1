import './assets/globalStyles.css'
import './assets/mixins.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()
const modules = import.meta.glob('./components/icons/*.vue', { eager: true })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Object.entries(modules).forEach(([path, module]: any) => {
  const name = path.split('/').pop()?.replace('.vue', '')
  if (name) app.component(name, module.default)
})

app.use(router)
app.use(head)
app.mount('#app')
