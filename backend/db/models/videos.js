const mongoose = require('mongoose')
const { Schema } = mongoose

const videos = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	videoLink: {
		type: String,
		required: true
	},
	questions: {
		q1: {
			text: {
				type: String,
				required: true
			},
			answers: {
				a1: {
					text: {
						type: String,
						required: true
					}
				},
				a2: {
					text: {
						type: String,
						required: true
					}
				},
				a3: {
					text: {
						type: String,
						required: true
					}
				},
				correctAnswer: {
					type: String,
					required: true
				}
			}
		},
		q2: {
			text: {
				type: String,
				required: true
			},
			answers: {
				a1: {
					text: {
						type: String,
						required: true
					}
				},
				a2: {
					text: {
						type: String,
						required: true
					}
				},
				a3: {
					text: {
						type: String,
						required: true
					}
				},
				correctAnswer: {
					type: String,
					required: true
				}
			}
		},
		q3: {
			text: {
				type: String,
				required: true
			},
			answers: {
				a1: {
					text: {
						type: String,
						required: true
					}
				},
				a2: {
					text: {
						type: String,
						required: true
					}
				},
				a3: {
					text: {
						type: String,
						required: true
					}
				},
				correctAnswer: {
					type: String,
					required: true
				}
			}
		}
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: 'Courses'
	}
})

module.exports = mongoose.model('Videos', videos)