import Express from 'express'

const AuthenticationMiddleware = (
  req: Express.Request,
  res: Express.Response
) => {
  if (req.query && req.query.auth) {
    res.locals = {
      ...res.locals,
      user: req.query.auth,
    }
  }
}

export default AuthenticationMiddleware
