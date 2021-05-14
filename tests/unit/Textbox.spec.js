import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Textbox from '@/components/Textbox/Textbox.vue';

describe('Textbox.vue', () => {
  it('should render textbox', async () => {
    const wrapper = mount(Textbox, {
      props: {
        modelValue: 'My value',
        label: 'My label',
      },
    });

    const label = wrapper.find('label');
    const input = wrapper.find('input');

    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('My label');
    expect(input.exists()).toBe(true);
    expect(input.attributes('type')).toBe('text');
    expect(input.element.value).toBe('My value');
  });

  it('should emit "update:modelValue" event correctly', async () => {
    const wrapper = mount(Textbox, {
      props: {
        modelValue: 'My value',
        label: 'My label',
      },
    });

    const input = wrapper.find('input');

    input.setValue('New value');

    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    expect(wrapper.emitted('update:modelValue').length).toBe(1);
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('New value');
    expect(input.element.value).toBe('New value');
  });
});
