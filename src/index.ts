import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import * as http from 'http'
import AuthenticationMiddleware from './authentication/AuthenticationMiddleware'

const app = express()
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
