// TODO: Make it work
const Router = require('koa-router');
const router = new Router();

module.exports = render => {
	router
		.get('/b/:board/', async ctx => {
			console.log('Koa', ctx.query);
			await render(ctx.req, ctx.res, '/board', ctx.query);
			ctx.respond = false;
		})
		.get('/b/:board/:threadid', async ctx => {
			console.log('Koa', ctx.query);
			await render(ctx.req, ctx.res, '/thread', ctx.query);
			ctx.respond = false;
		});
};
