import { Map } from 'immutable'
import { User } from '../entities/User'
import { StoreLibrary } from './Store'

type Store = Map<string, User>

const MemoryUserStore: StoreLibrary<Store, User> = {
  empty() {
    return Map<string, User>()
  },

  list(store) {
    return store.toArray().map(([_, user]) => user)
  },

  create(store, user) {
    return store.set(user.id, user)
  },

  read(store, id) {
    return store.get(id, null)
  },

  delete(store, id) {
    return store.delete(id)
  },
}

export default MemoryUserStore
