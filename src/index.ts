import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as http from 'http'
import * as memorystore from 'memorystore'
import AuthenticationMiddleware from './authentication/AuthenticationMiddleware'

const MemoryStore = memorystore(session)

const app = express()
app.use(
  session({
    cookie: {
      maxAge: 86400 * 1000 * 7,
      secure: false,
    },
    resave: true,
    saveUninitialized: false,
    secret: 'secret',
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
)
app.use(bodyParser.json())
app.use(AuthenticationMiddleware)

app.get('/', (req, res) => {
  res.send(JSON.stringify(res.locals))
})
const server = http.createServer(app)
const port = global.process.env.PORT || 3000
server.listen(port)

/* tslint:disable-next-line:no-console */
console.log('Server listening on port', port)
