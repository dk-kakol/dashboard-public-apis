import { describe, expect, it } from 'vitest'

import { isKey } from './isKey'

const objectToTest = {
  testKey: 'testValue'
}

describe('isKey', () => {
  it('returns true when key is in tested object', () => {
    const key = 'testKey'

    const isKeyInObjectToTest = isKey(objectToTest, key)

    expect(isKeyInObjectToTest).toBe(true)
  })

  it('returns false when key is not in tested object', () => {
    const key = 'notValidKey'

    const isKeyInObjectToTest = isKey(objectToTest, key)

    expect(isKeyInObjectToTest).toBe(false)
  })

  it('returns false when pass empty object', () => {
    const key = 'testKey'

    const isKeyInObjectToTest = isKey({}, key)

    expect(isKeyInObjectToTest).toBe(false)
  })

  it('returns false when pass empty string', () => {
    const key = ''

    const isKeyInObjectToTest = isKey(objectToTest, key)

    expect(isKeyInObjectToTest).toBe(false)
  })
})
