'use strict';

const Thread = require('../../models/Thread');
const Router = require('koa-router');
const router = new Router;
const validator = require('validator');

/**
 * @route /api/threads
 * @type {Router<any, {}>}
 */
module.exports = router
	.prefix('/:board')
	.get('/', async (ctx) => {
		const threads = await Thread.find(
			{ board: ctx.params.board },
			{
				delete_password: 0,
				reported: 0,
				'replies.delete_password': 0,
				'replies.reported': 0
			},
			{
				limit: 10,
				sort: { created_on: -1, 'replies.created_on': -1 }
			}
		);
		const threadsFiltered = threads.map(thread => {
			let object = {
				...thread.toObject(),
				replycount: thread.replies.length,
				replies: thread.replies.slice(0, 3)
			};
			return object;
		});
		ctx.body = threadsFiltered;
	})
	.post('/', async ctx => {
		let { text, delete_password, board } = ctx.request.body;
		board = board ? board : ctx.params.board;
		const newThread = new Thread({ board, text, delete_password });
		const updatedThread = await newThread
			.save()
			.catch(err => ctx.throw(400, err));
		if (process.env.NODE_ENV === 'test') {
			ctx.body = updatedThread;
		} else {
			ctx.redirect('/b/general/');
		}
	})
	.put('/', async ctx => {
		const { report_id } = ctx.request.body;

		if (!validator.isEmpty(report_id)) {
			// updateOne() return the information about the operation
			await Thread.updateOne({ _id: report_id }, { $set: { reported: true } });

			ctx.body = 'success';
		} else {
			ctx.body = 'No ID sended';
		}
	})
	.delete('/', async ctx => {
		const { thread_id, delete_password } = ctx.request.body;
		// board = board ? board : req.params.board;
		let thread = await Thread.findById({ _id: thread_id }).catch(err =>
			ctx.throw(400, err)
		);

		let threadPassword = thread.delete_password;

		if (threadPassword === delete_password) {
			await Thread.updateOne(
				{ _id: thread_id },
				{ $set: { text: '[deleted]' } }
			).catch(err => ctx.throw(400, err));

			ctx.body = 'success';
		} else {
			ctx.throw(400, { error: 'Invalid Password' });
		}
	});

