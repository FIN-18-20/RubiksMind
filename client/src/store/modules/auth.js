const state = {
  jwtToken: '',
  refreshToken: '',
}

const mutations = {
  SET_JWT_TOKEN(state, token) {
    state.jwtToken = token
  },
  SET_REFRESH_TOKEN(state, token) {
    state.refreshToken = token
  }
}

const actions = {
  setJwtToken({ commit }, token) {
    localStorage.setItem('jwtToken', token)
    commit('SET_JWT_TOKEN', token)
  },
  setRefreshToken({ commit }, token) {
    localStorage.setItem('refreshToken', token)
    commit('SET_REFRESH_TOKEN', token)
  },
  getJwtToken({ getters, commit }) {
    if (getters.getJwtToken !== '' && getters.jwtToken !== undefined) {
      console.log(getters.getJwtToken)
      return getters.getJwtToken
    }
    else {
      if (localStorage.getItem('jwtToken')) {
        let token = localStorage.getItem('jwtToken')
        commit('SET_JWT_TOKEN', token)
        return token
      }
      return ''
    }
  },
  getRefreshToken({ getters, commit }) {
    if (getters.refreshToken !== '' && getters.refreshToken !== undefined) {
      return getters.refreshToken
    }
    else {
      if (localStorage.getItem('refreshToken')) {
        let token = localStorage.getItem('refreshToken')
        commit('SET_REFRESH_TOKEN', token)
        return token
      }
      return ''
    }
  },
}

const getters = {
  getJwtToken: state => state.jwtToken,
  getRefreshToken: state => state.refreshToken,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}