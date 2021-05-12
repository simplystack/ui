import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Button from '@/components/Button/Button.vue';

describe('Button.vue', () => {
  it('renders default slot', () => {
    const text = 'Button default';
    const wrapper = mount(Button, {
      slots: {
        default: text,
      },
    });
    expect(wrapper.text()).toMatch(text);
  });
  // it('should renders icon slot', () => {
  //   const text = 'Button with icon';
  //   const icon = '<svg>svg_icon</svg>';
  //   const wrapper = mount(Button, {
  //     slots: {
  //       default: text,
  //       icon,
  //     },
  //   });
  //   expect(wrapper.text()).toMatch(text);
  //   expect(wrapper.find('svg').exists()).toBeTruthy();
  // });
  it('should render tag <button> with default type "button"', () => {
    const wrapper = mount(Button);

    expect(wrapper.attributes('type')).toBe('button');
  });
  it('should render tag <button> with type "submit"', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'submit',
      },
    });

    expect(wrapper.attributes('type')).toBe('submit');
  });
  it('should render disabled button', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.attributes('disabled')).toBeDefined();
  });
});
