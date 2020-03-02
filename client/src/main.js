import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

require('dotenv').config()

import '@/assets/css/base.css'

import FlagIcon from 'vue-flag-icon'
import VueAxios from './plugins/axios'

Vue.config.productionTip = false
Vue.use(VueAxios, { store, router })
Vue.use(FlagIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
