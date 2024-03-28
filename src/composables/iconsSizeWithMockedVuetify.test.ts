import iconsSize from '@/composables/iconsSize';

beforeEach(() => {
  vi.restoreAllMocks();
});

it('should return large if display is bigger than smAndUp. Test with mocked useDisplay ', () => {
  const result = iconsSize();
  expect(result).toBe('large');
});

// more examples in: @/tests/sandbox/iconsSizeMoreMockingExamples.ts
