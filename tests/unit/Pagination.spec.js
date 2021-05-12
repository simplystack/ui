import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import Pagination from '@/components/Pagination/Pagination.vue';

describe('Pagination.vue', () => {
  it('should render the pagination', () => {
    const wrapper = mount(Pagination, {
      props: {
        total: 100,
      },
    });

    expect(wrapper.find('button').attributes('aria-label')).toBe('Go to first page');
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();

    expect(wrapper.find('button.active').text()).toBe('1');
  });

  it('should paginate correctly', async () => {
    const wrapper = mount(Pagination, {
      props: {
        total: 100,
      },
    });

    const nextButton = wrapper.findAll('button')[3];

    await nextButton.trigger('click');

    expect(wrapper.emitted().input[0]).toEqual([2]);

    await wrapper.setProps({ value: 2 });

    expect(wrapper.find('button.active').text()).toBe('2');
  });
});
