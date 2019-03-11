import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as express from 'express'
import * as session from 'express-session'
import * as http from 'http'
import * as memorystore from 'memorystore'
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

    app.get('/echo', adapter.echo)

    app.get('/', (_, res) => {
      res.render('index', { title: 'Hey', message: 'Hello there!' })
    })

    const server = http.createServer(app)
    const port = global.process.env.PORT || 3000
    server.listen(port)
  },
}

export default App
