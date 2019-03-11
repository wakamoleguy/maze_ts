import { StoreLibrary } from '../adapters/Store'
import { User } from '../entities/User'

export interface InterfaceAdapter {
  onEcho(callback: (message: string) => Promise<string>): void
  onUserCreate(callback: (userId: string) => Promise<null>): void
  onUserList(callback: () => Promise<User[]>): void
}

class Controller<Store> {
  public static create<Store>(
    interfaceAdapter: InterfaceAdapter,
    store: StoreLibrary<Store, User>
  ) {
    return new Controller(interfaceAdapter, store)
  }

  private storeLib: StoreLibrary<Store, User>
  private store: Store

  constructor(
    interfaceAdapter: InterfaceAdapter,
    store: StoreLibrary<Store, User>
  ) {
    this.storeLib = store
    this.store = store.empty()
    interfaceAdapter.onEcho(this.echo)
    interfaceAdapter.onUserCreate(this.addUser)
    interfaceAdapter.onUserList(this.listUsers)
  }

  private echo = (message: string) => {
    return Promise.resolve(message)
  }

  private addUser = (userId: string) => {
    const user: User = { id: userId }
    this.store = this.storeLib.create(this.store, user)
    return Promise.resolve(null)
  }

  private listUsers = () => {
    return Promise.resolve(this.storeLib.list(this.store))
  }
}

export default Controller
