import { User } from '../entities/User'
import MemoryUserStore from './MemoryUserStore'

describe('MemoryUserStore', () => {
  describe('create', () => {
    it('returns a new store with the user in it', () => {
      const store = MemoryUserStore.empty()
      const user: User = { id: 'wakamoleguy' }
      expect(MemoryUserStore.read(store, 'wakamoleguy')).toBe(null)

      const newStore = MemoryUserStore.create(store, user)
      expect(MemoryUserStore.read(newStore, 'wakamoleguy')).toEqual(user)
    })
  })

  describe('delete', () => {
    it('returns a new store without the user in it', () => {
      const user: User = { id: 'wakamoleguy' }
      const store = MemoryUserStore.create(MemoryUserStore.empty(), user)
      expect(MemoryUserStore.read(store, 'wakamoleguy')).toBe(user)

      const newStore = MemoryUserStore.delete(store, 'wakamoleguy')
      expect(MemoryUserStore.read(newStore, 'wakamoleguy')).toBe(null)
    })
  })

  describe('list', () => {
    it('returns an empty list for the empty store', () => {
      const store = MemoryUserStore.empty()
      expect(MemoryUserStore.list(store)).toEqual([])
    })

    it('returns the list of users added to the store', () => {
      const users: User[] = [{ id: 'alice' }, { id: 'bob' }, { id: 'carol' }]
      const filledStore = users.reduce(
        (store, user) => MemoryUserStore.create(store, user),
        MemoryUserStore.empty()
      )

      const listedUsers = MemoryUserStore.list(filledStore)
      expect(listedUsers.length).toBe(users.length)
      users.forEach((user) => expect(listedUsers).toContain(user))
    })
  })
})
