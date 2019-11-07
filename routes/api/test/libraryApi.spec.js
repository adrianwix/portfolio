/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = 'http://localhost:3000'
const mongoose = require('mongoose')
require('dotenv').config()

const Book = require('../../../models/Book')

chai.use(chaiHttp)

describe('Library Functional Tests', function() {
	this.timeout(30000)

	/*
	 * ----[EXAMPLE TEST]----
	 * Each test should completely test the response of the API end-point including response status code!
	 */

	it('#example Test GET /api/books', function(done) {
		chai.request(server)
			.get('/api/books')
			.end(function(err, res) {
				assert.isNull(err)
				assert.equal(res.status, 200)
				assert.isArray(res.body, 'response should be an array')
				assert.property(
					res.body[0],
					'commentcount',
					'Books in array should contain commentcount'
				)
				assert.property(
					res.body[0],
					'title',
					'Books in array should contain title'
				)
				assert.property(
					res.body[0],
					'_id',
					'Books in array should contain _id'
				)
				done()
			})
	})
	/*
	 * ----[END of EXAMPLE TEST]----
	 */

	describe('Routing tests', function() {
		let id
		let title

		before(async function() {
			await mongoose.connect(process.env.MONGOLAB_URI, {
				useNewUrlParser: true,
			})
			const book = new Book({ title: 'Book for Testing' })
			// eslint-disable-next-line no-console
			const bookSaved = await book.save().catch(err => console.log(err))

			id = bookSaved._id
			title = bookSaved.title
		})

		after(function(done) {
			chai.request(server)
				.delete('/api/books/' + id)
				.end((err, res) => {
					assert.isNull(err)
					assert.equal(res.text, 'delete successful')
					done()
				})
		})

		describe('POST /api/books with title => create book object/expect book object', function() {
			it('Test POST /api/books with title', function(done) {
				chai.request(server)
					.post('/api/books')
					.send({
						title: 'Book test',
					})
					.end((err, res) => {
						assert.equal(res.status, 200)
						assert.equal(res.body.title, 'Book test')
						assert.isArray(res.body.comments)
						assert.isNumber(res.body.commentcount)
						assert.equal(res.body.commentcount, 0)
						assert.isNull(err)
						done()
					})
			})

			it('Test POST /api/books with no title given', function(done) {
				chai.request(server)
					.post('/api/books')
					.end((err, res) => {
						assert.isNull(err)
						assert.isNotFalse(res.error)
						assert.equal(res.status, 400)
						assert.equal(res.body.message, 'No title send')
						done()
					})
			})
		})

		describe('GET /api/books => array of books', function() {
			it('Test GET /api/books', function(done) {
				chai.request(server)
					.get('/api/books')
					.end((err, res) => {
						assert.equal(res.status, 200)
						assert.isArray(res.body)
						assert.isString(res.body[0].title)
						assert.isNotNull(res.body[0].title)
						assert.isNumber(res.body[0].commentcount)
						assert.isNotNull(res.body[0].commentcount)
						assert.isArray(res.body[0].comments)
						assert.isNotNull(res.body[0].comments)
						assert.isNull(err)
						done()
					})
			})
		})

		describe('GET /api/books/[id] => book object with [id]', function() {
			it('Test GET /api/books/[id] with id not in db', function(done) {
				let errorMessage =
					'Cast to ObjectId failed for value "31253546235" at path "_id" for model "Book"'
				chai.request(server)
					.get('/api/books/31253546235')
					.end((err, res) => {
						assert.isNotFalse(res.error)
						assert.isNull(err)
						assert.equal(res.status, 400)
						assert.equal(res.body.message, errorMessage)
						done()
					})
			})

			it('Test GET /api/books/[id] with valid id in db', function(done) {
				chai.request(server)
					.get('/api/books/' + id)
					.end((err, res) => {
						assert.equal(res.status, 200)
						assert.equal(res.body._id, id)
						assert.equal(res.body.title, title)
						assert.isArray(res.body.comments)
						assert.isNumber(res.body.commentcount)
						assert.equal(res.body.commentcount, 0)
						assert.isNull(err)
						done()
					})
			})
		})

		describe('POST /api/books/[id] => add comment/expect book object with id', function() {
			it('Test POST /api/books/[id] with comment', function(done) {
				chai.request(server)
					.post('/api/books/' + id)
					.send({
						comment: 'Comment for testing the API',
					})
					.end((err, res) => {
						assert.equal(res.status, 200)
						assert.equal(res.body.title, title)
						assert.isArray(res.body.comments)
						assert.equal(
							res.body.comments[0],
							'Comment for testing the API'
						)
						assert.isNumber(res.body.commentcount)
						assert.equal(res.body.commentcount, 1)
						assert.isNull(err)
						done()
					})
			})
		})
	})
})
