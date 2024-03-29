import { axios } from '@/plugins/axios'

const state = {
  state: 'none',
  timers: [],
}

const mutations = {
  ADD_TIMER(state, timer) {
    state.timers.push(timer)
  },
  LOAD_TIMERS(state, timers) {
    state.timers = timers
  },
  REMOVE_TIMER(state, timerId) {
    state.timers = state.timers.filter(timer => timer.id !== timerId)
  },
  UPDATE_STATE(state, newState) {
    state.state = newState
  }
}

const actions = {
  async addTimer({ commit, rootState }, timer) {
    if (!rootState.auth.isLogged) {
      const currentTimers = JSON.parse(localStorage.getItem('timers')) || []
      const idTimer = currentTimers.length ? (currentTimers.reduce((a, b) => a.id > b.id ? a : b).id + 1) : 0
      timer.id = idTimer
      currentTimers.push(timer)
      localStorage.setItem('timers', JSON.stringify(currentTimers))
      commit('ADD_TIMER', timer)
      return
    }
    console.log('SAVE NEW TIMER IN DB')
    const idTimer = await axios(({ url: '/times/create', data: timer, method: 'POST' })).catch((err) => { console.log(err) })
    timer.id = idTimer.data
    commit('ADD_TIMER', timer)
  },
  async getTimers({ commit, rootState }) {
    if (!rootState.auth.isLogged) {
      console.log('LOCAL MODE')
      const timers = JSON.parse(localStorage.getItem('timers')) || []
      commit('LOAD_TIMERS', timers)
      return
    }
    console.log('API CALL FOR TIMERS')
    const resp = await axios(({ url: '/times/all', method: 'GET' })).catch((err) => { console.log(err) })
    commit('LOAD_TIMERS', resp.data)
  },
  async removeTimer({ commit, rootState }, timerId) {
    commit('REMOVE_TIMER', timerId)
    if (!rootState.auth.isLogged) {
      let currentTimers = JSON.parse(localStorage.getItem('timers')) || []
      currentTimers = currentTimers.filter(timer => timer.id !== timerId)
      localStorage.setItem('timers', JSON.stringify(currentTimers))
      return
    }
    console.log('API CALL REMOVE TIMER')
    await axios(({ url: `/times/delete/${timerId}`, method: 'DELETE' })).catch((err) => { console.log(err) })
  },
  updateState({commit}, newState) {
    commit('UPDATE_STATE', newState)
  }
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