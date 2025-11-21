import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

// create pinia instance
const pinia = createPinia()

// register pinia before mounting
app.use(pinia)

app.use(router)

app.mount('#app')
