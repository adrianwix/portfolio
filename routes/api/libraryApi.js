'use strict';

const Router = require('koa-router');
const router = new Router();
const routerId = new Router();
const Book = require('../../models/Book');

routerId
	.prefix('/:id')
	.get('/', async ctx => {
		const _id = ctx.params.id;
		//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
		ctx.body = await Book.findOne({ _id });
	})
	.post('/', async ctx => {
		const _id = ctx.params.id;
		const { comment } = ctx.request.body;
		if (!comment) {
			ctx.throw('no comment send');
		}
		//json res format same as .get
		const book = await Book.findOne({ _id });
		book.commentcount += 1;
		book.comments.unshift(comment);

		ctx.body = await book.save();
	})
	.delete('/', async ctx => {
		const _id = ctx.params.id;
		//if successful response will be 'delete successful'
		await Book.deleteOne({ _id });
		// TODO: try catch
		ctx.body = 'delete successful';
	});

/**
 * @route /api/books
 * @type {Router<any, {}>}
 */
module.exports = router
	.use(routerId.routes())
	.get('/', async ctx => {
		//response will be array of book objects
		//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
		ctx.body = await Book.find();
	})
	.post('/', async ctx => {
		const { title } = ctx.request.body;
		//response will contain new book object including atleast _id and title
		if (!title) {
			ctx.throw(400, 'No title send');
		}
		const book = new Book({ title });

		ctx.body = await book.save();
	})
	.delete('/', async ctx => {
		//if successful response will be 'complete delete successful'
		await Book.deleteMany();

		ctx.body = 'complete delete successful';
	});