const mongoose = require('mongoose')
const { Schema } = mongoose

const courses = new Schema({
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