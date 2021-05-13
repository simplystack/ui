import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import RadioGroup from '@/components/RadioGroup/RadioGroup.vue';

const options = [
  {
    id: '1', value: 'box-1', label: 'Box 1', checked: false,
  },
  {
    id: '2', value: 'box-2', label: 'Box 2', checked: false,
  },
  {
    id: '3', value: 'box-3', label: 'Box 3', checked: false,
  },
  {
    id: '4', value: 'box-4', label: 'Box 4', checked: false,
  },
];

describe('RadioGroup.vue', () => {
  it('should render radio group', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: '',
        options,
        name: 'test',
        label: 'My label',
      },
    });

    expect(wrapper.findAll('label').length).toBe(options.length);
    expect(wrapper.findAll('input').length).toBe(options.length);
  });

  it('should render emit "update:modelValue" correctly', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: '',
        options,
        name: 'test',
        label: 'My label',
      },
    });

    const inputs = wrapper.findAll('input');

    await inputs[0].trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('box-1');

    await inputs[2].trigger('click');

    expect(wrapper.emitted('update:modelValue')[1][0]).toBe('box-3');
  });
});
