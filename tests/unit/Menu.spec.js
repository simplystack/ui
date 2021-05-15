import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Menu from '@/components/Menu/Menu.vue';

const options = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2', disabled: true },
  { id: 3, label: 'Option 3' },
];

describe('Menu.vue', () => {
  it('should render menu', async () => {
    const wrapper = mount(Menu, {
      props: {
        options,
      },
    });

    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(3);
  });

  it('should emit "select" event with selected option', async () => {
    const wrapper = mount(Menu, {
      props: {
        options,
      },
    });

    const list = wrapper.findAll('li');

    await list[2].trigger('click');

    expect(wrapper.emitted('select')).toBeDefined();
    expect(wrapper.emitted('select').length).toBe(1);
    expect(wrapper.emitted('select')[0][0]).toEqual({ id: 3, label: 'Option 3' });
  });

  it('should not emit "select" event with selected option', async () => {
    const wrapper = mount(Menu, {
      props: {
        options,
      },
    });

    const list = wrapper.findAll('li');

    await list[1].trigger('click');

    expect(wrapper.emitted('select')).toBeUndefined();
  });
});
