/* eslint-disable no-console */
const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const helmet = require('koa-helmet');
const mongoose = require('mongoose');
require('dotenv').config();

// APIs
const issueTrackerApi = require('./routes/api/issueTrackerApi');
const libraryApi = require('./routes/api/libraryApi');
const messageBoardThreadsApi = require('./routes/api/messageBoardThreadsApi');
const messageBoardRepliesApi = require('./routes/api/messageBoardRepliesApi');
const metricConverterApi = require('./routes/api/metricConverterApi');
const stockCheckerApi = require('./routes/api/stockCheckerApi');

// WEB routes
const issueTrackerWeb = require('./routes/web/issueTrackerWeb');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log('NODE_ENV', process.env.NODE_ENV);

mongoose
	.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true })
	.then(db => {
		console.log('MongoDB connected to ' + db.connection.name);

		app.prepare().then(() => {
			const server = new Koa();
			const router = new Router();

			server.use(
				helmet({
					hidePoweredBy: {
						setTo: 'PHP 4.2.0'
					},
					frameguard: {
						action: 'sameorigin'
					}
				})
			);

			server.use(logger());

			server.use(
				koaBody({
					parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
				})
			);

			// Error Handling
			server.use(async (ctx, next) => {
				try {
					await next();
				} catch (err) {
					ctx.status = err.status || 400;
					ctx.body = err.message;
					ctx.app.emit('error', err, ctx);
				}
			});

			/**
			 * TODO: Create Routes file
			 */
			router.get('/testing', (ctx) => {
				ctx.body = 'Running';
			});
			// API
			router.use('/api/issues', issueTrackerApi.routes());
			router.use('/api/books', libraryApi.routes());
			router.use('/api/threads', messageBoardThreadsApi.routes());
			router.use('/api/replies', messageBoardRepliesApi.routes());
			router.use('/api/convert', metricConverterApi.routes());
			router.use('/api/stock-prices', stockCheckerApi.routes());

			// WEB
			router.get('/', async ctx => {
				await app.render(ctx.req, ctx.res, '/', ctx.query);
				ctx.respond = false;
			});
			router.use('/', issueTrackerWeb(app).routes());

			router.get('*', async ctx => {
				await handle(ctx.req, ctx.res);
				ctx.respond = false;
			});

			server.use(async (ctx, next) => {
				ctx.res.statusCode = 200;
				await next();
			});

			server.use(router.routes());

			server.listen(port, () => {
				console.log(`> Ready on http://localhost:${port}`);
			});
		}).catch(err => console.log(err));
	})
	.catch(err => console.log(err));
