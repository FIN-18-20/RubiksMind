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
  loadAuth({ dispatch }) {
    dispatch('getJwtToken')
    dispatch('getRefreshToken')
    dispatch('getLoggedState')
  },
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
  changeLoggedState({ commit }, state) {
    localStorage.setItem('loggedState', state)
    commit('CHANGE_LOGGED_STATE', state)
  },
  getLoggedState({ getters, dispatch }) {
    if (getters.loggedState !== '' && getters.loggedState !== undefined) {
      return getters.loggedState
    }
    else {
      if (localStorage.getItem('loggedState')) {
        let loggedState = localStorage.getItem('loggedState') == 'true'
        dispatch('changeLoggedState', loggedState)
        return loggedState
      }
      return false
    }
  },
  logout({ dispatch }) {
    dispatch('setJwtToken', '')
    dispatch('setRefreshToken', '')
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('refreshToken')
    dispatch('changeLoggedState', false)
  },
  login({ dispatch }, { token, refreshToken }) {
    dispatch('setJwtToken', token)
    dispatch('setRefreshToken', refreshToken)
    dispatch('changeLoggedState', true)
  }
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
