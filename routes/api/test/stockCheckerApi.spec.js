/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const mongoose = require('mongoose');
const assert = chai.assert;
const server = 'http://localhost:3000';

// Stock Model
const Stock = require('../../../models/Stock');

chai.use(chaiHttp);

describe('Stocker Checker Functional Tests', function () {
	this.timeout(30000);
	describe('GET /api/stock-prices => stockData object', function () {
		// TODO: Don't delete everything
		before(async () => {
			await mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });
			await Stock.deleteMany({}).catch(err => console.log(err));
		});
		it('1 stock', function (done) {
			chai
				.request(server)
				.get('/api/stock-prices')
				.query({ stock: 'GOOG' })
				.end(function (err, res) {
					assert.isNull(err);
					assert.isFalse(res.error);
					let data = res.body.stockData;
					assert.equal(res.status, 200);
					assert.equal(data.stock, 'GOOG');
					assert.equal(data.likes, 0);
					console.log(err);
					done();
				});
		});

		it('1 stock with like', function (done) {
			chai
				.request(server)
				.get('/api/stock-prices')
				.query({ stock: 'GOOG', like: true })
				.end(function (err, res) {
					assert.isNull(err);
					assert.isFalse(res.error);
					let data = res.body.stockData;
					assert.equal(res.status, 200);
					assert.equal(data.stock, 'GOOG');
					assert.equal(data.likes, 1);
					assert.isObject(data.price);
					console.log(err);
					done();
					// assert.hasAllKeys(data.price, [
					// 	"1. open",
					// 	"2. high",
					// 	"3. low",
					// 	"4. close",
					// 	"5. volume"
					// ]);
				});
		});

		it('1 stock with like again (ensure likes arent double counted)', function (done) {
			chai
				.request(server)
				.get('/api/stock-prices')
				.query({ stock: 'GOOG', like: true })
				.end(function (err, res) {
					assert.isNull(err);
					assert.isFalse(res.error);
					let data = res.body.stockData;
					assert.equal(res.status, 200);
					assert.equal(data.stock, 'GOOG');
					assert.equal(data.likes, 1);
					assert.isObject(data.price);
					console.log(err);
					done();
					// assert.hasAllKeys(data.price, [
					// 	"1. open",
					// 	"2. high",
					// 	"3. low",
					// 	"4. close",
					// 	"5. volume"
					// ]);
				});
		});

		it('2 stocks', function (done) {
			chai
				.request(server)
				.get('/api/stock-prices')
				.query({ stock: ['TSLA', 'MSFT'] })
				.end(function (err, res) {
					assert.isNull(err);
					assert.isFalse(res.error);
					let data = res.body.stockData;
					let stocks = data.map(x => x.stock);
					assert.equal(res.status, 200);
					assert.includeMembers(stocks, ['TSLA', 'MSFT']);
					assert.isNumber(data[0].likes);
					assert.isNumber(data[1].likes);
					assert.equal(data[0].likes, 0);
					assert.equal(data[1].likes, 0);
					assert.isObject(data[0].price);
					assert.isObject(data[1].price);
					console.log(err);
					done();
					// assert.hasAnyKeys(data[0].price, [
					// 	"1. open",
					// 	"2. high",
					// 	"3. low",
					// 	"4. close",
					// 	"5. volume"
					// ]);
					// assert.hasAnyKeys(data[1].price, [
					// 	"1. open",
					// 	"2. high",
					// 	"3. low",
					// 	"4. close",
					// 	"5. volume"
					// ]);
				});
		});

		it('2 stocks with like', function (done) {
			chai
				.request(server)
				.get('/api/stock-prices')
				.query({ stock: ['TSLA', 'MSFT'], like: true })
				.end(function (err, res) {
					let data = res.body.stockData;
					let stocks = data.map(x => x.stock);
					assert.equal(res.status, 200);
					assert.includeMembers(stocks, ['TSLA', 'MSFT']);
					assert.isNumber(data[0].likes);
					assert.isNumber(data[1].likes);
					assert.equal(data[0].likes, 1);
					assert.equal(data[1].likes, 1);
					assert.isObject(data[0].price);
					assert.isObject(data[1].price);
					console.log(err);
					done();
					//
					// assert.hasAnyKeys(data[0].price, [
					// 	"1. open",
					// 	"2. high",
					// 	"3. low",
					// 	"4. close",
					// 	"5. volume"
					// ]);
					// assert.hasAnyKeys(data[1].price, [
					// 	"1. open",
					// 	"2. high",
					// 	"3. low",
					// 	"4. close",
					// 	"5. volume"
					// ]);
				});
		});
	});
});
