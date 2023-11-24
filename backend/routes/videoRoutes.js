const express = require('express')
const router = express.Router()

const {
	createVideo,
	getVideo,
	updateVideo,
	deleteVideo
} = require('../controllers/videosController')

router.route('/create')
	.post(createVideo)

router.route('/:id')
	.get(getVideo)
	.put(updateVideo)
	.delete(deleteVideo)

module.exports = router