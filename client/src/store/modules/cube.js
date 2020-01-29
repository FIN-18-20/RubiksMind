import { axios } from '@/plugins/axios'

const state = {
  scramble: '',
}

const mutations = {
  UPDATE_SCRAMBLE(state, { scramble }) {
    state.scramble = scramble
  }
}

const actions = {
  async updateScramble({ commit }) {
    const scramble = await axios(({ url: '/scramble', method: 'GET' })).catch(() => { })
    if (scramble.data) {
      commit('UPDATE_SCRAMBLE', scramble.data)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
