import Vue from 'vue'
import Vuex from 'vuex'
import cube from '@/store/modules/cube'
import settings from '@/store/modules/settings'
import timer from '@/store/modules/timer'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    localMode: true
  },
  mutations: {
    CHANGE_LOCAL_MODE(state, mode) {
      state.localMode = mode
    }
  },
  actions: {
  },
  modules: {
    cube,
    settings,
    timer,
    auth
  }
})
