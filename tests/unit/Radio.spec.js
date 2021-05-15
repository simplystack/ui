import { shallowMount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Radio from '@/components/Radio/Radio.vue';

describe('Radio.vue', () => {
  it('should render radio', async () => {
    const wrapper = shallowMount(Radio, {
      props: {
        name: 'test',
        modelValue: 'foo',
        trueValue: 'foo',
        label: 'My label',
      },
    });

    const label = wrapper.find('label');

    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('My label');
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should emit "change" event correctly', async () => {
    const wrapper = shallowMount(Radio, {
      props: {
        name: 'test',
        modelValue: 'foo',
        trueValue: 'foo',
        label: 'My label',
      },
    });

    const input = wrapper.find('input');

    await input.trigger('click');

    expect(wrapper.emitted('change')).toBeDefined();
    expect(wrapper.emitted('change').length).toBe(1);
    expect(wrapper.emitted('change')[0][0]).toBe('foo');
  });

  it('should emit "update:modelValue" event correctly', async () => {
    const wrapper = shallowMount(Radio, {
      props: {
        name: 'test',
        modelValue: 'foo',
        trueValue: 'foo',
        label: 'My label',
      },
    });

    const input = wrapper.find('input');

    await input.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    expect(wrapper.emitted('update:modelValue').length).toBe(1);
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('foo');
  });
});
