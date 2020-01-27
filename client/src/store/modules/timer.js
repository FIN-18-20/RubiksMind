import { axios } from '@/plugins/axios'

const state = {
  timers: [],
}

const mutations = {
  ADD_TIMER(state, timer) {
    state.timers.push(timer)
  },
  LOAD_TIMERS(state, timers) {
    state.timers = timers
  },
}

const actions = {
  async addTimer({ commit, rootState }, timer) {
    commit('ADD_TIMER', timer)
    if (rootState.localMode) {
      const currentTimers = JSON.parse(localStorage.getItem('timers')) || []
      currentTimers.push(timer)
      localStorage.setItem('timers', JSON.stringify(currentTimers))
      return
    }
    const username = 'ToDo'
    console.log('SAVE NEW TIMER IN DB')
    await axios(({ url: `${username}/timers/create`, data: { timer }, method: 'POST' })).catch(() => { })
  },
  async getTimers({ commit, rootState }) {
    if (rootState.localMode) {
      console.log('LOCAL MODE')
      const timers = JSON.parse(localStorage.getItem('timers'))
      commit('LOAD_TIMERS', timers)
      return
    }

    console.log('API CALL FOR TIMERS')
    const username = 'ToDo'
    const resp = await axios(({ url: `${username}/timers`, method: 'GET' })).catch(() => { })
    commit('LOAD_TIMERS', resp.data)
  },
}

const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}