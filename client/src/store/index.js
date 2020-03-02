import Vue from 'vue'
import Vuex from 'vuex'
import cube from '@/store/modules/cube'
import settings from '@/store/modules/settings'
import timer from '@/store/modules/timer'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowWidth: null,
    breakpoint: null,
    breakpoints: {
      'mobile': 0,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
    },
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, width) {
      state.windowWidth = width
      const breakpoints = Object.values(state.breakpoints)
      breakpoints.push(width)
      breakpoints.sort((a, b) => a - b)

      const indexBreakpoint = breakpoints.indexOf(width) - 1
      const breakpointValue = breakpoints[indexBreakpoint]
      state.breakpoint = Object.keys(state.breakpoints).find(breakpoint => state.breakpoints[breakpoint] === breakpointValue)
    },
  },
  getters: {
  },
  actions: {
    updateWindowWidth({ commit }, width) {
      commit('UPDATE_WINDOW_WIDTH', width)
    },
  },
  modules: {
    cube,
    settings,
    timer,
    auth
  }
})
