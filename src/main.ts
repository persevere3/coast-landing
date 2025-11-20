import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/elementPlus-variables.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(createPinia())

app.use(ElementPlus)
for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, component)
}


app.mount('#app')
