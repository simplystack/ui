const namespace = 'pane'
const defaults = {
  width: '380',
  side: 'right'
}

export default ({ store }) => {
  store.registerModule(namespace, {
    namespaced: true,
    state: () => ({
      opened: false,
      options: defaults
    }),
    getters: {
      opened (state) {
        return state.opened
      },
      options (state) {
        return state.options
      }
    },
    mutations: {
      OPEN (state, options) {
        state.options = { ...defaults, ...options }
        state.opened = true
      },
      CLOSE (state) {
        state.options = defaults
        state.opened = false
      }
    },
    actions: {
      open ({ commit }, options) {
        commit('OPEN', options)
      },
      close ({ commit }) {
        commit('CLOSE')
      }
    }
  }, { preserveState: !!store.state[namespace] })
}
