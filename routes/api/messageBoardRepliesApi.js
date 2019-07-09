'use strict';

const Thread = require('../../models/Thread');
const Router = require('koa-router');
const router = new Router;

/**
 * @route /api/replies
 * @type {Router<any, {}>}
 */
module.exports = router
	.prefix('/:board')
	.get('/', async (ctx) => {
		const thread_id = ctx.query.thread_id;
		const threads = await Thread.findById(thread_id, {
			delete_password: 0,
			reported: 0,
			'replies.delete_password': 0,
			'replies.reported': 0
		});
		ctx.body = threads;
	})
	.post('/', async (ctx) => {
		const { text, delete_password, thread_id } = ctx.request.body;

		const thread = await Thread.findById(thread_id).catch(err =>
			ctx.throw(400, err)
		);

		const newReply = { text, delete_password };

		thread.replies.unshift(newReply);

		thread.bumped_on = Date.now();

		const updatedThread = await thread
			.save()
			.catch(err => ctx.throw(400, err));

		ctx.body = updatedThread;
	})
	.put('/', async (ctx) => {
		const { thread_id, reply_id } = ctx.request.body;

		const thread = await Thread.findById(thread_id).catch(err =>
			ctx.throw(400, err)
		);

		const index = thread.replies.map(x => x.id).indexOf(reply_id);

		thread.replies[index].reported = true;

		const updatedThread = await thread
			.save()
			.catch(err => ctx.throw(400, err));

		ctx.body = updatedThread;

	})
	.delete('/', async (ctx) => {
		const { thread_id, reply_id, delete_password } = ctx.request.body;

		let thread = await Thread.findById(thread_id).catch(err =>
			ctx.throw(400, err)
		);

		const index = thread.replies.map(x => x.id).indexOf(reply_id);

		let replyPassword = thread.replies[index].delete_password;

		if (replyPassword === delete_password) {
			thread.replies[index].text = '[deleted]';

			const updatedThread = await thread
				.save()
				.catch(err => ctx.throw(400, err));

			ctx.body = updatedThread;
		} else {
			ctx.throw(400, { error: 'Invalid Password' });
		}
	});