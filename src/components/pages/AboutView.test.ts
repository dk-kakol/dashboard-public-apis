import { createWrapper, flushPromises, nextTick, type VueWrapper } from '@/tests/utils';
import AboutView from '@/components/pages/AboutView.vue';
import useTestStore from '@/stores/testStore';

let wrapper: VueWrapper

beforeAll(async () => {
  wrapper = createWrapper(AboutView);
  await flushPromises();
  await nextTick();
})

describe('About View', () => {
  it('should render properly', () => {
    const title = wrapper.find('[data-test="p-aboutView__title"]');

    expect(title.exists()).toBe(true);
  });

  it('should render properly title', () => {
    const title = wrapper.get('[data-test="p-aboutView__title"]');

    expect(title.text()).toBe('Elo from About View!');
  });

  it('should call action fetchPublicApis from useTestStore', () => {
    const testStore = useTestStore();
    expect(testStore.fetchPublicApis).toHaveBeenCalledOnce();

    // w komponencie poniższe nie zadziała. Musisz zrobić expect jak linia wyżej
    // const fetchPublicApisSpyOn = vi.spyOn(testStore, 'fetchPublicApis');
    // expect(fetchPublicApisSpyOn).toHaveBeenCalledOnce();
  });

  it('should render count from publicFetch', async () => {
    wrapper = createWrapper(AboutView, undefined, { stubActions: false } );
    await flushPromises();
    await nextTick();

    const aboutViewInstance = wrapper.findComponent({ name: 'AboutView' });
    console.log(aboutViewInstance.vm.count);
    const count = wrapper.get('[data-test="p-aboutView__countNumber"]');

    expect(count.text()).toBe('100');
  });

  it('should call action fetchPublicApis from useTestStore', () => {
    const testStore = useTestStore();

    expect(testStore.fetchPublicApis).toHaveBeenCalledOnce();
  });
})