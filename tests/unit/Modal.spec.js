/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { mount } from '@vue/test-utils';
import { markRaw } from 'vue';
import { createStore } from 'vuex';
import Modal from '@/components/Modal/Modal.vue';
import modalStore from '@/components/Modal/store';

const TestModal = {
  props: {
    msg: { type: String },
  },
  template: `
    <p>{{ msg }}</p>
  `,
};

const App = {
  components: { Modal },
  data() {
    return {
      options: markRaw({
        title: 'Testing title',
        props: { msg: 'Rendered modal content' },
        component: TestModal,
      }),
    };
  },
  template: `
    <div>
      <Modal />
      <button @click="$store.dispatch('modal/open', options)">Open Modal</button>
    </div>
  `,
};

const store = createStore({
  modules: { modal: modalStore },
});

describe('Modal.vue', () => {
  it('should render the modal', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.find('[role="dialog"]')).toBeDefined();
    expect(wrapper.find('.modal-title').text()).toBe('Testing title');
    expect(wrapper.find('p').text()).toBe('Rendered modal content');
  });
});
