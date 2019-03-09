import AuthenticationMiddleware, {
  Request,
  Response,
} from './AuthenticationMiddleware'

const noop = () => undefined

describe('AuthenticationMiddleware', () => {
  let req: Request

  describe('when authorization query param is present', () => {
    beforeEach(() => {
      req = {
        query: { auth: 'wakamoleguy' },
        session: {},
      }
    })

    it('copies the token into the user object', () => {
      const res: Response = {}
      AuthenticationMiddleware(req, res, noop)
      expect(res.locals).toEqual({
        user: 'wakamoleguy',
      })
    })

    it('saves the user info to the session', () => {
      const res: Response = {}
      AuthenticationMiddleware(req, res, noop)
      expect(req.session && req.session.user).toEqual('wakamoleguy')
    })

    it('does not modify existing locals', () => {
      const res: Response = {
        locals: { other: 'stuff' },
      }

      AuthenticationMiddleware(req, res, noop)
      expect(res.locals).toEqual({
        other: 'stuff',
        user: 'wakamoleguy',
      })
    })

    it('calls next at the end', () => {
      const res: Response = {}
      const next = jest.fn()
      AuthenticationMiddleware(req, res, next)
      expect(next).toHaveBeenCalledTimes(1)
    })
  })

  describe('when session information is present', () => {
    beforeEach(() => {
      req = {
        query: {},
        session: {
          user: 'willm',
        },
      }
    })

    it('is copied to res locals when no auth param is present', () => {
      const res: Response = {}
      AuthenticationMiddleware(req, res, noop)
      expect(res.locals).toEqual({
        user: 'willm',
      })
    })
  })

  describe('when both session and param are provided', () => {
    beforeEach(() => {
      req = {
        query: { auth: 'wakamoleguy' },
        session: {
          user: 'willm',
        },
      }
    })

    it('saves the auth param to the res locals', () => {
      const res: Response = {}
      AuthenticationMiddleware(req, res, noop)
      expect(res.locals).toEqual({
        user: 'wakamoleguy',
      })
    })

    it('overwrites the session with the new info', () => {
      const res: Response = {}
      AuthenticationMiddleware(req, res, noop)
      expect(req.session && req.session.user).toEqual('wakamoleguy')
    })
  })

  describe('when no information is provided', () => {
    beforeEach(() => {
      req = {
        query: {},
        session: {},
      }
    })

    it('sets a null user in res locals', () => {
      const res: Response = {}
      AuthenticationMiddleware(req, res, noop)
      expect(res.locals).toEqual({
        user: null,
      })
    })

    it('does not touch the session', () => {
      const res: Response = {}
      AuthenticationMiddleware(req, res, noop)
      expect(req.session).toEqual({})
    })
  })
})
