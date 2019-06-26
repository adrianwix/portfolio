/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('./convertHandler.js');

var convertHandler = new ConvertHandler();

describe.only('Convert Handler Unit Tests', function () {
	describe('Function convertHandler.getNum(input)', function () {
		it('Whole number input', function (done) {
			var input = '32L';
			var inputReturn = convertHandler.getNum(input);
			assert.equal(inputReturn, 32);
			done();
		});

		it('Decimal Input', function (done) {
			var input = '32.5L';
			assert.equal(
				convertHandler.getNum(input),
				32.5,
				'Decimals are returned correctly'
			);
			done();
		});

		it('Fractional Input', function (done) {
			var input = '3/2L';
			assert.equal(convertHandler.getNum(input), 1.5);
			done();
		});

		it('Fractional Input w/ Decimal', function (done) {
			var input = '9.3/3L';
			assert.equal(convertHandler.getNum(input), 3.1);
			done();
		});

		it('Invalid Input (double fraction)', function (done) {
			var input = '9.3/3/2L';
			assert.equal(convertHandler.getNum(input), 'invalid number');
			done();
		});

		it('No Numerical Input', function (done) {
			var input = 'L';
			assert.equal(convertHandler.getNum(input), 1);
			done();
		});
	});

	describe('Function convertHandler.getUnit(input)', function () {
		it('For Each Valid Unit Inputs', function (done) {
			var input = [
				'gal',
				'l',
				'mi',
				'km',
				'lbs',
				'kg',
				'GAL',
				'L',
				'MI',
				'KM',
				'LBS',
				'KG'
			];
			input.forEach(function (ele) {
				assert.equal(convertHandler.getUnit(ele), ele.toLowerCase());
			});
			done();
		});

		it('Unknown Unit Input', function (done) {
			assert.equal(convertHandler.getUnit('32csa'), 'invalid unit');
			done();
		});
	});

	describe('Function convertHandler.getReturnUnit(initUnit)', function () {
		it('For Each Valid Unit Inputs', function (done) {
			var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
			var expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
			input.forEach(function (ele, i) {
				assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
			});
			done();
		});
	});

	describe('Function convertHandler.spellOutUnit(unit)', function () {
		it('For Each Valid Unit Inputs', function (done) {
			var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
			var expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
			input.forEach(function (ele, i) {
				assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
			});
			done();
		});
	});

	describe('Function convertHandler.convert(num, unit)', function () {
		it('Gal to L', function (done) {
			var input = [5, 'gal'];
			var expected = 18.9271;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});

		it('L to Gal', function (done) {
			var input = [5, 'l'];
			var expected = 1.32086;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});

		it('Mi to Km', function (done) {
			var input = [5, 'mi'];
			var expected = 8.0467;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});

		it('Km to Mi', function (done) {
			var input = [5, 'km'];
			var expected = 3.10686;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});

		it('Lbs to Kg', function (done) {
			var input = [5, 'lbs'];
			var expected = 2.26796;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});

		it('Kg to Lbs', function (done) {
			var input = [5, 'kg'];
			var expected = 11.02312;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});
	});
});
