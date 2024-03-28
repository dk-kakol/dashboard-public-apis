import iconsSize from '@/composables/iconsSize';
import { useDisplay } from 'vuetify';
import type { Mock } from 'vitest';
import { ref } from 'vue';

// Here you can overwrite mocked modules defined in setupFiles:
// 3 ways of mocking module:
// First: vitest automatic algorithm:
// -all arrays will be emptied
// -all primitives and collections will stay the same
// -all objects will be deeply cloned
// -all instances of classes and their prototypes will be deeply cloned
// the tests below need to have additional logic for useDisplay mock implementation to pass
// vi.mock('vuetify');

// Second: whole module replaced:
// vi.mock('vuetify', () => ({
//   useDisplay: vi.fn(() => ({
//     smAndUp: { value: true }
//   })),
// }))

// third: mock only selected exports, other exports: leave original module implementation
vi.mock('vuetify', async () => {
  const vuetifyModule = await vi.importActual<typeof import('vuetify')>('vuetify');
  return {
    ...vuetifyModule,
    useDisplay: vi.fn(() => ({ smAndUp: { value: true } }))
  };
});

beforeEach(() => {
  // clearAllMocks, clear mocks usage, ex clear toHaveBeenCalledTimes
  // vi.clearAllMocks();

  // restoreAllMocks, restore initial mock implementation
  vi.restoreAllMocks();

  // resetAllMocks(), reset the mock function implementations with brand new vi.fn()
});

describe('test iconsSize composable examples', () => {
  it('without overwrighting global mock', () => {
    // for the first mock method you have to overwrite useDisplay automatic mock. Uncomment:
    // const mockedUseDisplay = useDisplay as Mock;
    // mockedUseDisplay.mockReturnValue({
    //   smAndUp: { value: true },
    // })
    const result = iconsSize();

    expect(result).toBe('large');
  });

  it('without overwrighting global mock. Check if mocked method have been called', () => {
    const mockedUseDisplay = useDisplay as Mock;
    // for the first mock method uncomment:
    // mockedUseDisplay.mockReturnValue({
    //   smAndUp: { value: true },
    // })
    iconsSize();

    // without beforeEach mockedUseDisplay have been called 2 times (one in previous test)
    expect(mockedUseDisplay).toHaveBeenCalledTimes(1);
  });

  it('with overwriting global mock', () => {
    // first overwriting
    const mockedUseDisplay = useDisplay as Mock;
    mockedUseDisplay.mockReturnValue({
      smAndUp: { value: true }
    });
    let result = iconsSize();
    expect(result).toBe('large');

    // second overwriting
    mockedUseDisplay.mockReturnValue({
      smAndUp: { value: false }
    });
    result = iconsSize();
    expect(result).toBe('small');
  });

  it('with overwriting global mock. useDisplay mocked with vi.mocked insead of as Mock', () => {
    // vi.mocked is more typescript restricted than using as Mocked
    // for the first mock method uncomment:
    // const mockedUseDisplay = useDisplay as Mock;
    // vi.mocked(mockedUseDisplay).mockReturnValue({
    //   smAndUp: { value: false }
    // })

    // for the first mock method comment:
    vi.mocked(useDisplay).mockReturnValue({
      ...useDisplay(),
      smAndUp: ref(false)
    });
    const result = iconsSize();
    expect(result).toBe('small');
  });
});
