import { hello } from '.'

describe('Index', () => {
  it('says hello to the world', () => {
    expect(hello()).toBe('Hello, World!')
  })

  it('says hello to you', () => {
    const you = 'Handsome Reader'
    expect(hello(you)).toBe('Hello, Handsome Reader!')
  })
})
