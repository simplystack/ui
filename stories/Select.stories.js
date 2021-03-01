import VSelect from '../lib/components/Select/Select.vue';

export default {
  title: 'Controls/Select',
  component: VSelect,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VSelect },
  template: '<v-select v-model="value"></v-select>',
});

export const Default = Template.bind({});
Default.args = {
  value: { id: 1, value: 'red' },
  options: ['red', 'blue', 'red'],
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
// };
