import MemoryUserStore from '../adapters/MemoryUserStore'
import ConsoleAdapter from './ConsoleAdapter'
import Controller from './Controller'

describe('Controller', () => {
  it('echoes', async () => {
    const interfaceAdapter = new ConsoleAdapter()
    const store = MemoryUserStore
    Controller.create(interfaceAdapter, store)
    const response = await interfaceAdapter.echo('Echo echo e...')
    expect(response).toBe('Echo echo e...')
  })

  it('adds a user to the store', async () => {
    const interfaceAdapter = new ConsoleAdapter()
    const store = MemoryUserStore
    Controller.create(interfaceAdapter, store)

    const response = await interfaceAdapter.userCreate('wakamoleguy')
    expect(response).toBe(null)
  })

  it('lists all users in the store', async () => {
    const interfaceAdapter = new ConsoleAdapter()
    const store = MemoryUserStore
    Controller.create(interfaceAdapter, store)

    await interfaceAdapter.userCreate('wakamoleguy')
    await interfaceAdapter.userCreate('will')
    const response = await interfaceAdapter.userList()
    expect(response).toEqual([{ id: 'wakamoleguy' }, { id: 'will' }])
  })
})

/* What do I want it to do?
  1. Give it a store and a UI/API adapter
  2. It subscribes to UI changes?
  3. It performs actions and uses the store to persist them
  4. It selects objects from the store as needed.
  */
