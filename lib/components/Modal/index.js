import VModal from './Modal.vue';
import vueStore from './vueStore';

const plugin = {
  install(Vue, { store }) {
    Vue.component('v-modal', VModal);

    store.registerModule('modal', vueStore);
  },
};

export default plugin;
