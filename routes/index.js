// TODO: Find a way to document the routes

// APIs
const issueTrackerApi = require('./api/issueTrackerApi')
const libraryApi = require('./api/libraryApi')
const messageBoardThreadsApi = require('./api/messageBoardThreadsApi')
const messageBoardRepliesApi = require('./api/messageBoardRepliesApi')
const metricConverterApi = require('./api/metricConverterApi')
const stockCheckerApi = require('./api/stockCheckerApi')

// WEB routes
const issueTrackerWeb = require('./web/issueTrackerWeb')
const libraryWeb = require('./web/libraryWeb')
const messageBoardWeb = require('./web/messageBoardWeb')
const fccFrontEndWeb = require('./web/fccFrontEndWeb')

/**
 *
 * @param { next.Server | next.DevServer } app
 * @param { Router<any, {}> } router
 */
module.exports = (app, router) => {
	// Use to wait for the server to start
	router.get('/testing', ctx => {
		ctx.body = 'Running'
	})

	// API
	router.use('/api/issues', issueTrackerApi.routes())
	router.use('/api/books', libraryApi.routes())
	router.use('/api/threads', messageBoardThreadsApi.routes())
	router.use('/api/replies', messageBoardRepliesApi.routes())
	router.use('/api/convert', metricConverterApi.routes())
	router.use('/api/stock-prices', stockCheckerApi.routes())

	// WEB
	router.get('/', async ctx => {
		await app.render(ctx.req, ctx.res, '/', ctx.query)
		ctx.respond = false
	})
	router.use('/', issueTrackerWeb(app).routes())
	router.use('/', libraryWeb(app).routes())
	router.use('/', messageBoardWeb(app).routes())
	router.use('/', fccFrontEndWeb(app).routes())
}
