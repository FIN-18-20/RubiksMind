const state = {
  explanationMessage: true,
}

const mutations = {
  UPDATE_EXPLANATION_MESSAGE(state, value) {
    state.explanationMessage = value
  }
}

const actions = {
  loadAllSettings({ dispatch }) {
    dispatch('updateExplanationMessage')
    // Add other settings to update here
  },
  updateExplanationMessage({ commit }, newValue) {
    if (typeof (newValue) !== 'boolean') {
      const localSettings = localStorage.getItem('settings-explanationMessage')
      newValue = localSettings ? localSettings === 'true' : true
    } else {
      localStorage.setItem('settings-explanationMessage', newValue)
    }
    commit('UPDATE_EXPLANATION_MESSAGE', newValue)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
