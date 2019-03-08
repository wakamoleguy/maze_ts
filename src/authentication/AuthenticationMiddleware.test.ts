import AuthenticationMiddleware from './AuthenticationMiddleware'

interface Request {
  query: { auth: string }
}
interface Response {
  locals?: { user?: string; [key: string]: any }
}

describe('AuthenticationMiddleware', () => {
  describe('when authorization query param is present', () => {
    const req: Request = {
      query: { auth: 'wakamoleguy' },
    }

    it('copies the token into the user object', () => {
      const res: Response = {}
      AuthenticationMiddleware(req, res)
      expect(res.locals).toEqual({
        user: 'wakamoleguy',
      })
    })

    it('does not modify existing locals', () => {
      const res: Response = {
        locals: { other: 'stuff' },
      }

      AuthenticationMiddleware(req, res)
      expect(res.locals).toEqual({
        other: 'stuff',
        user: 'wakamoleguy',
      })
    })
  })

  describe('when authorization token is not present', () => {})
})
