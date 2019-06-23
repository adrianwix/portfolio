/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
chai.use(chaiHttp);

const server = "http://localhost:3000";

suite("Functional Tests", async function() {
	this.timeout(10000000);

	suite("POST /api/issues/{project} => object with issue data", function() {
		test("Every field filled in", function(done) {
			chai
				.request(server)
				.post("/api/issues/koatest")
				.send({
					issue_title: "Title",
					issue_text: "text",
					created_by: "Functional Test - Every field filled in",
					assigned_to: "Chai and Mocha",
					status_text: "In QA"
				})
				.end(function(err, res) {
					assert.isNull(err);
					assert.isFalse(res.error);
					assert.equal(res.status, 200);
					assert.equal(res.body.issue_title, "Title");
					assert.equal(res.body.issue_text, "text");
					assert.equal(
						res.body.created_by,
						"Functional Test - Every field filled in"
					);
					assert.equal(res.body.assigned_to, "Chai and Mocha");
					assert.equal(res.body.status_text, "In QA");
					done();
				});
		});

		test("Required fields filled in", function(done) {
			chai
				.request(server)
				.post("/api/issues/test")
				.send({
					issue_title: "Title",
					issue_text: "text",
					created_by: "Functional Test - Required fields filled in"
				})
				.end((err, res) => {
					assert.isNull(err);
					assert.isFalse(res.error);
					assert.equal(res.status, 200);
					assert.equal(res.body.issue_title, "Title");
					assert.equal(res.body.issue_text, "text");
					assert.equal(
						res.body.created_by,
						"Functional Test - Required fields filled in"
					);
					done();
				});
		});

		test("Missing required fields", function(done) {
			chai
				.request(server)
				.post("/api/issues/test")
				.send({
					issue_title: "Title"
				})
				.end((err, res) => {
					assert.isNull(err);
					assert.isNotFalse(res.error);
					assert.equal(res.status, 400);
					assert.equal(res.error.text, "Project validation failed");
					done();
				});
		});
	});

	suite("PUT /api/issues/{project} => text", function() {
		test("No body", function(done) {
			chai
				.request(server)
				.put("/api/issues/test")
				.send({})
				.end((err, res) => {
					assert.isNull(err);
					assert.isNotFalse(res.error);
					assert.equal(res.status, 400);
					assert.equal(res.error.text, "no updated field sent");
					done();
				});
		});

		test("One field to update", function(done) {
			chai
				.request(server)
				.put("/api/issues/test")
				.send({
					_id: "5ba2a982609fa316a069dc56",
					issue_title: "Created 3 updated test"
				})
				.end((err, res) => {
					assert.isNull(err);
					assert.isFalse(res.error);
					assert.equal(res.status, 200);
					assert.equal(res.body.message, "successfully updated");
					assert.equal(res.body.updatedFields, 2);
					done();
				});
		});

		test("Multiple fields to update", function(done) {
			chai
				.request(server)
				.put("/api/issues/test")
				.send({
					_id: "5ba2a982609fa316a069dc56",
					issue_title: "Created 3 updated test",
					issue_text: "Lorem Ipsum 3 updated"
				})
				.end((err, res) => {
					assert.isNull(err);
					assert.isFalse(res.error);
					assert.equal(res.status, 200);
					assert.equal(res.body.message, "successfully updated");
					assert.equal(res.body.updatedFields, 3);
					done();
				});
		});
	});

	suite(
		"GET /api/issues/{project} => Array of objects with issue data",
		function() {
			test("No filter", function(done) {
				chai
					.request(server)
					.get("/api/issues/test")
					.end(function(err, res) {
						assert.isNull(err);
						assert.isFalse(res.error);
						assert.equal(res.status, 200);
						assert.isArray(res.body);
						assert.property(res.body[0], "_id");
						assert.property(res.body[0], "issue_title");
						assert.property(res.body[0], "issue_text");
						assert.property(res.body[0], "created_on");
						assert.property(res.body[0], "updated_on");
						assert.property(res.body[0], "created_by");
						assert.property(res.body[0], "open");
						if (res.body[0].assigned_to) {
							assert.property(res.body[0], "assigned_to");
						}
						if (res.body[0].status_text) {
							assert.property(res.body[0], "status_text");
						}
						done();
					});
			});

			test("One filter", function(done) {
				chai
					.request(server)
					.get("/api/issues/test?issue_title=Title")
					.end(function(err, res) {
						assert.isNull(err);
						assert.isFalse(res.error);
						assert.equal(res.status, 200);
						assert.isArray(res.body);
						assert.equal(res.body[0].issue_title, "Title");
						done();
					});
			});

			test("Multiple filters (test for multiple fields you know will be in the db for a return)", function(done) {
				chai
					.request(server)
					.get("/api/issues/test?issue_title=Title&issue_text=text&open=true")
					.end(function(err, res) {
						assert.isNull(err);
						assert.isFalse(res.error);
						assert.equal(res.status, 200);
						assert.isArray(res.body);
						assert.equal(res.body[0].issue_title, "Title");
						assert.equal(res.body[0].issue_text, "text");
						assert.equal(res.body[0].open, true);
						done();
					});
			});
		}
	);

	suite("DELETE /api/issues/{project} => text", function() {
		test("No _id", function(done) {
			chai
				.request(server)
				.delete("/api/issues/test")
				.end(function(err, res) {
					assert.isNull(err);
					assert.isNotFalse(res.error);
					assert.equal(res.status, 400);
					assert.equal(res.text, "No _id sended");
					done();
				});
		});

		test("Valid _id", function(done) {
			chai
				.request(server)
				.get("/api/issues/test")
				.end(function(err, res) {
					let id = res.body[0]._id;
					chai
						.request(server)
						.delete("/api/issues/test")
						.send({ _id: id })
						.end(function(err, res) {
							assert.isNull(err);
							assert.isFalse(res.error);
							assert.equal(res.body.message, "valid _id");
							assert.equal(res.status, 200);
							done();
						});
				});
		});
	});
});
