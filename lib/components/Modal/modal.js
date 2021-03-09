const defaults = {
  role: 'dialog',
  size: '2',
  dismissible: true,
  dismissOn: 'backdrop esc close-button',
  onClose() {},
  onDismiss() {},
};

/* eslint-disable no-param-reassign */
const state = {
  opened: false,
  options: null,
};

const mutations = {
  OPEN(s, options) {
    s.opened = true;
    s.options = { ...defaults, ...options };
  },
  CLOSE(s) {
    s.opened = false;
  },
};

const actions = {
  open({ commit }, options) {
    commit('OPEN', options);
  },
  close({ commit }, options) {
    commit('CLOSE', options);
  },
};

const getters = {
  opened: (s) => s.opened,
  options: (s) => s.options,
};

export default {
  namespaced: true,
  mutations,
  state,
  getters,
  actions,
};
