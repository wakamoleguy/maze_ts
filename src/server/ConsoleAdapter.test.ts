import ConsoleAdapter from './ConsoleAdapter'

describe('ConsoleAdapter', () => {
  it('calls the subscribed callback', async () => {
    const adapter = new ConsoleAdapter()
    const callback = jest.fn().mockReturnValue(Promise.resolve('Response'))
    adapter.on('echo', callback)

    const response = await adapter.emit('echo', 'Request')

    expect(callback).toHaveBeenCalledWith('Request')
    expect(response).toBe('Response')
  })

  it('calls only matching name callbacks', async () => {
    const adapter = new ConsoleAdapter()
    const callback = jest.fn().mockReturnValue(Promise.resolve('Response'))
    const otherCallback = jest.fn().mockReturnValue(Promise.resolve('Other'))
    adapter.on('echo', callback)
    adapter.on('hello', otherCallback)

    await adapter.emit('echo', 'Request')

    expect(callback).toHaveBeenCalledWith('Request')
    expect(otherCallback).not.toHaveBeenCalled()
  })

  it('resolves to null if action is not understood', async () => {
    const adapter = new ConsoleAdapter()
    const response = await adapter.emit('echo', 'Request')

    expect(response).toBe(null)
  })
})
