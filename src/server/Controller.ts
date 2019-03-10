import { StoreLibrary } from '../adapters/Store'
import { User } from '../entities/User'

export interface InterfaceAdapter {
  on(action: string, callback: (message: string) => Promise<string>): void
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
    interfaceAdapter.on('echo', this.echo)
    interfaceAdapter.on('addUser', this.addUser)
    interfaceAdapter.on('listUsers', this.listUsers)
  }

  private echo = (message: string) => {
    return Promise.resolve(message)
  }

  private addUser = (userId: string) => {
    const user: User = { id: userId }
    this.store = this.storeLib.create(this.store, user)
    return Promise.resolve('ok')
  }

  private listUsers = (_: string) => {
    return Promise.resolve(JSON.stringify(this.storeLib.list(this.store)))
  }
}

export default Controller
