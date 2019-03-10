export interface InterfaceAdapter {
  on(action: string, callback: (message: string) => Promise<string>): void
}

const Controller = {
  create(interfaceAdapter: InterfaceAdapter) {
    interfaceAdapter.on('echo', (message) => Promise.resolve(message))
  },
}

export default Controller
