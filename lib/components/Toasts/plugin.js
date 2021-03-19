import ToastsStore from './store';

const plugin = {
  install(Vue, options) {
    if (!options || !options.store) {
      throw new Error('[@simplystack/ui] Please initialise ToastsPlugin with a Vuex store.');
    }
    options.store.registerModule('toasts', ToastsStore);
  },
};

export default plugin;
