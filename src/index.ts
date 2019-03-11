import MemoryUserStore from './adapters/MemoryUserStore'
import Controller from './server/Controller'
import App from './server/express/App'
import ExpressAdapter from './server/ExpressAdapter'

const adapter = new ExpressAdapter()

/* tslint:disable-next-line:no-unused-expression */
new Controller(adapter, MemoryUserStore)

App.create(adapter)

/* tslint:disable-next-line:no-console */
console.log('Server listening on port', global.process.env.PORT || 3000)
