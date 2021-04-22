import { markRaw } from 'vue';

const defaults = {
  width: '380',
  side: 'right',
};

const store = {
  namespaced: true,
  state: () => ({
    opened: false,
    options: defaults,
  }),
  getters: {
    opened(state) {
      return state.opened;
    },
    options(state) {
      return state.options;
    },
  },
  mutations: {
    OPEN(state, options) {
      state.options = markRaw({ ...defaults, ...options });
      state.opened = true;
    },
    CLOSE(state) {
      state.options = defaults;
      state.opened = false;
    },
  },
  actions: {
    open({ commit }, options) {
      commit('OPEN', options);
    },
    close({ commit }) {
      commit('CLOSE');
    },
  },
};

export default store;
