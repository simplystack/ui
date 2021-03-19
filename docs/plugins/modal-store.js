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
      payload: null,
      dismissed: false
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
      },
      dismissed (state) {
        return state.dismissed
      }
    },
    mutations: {
      OPEN (state, options) {
        state.opened = true
        state.options = { ...defaults, ...options }
      },
      CLOSE (state, { payload = null, dismissed = false }) {
        state.opened = false
        state.payload = payload
        state.dismissed = dismissed
      },
      CLEAR (state) {
        state.payload = null
        state.options = defaults
        state.dismissed = false
      }
    },
    actions: {
      open ({ commit }, options) {
        commit('OPEN', options)
      },
      close ({ commit }, data) {
        commit('CLOSE', data)
      },
      dismiss ({ commit }) {
        commit('CLOSE', { dismissed: true })
      },
      clear ({ commit }, payload) {
        commit('CLEAR', payload)
      }
    }
  }, { preserveState: !!store.state[namespace] })
}
