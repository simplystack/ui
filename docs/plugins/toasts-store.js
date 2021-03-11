const namespace = 'toasts'

export default ({ store }) => {
  store.registerModule(namespace, {
    namespaced: true,
    state: () => ({
      queue: []
    }),
    getters: {
      queue (state) {
        return state.queue
      }
    },
    mutations: {
      CREATE (state, toast) {
        state.queue = [...state.queue, toast]
      },
      REMOVE (state, timestamp) {
        state.queue = state.queue.filter(toast => toast.timestamp !== timestamp)
      }
    },
    actions: {
      create ({ commit }, options) {
        const toast = { ...options }
        toast.timestamp = new Date().getTime()
        commit('CREATE', toast)
      },
      remove ({ commit }, timestamp) {
        commit('REMOVE', timestamp)
      }
    }
  }, { preserveState: !!store.state[namespace] })
}
