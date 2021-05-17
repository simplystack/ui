import { shallowMount, mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Toggle from '@/components/Toggle/Toggle.vue';

const App = {
  components: { VToggle: Toggle },
  data() {
    return {
      checked: false,
    };
  },
  template: `
    <v-toggle v-model="checked" title="My label" />
  `,
};

describe('Toggle.vue', () => {
  it('should render toggle', async () => {
    const wrapper = shallowMount(Toggle, {
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

    const toggle = wrapper.findComponent({ name: 'VToggle' });
    const label = toggle.find('label');
    const input = toggle.find('input');

    await label.trigger('click');

    expect(toggle.emitted('change')).toBeDefined();
    expect(toggle.emitted('change').length).toBe(1);
    expect(toggle.emitted('change')[0][0]).toBe(true);
    expect(input.element.checked).toBe(true);

    await label.trigger('click');

    expect(toggle.emitted('change')).toBeDefined();
    expect(toggle.emitted('change').length).toBe(2);
    expect(toggle.emitted('change')[1][0]).toBe(false);
    expect(input.element.checked).toBe(false);
  });

  it('should emits "update:modelValue" event correctly', async () => {
    const wrapper = mount(App);

    const toggle = wrapper.findComponent({ name: 'VToggle' });
    const label = toggle.find('label');
    const input = toggle.find('input');

    await label.trigger('click');

    expect(toggle.emitted('update:modelValue')).toBeDefined();
    expect(toggle.emitted('update:modelValue')).toHaveLength(1);
    expect(toggle.emitted('update:modelValue')[0][0]).toBe(true);
    expect(input.element.checked).toBeTruthy();

    await label.trigger('click');

    expect(toggle.emitted('update:modelValue')).toBeDefined();
    expect(toggle.emitted('update:modelValue')).toHaveLength(2);
    expect(toggle.emitted('update:modelValue')[1][0]).toBe(false);
    expect(input.element.checked).toBeFalsy();
  });
});
