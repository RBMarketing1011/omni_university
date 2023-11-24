const mongoose = require('mongoose')
const { Schema } = mongoose

const videos = new Schema({
	title: {
		type: String,
		required: true
	},
	videoLink: {
		type: String,
		required: true
	},
	questions: {
		type: [ String ],
		required: true
	},
	answers: {
		type: [ String ],
		required: true,
		correct: {
			type: Boolean,
			default: false,
			required: true
		}
	},
	completed: {
		type: Boolean,
		default: false,
		required: true
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: 'Courses',
		required: true
	}
})

module.exports = ('Videos', videos)