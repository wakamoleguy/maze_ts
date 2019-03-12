import { Request, Response } from 'express'
import ExpressAdapter from './ExpressAdapter'

describe('ExpressAdapter', () => {
  it('has an echo route', async () => {
    const adapter = new ExpressAdapter()
    const callback = jest.fn().mockReturnValue(Promise.resolve('Response'))
    adapter.onEcho(callback)

    const req = { query: { echo: 'Foo' } } as Request
    const send = jest.fn()
    const res = ({ send } as unknown) as Response

    await adapter.echo(req, res)

    expect(callback).toHaveBeenCalledWith('Foo')
    expect(send).toHaveBeenCalledWith('Response')
  })

  it('has a create user route', async () => {
    const adapter = new ExpressAdapter()
    const callback = jest.fn().mockReturnValue(Promise.resolve(null))
    adapter.onUserCreate(callback)

    const req = { query: { id: 'Foo' } } as Request
    const sendStatus = jest.fn()
    const res = ({ sendStatus } as unknown) as Response

    await adapter.userCreate(req, res)

    expect(callback).toHaveBeenCalledWith('Foo')
    expect(sendStatus).toHaveBeenCalledWith(201)
  })

  it('has a user list route', async () => {
    const adapter = new ExpressAdapter()
    const callback = jest.fn().mockReturnValue(Promise.resolve(['a', 'b']))
    adapter.onUserList(callback)

    const req = {} as Request
    const send = jest.fn()
    const res = ({ send } as unknown) as Response

    await adapter.userList(req, res)

    expect(callback).toHaveBeenCalledWith()
    expect(send).toHaveBeenCalledWith(['a', 'b'])
  })
})
