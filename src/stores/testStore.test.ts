import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import useTestStore from '@/stores/testStore';
import publicApis from '@/services/http/api/publicApis';

describe('Test Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('getCount', () => {
    const testStore = useTestStore();

    expect(testStore.getCount).toBeDefined();
    expect(testStore.getCount).toBe(0);
  });

  it('fetchPublicApis dispatch correctly', async () => {
    setActivePinia(createTestingPinia());
    const testStore = useTestStore();

    await testStore.fetchPublicApis();

    expect(testStore.fetchPublicApis).toHaveBeenCalledTimes(1);
  })

  it('fetchPublicApis call fetchList from publicApis', async () => {
    const testStore = useTestStore();
    const fetchPublicApisSpyOn = vi.spyOn(testStore, 'fetchPublicApis');
    const publicApisSpyOn = vi.spyOn(publicApis, 'fetchList');

    await testStore.fetchPublicApis();

    // testując sam store możesz robić spyOn
    expect(publicApisSpyOn).toHaveBeenCalledTimes(1);
    expect(fetchPublicApisSpyOn).toHaveBeenCalledTimes(1);
    expect(testStore.fetchPublicApis).toHaveBeenCalledTimes(1);
  })

  it('fetchPublicApis set count correctly', async () => {
    const testStore = useTestStore();
    
    await testStore.fetchPublicApis();

    expect(testStore.getCount).toBe(100);
  })
})