const state = {
  jwtToken: '',
  refreshToken: '',
  isLogged: false,
}

const mutations = {
  SET_JWT_TOKEN(state, token) {
    state.jwtToken = token
  },
  SET_REFRESH_TOKEN(state, token) {
    state.refreshToken = token
  },
  CHANGE_LOGGED_STATE(state, s) {
    state.isLogged = s
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
  logout({ commit }) {
    this.setJwtToken({ commit }, '')
    this.setRefreshToken({ commit }, '')
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('refreshToken')
    this.commit('CHANGE_LOGGED_STATE', false)
  },
}

const getters = {
  getJwtToken: state => state.jwtToken,
  getRefreshToken: state => state.refreshToken,
  isLogged: state => state.isLogged,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
