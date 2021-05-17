import { shallowMount, mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Checkbox from '@/components/Checkbox/Checkbox.vue';

const App = {
  components: { VCheckbox: Checkbox },
  data() {
    return {
      checked: false,
    };
  },
  template: `
    <v-checkbox v-model="checked" title="My label" />
  `,
};

describe('Checkbox.vue', () => {
  it('should render checkbox', async () => {
    const wrapper = shallowMount(Checkbox, {
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

    const checkbox = wrapper.findComponent({ name: 'VCheckbox' });
    const label = checkbox.find('label');
    const input = checkbox.find('input');

    await label.trigger('click');

    expect(checkbox.emitted('change')).toBeDefined();
    expect(checkbox.emitted('change').length).toBe(1);
    expect(checkbox.emitted('change')[0][0]).toBe(true);
    expect(input.element.checked).toBe(true);

    await label.trigger('click');

    expect(checkbox.emitted('change')).toBeDefined();
    expect(checkbox.emitted('change').length).toBe(2);
    expect(checkbox.emitted('change')[1][0]).toBe(false);
    expect(input.element.checked).toBe(false);
  });

  it('should emit "update:modelValue" event correctly', async () => {
    const wrapper = mount(App);

    const checkbox = wrapper.findComponent({ name: 'VCheckbox' });
    const label = checkbox.find('label');
    const input = checkbox.find('input');

    await label.trigger('click');

    expect(checkbox.emitted('update:modelValue')).toBeDefined();
    expect(checkbox.emitted('update:modelValue').length).toBe(1);
    expect(checkbox.emitted('update:modelValue')[0][0]).toBe(true);
    expect(input.element.checked).toBe(true);

    await label.trigger('click');

    expect(checkbox.emitted('update:modelValue')).toBeDefined();
    expect(checkbox.emitted('update:modelValue').length).toBe(2);
    expect(checkbox.emitted('update:modelValue')[1][0]).toBe(false);
    expect(input.element.checked).toBe(false);
  });
});
