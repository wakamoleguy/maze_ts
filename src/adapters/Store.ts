import { Maybe } from '../Maybe'

export interface StoreLibrary<Store, T> {
  empty(): Store
  list(store: Store): T[]
  create(store: Store, entity: T): Store
  read(store: Store, id: string): Maybe<T>
  // update(store: Store, id: string, entity: T): Store
  delete(store: Store, id: string): Store
}
