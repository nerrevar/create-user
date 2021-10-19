import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'

// Global prime
import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
// Prime theme
import 'primevue/resources/themes/saga-blue/theme.css'
// Prime components
import primeComponents from './prime-components'

import ToastService from 'primevue/toastservice'

import './style/style.sass'

document.title = 'User creation form'

const app = createApp(App)
  .use(store, key)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)

primeComponents.forEach(el => app.component(el.name, el))

app.mount('#app')
