import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Dropdown from '@/components/Dropdown/Dropdown.vue';

const App = {
  components: { Dropdown },
  data() {
    return {
      options: [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2', disabled: true },
        { id: 3, label: 'Option 3' },
      ],
    };
  },
  template: `
    <Dropdown :options="options">
      <template v-slot:toggle>
        <button>Toggle</button>
      </template>
    </Dropdown>
  `,
};

describe('Dropdown.vue', () => {
  it('renders dropdown', async () => {
    const wrapper = mount(App);
    const toggle = wrapper.find('button');

    await toggle.trigger('click');

    expect(wrapper.exists()).toBe(true);
    expect(toggle.exists()).toBe(true);
    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(3);
  });
});
