const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threadSchema = new Schema({
	board: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	created_on: {
		type: Date,
		default: Date.now,
	},
	bumped_on: {
		type: Date,
		default: Date.now,
	},
	reported: {
		type: Boolean,
		default: false,
		required: true,
	},
	delete_password: {
		type: String,
		required: true,
	},
	replies: [
		{
			text: {
				type: String,
				required: true,
			},
			delete_password: {
				type: String,
				required: true,
			},
			created_on: {
				type: Date,
				default: Date.now,
			},
			reported: {
				type: Boolean,
				default: false,
			},
		},
	],
})

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
