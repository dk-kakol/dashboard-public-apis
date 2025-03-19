import iconsSize from '@/composables/iconsSize/iconsSize'

beforeEach(() => {
  vi.restoreAllMocks()
})

it('should return large if display is bigger than smAndUp. Test with mocked useDisplay ', () => {
  const result = iconsSize()
  expect(result).toBe('large')
})
