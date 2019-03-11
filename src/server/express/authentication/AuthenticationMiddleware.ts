import { Maybe } from '../../../Maybe'

export interface Request {
  query?: {
    auth?: string
  }
  session?: {
    user?: string
    [key: string]: any
  }
}

export interface Response {
  locals?: {
    user?: Maybe<string>
    [key: string]: any
  }
}

const AuthenticationMiddleware = (
  req: Request,
  res: Response,
  next: () => any
) => {
  const user =
    (req.query && req.query.auth) || (req.session && req.session.user)

  if (user) {
    res.locals = {
      ...res.locals,
      user,
    }
    if (req.session) {
      req.session.user = user
    }
  } else {
    res.locals = {
      ...res.locals,
      user: null,
    }
  }

  next()
}

export default AuthenticationMiddleware
