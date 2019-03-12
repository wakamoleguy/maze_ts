import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as express from 'express'
import * as session from 'express-session'
import * as http from 'http'
import * as memorystore from 'memorystore'
import { isNone, Maybe } from '../../Maybe'
import ExpressAdapter from '../ExpressAdapter'
import AuthenticationMiddleware from './authentication/AuthenticationMiddleware'

dotenv.config()

const MemoryStore = memorystore(session)

const App = {
  create: (adapter: ExpressAdapter): void => {
    const secret = global.process.env.COOKIE_SECRET
    if (!secret) {
      throw new Error('You must provide a secret!')
    }

    const app = express()
    app.set('view engine', 'pug')

    app.use(
      session({
        cookie: {
          maxAge: 86400 * 1000 * 7,
          secure: false,
        },
        resave: true,
        saveUninitialized: false,
        secret,
        store: new MemoryStore({
          checkPeriod: 86400000,
        }),
      })
    )

    app.use(bodyParser.json())
    app.use(AuthenticationMiddleware)

    app.use((_, res, next) => {
      const user: Maybe<string> = (res.locals && res.locals.user) || null
      if (isNone(user)) {
        res.sendStatus(403)
      } else {
        next()
      }
    })

    app.get('/echo', adapter.echo)
    app.get('/user', adapter.userList)
    app.get('/user/new', adapter.userCreate)

    app.get('/', (_, res) => {
      res.render('user', { user: res.locals.user }, (__, html) => {
        res.render('index', {
          message: 'Hello there!',
          title: 'Hey',
          user: html,
        })
      })
    })

    const server = http.createServer(app)
    const port = global.process.env.PORT || 3000
    server.listen(port)
  },
}

export default App
