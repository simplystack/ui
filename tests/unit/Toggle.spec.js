import { shallowMount, mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import UIToggle from '@/components/Toggle/Toggle.vue';

const App = {
  components: { UIToggle },
  data() {
    return {
      checked: false,
    };
  },
  template: `
    <UIToggle v-model="checked" title="My label" />
  `,
};

describe('Toggle.vue', () => {
  it('should render toggle', async () => {
    const wrapper = shallowMount(UIToggle, {
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
    const wrapper = mount(App);

    const toggle = wrapper.findComponent({ name: 'UIToggle' });
    const input = toggle.find('input');

    await input.setValue();

    expect(toggle.emitted('change')).toBeDefined();
    expect(toggle.emitted('change').length).toBe(1);
    expect(toggle.emitted('change')[0][0]).toBe(true);
    expect(input.element.checked).toBe(true);

    await input.setValue(false);

    expect(toggle.emitted('change')).toBeDefined();
    expect(toggle.emitted('change').length).toBe(2);
    expect(toggle.emitted('change')[1][0]).toBe(false);
    expect(input.element.checked).toBe(false);
  });

  it('should emits "update:modelValue" event correctly', async () => {
    const wrapper = mount(App);

    const toggle = wrapper.findComponent({ name: 'UIToggle' });
    const input = toggle.find('input');

    await input.setValue();

    expect(toggle.emitted('update:modelValue')).toBeDefined();
    expect(toggle.emitted('update:modelValue')).toHaveLength(1);
    expect(toggle.emitted('update:modelValue')[0][0]).toBe(true);
    expect(input.element.checked).toBeTruthy();

    await input.setValue(false);

    expect(toggle.emitted('update:modelValue')).toBeDefined();
    expect(toggle.emitted('update:modelValue')).toHaveLength(2);
    expect(toggle.emitted('update:modelValue')[1][0]).toBe(false);
    expect(input.element.checked).toBeFalsy();
  });
});
