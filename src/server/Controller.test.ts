import Controller from './Controller'

describe('Controller', () => {
  describe('create', () => {
    it('echoes the interface adapter echo action', async () => {
      const interfaceAdapter = {
        on: jest.fn(),
      }
      Controller.create(interfaceAdapter)
      expect(interfaceAdapter.on).toHaveBeenCalledWith(
        'echo',
        expect.any(Function)
      )

      const callback = interfaceAdapter.on.mock.calls[0][1]
      expect(await callback('Echo echo e...')).toBe('Echo echo e...')
    })
  })

  /* What do I want it to do?
  1. Give it a store and a UI/API adapter
  2. It subscribes to UI changes?
  3. It performs actions and uses the store to persist them
  4. It selects objects from the store as needed.
  */
})
