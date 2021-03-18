import ModalStore from './store';

const plugin = {
  install(Vue, options) {
    if (!options || !options.store) {
      throw new Error('[@simplystack/ui] Please initialise ModalPlugin with a Vuex store.');
    }
    options.store.registerModule('modal', ModalStore);
  },
};

export default plugin;
