const express = require('express')
const router = express.Router()

const {
	createCourse,
	getCourse,
	getAllCourses,
	updateCourse,
	deleteCourse
} = require('../controllers/coursesController')

router.route('')
	.get(getAllCourses)

router.route('/create')
	.post(createCourse)

router.route('/:id')
	.get(getCourse)
	.patch(updateCourse)
	.delete(deleteCourse)

module.exports = router