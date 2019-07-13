'use strict';

const Thread = require('../../models/Thread');
const Router = require('koa-router');
const router = new Router();

/**
 * @route /api/replies
 * @type {Router<any, {}>}
 */
module.exports = router
	.prefix('/:board')
	.get('/', async ctx => {
		const thread_id = ctx.query.thread_id;

		const threads = await Thread.findById(thread_id, {
			delete_password: 0,
			reported: 0,
			'replies.delete_password': 0,
			'replies.reported': 0,
		});
		ctx.body = threads;
	})
	.post('/', async ctx => {
		// TODO: Add validation for the fields
		const { text, delete_password, thread_id } = ctx.request.body;

		const updatedThread = await Thread.findByIdAndUpdate(
			thread_id,
			{
				$set: {
					bumped_on: Date.now(),
				},
				$push: {
					replies: {
						$each: [{
							text,
							delete_password,
						}],
						$sort: { created_on: -1}
					},
				},
			},
			{
				new: true,
				select: {
					reported: 0,
					delete_password: 0,
					'replies.reported': 0,
					'replies.delete_password': 0
				},
			}
		);

		ctx.body = updatedThread.replies[0];
	})
	.put('/', async ctx => {
		// TODO: Add validation for the fields
		const { thread_id, reply_id } = ctx.request.body;

		// TODO: do in one call to mongodb
		const thread = await Thread.findById(thread_id).catch(err =>
			ctx.throw(400, err)
		);

		const index = thread.replies.map(x => x.id).indexOf(reply_id);

		thread.replies[index].reported = true;

		const updatedThread = await thread.save().catch(err => ctx.throw(400, err));

		ctx.body = updatedThread;
	})
	.delete('/', async ctx => {
		// TODO: Add validation for the fields
		const { thread_id, reply_id, delete_password } = ctx.request.body;

		// TODO: do in one call to mongodb
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
