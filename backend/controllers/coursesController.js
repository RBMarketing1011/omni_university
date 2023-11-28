const asyncHandler = require('express-async-handler')
const Course = require('../db/models/courses')

// POST - Create Course
//Private - Only Admins
// /api/courses/create
module.exports.createCourse = asyncHandler(async (req, res) =>
{
	const { title } = req.body
	const videos = []

	try {
		const newCourse = await Course.create({ title, videos })
		res.send({
			'action': 'Created Course',
			'_id': newCourse._id,
			'title': newCourse.title
		})
	} catch (err) {
		res.send(err.message)
	}
})

//GET - Get Course Data
//Private - User
// /api/courses/:id
module.exports.getCourse = asyncHandler(async (req, res) =>
{
	try {
		const { id } = req.params
		const course = await Course.findById(id)
		res.send(course)
	} catch (err) {
		res.send(err.message)
	}
})

//GET - Get All Courses
//Private - User
// /api/courses
module.exports.getAllCourses = asyncHandler(async (req, res) =>
{
	try {
		const allCourses = await Course.find({})
		res.send(allCourses)
	} catch (err) {
		res.send(err.message)
	}
})

//PUT - Update Course Data
//Private - Admins
// /api/courses/:id
module.exports.updateCourse = asyncHandler(async (req, res) =>
{
	try {
		const { title } = req.body
		const { id } = req.params
		const updateCourse = await Course.findByIdAndUpdate(id, { title })
		res.send(updateCourse)
	} catch (err) {
		res.send(err.message)
	}
})

//Delete - Delete Course Data
//Private - Admins
// /api/courses/:id
module.exports.deleteCourse = asyncHandler(async (req, res) =>
{
	try {
		const { id } = req.params
		const deleteCourse = await Course.findByIdAndDelete(id)
		res.send(deleteCourse)
	} catch (err) {
		res.send(err.message)
	}
})