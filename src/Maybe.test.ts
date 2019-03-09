import { Maybe } from './Maybe'

describe('Maybe', () => {
  it('accepts something', () => {
    const something: Maybe<string> = 'Hello'
    expect(something).toBe('Hello')
  })
  it('accepts nothing', () => {
    const nothing: Maybe<string> = null
    expect(nothing).toBe(null)
  })
})
