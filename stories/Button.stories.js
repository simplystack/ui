import VButton from '../lib/components/Button/Button.vue';

export default {
  title: 'Controls/Button',
  component: VButton,
  argTypes: {
    appearance: { control: { type: 'select', options: ['default', 'primary', 'subtle'] } },
    size: { control: { type: 'select', options: ['sm', 'md', 'lg'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VButton },
  template: '<v-button v-bind="$props">Button</v-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  appearance: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};
