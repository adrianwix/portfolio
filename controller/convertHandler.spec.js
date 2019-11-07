/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai')
const assert = chai.assert
const ConvertHandler = require('./convertHandler.js')

const convertHandler = new ConvertHandler()

describe('Convert Handler Unit Tests', function() {
	describe('Function convertHandler.getNum(input)', function() {
		it('Whole number input', function(done) {
			const input = '32L'
			const inputReturn = convertHandler.getNum(input)
			assert.equal(inputReturn, 32)
			done()
		})

		it('Decimal Input', function(done) {
			const input = '32.5L'
			assert.equal(
				convertHandler.getNum(input),
				32.5,
				'Decimals are returned correctly'
			)
			done()
		})

		it('Fractional Input', function(done) {
			const input = '3/2L'
			assert.equal(convertHandler.getNum(input), 1.5)
			done()
		})

		it('Fractional Input w/ Decimal', function(done) {
			const input = '9.3/3L'
			assert.equal(convertHandler.getNum(input), 3.1)
			done()
		})

		it('Invalid Input (double fraction)', function(done) {
			const input = '9.3/3/2L'
			assert.equal(convertHandler.getNum(input), 'invalid number')
			done()
		})

		it('No Numerical Input', function(done) {
			const input = 'L'
			assert.equal(convertHandler.getNum(input), 1)
			done()
		})
	})

	describe('Function convertHandler.getUnit(input)', function() {
		it('For Each Valid Unit Inputs', function(done) {
			const input = [
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
				'KG',
			]
			input.forEach(function(ele) {
				assert.equal(convertHandler.getUnit(ele), ele.toLowerCase())
			})
			done()
		})

		it('Unknown Unit Input', function(done) {
			assert.equal(convertHandler.getUnit('32csa'), 'invalid unit')
			done()
		})
	})

	describe('Function convertHandler.getReturnUnit(initUnit)', function() {
		it('For Each Valid Unit Inputs', function(done) {
			const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
			const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs']
			input.forEach(function(ele, i) {
				assert.equal(convertHandler.getReturnUnit(ele), expect[i])
			})
			done()
		})
	})

	describe('Function convertHandler.spellOutUnit(unit)', function() {
		it('For Each Valid Unit Inputs', function(done) {
			const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
			const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs']
			input.forEach(function(ele, i) {
				assert.equal(convertHandler.getReturnUnit(ele), expect[i])
			})
			done()
		})
	})

	describe('Function convertHandler.convert(num, unit)', function() {
		it('Gal to L', function(done) {
			const input = [5, 'gal']
			const expected = 18.9271
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			) //0.1 tolerance
			done()
		})

		it('L to Gal', function(done) {
			const input = [5, 'l']
			const expected = 1.32086
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			) //0.1 tolerance
			done()
		})

		it('Mi to Km', function(done) {
			const input = [5, 'mi']
			const expected = 8.0467
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			) //0.1 tolerance
			done()
		})

		it('Km to Mi', function(done) {
			const input = [5, 'km']
			const expected = 3.10686
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			) //0.1 tolerance
			done()
		})

		it('Lbs to Kg', function(done) {
			const input = [5, 'lbs']
			const expected = 2.26796
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			) //0.1 tolerance
			done()
		})

		it('Kg to Lbs', function(done) {
			const input = [5, 'kg']
			const expected = 11.02312
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			) //0.1 tolerance
			done()
		})
	})
})
