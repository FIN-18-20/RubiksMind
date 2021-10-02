import scrambles from '@/data/scrambles.json'

const state = {
  scramble: '',
  scrambles: []
}

const mutations = {
  LOAD_SCRAMBLES(state) {
    state.scrambles = scrambles
  },
  UPDATE_SCRAMBLE(state) {
    state.scramble = state.scrambles[Math.floor(Math.random() * state.scrambles.length)]
  }
}

const actions = {
  loadScrambles({ commit }) {
    commit('LOAD_SCRAMBLES')
  },
  async updateScramble({ commit }) {
    commit('UPDATE_SCRAMBLE')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
