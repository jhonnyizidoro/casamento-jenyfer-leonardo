const assets = require('express-asset-versions'),
	compression = require('compression'),
	routes = require('./http/routes/routes'),
	helpers = require('./http/helpers/helpers'),
	express = require('express'),
	env = require('./env'),
	session = require('express-session'),
	fileUpload = require('express-fileupload')

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
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(`${__dirname}/public`))
app.use('/', express.static(`${__dirname}/public/global`))
app.use(assets('/', `${__dirname}/public`))
app.use(fileUpload({}))
app.use(session({
	saveUninitialized: true,
	secret: 'ecNewNodeJS',
	resave: true,
}))
app.use((req, res, next) => {
	global.host = `${req.protocol}://${req.get('host')}`
	global.url = `${global.host}${req.url}`
	global.path = req.url
	res.locals.session = req.session
	next()
})

//Router
routes(app)

// error handler
app.use((err, req, res, next) => {
	console.log(err)
	res.status(err.status || 500)
	res.render('error')
})

// Init Server
app.listen(80, () => console.log('server On!'))