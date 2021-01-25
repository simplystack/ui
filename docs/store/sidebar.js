export const state = () => ({
  opened: false
})

export const mutations = {
  TOGGLE_SIDEBAR (state, opened) {
    state.opened = opened !== undefined ? opened : !state.opened
  },
  CLOSE_SIDEBAR (state) {
    state.opened = false
  }
}

export const actions = {
  toggle ({ commit }, opened) {
    commit('TOGGLE_SIDEBAR', opened)
  },
  close ({ commit }) {
    commit('CLOSE_SIDEBAR')
  }
}
