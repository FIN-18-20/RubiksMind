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
  async addTimer({ commit }, timer) {
    const currentTimers = JSON.parse(localStorage.getItem('timers')) || []
    const idTimer = currentTimers.length ? (currentTimers.reduce((a, b) => a.id > b.id ? a : b).id + 1) : 0
    timer.id = idTimer
    currentTimers.push(timer)
    localStorage.setItem('timers', JSON.stringify(currentTimers))
    commit('ADD_TIMER', timer)
  },
  async getTimers({ commit }) {
    const timers = JSON.parse(localStorage.getItem('timers')) || []
    commit('LOAD_TIMERS', timers)
  },
  async removeTimer({ commit }, timerId) {
    commit('REMOVE_TIMER', timerId)
    let currentTimers = JSON.parse(localStorage.getItem('timers')) || []
    currentTimers = currentTimers.filter(timer => timer.id !== timerId)
    localStorage.setItem('timers', JSON.stringify(currentTimers))
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