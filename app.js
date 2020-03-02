const assets = require('express-asset-versions'),
	compression = require('compression'),
	routes = require('./http/routes/routes'),
	helpers = require('./http/helpers/helpers'),
	express = require('express'),
	env = require('./env')

//Init express
const app = express()

//Global scope
Object.assign(global, env)
Object.assign(global, helpers)

//App config
app.set('port', 80)
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
app.enable('trust proxy')

//Middleware
app.use(compression())
app.use('/', express.static(`${__dirname}/public`))
app.use('/', express.static(`${__dirname}/public/global`))
app.use(assets('/', `${__dirname}/public`))
app.use((req, res, next) => {
	global.host = `${req.protocol}://${req.get('host')}`
	global.url = `${global.host}${req.url}`
	next()
})

//Rotas
routes(app)

// Init Server
app.listen(80, () => console.log('server On!'))