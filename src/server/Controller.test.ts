import MemoryUserStore from '../adapters/MemoryUserStore'
import ConsoleAdapter from './ConsoleAdapter'
import Controller from './Controller'

describe('Controller', () => {
  it('echoes', async () => {
    const interfaceAdapter = {
      on: jest.fn(),
    }
    const store = MemoryUserStore
    Controller.create(interfaceAdapter, store)
    expect(interfaceAdapter.on).toHaveBeenCalledWith(
      'echo',
      expect.any(Function)
    )

    const callback = interfaceAdapter.on.mock.calls[0][1]
    expect(await callback('Echo echo e...')).toBe('Echo echo e...')
  })

  it('adds a user to the store', async () => {
    const interfaceAdapter = new ConsoleAdapter()
    const store = MemoryUserStore
    Controller.create(interfaceAdapter, store)

    const response = await interfaceAdapter.emit('addUser', 'wakamoleguy')
    expect(response).toBe('ok')
  })

  it('lists all users in the store', async () => {
    const interfaceAdapter = new ConsoleAdapter()
    const store = MemoryUserStore
    Controller.create(interfaceAdapter, store)

    await interfaceAdapter.emit('addUser', 'wakamoleguy')
    await interfaceAdapter.emit('addUser', 'will')
    const response = await interfaceAdapter.emit('listUsers', '')
    expect(response).toEqual(
      JSON.stringify([{ id: 'wakamoleguy' }, { id: 'will' }])
    )
  })
})

/* What do I want it to do?
  1. Give it a store and a UI/API adapter
  2. It subscribes to UI changes?
  3. It performs actions and uses the store to persist them
  4. It selects objects from the store as needed.
  */
