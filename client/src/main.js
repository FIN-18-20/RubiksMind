import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

require('dotenv').config()

import '@/assets/css/base.css'

import VueAxios from './plugins/axios'

Vue.config.productionTip = false
Vue.use(VueAxios, { store, router })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
