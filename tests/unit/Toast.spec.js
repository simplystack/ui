/* eslint-disable import/no-unresolved */
import { shallowMount } from '@vue/test-utils';
import Toast from '@/components/Toast/Toast.vue';

describe('Toast.vue', () => {
  it('should renders toast', async () => {
    const wrapper = shallowMount(Toast, {
      props: {
        title: 'Testing',
        message: 'Testing toast content',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-test="toast-title"]').text()).toBe('Testing');
    expect(wrapper.find('[data-test="toast-message"]').text()).toBe('Testing toast content');
  });
});
