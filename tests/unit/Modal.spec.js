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

const options = markRaw({
  title: 'Testing title',
  props: { msg: 'Rendered modal content' },
  component: TestModal,
  onClose: jest.fn(),
  onDismiss: jest.fn(),
});

const App = {
  components: { Modal },
  template: `
    <div>
      <Modal />
    </div>
  `,
};

const store = createStore({
  modules: { modal: modalStore },
});

describe('Modal.vue', () => {
  it('should open and render modal', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    });

    await store.dispatch('modal/open', options);

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
    expect(wrapper.find('.modal-title').text()).toBe('Testing title');
    expect(wrapper.find('p').text()).toBe('Rendered modal content');

    expect(store.getters['modal/opened']).toBe(true);
  });

  it('should close modal', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    });

    await store.dispatch('modal/close', { payload: { foo: 'bar' } });

    expect(store.getters['modal/opened']).toBe(false);

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
    expect(options.onClose).toHaveBeenLastCalledWith({ foo: 'bar' });
  });

  it('should dismiss modal', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    });

    await store.dispatch('modal/open', options);

    await store.dispatch('modal/dismiss');

    expect(store.getters['modal/opened']).toBe(false);
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
    expect(options.onDismiss).toHaveBeenCalled();
  });
});
