import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Select from '@/components/Select/Select.vue';

const options = [
  { id: 1, value: 'opt-1', label: 'Option 1' },
  { id: 2, value: 'opt-2', label: 'Option 2' },
  { id: 3, value: 'opt-3', label: 'Option 3' },
];

describe('Select.vue', () => {
  it('should render select', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: {},
        options,
      },
    });

    await wrapper.find('[data-test="select-container"]').trigger('click');

    expect(wrapper.findAll('[data-test="select-option"]').length).toBe(3);
  });
});
