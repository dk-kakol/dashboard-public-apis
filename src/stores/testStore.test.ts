import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import useTestStore from '@/stores/testStore';
import publicApis from '@/services/http/api/publicApis';

let testStore: ReturnType<typeof useTestStore>;

describe('Test Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    testStore = useTestStore();
  })

  it('getCount', () => {
    expect(testStore.getCount).toBeDefined();
    expect(testStore.getCount).toBe(0);
  });

  it('fetchPublicApis dispatch correctly', async () => {
    // Creates a pinia instance for unit tests that requires mocking the stores. 
    // By default, all actions are mocked and therefore not executed.
    // Only with createTestingPinia you can pass extra config like stubActions, initialState,etc.
    setActivePinia(createTestingPinia());
    const testStore = useTestStore();

    await testStore.fetchPublicApis();

    expect(testStore.fetchPublicApis).toHaveBeenCalledTimes(1);
  })

  it('fetchPublicApis call fetchList from publicApis', async () => {
    const fetchPublicApisSpyOn = vi.spyOn(testStore, 'fetchPublicApis');
    const publicApisSpyOn = vi.spyOn(publicApis, 'fetchList');

    await testStore.fetchPublicApis();

    // testując sam store możesz robić spyOn
    expect(publicApisSpyOn).toHaveBeenCalledTimes(1);
    expect(fetchPublicApisSpyOn).toHaveBeenCalledTimes(1);
    expect(testStore.fetchPublicApis).toHaveBeenCalledTimes(1);
  })

  it('fetchPublicApis set count correctly', async () => {
    await testStore.fetchPublicApis();

    expect(testStore.getCount).toBe(100);
  })
})