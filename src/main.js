import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store';
import { ModalVuePlugin } from '../lib';
import './main.css';
import '../main.css';

Vue.use(ModalVuePlugin, { store });

new Vue({
  el: '#app',
  // router,
  store,
  render: (h) => h(App),
  components: { App },
}).$mount('#app');
