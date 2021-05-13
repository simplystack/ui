import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Checkbox from '@/components/Checkbox/Checkbox.vue';

describe('Checkbox.vue', () => {
  it('should render checkbox', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        label: 'My label',
      },
    });

    const label = wrapper.find('label');

    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('My label');
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should emit "change" event correctly', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
      },
    });

    const input = wrapper.find('input');

    await input.trigger('click');

    expect(wrapper.emitted('change')).toBeDefined();
    expect(wrapper.emitted('change').length).toBe(1);
    expect(wrapper.emitted('change')[0][0]).toBe(true);
    expect(input.element.checked).toBe(true);

    await input.trigger('click');

    expect(wrapper.emitted('change')).toBeDefined();
    expect(wrapper.emitted('change').length).toBe(2);
    expect(wrapper.emitted('change')[1][0]).toBe(false);
    expect(input.element.checked).toBe(false);
  });

  it('should emit "update:modelValue" event correctly', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
      },
    });

    const input = wrapper.find('input');

    await input.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    expect(wrapper.emitted('update:modelValue').length).toBe(1);
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true);
    expect(input.element.checked).toBe(true);

    await input.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    expect(wrapper.emitted('update:modelValue').length).toBe(2);
    expect(wrapper.emitted('update:modelValue')[1][0]).toBe(false);
    expect(input.element.checked).toBe(false);
  });
});
