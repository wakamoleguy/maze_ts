import { EventEmitter } from 'events'
import Controller from './Controller'

describe('Controller', () => {
  describe('create', () => {
    it('echoes the interface adapter echo event', (done) => {
      const interfaceAdapter = new EventEmitter()
      const callback = (arg: string) => {
        expect(arg).toBe('Hello, world!')
        done()
      }
      interfaceAdapter.on('out', callback)

      Controller.create(interfaceAdapter)

      interfaceAdapter.emit('echo', 'Hello, world!')
    })
  })

  /* What do I want it to do?
  1. Give it a store and a UI/API adapter
  2. It subscribes to UI changes?
  3. It performs actions and uses the store to persist them
  4. It selects objects from the store as needed.
  */
})
