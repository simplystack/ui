/* eslint-disable import/no-unresolved */
import { mount, flushPromises } from '@vue/test-utils';
import VTab from '@/components/Tab/Tab.vue';
import VTabs from '@/components/Tabs/Tabs.vue';

const App = {
  components: { VTabs, VTab },
  template: `
    <v-tabs>
      <v-tab id="tab-1" title="Tab 1">Content tab 1</v-tab>
      <v-tab id="tab-2" title="Tab 2">Content tab 2</v-tab>
      <v-tab id="tab-3" title="Tab 3">Content tab 3</v-tab>
    </v-tabs>
  `,
};

describe('Tabs.vue', () => {
  it('should renders tabs', async () => {
    const wrapper = mount(App);

    await flushPromises();

    const tabs = wrapper.findAll('[role="tab"]');

    expect(wrapper.exists()).toBe(true);
    expect(tabs.length).toBe(3);
  });

  it('should tabs emit events', async () => {
    const wrapper = mount(App);

    await flushPromises();

    const tabs = wrapper.findComponent({ name: 'VTabs' });
    const tab = wrapper.findComponent('[id="tab-3"]');
    const list = wrapper.findAll('li');

    await list[2].trigger('click');

    expect(tabs.emitted('tab-change')).toBeDefined();
    expect(tabs.emitted('tab-change').length).toBe(1);
    expect(tabs.emitted('tab-change')[0][0]).toBe('tab-3');

    expect(tab.emitted('select')).toBeDefined();
    expect(tab.emitted('select').length).toBe(1);
    expect(tab.emitted('select')[0][0]).toBe('tab-3');
  });
});
