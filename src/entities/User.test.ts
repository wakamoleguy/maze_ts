import * as User from './User'

describe('User', () => {
  it('has an id', () => {
    const u: User.User = { id: 'me' }
    expect(u.id).toBe('me')
  })
})
