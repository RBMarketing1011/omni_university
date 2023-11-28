const express = require('express')
const router = express.Router()

const {
	createVideo,
	getVideo,
	getVideosInCourse,
	updateVideo,
	deleteVideo
} = require('../controllers/videosController')

router.route('/:id/videos/create')
	.post(createVideo)

router.route('/:id/videos')
	.get(getVideosInCourse)

router.route('/:id/videos/:videoId')
	.get(getVideo)
	.put(updateVideo)
	.delete(deleteVideo)

module.exports = router