//Gulp
const {src, dest, series, task, watch, parallel} = require('gulp'),
	{APP_NAME} = require('./env'),
	browserSync = require('browser-sync').create(),
	gulpClean = require('gulp-clean'),
	pump = require('pump'),
	sassCompiler = require('gulp-sass'),
	faviconGenerator = require('gulp-favicons'),
	jsBrowserify = require('browserify'),
	jsBabelify = require('babelify'),
	jsSource = require('vinyl-source-stream'),
	jsBuffer = require('vinyl-buffer'),
	jsUglify = require('gulp-uglify'),
	jsSourcemaps = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	imageminZopfli = require('imagemin-zopfli'),
	imageminMozjpeg = require('imagemin-mozjpeg'),
	imageminGiflossy = require('imagemin-giflossy'),
	imageminJpegtran = require('imagemin-jpegtran'),
	imageminSvgo = require('imagemin-svgo'),
	imageminCache = require('gulp-cache')

const dirsToCopy = [
	'assets/**/*',
	'!assets/{sass,js,images,favicon}/**/*',
	'!assets/{sass,js,images,favicon}'
]
task(copy = () => {
	return pump([
		src(dirsToCopy, {
			base: 'assets'
		}),
		dest('public')
	])
})


task(clean = () => {
	return pump([
		src('public', {
			allowEmpty: true
		}),
		gulpClean({
			force: true,
		})
	])
})

task(sass = () => {
	return pump([
		src('assets/sass/app.sass'),
		sassCompiler({
			outputStyle: 'compressed',
		}).on('error', error => {
			let errorFile = error.file.split('/')
			errorFile = errorFile[errorFile.length - 1]
			console.log("\x1b[41m", "\x1b[30m", `Erro na linha ${error.line} do arquivo ${errorFile}.\nErro: ${error.messageOriginal}`, "\x1b[0m")
		}),
		dest('public/css'),
		browserSync.stream()
	])
})

task(js = () => {
	return pump([
		jsBrowserify({
			entries: 'assets/js/app.js',
			debug: true,
			read: false,
			paths: [
				'./',
			],
		}).transform(jsBabelify, {
			presets: ['@babel/env']
		}).bundle().on('error', error => console.log('\x1b[41m%s\x1b[0m', error.stack)),
		jsSource('app.js'),
		jsBuffer(),
		jsSourcemaps.init({
			loadMaps: true
		}),
		jsUglify(),
		jsSourcemaps.write('./tmp'),
		dest('public/js')
	])
})

task(img = () => {
	return pump([
		src('assets/images/**/*'),
		imageminCache(
			imagemin([
				imageminPngquant({
					speed: 1,
					quality: [0.3, 0.5]
				}),
				imageminZopfli({
					more: true
				}),
				imageminGiflossy({
					optimizationLevel: 3,
					optimize: 3,
					lossy: 2
				}),
				imageminJpegtran({
					progressive: true
				}),
				imageminMozjpeg({
					quality: 90
				}),
				imageminSvgo({
					plugins: [
						{convertStyleToAttrs: false},
						{cleanupIDs: false},
						{removeTitle: true},
						{removeDesc: true},
					]
				})
			])
		),
		dest('public/images')
	])
})

task(favicon = () => {
	return pump([
		src('assets/favicon/favicon.png'),
		faviconGenerator({
			path: '/favicon',
			appName: `App ${APP_NAME}`,
			appShortName: APP_NAME,
			appDescription: `Progressive Web App ${APP_NAME}`,
			dir: 'auto',
			lang: 'pt-BR',
			background: '#F5F5F5',
			theme_color: '#F5F5F5',
			display: 'standalone',
			orientation: 'any',
			scope: '/',
			start_url: '/',
			logging: false,
			loadManifestWithCredentials: false,
			icons: {
				android: true,
				appleIcon: false,
				appleStartup: false,
				coast: false,
				favicons: true,
				firefox: false,
				windows: false,
				yandex: false,
			}
		}),
		dest('public/favicon')
	])
})

//Inicia o watch nos arquivos
task(server = () => {
	browserSync.init({
		proxy: 'localhost',
		logLevel: 'silent',
	})
	watch('assets/sass/**/*.sass', sass)
	watch('assets/images/**/*', series(img, reload))
	watch('assets/js/**/*', series(js, reload))
	watch('assets/favicon/favicon.png', series(favicon, reload))
	watch('views/**/*', reload)
	watch(dirsToCopy, series(copy, reload))
})

//Recarrega o browser
task(reload = (done) => {
	browserSync.reload()
	done()
})

exports.watch = series(clean, parallel(sass, js, img, favicon, copy), server)
exports.build = series(clean, parallel(sass, js, img, favicon, copy))