import VModal from './Modal.vue';
import module from './modal';

const plugin = {
  install(Vue, { store }) {
    Vue.component('v-modal', VModal);

    store.registerModule('modal', module);
  },
};

export default plugin;
