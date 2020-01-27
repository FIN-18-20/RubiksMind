import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import '@/assets/css/tailwind.css'

import VueAxios from './plugins/axios'

Vue.config.productionTip = false
Vue.use(VueAxios, { store })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
