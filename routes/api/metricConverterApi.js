'use strict';

const ConvertHandler = require('../../controller/convertHandler');
const Router = require('koa-router');
const router = new Router();
const convertHandler = new ConvertHandler();

module.exports = router
	.get('/', async ctx => {
		const input = ctx.query.input;
		const initNum = convertHandler.getNum(input);
		const initUnit = convertHandler.getUnit(input);

		// Handling invalid query
		if (initUnit === 'invalid unit' && initNum === 'invalid number') {
			ctx.throw(400, 'invalid number and unit');
		} else if (initNum === 'invalid number') {
			ctx.throw(400, initNum);
		} else if (initUnit === 'invalid unit') {
			ctx.throw(400, initUnit);
		}

		const returnNum = convertHandler.convert(initNum, initUnit);
		const returnUnit = convertHandler.getReturnUnit(initUnit);
		const string = convertHandler.getString(
			initNum,
			initUnit,
			returnNum,
			returnUnit
		);

		ctx.body = {
			initNum: initNum,
			initUnit: initUnit,
			returnNum: returnNum,
			returnUnit: returnUnit,
			string: string
		};
	});

