const asyncHandler = require('express-async-handler')
const Course = require('../db/models/courses')

// POST - Create Course
//Private - Only Admins
// /api/courses/create
module.exports.createCourse = asyncHandler(async (req, res) =>
{
	const { title } = req.body
	const videos = []

	try
	{
		await Course.create({ title, videos })
		res.status(200).json({ message: 'Created New Course' })
	} catch (err)
	{
		res.status(401)
		throw new Error('Could Not Create New Course')
	}
})

//GET - Get Course Data
//Private - User
// /api/courses/:id
module.exports.getCourse = asyncHandler(async (req, res) =>
{
	try
	{
		const { id } = req.params
		const course = await Course.findById(id)
		res.json(course)
	} catch (err)
	{
		res.status(401)
		throw new Error('Could Not Find Course')
	}
})

//GET - Get All Courses
//Private - User
// /api/courses
module.exports.getAllCourses = asyncHandler(async (req, res) =>
{
	try
	{
		const allCourses = await Course.find({}).populate('videos')
		res.status(200).json(allCourses)
	} catch (err)
	{
		res.status(401)
		throw new Error('Could Not Find Courses')
	}
})

//PATCH - Update Course Data
//Private - Admins
// /api/courses/:id
module.exports.updateCourse = asyncHandler(async (req, res) =>
{
	try
	{
		const { title } = req.body
		const { id } = req.params
		const updateCourse = await Course.findByIdAndUpdate(id, { title })
		res.status(200).json({ message: 'Course Updated Successfully' })
	} catch (err)
	{
		res.status(401)
		throw new Error('Could Not Update Course')
	}
})

//Delete - Delete Course Data
//Private - Admins
// /api/courses/:id
module.exports.deleteCourse = asyncHandler(async (req, res) =>
{
	try
	{
		const { id } = req.params
		const deleteCourse = await Course.findByIdAndDelete(id)
		res.json(deleteCourse)
	} catch (err)
	{
		res.status(401)
		throw new Error('Could Not Delete Course')
	}
})