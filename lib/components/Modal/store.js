import { markRaw } from 'vue';

const defaults = {
  role: 'dialog',
  size: 'md',
  dismissible: true,
  dismissOn: 'backdrop esc close-button',
  onClose() {},
  onDismiss() {},
};

const store = {
  namespaced: true,
  state: () => ({
    opened: false,
    options: defaults,
    payload: null,
    dismissed: false,
  }),
  getters: {
    opened(state) {
      return state.opened;
    },
    options(state) {
      return state.options;
    },
    payload(state) {
      return state.payload;
    },
    dismissed(state) {
      return state.dismissed;
    },
  },
  mutations: {
    OPEN(state, options) {
      state.options = markRaw({ ...defaults, ...options });
      state.opened = true;
    },
    CLOSE(state, { payload, dismissed } = { payload: null, dismissed: false }) {
      state.opened = false;
      state.payload = payload;
      state.dismissed = dismissed;
    },
    CLEAR(state) {
      state.payload = null;
      state.options = defaults;
      state.dismissed = false;
    },
  },
  actions: {
    open({ commit }, options) {
      commit('OPEN', options);
    },
    close({ commit }, data) {
      commit('CLOSE', data);
    },
    dismiss({ commit }) {
      commit('CLOSE', { dismissed: true });
    },
    clear({ commit }) {
      commit('CLEAR');
    },
  },
};

export default store;
