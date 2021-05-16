import { mount, shallowMount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Button from '@/components/Button/Button.vue';

const WithIconButton = {
  components: { VButton: Button },
  template: `
    <v-button>
      Button with icon
      <template v-slot:icon>
        <svg></svg>
      </template>
    </v-button>
  `,
};

describe('Button.vue', () => {
  it('renders default slot', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'Button default' },
    });
    expect(wrapper.text()).toMatch('Button default');
  });
  it('should renders icon slot', () => {
    const wrapper = mount(WithIconButton);
    expect(wrapper.text()).toMatch('Button with icon');
    expect(wrapper.find('svg').exists()).toBeTruthy();
  });
  it('should render tag <button> with default type "button"', () => {
    const wrapper = shallowMount(Button);

    expect(wrapper.attributes('type')).toBe('button');
  });
  it('should render tag <button> with type "submit"', () => {
    const wrapper = shallowMount(Button, {
      props: {
        type: 'submit',
      },
    });

    expect(wrapper.attributes('type')).toBe('submit');
  });
  it('should render disabled button', () => {
    const wrapper = shallowMount(Button, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.attributes('disabled')).toBeDefined();
  });
});
