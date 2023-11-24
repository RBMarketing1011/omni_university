const asyncHandler = require('express-async-handler')
const Courses = require('../db/models/courses')

// POST - Create Course
//Private - Only Admins
// /api/courses/create
module.exports.createCourse = asyncHandler(async (req, res) =>
{
	res.send('Course Created')
})

//GET - Get Course Data
//Private - User
// /api/courses/:id
module.exports.getCourse = asyncHandler(async (req, res) =>
{
	res.send('Get Course Data')
})

//PUT - Update Course Data
//Private - Admins
// /api/courses/:id
module.exports.updateCourse = asyncHandler(async (req, res) =>
{
	res.send('Updated Course')
})

//Delete - Delete Course Data
//Private - Admins
// /api/courses/:id
module.exports.deleteCourse = asyncHandler(async (req, res) =>
{
	res.send('Deleted Course')
})