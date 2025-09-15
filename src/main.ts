import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@vueform/multiselect/themes/default.css';


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
