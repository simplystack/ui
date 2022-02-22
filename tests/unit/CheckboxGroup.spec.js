import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import CheckboxGroup from '@/components/CheckboxGroup/CheckboxGroup.vue';

const options = [
  {
    id: '1', name: 'test', value: 'box-1', label: 'Box 1',
  },
  {
    id: '2', name: 'test', value: 'box-2', label: 'Box 2',
  },
  {
    id: '3', name: 'test', value: 'box-3', label: 'Box 3',
  },
  {
    id: '4', name: 'test', value: 'box-4', label: 'Box 4',
  },
];

describe('CheckboxGroup.vue', () => {
  it('should render checkbox group', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        modelValue: [],
        options,
        label: 'My label',
      },
    });

    expect(wrapper.findAll('label').length).toBe(options.length);
    expect(wrapper.findAll('input').length).toBe(options.length);
  });

  it('should render emit "update:modelValue" correctly', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        modelValue: [],
        options,
        label: 'My label',
      },
    });

    const inputs = wrapper.findAll('input');

    await inputs[0].setValue();
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(['box-1']);

    await inputs[2].setValue();

    expect(wrapper.emitted('update:modelValue')[1][0]).toEqual(['box-3']);
  });
});
