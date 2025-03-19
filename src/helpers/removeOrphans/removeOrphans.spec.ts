import { describe, expect, it } from 'vitest'

import { removeOrphans } from './removeOrphans'

describe('removeOrphans', () => {
  // @TODO - add more tests
  it('returns the original string when no replacements are necessary', () => {
    const input = 'test'
    const expected = 'test'
    const textWithRemovedOrphans = removeOrphans(input)

    expect(textWithRemovedOrphans).toBe(expected)
  })
})
