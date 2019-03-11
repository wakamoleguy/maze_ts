import { isNone, isSome, Maybe } from './Maybe'

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

  describe('isSome', () => {
    it('is false when the maybe is null', () => {
      expect(isSome(null as Maybe<string>)).toBe(false)
      expect(isSome(null as Maybe<number>)).toBe(false)
      expect(isSome(null as Maybe<object>)).toBe(false)
    })

    it('is true when the maybe is something', () => {
      expect(isSome('Hello' as Maybe<string>)).toBe(true)
      expect(isSome(7 as Maybe<number>)).toBe(true)
      expect(isSome({} as Maybe<object>)).toBe(true)
    })
  })
})
