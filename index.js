const assets = require('express-asset-versions'),
	compression = require('compression'),
	routes = require('./http/routes/routes'),
	helpers = require('./http/helpers/helpers'),
	express = require('express'),
	env = require('./env'),
	session = require('express-session'),
	fileUpload = require('express-fileupload'),
	bodyParser = require('body-parser')

//Init express
const index = express()

//Global scope
Object.assign(global, env)
Object.assign(global, helpers)

//App config
index.set('port', process.env.PORT || 80)
index.set('views', `${__dirname}/views`)
index.set('view engine', 'pug')
index.enable('trust proxy')

//Middleware
index.use(compression())
index.use(bodyParser.json())
index.use(express.urlencoded({ extended: false }))
index.use('/', express.static(`${__dirname}/public`))
index.use('/', express.static(`${__dirname}/public/global`))
index.use(assets('/', `${__dirname}/public`))
index.use(fileUpload({}))
index.use(session({
	saveUninitialized: true,
	secret: 'ecNewNodeJS',
	resave: true,
}))
index.use((req, res, next) => {
	global.host = `${req.protocol}://${req.get('host')}`
	global.url = `${global.host}${req.url}`
	global.path = req.url
	res.locals.session = req.session
	next()
})

//Router
routes(index)

// error handler
index.use((err, req, res, next) => {
	console.log(err)
	res.status(err.status || 500)
	res.render('error')
})

// Init Server
index.listen(process.env.PORT || 80, () => console.log('server On!'))