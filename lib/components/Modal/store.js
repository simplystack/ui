const defaults = {
  role: 'dialog',
  size: 'md',
  dismissible: true,
  dismissOn: 'backdrop esc close-button',
  onClose() {},
  onDismiss() {},
};

/* eslint-disable no-param-reassign */
const state = {
  opened: false,
  options: defaults,
  payload: null,
  dismissed: false,
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
  close({ commit }, data) {
    commit('CLOSE', data);
  },
  clear({ commit }, payload) {
    commit('CLEAR', payload);
  },
};

const getters = {
  opened(s) {
    return s.opened;
  },
  options(s) {
    return s.options;
  },
  payload(s) {
    return s.payload;
  },
  dismissed(s) {
    return s.dismissed;
  },
};

export default {
  namespaced: true,
  mutations,
  state,
  getters,
  actions,
};
