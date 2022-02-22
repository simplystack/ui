import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Popover from '@/components/Popover/Popover.vue';

const App = {
  components: { Popover },
  template: `
    <Popover>
      <template v-slot:toggle>
        <button>Open popover</button>
      </template>

      <div data-test="content">
        Popover content
      </div>
    </Popover>
  `,
};

describe('Popover.vue', () => {
  it('should renders default slot', async () => {
    const wrapper = mount(App);
    const toggle = wrapper.find('button');

    await toggle.trigger('click');

    const content = wrapper.find('[data-test="content"]');

    expect(wrapper.exists()).toBe(true);
    expect(toggle.exists()).toBe(true);
    expect(content.exists()).toBe(true);
    expect(content.text()).toBe('Popover content');
  });

  it('should emits events on open/close', async () => {
    const wrapper = mount(App);
    const popover = wrapper.findComponent({ name: 'UIPopover' });
    const toggle = popover.find('button');

    await toggle.trigger('click');

    expect(popover.emitted('open')).toBeDefined();
    expect(popover.emitted('open').length).toBe(1);

    await toggle.trigger('click');

    expect(popover.emitted('close')).toBeDefined();
    expect(popover.emitted('close').length).toBe(1);
  });

  it('should focus the trigger element on close', async () => {
    const wrapper = mount(App, { attachTo: document.body });
    const toggle = wrapper.find('button');

    await toggle.trigger('click');

    const content = wrapper.find('[role="dialog"]');

    expect(document.activeElement).toBe(content.element);

    await toggle.trigger('click');

    expect(document.activeElement).toBe(toggle.element);
  });
});
