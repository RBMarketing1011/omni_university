const mongoose = require('mongoose')
const { Schema } = mongoose

const courses = new Schema({
	title: {
		type: String,
		required: true
	},
	videos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Videos'
		},
	]
},
	{
		timestamps: true
	}
)

courses.post('findOneAndDelete', async function (doc)
{
	if (doc) {
		await Videos.deleteMany({
			_id: {
				$in: doc.videos
			}
		})
	}
})

module.exports = mongoose.model('Courses', courses)