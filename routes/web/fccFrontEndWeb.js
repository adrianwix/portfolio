const Router = require('koa-router')
const router = new Router()

/**
 *
 * @param app
 * @returns {Router<any, {}>}
 */
module.exports = app => {
	return router
		.get('drum-machine', async ctx => {
			await app.render(ctx.req, ctx.res, '/drum-machine', ctx.query)
			ctx.respond = false
		})
		.get('random-quote-machine', async ctx => {
			await app.render(ctx.req, ctx.res, '/random-quote-machine', {
				project: ctx.params.project,
			})
			ctx.respond = false
		})
		.get('calculator', async ctx => {
			await app.render(ctx.req, ctx.res, '/calculator', {
				project: ctx.params.project,
			})
			ctx.respond = false
		})
		.get('markdown-previewer', async ctx => {
			await app.render(ctx.req, ctx.res, '/markdown-previewer', {
				project: ctx.params.project,
			})
			ctx.respond = false
		})
}
