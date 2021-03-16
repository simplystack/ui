export const state = () => ({
  mode: 'light'
})

export const mutations = {
  SET_MODE (state, mode) {
    state.mode = mode
  }
}

export const getters = {
  mode (state) {
    return state.mode
  }
}

export const actions = {
  set ({ commit }, mode) {
    commit('SET_MODE', mode)
    window.localStorage.setItem('mode', mode)
  }
}
