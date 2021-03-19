import PaneStore from './store';

const plugin = {
  install(Vue, options) {
    if (!options || !options.store) {
      throw new Error('[@simplystack/ui] Please initialise PanePlugin with a Vuex store.');
    }
    options.store.registerModule('pane', PaneStore);
  },
};

export default plugin;
