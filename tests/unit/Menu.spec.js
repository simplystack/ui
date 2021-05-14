import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Menu from '@/components/Menu/Menu.vue';

describe('Menu.vue', () => {
  it('should render menu', async () => {
    const wrapper = mount(Menu, {
      props: {
        options: [
          { id: 1, label: 'Option 1' },
          { id: 1, label: 'Option 2', disabled: true },
          { id: 1, label: 'Option 3' },
        ],
      },
    });

    const options = wrapper.findAll('li');

    expect(wrapper.find('ul').exists()).toBe(true);
    expect(options.length).toBe(3);
    expect(options[0].text()).toBe('Option 1');
    expect(options[1].attributes('tabindex')).toBeUndefined(); // meaning option is disabled
  });
});