import { createWrapper, flushPromises, nextTick, type VueWrapper } from '@/tests/utils';
import AboutView from '@/components/pages/AboutView.vue';

let wrapper: VueWrapper;

beforeAll(async () => {
  wrapper = createWrapper(AboutView);
  await flushPromises();
  await nextTick();
});

describe('About View', () => {
  it('should render properly', () => {
    const title = wrapper.find('[data-test="p-aboutView__title"]');

    expect(title.exists()).toBe(true);
  });

  it('should render properly title', () => {
    const title = wrapper.get('[data-test="p-aboutView__title"]');

    expect(title.text()).toBe('Elo from About View!');
  });
});
