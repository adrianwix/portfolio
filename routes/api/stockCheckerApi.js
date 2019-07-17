'use strict'
const Stock = require('../../models/Stock')
const fetch = require('node-fetch')
const fakeResponse = require('../../data/stockCheckerFake.json')
const Router = require('koa-router')
const router = new Router()

/* eslint-disable no-console */
function alphaVantage(stock) {
	if (process.env.NODE_ENV === 'test') {
		return fakeResponse[stock]
	} else {
		return (
			'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' +
			stock +
			'&interval=5min&outputsize=compact&apikey=' +
			process.env.ALPHA_VANTAGE
		)
	}
}

/**
 * @route /api/stock-prices
 * @type {Router<any, {}>}
 */
module.exports = router
	.get('/', async ctx => {
		let { stock, like } = ctx.query
		console.log('stock', stock)
		console.log('like', like)
		// Handle one stock
		// let ip = req.ip + Math.random() * 100;
		let ip = ctx.ip

		if (typeof stock == 'string') {
			let dbStock = await Stock.findOne({ stock })
			// Stock dont exist
			if (!dbStock) {
				let stockData = await createStockAndResponse(stock)
				ctx.body = { stockData }
			} /* Stock exist */ else {
				// Like
				let stockData = await createResponse(dbStock)
				ctx.body = { stockData }
			}
		} /* 2 stocks in array */ else {
			let dbStocks = await Stock.find({ stock: { $in: [...stock] } })

			// Paths depend of the presence of the stocks in the DB
			if (dbStocks.length === 2) {
				let stockData0 = await createResponse(dbStocks[0])
				let stockData1 = await createResponse(dbStocks[1])

				ctx.body = { stockData: [stockData0, stockData1] }
			} else if (dbStocks.length == 1) {
				let missingStock = stock.filter(
					stock => stock != dbStocks[0].stock,
				)
				let stockData0 = await createResponse(dbStocks[0])
				let stockData1 = await createStockAndResponse(missingStock)
				ctx.body = { stockData: [stockData0, stockData1] }

			} else {
				let stockData0 = await createStockAndResponse(stock[0])
				let stockData1 = await createStockAndResponse(stock[1])
				ctx.body = { stockData: [stockData0, stockData1] }
			}

		}


		/**
		 * @description This function fetch the Stock data a return an object
		 * @param {*} stock Mongoose query object
		 */
		async function stockResObj(stock) {
			try {
				let stockName = stock.stock
				let stockNameUP = stockName.toUpperCase()
				let url = alphaVantage(stockNameUP)
				let alphaVStock
				if (process.env.NODE_ENV == 'test') {
					alphaVStock = url
				} else {
					let response = await fetch(url).catch(err =>
						ctx.throw(400, err),
					)
					alphaVStock = await response.json()
				}
				console.log(alphaVStock['Meta Data']['2. Symbol'])
				return {
					stock: stockName,
					likes: stock.likes.length,
					price:
						alphaVStock['Time Series (5min)'][
							alphaVStock['Meta Data']['3. Last Refreshed']
							],
				}
			} catch (error) {
				console.log(error)
			}
		}

		async function createResponse(dbStock) {
			try {
				if (like && dbStock.likes.indexOf(ip) === -1) {
					dbStock.likes.unshift(ip)
					let savedStock = await dbStock.save()
					let stockData = await stockResObj(savedStock)
					return stockData
				} else {
					let stockData = await stockResObj(dbStock)
					return stockData
				}
			} catch (err) {
				ctx.throw(400, err)
			}
		}

		async function createStockAndResponse(stock) {
			try {
				let newStock = new Stock({ stock })
				// Like
				if (like) {
					newStock.likes = [ip]
				}
				let savedStock = await newStock.save()
				let stockResponse = await stockResObj(savedStock)
				return stockResponse
			} catch (err) {
				ctx.throw(400, err)
			}
		}

	})

