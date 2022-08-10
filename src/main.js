import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './style.sass'
import App from './App.vue'
import defaultLayout from './layouts/default.vue'

const router = createRouter({
  routes: [{
    path: '/scanner',
    component: () => import('./pages/scanner.vue')
  }, {
    path: '/',
    component: defaultLayout,
    children: Object.entries(import.meta.glob('./pages/*.vue')).map(
      ([p, component]) => {
        const PAGE_DIR = '../pages'
        const PAGE_EXT = '.vue'
        const PAGE_INDEX = 'index'

        let path = p.substring(PAGE_DIR.length, p.length - PAGE_EXT.length)
        if (path.endsWith(PAGE_INDEX)) {
          path = path.substring(0, path.length - PAGE_INDEX.length - 1)
        }
        if (!path) {
          path = '/'
        }
        if (!path.startsWith('/')) {
          path = '/' + path
        }
        return {
          path,
          component,
        }
      },
    ),
  },],
  history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.use(Toast)
app.mount('#app')

