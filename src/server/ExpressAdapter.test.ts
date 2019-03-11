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
})
