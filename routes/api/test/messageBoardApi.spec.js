const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = 'http://localhost:3000';
const mongoose = require('mongoose');
require('dotenv').config();
// Require Model
const Thread = require('../../../models/Thread');

chai.use(chaiHttp);
/*eslint-disable no-undef, no-console*/
describe('Message Board Functional Tests', function () {
	let thread_id;
	this.timeout(30000);
	before(async () => {
		await mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

		await Thread.deleteMany({}).catch(err => console.log(err));

	});
	describe('API ROUTING FOR /api/threads/:board', function () {
		describe('POST', function () {
			it('Create a message', function (done) {
				chai
					.request(server)
					.post('/api/threads/general')
					.send({ text: 'Mocha test', delete_password: '123' })
					.end(function (err, res) {
						assert.isNull(err);
						assert.isFalse(res.error);

						let data = res.body;
						// Save Thread Id in a "global" variable
						thread_id = data._id;

						assert.equal(res.status, 200);
						assert.equal(data.text, 'Mocha test');
						assert.equal(data.board, 'general');
						assert.isNumber(Date.parse(data.created_on));
						assert.isNumber(Date.parse(data.bumped_on));
						assert.equal(data.reported, false);
						assert.isBoolean(data.reported);
						assert.exists(data.delete_password);
						assert.isArray(data.replies);
						done();
					});
			});
		});

		describe('GET', function () {
			it('Get array of threads', function (done) {
				chai
					.request(server)
					.get('/api/threads/general')
					.end(function (err, res) {
						assert.isNull(err);
						assert.isFalse(res.error);
						let data = res.body[0];
						assert.equal(res.status, 200);
						assert.equal(data.text, 'Mocha test');
						assert.equal(data.board, 'general');
						assert.isNumber(Date.parse(data.created_on));
						assert.isNumber(Date.parse(data.bumped_on));
						assert.isArray(data.replies);
						assert.notExists(data.reported);
						assert.notExists(data.delete_password);
						done();
					});
			});
		});

		describe('DELETE', function () {
			it('Delete message', function (done) {
				chai
					.request(server)
					.delete('/api/threads/general')
					.send({ thread_id, delete_password: '123' })
					.end(function (err, res) {
						assert.isNull(err);
						assert.isFalse(res.error);
						assert.equal(res.status, 200);
						assert.equal(res.text, 'success');
						chai
							.request(server)
							.get('/api/threads/general')
							.end(function (err, res) {
								assert.isNull(err);
								assert.isFalse(res.error);
								assert.equal(res.status, 200);
								assert.equal(res.body[0].text, '[deleted]');
								done();
							});
					});
			});
		});

		describe('PUT', function () {
			it('Report message', function (done) {
				chai
					.request(server)
					.put('/api/threads/general')
					.send({ report_id: thread_id })
					.end(function (err, res) {
						assert.isNull(err);
						assert.isFalse(res.error);
						assert.equal(res.status, 200);
						assert.equal(res.text, 'success');
						done();
					});
			});
		});
	});
	describe('API ROUTING FOR /api/replies/:board', function () {
		let reply_id;
		describe('POST', function () {
			it('Create reply to a message', function (done) {
				chai
					.request(server)
					.post('/api/replies/general')
					.send({ text: 'Mocha Reply Test', delete_password: '123', thread_id })
					.end(function (err, res) {
						assert.isNull(err);
						assert.isFalse(res.error);
						let data = res.body.replies[0];
						assert.equal(res.status, 200);
						assert.isArray(res.body.replies);
						assert.equal(res.body.replies.length, 1);
						assert.isTrue(res.body.reported);
						// Reply
						reply_id = data._id;
						assert.equal(data.text, 'Mocha Reply Test');
						// Reply - Reported
						assert.equal(data.reported, false);
						assert.isBoolean(data.reported);
						// Reply - Password
						assert.exists(data.delete_password);
						assert.equal(data.delete_password, '123');
						done();
					});
			});
		});

		describe('GET', function () {
			it('Get one message with its replies', function (done) {
				chai
					.request(server)
					.get('/api/replies/general')
					.query({ thread_id })
					.end(function (err, res) {
						assert.isNull(err);
						assert.isFalse(res.error);
						let data = res.body;
						assert.equal(res.status, 200);
						assert.equal(data.text, '[deleted]');
						assert.equal(data.board, 'general');
						// Thread - Dates
						assert.isNotNull(data.created_on);
						assert.isNumber(Date.parse(data.created_on));
						assert.isNotNull(data.bumped_on);
						assert.isNumber(Date.parse(data.bumped_on));
						assert.isArray(data.replies);
						// No Reported nor delete_password
						assert.notExists(data.reported);
						assert.notExists(data.delete_password);
						// Reply
						assert.equal(data.replies[0].text, 'Mocha Reply Test');
						assert.notExists(data.replies[0].reported);
						done();
					});
			});
		});

		describe('PUT', function () {
			it('Report reply', function (done) {
				chai
					.request(server)
					.put('/api/replies/general')
					.send({ thread_id, reply_id })
					.end(function (err, res) {
						assert.isNull(err);
						assert.isFalse(res.error);
						assert.equal(res.status, 200);
						assert.equal(res.body.replies[0].reported, true);
						done();
					});
			});
		});

		describe('DELETE', function () {
			it('Delete a reply', function (done) {
				chai
					.request(server)
					.delete('/api/replies/general')
					.send({ thread_id, reply_id, delete_password: '123' })
					.end(function (err, res) {
						assert.isNull(err);
						assert.isFalse(res.error);
						assert.equal(res.status, 200);
						assert.equal(res.body.replies[0].text, '[deleted]');
						done();
					});
			});
		});
	});

});
