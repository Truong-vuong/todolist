import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/output.css'

createApp(App).use(router).mount('#app')