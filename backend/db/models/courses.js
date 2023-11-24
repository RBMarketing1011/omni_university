const mongoose = require('mongoose')
const { Schema } = mongoose
const db = require('../connection/connection')

const courses = new Schema({
	id: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	videos: {
		type: Schema.Types.ObjectId,
		ref: 'Videos'
	},
	completed: {
		type: Boolean,
		default: false,
		required: true
	}
},
	{
		timestamps: true
	}
)

module.exports = ('Courses', courses)