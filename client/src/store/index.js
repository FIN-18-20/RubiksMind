import Vue from 'vue'
import Vuex from 'vuex'
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
    timer,
  }
})
