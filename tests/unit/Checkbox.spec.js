import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Checkbox from '@/components/Checkbox/Checkbox.vue';

describe('Checkbox.vue', () => {
  it('should render checkbox', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
      },
    });

    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
  });
});
