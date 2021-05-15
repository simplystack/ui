import { shallowMount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import MenuOption from '@/components/MenuOption/MenuOption.vue';

describe('Menu.vue', () => {
  it('should render menu option', async () => {
    const wrapper = shallowMount(MenuOption, {
      props: {
        label: 'Option 1',
      },
    });

    const li = wrapper.find('li');

    expect(li.text()).toBe('Option 1');
    expect(li.attributes('tabindex')).toBe('0');
  });

  it('should render disabled menu option', async () => {
    const wrapper = shallowMount(MenuOption, {
      props: {
        label: 'Option 1',
        disabled: true,
      },
    });

    const li = wrapper.find('li');

    expect(li.text()).toBe('Option 1');
    expect(li.attributes('tabindex')).toBeUndefined(); // meaning option is disabled
  });
});
