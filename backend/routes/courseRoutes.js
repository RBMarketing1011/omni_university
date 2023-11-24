const express = require('express')
const router = express.Router()

const {
	createCourse,
	getCourse,
	updateCourse,
	deleteCourse
} = require('../controllers/coursesController')

router.route('/create')
	.post(createCourse)

router.route('/:id')
	.get(getCourse)
	.put(updateCourse)
	.delete(deleteCourse)

module.exports = router