const Router = require('koa-router')
const router = new Router()

/**
 *
 * @param app
 * @returns {Router<any, {}>}
 */
module.exports = app => {
	return router
		.get('message-board/', async ctx => {
			// console.log('Koa', ctx.query);
			await app.render(ctx.req, ctx.res, '/message-board', ctx.query)
			ctx.respond = false
		})
		.get('board/:board/', async ctx => {
			// console.log('Koa', ctx.query);
			await app.render(ctx.req, ctx.res, '/board', { board: ctx.params.board })
			ctx.respond = false
		})
		.get('board/:board/:threadId', async ctx => {
			// console.log('Koa', ctx.query);
			await app.render(ctx.req, ctx.res, '/board-thread', {
				board: ctx.params.board,
				threadId: ctx.params.threadId,
			})
			ctx.respond = false
		})
}
