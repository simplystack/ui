import App from '@/App.vue';
import { createApp } from 'vue';
import store from '@/store';
import '@/app.css';
import ui, { ModalPlugin } from '../lib';
import '../main.css';

const app = createApp(App);

app.use(store);
app.use(ui);
app.use(ModalPlugin, { store });

app.mount('#app');
