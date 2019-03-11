import ConsoleAdapter from './ConsoleAdapter'

describe('ConsoleAdapter', () => {
  it('echoes', async () => {
    const adapter = new ConsoleAdapter()
    const callback = jest.fn().mockReturnValue(Promise.resolve('Response'))
    adapter.onEcho(callback)

    const response = await adapter.echo('Request')

    expect(callback).toHaveBeenCalledWith('Request')
    expect(response).toBe('Response')
  })

  it('creates users', async () => {
    const adapter = new ConsoleAdapter()
    const callback = jest.fn().mockReturnValue(Promise.resolve(null))
    adapter.onUserCreate(callback)

    const response = await adapter.userCreate('User Id')

    expect(callback).toHaveBeenCalledWith('User Id')
    expect(response).toBe(null)
  })

  it('lists users', async () => {
    const adapter = new ConsoleAdapter()
    const callback = jest
      .fn()
      .mockReturnValue(Promise.resolve([{ id: 'A' }, { id: 'B' }]))
    adapter.onUserList(callback)

    const response = await adapter.userList()

    expect(callback).toHaveBeenCalledWith()
    expect(response).toEqual([{ id: 'A' }, { id: 'B' }])
  })
})
