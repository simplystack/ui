import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Select from '@/components/Select/Select.vue';

const options = [
  { id: 1, value: 'opt-1', label: 'Option 1' },
  {
    id: 2, value: 'opt-2', label: 'Option 2', disabled: true,
  },
  { id: 3, value: 'opt-3', label: 'Option 3' },
];

describe('Select.vue', () => {
  it('should renders select', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: {},
        options,
      },
    });

    await wrapper.find('[data-test="select-container"]').trigger('click');

    expect(wrapper.findAll('[data-test="select-option"]').length).toBe(3);
  });

  it('should emits "select" event with selected option', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: {},
        options,
      },
    });

    const list = wrapper.findAll('[data-test="select-option"]');

    await list[2].trigger('click');

    expect(wrapper.emitted('select')).toBeDefined();
    expect(wrapper.emitted('select').length).toBe(1);
    expect(wrapper.emitted('select')[0][0]).toEqual({ id: 3, value: 'opt-3', label: 'Option 3' });
  });

  it('should not emits "select" event by clicking disabled option', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: {},
        options,
      },
    });

    const list = wrapper.findAll('[data-test="select-option"]');

    await list[1].trigger('click');

    expect(wrapper.emitted('select')).toBeUndefined();
  });
});
