import { isNone, Maybe } from './Maybe'

describe('Maybe', () => {
  it('accepts something', () => {
    const something: Maybe<string> = 'Hello'
    expect(something).toBe('Hello')
  })
  it('accepts nothing', () => {
    const nothing: Maybe<string> = null
    expect(nothing).toBe(null)
  })

  describe('isNone', () => {
    it('is true when the maybe is null', () => {
      expect(isNone(null as Maybe<string>)).toBe(true)
      expect(isNone(null as Maybe<number>)).toBe(true)
      expect(isNone(null as Maybe<object>)).toBe(true)
    })

    it('is false when the maybe is something', () => {
      expect(isNone('Hello' as Maybe<string>)).toBe(false)
      expect(isNone(7 as Maybe<number>)).toBe(false)
      expect(isNone({} as Maybe<object>)).toBe(false)
    })
  })
})
