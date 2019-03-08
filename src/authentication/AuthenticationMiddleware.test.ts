import Express from 'express'
import AuthenticationMiddleware from './AuthenticationMiddleware'

const noop = () => undefined

describe('AuthenticationMiddleware', () => {
  describe('when authorization query param is present', () => {
    const req: Express.Request = {
      query: { auth: 'wakamoleguy' },
    } as Express.Request

    it('copies the token into the user object', () => {
      const res: Express.Response = {} as Express.Response
      AuthenticationMiddleware(req, res, noop)
      expect(res.locals).toEqual({
        user: 'wakamoleguy',
      })
    })

    it('does not modify existing locals', () => {
      const res: Express.Response = {
        locals: { other: 'stuff' },
      } as Express.Response

      AuthenticationMiddleware(req, res, noop)
      expect(res.locals).toEqual({
        other: 'stuff',
        user: 'wakamoleguy',
      })
    })

    it('calls next at the end', () => {
      const res: Express.Response = {} as Express.Response
      const next = jest.fn()
      AuthenticationMiddleware(req, res, next)
      expect(next).toHaveBeenCalledTimes(1)
    })
  })

  describe('when authorization token is not present', () => {})
})
