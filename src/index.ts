import bodyParser from 'body-parser'
import express from 'express'
import * as http from 'http'

const app = express()
app.use(bodyParser.json())

const server = http.createServer(app)
const port = global.process.env.PORT || 3000
server.listen(port)

/* tslint:disable-next-line:no-console */
console.log('Server listening on port', port)
