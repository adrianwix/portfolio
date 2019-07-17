const Router = require('koa-router')
const router = new Router()

/**
 *
 * @param app
 * @returns {Router<any, {}>}
 */
module.exports = app => {
	return router.get('library', async ctx => {
		await app.render(ctx.req, ctx.res, '/library', ctx.query)
		ctx.respond = false
	})
}
