import Vue from 'vue'
import Vuex from 'vuex'
import settings from '@/store/modules/settings'
import timer from '@/store/modules/timer'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    localMode: true
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    settings,
    timer,
  }
})
