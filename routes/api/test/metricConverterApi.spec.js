const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = 'http://localhost:3000'

chai.use(chaiHttp)

describe('Metric Converter Functional Tests', function() {
	describe('Routing Tests', function() {
		describe('GET /api/convert => conversion object', function() {
			it('Convert 10L (valid input)', function(done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '10L' })
					.end(function(err, res) {
						assert.isNull(err)
						assert.isFalse(res.error)
						assert.equal(res.status, 200)
						assert.equal(res.body.initNum, 10)
						assert.equal(res.body.initUnit, 'l')
						assert.approximately(res.body.returnNum, 2.64172, 0.1)
						assert.equal(res.body.returnUnit, 'gal')
						done()
					})
			})

			it('Convert 32g (invalid input unit)', function(done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '32g' })
					.end(function(err, res) {
						assert.isNull(err)
						assert.isNotFalse(res.error)
						assert.equal(res.status, 400)
						assert.equal(res.body.message, 'invalid unit')
						done()
					})
			})

			it('Convert 3/7.2/4kg (invalid number)', function(done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '32/12/4l' })
					.end(function(err, res) {
						assert.isNull(err)
						assert.isNotFalse(res.error)
						assert.equal(res.status, 400)
						assert.equal(res.body.message, 'invalid number')
						done()
					})
			})

			it('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
				done()
			})

			it('Convert kg (no number)', function(done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: 'kg' })
					.end(function(err, res) {
						assert.equal(res.status, 200)
						assert.equal(res.body.initNum, 1)
						assert.equal(res.body.initUnit, 'kg')
						assert.approximately(res.body.returnNum, 2.20462, 0.1)
						assert.equal(res.body.returnUnit, 'lbs')
						done()
					})
			})
		})
	})
})
