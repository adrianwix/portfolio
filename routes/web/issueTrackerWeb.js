const Router = require('koa-router');
const router = new Router();

module.exports = app => {
	return router
		.get('issue-tracker', async ctx => {
			await app.render(ctx.req, ctx.res, '/issue-tracker', ctx.query);
			ctx.respond = false;
		})
		.get('project/:project', async ctx => {
			await app.render(ctx.req, ctx.res, '/project', {
				project: ctx.params.project,
			});
			ctx.respond = false;
		});
};
