/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Toasts from '@/components/Toasts/Toasts.vue';
// import VToast from '@/components/Toast/Toast.vue';
import toastStore from '@/components/Toasts/store';

const store = createStore({
  modules: { toasts: toastStore },
});

const App = {
  components: { Toasts },
  template: '<div><Toasts /></div>',
  methods: {
    create() {
      this.$store.dispatch('toast/create', {
        type: 'success',
        title: 'Testing!',
        message: 'Test toast content',
      });
      this.$nextTick(() => console.log(this.$el));
    },
  },
};

describe('Toasts.vue', () => {
  it('should creates and renders toast', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    });

    await store.dispatch('toasts/create', {
      type: 'success',
      title: 'Testing!',
      message: 'Test toast content',
    });

    expect(store.getters['toasts/queue'].length).toBe(1);
    expect(wrapper.find('[data-test="toast"]').exists()).toBe(true);
  });
});
