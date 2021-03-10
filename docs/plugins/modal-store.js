const namespace = 'modal'
const defaults = {
  role: 'dialog',
  size: '2',
  dismissible: true,
  dismissOn: 'backdrop esc close-button',
  onClose () { },
  onDismiss () { }
}

export default ({ store }) => {
  store.registerModule('modal', {
    namespaced: true,
    state: () => ({
      opened: false,
      options: defaults,
      payload: null
    }),
    getters: {
      opened (state) {
        return state.opened
      },
      options (state) {
        return state.options
      },
      payload (state) {
        return state.payload
      }
    },
    mutations: {
      OPEN (state, options) {
        state.opened = true
        state.options = { ...defaults, ...options }
      },
      CLOSE (state, payload = null) {
        state.opened = false
        state.payload = payload
      },
      CLEAR (state) {
        state.payload = null
        state.options = defaults
      }
    },
    actions: {
      open ({ commit }, options) {
        commit('OPEN', options)
      },
      close ({ commit }, payload) {
        commit('CLOSE', payload)
      },
      clear ({ commit }, payload) {
        commit('CLEAR', payload)
      }
    }
  }, { preserveState: !!store.state[namespace] })
}
