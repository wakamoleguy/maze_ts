import { EventEmitter } from 'events'

const Controller = {
  create(interfaceAdapter: EventEmitter) {
    interfaceAdapter.on('echo', (...args) => {
      interfaceAdapter.emit('out', ...args)
    })
  },
}

export default Controller
